# assets · 声音资产

本目录存放 Reaper 导出的最终声音资产，供 Wwise 工程导入。

## 格式要求（硬性）

| 项目 | 值 |
| --- | --- |
| 容器 | WAV（RIFF） |
| 采样率 | **48000 Hz** |
| 位深 | **24 bit PCM** |
| 声道 | **Stereo（2 声道）** |

## 资产清单

### 基底持续声（1 个，要求 > 30 秒）

| 编号 | 文件名 | 内容 | 目标时长 | 状态 |
| --- | --- | --- | --- | --- |
| AMB-01 | `audio/amb_parklake_loop_01.wav` | 湖畔树林晨间环境底噪 | 40 s | ⬜ |

### 间断随机声（12 个，要求 ≥ 3）

| 编号 | 文件名 | 内容 | 目标时长 | 状态 |
| --- | --- | --- | --- | --- |
| SFX-01a | `audio/sfx_bird_chirp_01.wav` | 鸟鸣短句（近景乌鸫） | 1–2 s | ⬜ |
| SFX-01b | `audio/sfx_bird_chirp_02.wav` | 鸟鸣短句（音高更高、三连音） | 1–2 s | ⬜ |
| SFX-01c | `audio/sfx_bird_chirp_03.wav` | 鸟鸣短句（远景、更细） | 1–2 s | ⬜ |
| SFX-02a | `audio/sfx_water_bird_splash_01.wav` | 水鸟起飞（中距离） | 2–3 s | ⬜ |
| SFX-02b | `audio/sfx_water_bird_splash_02.wav` | 水鸟起飞（近、力度大） | 2–3 s | ⬜ |
| SFX-02c | `audio/sfx_water_bird_splash_03.wav` | 鸭子起飞（轻、拍翅快） | 2–3 s | ⬜ |
| SFX-03a | `audio/sfx_leaves_gust_01.wav` | 阵风扫叶（由远及近） | 2–4 s | ⬜ |
| SFX-03b | `audio/sfx_leaves_gust_02.wav` | 阵风扫叶（更强更快） | 2–4 s | ⬜ |
| SFX-03c | `audio/sfx_leaves_gust_03.wav` | 微风（无明显推近） | 2–4 s | ⬜ |
| SFX-04a | `audio/sfx_bicycle_bell_01.wav` | 自行车铃（响两下） | 0.5–1 s | ⬜ |
| SFX-04b | `audio/sfx_bicycle_bell_02.wav` | 自行车铃（三下、更近） | 0.5–1 s | ⬜ |
| SFX-04c | `audio/sfx_bicycle_bell_03.wav` | 自行车铃（一下、极远） | 0.5–1 s | ⬜ |

## 校验

导出后运行自动校验脚本：

```powershell
node "$env:USERPROFILE\Downloads\SHU261-AIGC-Game-Audio\final\tools\check-wav.js"
```

脚本会逐文件检查 48kHz / 24bit / stereo，并核对基底是否超过 30 秒、随机声数量是否达到 3 个。**全绿才算导出完成。**

## 不入库的东西

- AIGC 生成的原始草稿 → 放在仓库外（如 `~/Downloads/aigc_raw/`），只提交成品
- Reaper 工程备份 `.rpp-bak` → 已在 `.gitignore` 中排除
