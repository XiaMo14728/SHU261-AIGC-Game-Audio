# 02 · 素材收集与 AIGC 提示词

> 对应作业要求第 3 条：通过各种方式收集声音素材（本条路线为 AIGC 生成）。

---

## 一、工具选型

作业明确允许"其他你能想到的办法或途径，比如 AIGC 工具"。本方案全部使用 AIGC 生成，工具分工如下：

| 用途 | 推荐工具 | 理由 | 备选 |
| --- | --- | --- | --- |
| **基底环境声**（长、连续、无音乐性） | **真实环境声素材库**（Pixabay / 爱给网）；备用：ElevenLabs 分段拼接 | 见 6.2 —— Stable Audio 注册受地区阻断；且长时环境声本就是 AIGC 最弱的环节 | ElevenLabs（单次时长有限，需拼 2–3 段） |
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

### 6.2 基底环境声：Stable Audio 不可用后的方案

> **结论先说**：Stable Audio（stability.ai / stableaudio.com）在你所在网络环境下**注册被阻断**（站点可连，但注册接口返回"访问被阻止"）。这是地区 IP 限制，不是操作问题，**不要在这上面继续花时间**。

基底环境声改用以下方案，按推荐顺序：

#### 方案 A（推荐）：基底取真实环境声素材

**为什么推荐这个** 而不是硬凑 AIGC：

1. 长时、连续、无音乐性的环境声，恰好是当前音频生成模型**最弱**的环节（短音效强、长环境弱）；
2. 真实录制的环境声自带空间感、房间感、微动态，这是 AI 生成最难还原的东西；
3. 作业明确允许「从各种现成的音效库素材包中搜索你需要的声音」；
4. "基底用真实素材、事件用 AIGC 生成"本身就是一个可以写进报告的设计判断 —— **不同性质的声音用不同手段**，比全程依赖一个工具有说服力。

**Pixabay Sound Effects（浏览器可正常访问）**

1. 打开 https://pixabay.com/sound-effects/
2. 搜索关键词建议：
   - `forest ambience`（树林环境）
   - `lake water birds`（湖畔与水鸟）
   - `park ambience morning`（清晨公园）
   - `wind trees`（风穿树）
3. 筛选时长：**越长越好，几分钟的完全可以**（选材标准见下）
4. Pixabay 的音频**免费且无需署名**（但报告里注明来源仍更稳妥，见 6.3）
5. 下载后是 MP3，需要转成 48kHz/24bit stereo WAV（见 6.3 的格式说明）

**选材标准（为什么几分钟的更好）**

我们最终只需要一条 **40 秒**的成品，但**源素材越长越好**，原因有三：

1. **有得挑**。5 分钟的素材里总能找到一段"能量稳定、没有突发事件"的 40–60 秒；30 秒的素材你几乎没得挑，中间插进一声鸟叫或一阵车流就只能硬着头皮用。
2. **更容易找到自然的重合点**。循环做得好不好，取决于能不能从素材里找到首尾能量接近的两处。素材越长，这种"天然接缝"越容易碰到，甚至可以找到本身就在循环的一段。
3. **容错高**。剪辑时发现选段不理想，可以换个位置重来，不必重新下载。

**要避开的素材类型**

| 避开 | 原因 | 怎么识别 |
| --- | --- | --- |
| **合集 / 混剪型** | 几十秒换一个场景，根本不是同一条连续声场 | 看波形：有明显分隔或反复起落 |
| 含人声对话的 | 人声会抢走注意力，且循环时格外明显 | 试听时听到说话、喊叫、广播 |
| 含明显突发事件的 | 一声狗叫或汽车喇叭会让 40 秒里出现一个固定"钉子" | 波形上孤立的高尖峰 |
| 采样率极低的 | 转成 48kHz 也补不回信息 | 看页面标注，或下载后看文件属性 |

**判断一段素材能不能做基底的三个检查**

1. **能量稳定**：波形整体厚度均匀，没有大幅度的忽高忽低；
2. **无孤立事件**：没有单个比周围高出很多的尖峰（人声、喇叭、鸟的近距离叫声）；
3. **频谱稳定**：Reaper 里挂个频谱图扫一遍，高、中、低频的分布全程别大变样。

