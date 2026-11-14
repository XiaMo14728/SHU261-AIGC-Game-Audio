# 02 · 素材收集与 AIGC 提示词

> 对应作业要求第 3 条：通过各种方式收集声音素材（本条路线为 AIGC 生成）。

---

## 一、工具选型

作业明确允许"其他你能想到的办法或途径，比如 AIGC 工具"。本方案全部使用 AIGC 生成，工具分工如下：

| 用途 | 推荐工具 | 理由 | 备选 |
| --- | --- | --- | --- |
| **基底环境声**（长、连续、无音乐性） | Stable Audio 2.5 / ElevenLabs | 支持较长时长生成，环境声类提示词响应好 | Suno（但容易生成出音乐性，需谨慎） |
| **短音效**（鸟鸣、水花、风声、铃声） | ElevenLabs Sound Effects | 专做 0.5–5 秒短音效，瞬态清楚、可直接用 | Stable Audio、Adobe Firefly |
| **后期处理** | Reaper | 见 `docs/03` | Audacity |

**建议起步策略**：先用免费额度把 1 条基底和 1 条鸟鸣做出来，听一下风格是不是你想要的，再批量生成剩下的。不要一上来就 13 条一起抽。

---

## 二、AIGC 不是"一次成型"，而是"抽卡 + 筛选"

这点必须先说清楚，否则后面会踩坑：

- 音频生成模型的**单次出片率**远低于图像生成。同一个提示词连生成 5 次，可能有 1 次能用、2 次勉强、2 次完全跑偏（冒出音乐、人声、或者声音形态根本不对）。
- 所以流程是：**每个资产生成 3–5 次 → 试听筛选 → 只保留最像的一条 → 精修**。13 个资产预计要生成 40–60 次，这是正常的，不是你操作有问题。
- **筛选标准**（按优先级）：
  1. 没有音乐性（不能有旋律、节拍、和弦）；
  2. 没有人声（除非你要的就是人声）；
  3. 声音形态正确（鸟鸣不能听成狗叫、风声不能听成海浪）；
  4. 没有明显的 AI 瑕疵（突然的截断、无意义的电子味、开头/结尾的静音块）。

---

## 三、提示词（可直接复制）

音频生成模型对**英文提示词**响应明显更好。每条提示词包含了五个要素：**声源 + 视角距离 + 声学环境 + 时长 + 排除项**。

### 3.1 基底环境声（AMB-01，目标 40 秒）

**推荐做法**：不要让 AI 直接生成 40 秒。长音频生成容易出现"结构漂移"（前 10 秒像树林、后 10 秒慢慢变成别的东西）。更稳的做法是生成 4 段 12–15 秒，在 Reaper 里交叉淡化拼成一条 40 秒循环。详见 `docs/03`。

**生成提示词**（每段都改一下措辞以避免四段过于相似）：

```
Field recording ambience, early morning in a city park by a lake: gentle wind moving
through a dense stand of tall evergreen trees, continuous soft rustling of leaves,
distant lake water lapping lightly against a stone embankment, a very faint low urban
hum far in the background, calm and empty, wide stereo image, natural dynamics.
No music, no melody, no voices, no birdsong in the foreground, no sudden events.
Duration: 15 seconds.
```

变体改写方向（保持整体一致，只是让四段不完全相同）：
- 第 2 段把 `gentle wind` 改成 `a light breeze`，`lightly` 改成 `slowly`
- 第 3 段加 `slightly closer perspective`，强调树冠
- 第 4 段加 `slightly lower level, more distant`,强调湖面与远处城市

### 3.2 鸟鸣（SFX-01，3 个变体）

```
A single blackbird singing one short phrase at dawn in a park, close perspective,
two or three clear notes then silence, dry outdoor recording with natural short
reverb, no music, no other birds, no wind, 1.5 seconds.
```

| 变体 | 改动 |
| --- | --- |
| `_01` | 保持原样（近景、乌鸫、2–3 个音） |
| `_02` | `a different songbird, higher pitch, three quick notes`（更远、更细的鸟） |
| `_03` | `distant bird call, medium distance, softer and thinner`（远景，用于距离对比） |

### 3.3 水鸟起飞（SFX-02，3 个变体）

```
A white egret taking off from shallow water: three or four rapid wing flaps, water
splashing and droplets falling back into the lake, medium distance in a calm park at
dawn, natural outdoor acoustics, no music, no voices, 2.5 seconds.
```

