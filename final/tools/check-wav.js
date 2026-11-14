#!/usr/bin/env node
/**
 * check-wav.js — 导出声音资产的自动校验工具
 *
 * 校验 SHU261 Final 作业要求的格式：
 *   48000 Hz / 24 bit / 2 声道(stereo) / .wav
 * 并额外检查：
 *   - 文件名以 amb_ 开头的基底声，时长必须 > 30 秒
 *   - 文件名以 sfx_ 开头的随机声，给出时长供人工确认
 *
 * 用法：
 *   node check-wav.js                    # 默认检查 ../assets/audio
 *   node check-wav.js <目录路径>
 *
 * 无任何第三方依赖，只用 Node 内置模块。
 */

const fs = require("fs");
const path = require("path");

const EXPECTED = { sampleRate: 48000, bitsPerSample: 24, channels: 2 };
const AMB_MIN_SECONDS = 30;

function parseWav(file) {
  const buf = fs.readFileSync(file);
  if (buf.length < 44) throw new Error("文件太小，不是有效 WAV");
  if (buf.toString("ascii", 0, 4) !== "RIFF") throw new Error("缺少 RIFF 标识");
  if (buf.toString("ascii", 8, 12) !== "WAVE") throw new Error("缺少 WAVE 标识");

  let offset = 12;
  let fmt = null;
  let dataSize = null;

  while (offset + 8 <= buf.length) {
    const id = buf.toString("ascii", offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    const body = offset + 8;

    if (id === "fmt ") {
      const audioFormat = buf.readUInt16LE(body);
      const numChannels = buf.readUInt16LE(body + 2);
      const sampleRate = buf.readUInt32LE(body + 4);
      const byteRate = buf.readUInt32LE(body + 8);
      const blockAlign = buf.readUInt16LE(body + 12);
      const bitsPerSample = buf.readUInt16LE(body + 14);
      fmt = { audioFormat, numChannels, sampleRate, byteRate, blockAlign, bitsPerSample, extensible: audioFormat === 0xfffe };
    } else if (id === "data") {
      dataSize = size;
      // data 通常是最后一个块，若要统计时长已经足够，直接结束
      if (fmt) break;
    }

    // 块按偶数长度对齐（奇数长度有 1 字节填充）
    offset = body + size + (size % 2);
  }

  if (!fmt) throw new Error("未找到 fmt 块");
  if (dataSize === null) throw new Error("未找到 data 块");

  const seconds = fmt.byteRate > 0 ? dataSize / fmt.byteRate : 0;
  return { ...fmt, seconds, fileSize: buf.length };
}

function check(file) {
  const name = path.basename(file);
  const problems = [];
  let info;
  try {
    info = parseWav(file);
  } catch (e) {
    return { name, ok: false, problems: ["无法解析: " + e.message] };
  }

  if (info.extensible) {
    problems.push("使用 WAVE_FORMAT_EXTENSIBLE，建议导出为普通 PCM");
  } else if (info.audioFormat !== 1) {
    problems.push(`不是 PCM（audioFormat=${info.audioFormat}），可能是浮点或压缩格式`);
  }
  if (info.sampleRate !== EXPECTED.sampleRate) problems.push(`采样率 ${info.sampleRate} Hz（要求 ${EXPECTED.sampleRate}）`);
  if (info.bitsPerSample !== EXPECTED.bitsPerSample) problems.push(`位深 ${info.bitsPerSample} bit（要求 ${EXPECTED.bitsPerSample}）`);
  if (info.numChannels !== EXPECTED.channels) problems.push(`声道 ${info.numChannels}（要求 ${EXPECTED.channels}）`);

  if (/^amb_/i.test(name) && info.seconds <= AMB_MIN_SECONDS) {
    problems.push(`基底声时长 ${info.seconds.toFixed(2)} s，要求 > ${AMB_MIN_SECONDS} s`);
  }
  if (/^sfx_/i.test(name) && info.seconds > 10) {
    problems.push(`随机声时长 ${info.seconds.toFixed(2)} s 偏长（${"间断短声"}建议 0.5–5 s）`);
  }

  return { name, ok: problems.length === 0, info, problems };
}

function main() {
  const arg = process.argv[2];
  const dir = path.resolve(__dirname, "..", "assets", "audio");
  const target = arg ? path.resolve(arg) : dir;

  console.log("检查目录: " + target + "\n");

  if (!fs.existsSync(target)) {
    console.error("目录不存在: " + target);
    process.exit(1);
  }

  const files = fs.readdirSync(target).filter((f) => f.toLowerCase().endsWith(".wav")).sort();
  if (!files.length) {
    console.error("目录中没有 .wav 文件。请先完成剪辑导出。");
    process.exit(1);
  }

  const rows = files.map((f) => check(path.join(target, f)));

  const pad = (s, n) => String(s).padEnd(n);
  console.log(pad("文件", 32) + pad("采样率", 10) + pad("位深", 8) + pad("声道", 9) + pad("时长", 10) + "结果");
  console.log("-".repeat(78));

  let ambCount = 0;
  let sfxCount = 0;
  for (const r of rows) {
    if (/^amb_/i.test(r.name)) ambCount++;
    if (/^sfx_/i.test(r.name)) sfxCount++;

    if (!r.info) {
      console.log(pad(r.name, 32) + "—".repeat(30) + "FAIL");
      continue;
    }
    const i = r.info;
    console.log(
      pad(r.name, 32) +
      pad(i.sampleRate + " Hz", 10) +
      pad(i.bitsPerSample + " bit", 8) +
      pad(i.numChannels === 2 ? "stereo" : i.numChannels + "ch", 9) +
      pad(i.seconds.toFixed(2) + " s", 10) +
      (r.ok ? "PASS" : "FAIL")
    );
    for (const p of r.problems) console.log("    ✗ " + p);
  }

  const failed = rows.filter((r) => !r.ok);
  console.log("\n" + "=".repeat(78));
  console.log(`文件总数: ${rows.length}    通过: ${rows.length - failed.length}    失败: ${failed.length}`);
  console.log(`基底环境声 amb_*: ${ambCount} 个（要求 ≥1，且 >30s）`);
  console.log(`间断随机声 sfx_*: ${sfxCount} 个（要求 ≥3）`);

  if (ambCount === 0) console.log("⚠️  缺少基底环境声（文件名应以 amb_ 开头）");
  if (sfxCount < 3) console.log("⚠️  间断随机声不足 3 个");
  if (failed.length) {
    console.log("\n❌ 有文件不符合 48kHz / 24bit / stereo 规范，请回 Reaper 重新导出。");
    process.exit(1);
  }
  console.log("\n✅ 全部符合规范，可以导入 Wwise。");
}

main();