---

#### 基底里能不能有鸟叫？

**先纠正一个理解**：基底的选择标准**不是"是不是树林的声音"**，而是——**"听不出具体事件"**。

基底的任务是让空间"存在"，事件的任务才是让事情"发生"。一旦基底里出现容易被记住的离散事件，就会出三个问题：

1. **和 3D 事件层打架**。本项目把鸟叫设计成 **3D 随机触发的事件**（`sfx_bird_chirp_01~03`）。如果基底里已经有一堆鸟叫，玩家会同时听到"全方位环绕、无方位"的基底鸟叫和"从树林某处传来"的事件鸟叫——两套鸟叫互相冲突，精心做出来的方位感直接失效。
2. **循环立刻暴露**。40 秒的基底要循环播放，里面任何有辨识度的声音都会**周期性重现**。同一只鸟每隔 40 秒叫一次，听三遍就听出来了，整个环境声的"真实感"崩掉。
3. **掩蔽与动态范围**。鸟叫是宽频瞬态，会在基底里占掉动态范围，基底因此不敢开大声；而且它还会掩蔽事件层真正的鸟叫，让 3D 定位听不清。

**分级判断表**

| 素材里的鸟叫 | 能不能留 | 理由 |
| --- | --- | --- |
| 极远、模糊、混成一片的鸟群底噪 | ✅ **可以**，甚至是加分项 | 听不出个体，只提供"有生命"的空气感 |
| 稀疏、低电平、几乎听不出的单声 | 🔶 勉强可以 | 前提是循环三遍后你不会预期它出现 |
| 清晰、近距离、能听出是什么鸟 | ❌ **不要** | 典型"钉子"，循环必暴露，且与事件层冲突 |
| 同一种鸟反复规律地叫 | ❌ **不要** | 循环暴露最严重的情况 |

**最可靠的实操判据**

把素材音量降到**最终使用电平**（峰值 -6 dBFS 或更低），连续听**三遍**，然后问自己一句：

> **"我能不能预期某一个声音什么时候出现？"**

能预期 → 那个声音就是钉子，要么剪掉，要么换素材。
完全预期不到、只感觉"一直有鸟味儿" → 可以留。

---

#### 如果找到的素材都有明显鸟叫，怎么办

按推荐顺序：

**方案 1：换个搜索思路，找"无鸟"的基底**

带上排除性关键词，或者干脆换声音主体：

- `wind through trees`（纯风穿树，通常无鸟）
- `lake shore ambience` / `water lapping shore`（水岸，你的场景本来就需要水声）
- `forest wind ambience no birds`
- `rain forest ambience`（雨声会自然掩蔽鸟叫）
- `distant birds forest ambience`（明确要"远处的鸟"）

**方案 2：把鸟叫拆出来用（推荐，不浪费素材）**

用一条带鸟叫的素材，**拆成两部分**：

- 有鸟叫的段落 → 剪成 `sfx_bird_chirp_01~03.wav`（作业本来就要求 3 个鸟鸣变体！）
- 无鸟叫的平稳段落 → 拼起来做基底

一份素材办两件事，还顺便解决了"鸟鸣变体从哪来"的问题。

**方案 3：剪掉含鸟叫的段落**

如果素材里鸟叫只出现在局部（比如第 20–40 秒），把前后干净的部分各截一段接起来做基底，接缝照样用 `docs/03` 的交叉淡化处理。

**方案 4：调整设计，接受基底里有鸟**

把 3D 事件的鸟鸣换成别的声音（增加水鸟、风声、铃声的权重），避免与基底重复。**但要注意**：基底里的鸟叫仍然会随 40 秒循环周期性出现，这一条躲不掉，只是不再与事件层冲突。属于下策。


> **文件大小不用担心**：Pixabay 给的是 MP3（通常几 MB），源素材再长都不影响仓库。最终导出的 40 秒 WAV 约 **11 MB**（48000 × 3 字节 × 2 声道 × 40 秒），远低于 GitHub 的单文件上限。**但只提交导出的成品，源素材放仓库外。**