| 变体 | 改动 |
| --- | --- |
| `_01` | 保持原样（中距离、拍翅 3–4 下） |
| `_02` | `closer perspective, stronger splash, louder wing beats`（近、力度大） |
| `_03` | `a duck taking off with faster smaller wing beats and less splash`（不同的鸟、更轻） |

### 3.4 阵风扫过树冠（SFX-03，3 个变体）

```
A sudden gust of wind sweeping through the canopy of tall evergreen trees, leaves and
small branches rustling, the sound swelling from far to near and then receding again,
calm park setting, natural outdoor acoustics, no music, no voices, 3 seconds.
```

| 变体 | 改动 |
| --- | --- |
| `_01` | 保持原样（由远及近再退走） |
| `_02` | `stronger gust, violent rustling, faster swell`（更强、更快） |
| `_03` | `a soft lingering breeze, no strong swell, sustained rustle`（弱、几乎不推近） |

### 3.5 远处自行车铃（SFX-04，3 个变体）

```
A bicycle bell ringing twice in the distance in a park, off-screen sound source,
thin bright metallic tone with park ambience bleeding through, no music, no voices,
1 second.
```

| 变体 | 改动 |
| --- | --- |
| `_01` | 保持原样（响两下、中远距离） |
| `_02` | `ringing three times, closer and clearer`（三下、更近） |
| `_03` | `a single distant ring, very far away, faint and thin`（一下、极远） |

---

## 四、生成后的第一道处理（进 Reaper 之前）

AI 生成的原始文件普遍有四个问题，建议先粗处理再进剪辑流程：

| 问题 | 表现 | 处理 |
| --- | --- | --- |
| 采样率不统一 | 44.1 kHz / 48 kHz 混杂 | Reaper 里统一设 48 kHz（见 `docs/03`） |
| 位深不够 | 多为 16 bit 或压缩格式 | 渲染时统一 24 bit |
| 首尾静音块 | 开头 0.2–0.5 秒纯静音 | 裁掉（否则 Wwise 里触发会有延迟感） |
| 低频堆积 | 莫名的"隆隆"声 | 加 40–60 Hz 高通滤波 |

---

## 五、版权与合规（报告里必须写）

AIGC 素材用于课程作业是允许的，但要**如实说明**，并且注意各平台的商用条款。报告"素材来源"一节应写清：

1. 使用了哪个工具（名称 + 版本/时间）；
2. 逐条列出提示词（本文件即为记录）；
3. 说明生成素材的授权状态（多数平台免费额度生成的音频可非商业使用，商用需订阅）；
4. 声明本作业为课程非商业用途。

> 这一点和 Task 报告里的"权利与合规"章节是呼应的——**你 Task 里分析过的问题，Final 里自己就踩了一遍**，这正好可以写进期末报告的反思部分，是很加分的内容。

---

## 六、采集清单（生成后逐项勾选）

| 编号 | 文件名 | 状态 | 生成次数 | 选中的那次备注 |
| --- | --- | --- | --- | --- |
| AMB-01 | `amb_parklake_loop_01.wav` | ⬜ | | 需 4 段拼接 |
| SFX-01a | `sfx_bird_chirp_01.wav` | ⬜ | | |
| SFX-01b | `sfx_bird_chirp_02.wav` | ⬜ | | |
| SFX-01c | `sfx_bird_chirp_03.wav` | ⬜ | | |
| SFX-02a | `sfx_water_bird_splash_01.wav` | ⬜ | | |
| SFX-02b | `sfx_water_bird_splash_02.wav` | ⬜ | | |
| SFX-02c | `sfx_water_bird_splash_03.wav` | ⬜ | | |
| SFX-03a | `sfx_leaves_gust_01.wav` | ⬜ | | |
| SFX-03b | `sfx_leaves_gust_02.wav` | ⬜ | | |
| SFX-03c | `sfx_leaves_gust_03.wav` | ⬜ | | |
| SFX-04a | `sfx_bicycle_bell_01.wav` | ⬜ | | |
| SFX-04b | `sfx_bicycle_bell_02.wav` | ⬜ | | |
| SFX-04c | `sfx_bicycle_bell_03.wav` | ⬜ | | |

生成时请把原始文件先放到一个**仓库外**的临时目录（例如 `~/Downloads/aigc_raw/`），筛选完毕、剪辑导出后再把成品放到 `assets/audio/`。**原始草稿不要提交到仓库。**
