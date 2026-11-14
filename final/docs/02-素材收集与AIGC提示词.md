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

**推荐做法（先试单次，漂移再分段）**：

1. **优先试一次生成 40–45 秒**。如果所用工具支持较长时长（Stable Audio 2.5 单次可出数十秒），先直接生成一条 40 秒，重点检查**后半段有没有变味**。能一次成就是最省事的，也免掉拼接接缝的麻烦。
2. **如果出现"结构漂移"**（前 10 秒像树林、后半段慢慢变成别的环境），再改成分段生成：生成 4 段 12–15 秒，在 Reaper 里交叉淡化拼成 40 秒。详见 `docs/03`。

**生成提示词**（单次生成直接用；若走分段路线，每段改一下措辞以避免四段过于相似）：

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

## 六、账号注册与工具启用

> 这两个站点在你的网络环境下都**可以直连**（实测 elevenlabs.io 与 stableaudio.com 均返回 HTTP 200），不需要额外工具。

### 6.1 ElevenLabs（短音效主力）

**注册**

1. 浏览器打开 https://elevenlabs.io
2. 点右上角 **Sign up**
3. 用邮箱注册（QQ 邮箱可以），也可以直接用 Google 账号登录
4. 去邮箱点验证链接 —— ⚠️ **顺手看一眼垃圾邮件箱**，验证信常被拦
5. 不需要绑信用卡，免费额度注册即生效

**生成音效**

> ⚠️ **先选对平台**：ElevenLabs 目前把产品分成两个平台品牌 —— **ElevenCreative**（创作向：语音合成、配音、音乐、**音效**）和 **ElevenAgents**（对话式语音智能体）。**本项目要选 `ElevenCreative`**，`ElevenAgents` 是做语音机器人/客服对话的，与音效无关。

1. **最省事的入口：直接打开 https://elevenlabs.io/sound-effects**
   （登录状态下等价于 https://elevenlabs.io/app/sound-effects ，即 ElevenCreative → Playground → Sound Effects）
2. 如果是从首页导航进去：**ElevenCreative** → **Playground** → **Sound Effects**
3. 把 `docs/02` 第三节的提示词粘进输入框
4. 时长按提示词里写的秒数设；有 Prompt Influence 之类的强度参数保持默认
5. 点 **Generate**，结果列在下方，逐个试听
6. 满意的下载

**如果注册流程问了套餐**：选 **Free / 免费版**即可，不需要绑卡。

**参考**：中文官方文档 https://elevenlabs.io/docs/zh/eleven-creative/playground/sound-effects

**免费版限制（以页面实际显示为准）**

- 每月有一定 credits 额度，做这 12 条短音效是够的
- 免费版通常**要求署名（attribution）且不得商用** —— 课程作业属非商业用途，报告里注明工具名称即可
- ⚠️ **下载格式可能是 MP3**，见 6.3

### 6.2 Stable Audio（基底环境声）

**注册**

1. 打开 https://stableaudio.com
2. 用邮箱注册 Stability AI 账号并完成邮箱验证
3. 免费版每月有次数限制、单次时长有上限（约 45 秒），**具体数字以页面显示为准**，不要以本文为准

**生成**

1. 进入 Stable Audio 2.5 生成界面
2. ⚠️ **确认是音频/音效模式，不是音乐（Music）模式** —— 音乐模型会给你带节拍和旋律的东西，基底环境声用不了
3. 粘贴基底提示词，时长拉到最长（40–45 秒）
4. 生成后试听，重点听**后半段有没有变味**（见 3.1 的两种路线）

### 6.3 格式提醒（这条最容易被忽略）

免费版生成的音频常见是 **MP3 等有损格式**，而不是 WAV。

- 把 MP3 转成 48kHz/24bit stereo WAV，**容器格式能通过检查，但音质仍是被压缩过的**——24 bit 的壳子里装的是有损内容。
- 作业只规定导出格式，所以不影响判分；但**报告里应当如实写明这条链路**（生成 MP3 → 转码为 48k/24bit WAV）。这反而体现你对音频格式的理解，是加分的诚实陈述，不是减分项。
- 如果工具提供 WAV 下载选项，优先选 WAV。

### 6.4 如果注册或生成不顺利

作业明确允许"从各种现成的音效库素材包中搜索你需要的声音"，所以有退路：

| 备选 | 说明 |
| --- | --- |
| https://pixabay.com/sound-effects/ | 免费、多无需署名（命令行访问被 Cloudflare 拦，浏览器正常） |
| https://www.aigei.com | 中文站，音效资源丰富，**注意逐个看清素材的授权说明** |
| 自己手机录 | 极短的声音（如自行车铃）手机录一条往往比 AI 生成更靠谱 |

**混用完全允许**：基底用 AIGC，个别短音效取自音效库或实拍，作业并没有要求全部素材同源。反而"用不同手段解决不同问题"是可以在报告里讲清楚的设计判断。

---

## 七、采集清单（生成后逐项勾选）

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