**爱给网（aigei.com）** 也可作为补充，中文资源丰富，但**要逐个看清每个素材的授权说明**（部分需要会员授权才能商用；课程作业属非商业用途，但仍应如实记录）。

#### 方案 B（备用）：全用 ElevenLabs

ElevenLabs 的 Sound Effects 单次生成时长有限（约 20 秒级），做 40 秒基底需要**生成 2–3 段再拼接**（拼接方法见 `docs/03` 第 2 节）。可行，但环境声类提示词在"音效"模型上效果通常会偏"事件感"而不是"环境感"，需要多抽几次。

#### 方案 C（不推荐）：国内音乐类 AIGC

Suno、海螺 AI、网易天音等在国内可访问，但它们本质是**音乐生成模型**，产出会带明显的调性、节拍或和声铺底，**不符合环境声"无音乐性"的要求**。仅当你确实想加一层氛围垫底时才考虑。

> ⚠️ **不建议**为了访问被区域限制的服务去寻找绕过手段。方案 A 完全能满足作业要求，而且质量更高。

### 6.3 格式提醒（这条最容易被忽略）

免费版生成的音频常见是 **MP3 等有损格式**，而不是 WAV。

- 把 MP3 转成 48kHz/24bit stereo WAV，**容器格式能通过检查，但音质仍是被压缩过的**——24 bit 的壳子里装的是有损内容。
- 作业只规定导出格式，所以不影响判分；但**报告里应当如实写明这条链路**（生成 MP3 → 转码为 48k/24bit WAV）。这反而体现你对音频格式的理解，是加分的诚实陈述，不是减分项。
- 如果工具提供 WAV 下载选项，优先选 WAV。

### 6.4 其他可用源与「素材来源记录表」

除 Pixabay、爱给网之外，还可以考虑：

| 源 | 说明 | 实测可访问性 |
| --- | --- | --- |
| https://pixabay.com/sound-effects/ | 免费、多无需署名，环境声类素材体量大 | ✅ 浏览器正常 |
| https://www.aigei.com | 中文站，资源丰富，**逐个看清授权** | ✅ 浏览器正常 |
| https://soundbible.com | 免费短音效，库偏小 | ✅ 可访问 |
| 自己手机录 | 极短的声音（如自行车铃）手机录一条往往比 AI 生成更靠谱 | — |
| ~~淘声网 / 耳聆网~~ | — | ❌ 源站 521 故障 |
| ~~BBC Sound Effects~~ | — | ❌ TLS 连接被阻断 |

**混用完全允许**，而且往往是最优解：基底用真实环境声素材、事件用 AIGC 生成、个别极短声音自己录 —— 作业并没有要求全部素材同源。反过来，"针对不同性质的声音选不同手段"本身就是可以在报告里讲清楚的设计判断。

#### 素材来源记录表（报告要用，逐个填）

作业与报告都需要说清素材从哪来。建议边做边填，别到最后回忆：

| 编号 | 文件名 | 来源类型 | 具体来源（工具/网站） | URL 或提示词位置 | 授权/说明 |
| --- | --- | --- | --- | --- | --- |
| AMB-01 | `amb_parklake_loop_01.wav` | ⬜ 音效库 / AIGC / 自录 | | | |
| SFX-01a~c | `sfx_bird_chirp_0x.wav` | | ElevenLabs | 见 3.2 提示词 | 免费版，非商业用途 |
| SFX-02a~c | `sfx_water_bird_splash_0x.wav` | | | 见 3.3 提示词 | |
| SFX-03a~c | `sfx_leaves_gust_0x.wav` | | | 见 3.4 提示词 | |
| SFX-04a~c | `sfx_bicycle_bell_0x.wav` | | | 见 3.5 提示词 | |

---

## 七、采集清单（生成后逐项勾选）

| 编号 | 文件名 | 状态 | 生成次数 | 选中的那次备注 |
| --- | --- | --- | --- | --- |
| AMB-01 | `amb_parklake_loop_01.wav` | ⬜ | | 库素材裁剪（首选）或 ElevenLabs 拼 2–3 段 |
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
