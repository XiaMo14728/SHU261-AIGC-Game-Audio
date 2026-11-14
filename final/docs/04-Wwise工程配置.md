# 04 · Wwise 工程配置

> 对应作业要求第 5–7 条：安装 Wwise、新建工程、导入资产并配置循环 / 随机 / 定位。

> ⚠️ **关于界面路径**：本文按 Wwise 2025.1 的常规界面组织方式编写。Wwise 每个版本会有细微调整，**具体菜单位置请以官方教程为准**：
> https://www.audiokinetic.com/zh/learning/learn-wwise/wwise-fundamentals
> 本文的作用是告诉你"要设哪些参数、为什么这么设"，而不是替代官方教程。

---

## 一、安装

### 1.1 注册账号并下载 Launcher

1. 打开 https://www.audiokinetic.com/
2. 注册 Audiokinetic 账号（用你的学校邮箱或个人邮箱均可）
3. 登录后进入下载页，下载 **Audiokinetic Launcher** 的 Windows 版
4. 运行安装包，装完启动 Launcher，用刚注册的账号登录

> Launcher 只能从官网下载，且需要登录。它下载的是**安装器**，Wwise 本体是通过 Launcher 再装的。

### 1.2 安装 Wwise 2025.1.11.9262

1. Launcher 首页会列出可安装的 Wwise 版本
2. **手动找到并选择 `2025.1.11.9262`** —— 作业明确要求统一用这个版本，不要装默认推荐的最新版
3. 安装时建议只勾选需要的组件，节省空间：
   - ✅ **Authoring**（必须，设计工具本体）
   - ⬜ SDK / Integration（本次作业不需要）
   - ⬜ 其他示例工程可取消
4. 安装完成后在 Launcher 的 `Projects` 页可以直接新建工程

---

## 二、新建工程

| 项目 | 值 |
| --- | --- |
| **工程名 (Project Name)** | `ParkLakeAmbience` ← **不能含中文** |
| **位置 (Location)** | `C:\Users\<你的用户名>\Downloads\SHU261-AIGC-Game-Audio\final\WwiseProject` |
| 平台 (Platforms) | Windows（只勾这一个就够） |
| 初始 Work Unit | Default Work Unit |

建完后目录大致是这样：

```
final/WwiseProject/
├── .gitignore                    ← 已提前放好
├── ParkLakeAmbience.wwu          ← 工程主文件（XML，要提交）
├── Originals/                    ← 导入的音频源文件（要提交）
├── .cache/                       ← 缓存（已忽略）
└── GeneratedSoundBanks/          ← 生成的 SoundBank（已忽略）
```

> **可能的情况**：有些版本的 Launcher 会在 Location 下再建一层同名文件夹，变成
> `final/WwiseProject/ParkLakeAmbience/ParkLakeAmbience.wwu`。
> 如果是这样，把 `.gitignore` 移到那一层即可。**建好后告诉我实际的目录结构，我来校准 `.gitignore`。**

### 2.1 配置 .gitignore（作业明确要求）

`.gitignore` 已经写在 `final/WwiseProject/` 里了。工程建好、打开一次之后，执行：

```powershell
$git = "$env:USERPROFILE\Downloads\tools\MinGit\cmd\git.exe"
$repo = "$env:USERPROFILE\Downloads\SHU261-AIGC-Game-Audio"
& $git -C $repo status --short
```

检查输出里有没有**未被忽略的生成物**（体积大、不像人写的东西）。如果有，补进 `.gitignore`。

验证忽略规则是否生效：

```powershell
& $git -C $repo check-ignore -v "final/WwiseProject/.cache"
& $git -C $repo check-ignore -v "final/WwiseProject/GeneratedSoundBanks"
```

能输出匹配规则就说明生效了。

---

## 三、导入声音资产

1. 确认 `final/tools/check-wav.js` 全绿（13 个文件都符合 48k/24bit/stereo）
2. Wwise → `Project Explorer (工程浏览器)` → `Actor-Mixer Hierarchy` → `Default Work Unit`
3. 右键 → **Import Audio Files…**（或直接把 `final/assets/audio/` 里的文件拖进 Project Explorer）
4. 导入对话框中：
   - 全选 13 个文件
   - 目标容器选 `Actor-Mixer Hierarchy` → `Default Work Unit`
   - 导入方式选 **Sound SFX**
5. 确认导入后，在 Actor-Mixer Hierarchy 里能看到 13 个 Sound SFX 对象

**整理建议**：右键 Default Work Unit → New Child → **Virtual Folder**，建两个文件夹：

```
Default Work Unit
├── Ambience          ← 放 amb_parklake_loop_01
└── SFX               ← 放 12 个 sfx_*
    ├── Bird          ← 3 个鸟鸣
    ├── WaterBird
    ├── Leaves
    └── Bell
```

层级清楚，报告里的截图也好看。

---

## 四、基底环境声：持续循环

**目标**：`amb_parklake_loop_01` 被播放时永不停止，一直铺底。

1. 选中 `amb_parklake_loop_01` 这个 Sound SFX
2. 打开 `Property Editor (属性编辑器)`
3. 在 **General Settings** 里找到 **Loop** 选项，**勾选**
   - 勾上之后这个声音会无限循环播放
4. 顺便检查三个容易出问题的属性：
   - `Loop` 勾上了，但父级如果 override 了同名属性，子级的设置可能不生效 —— 确认属性框里该选项**没有被标记为从父级继承**（灰色/O 标记）
   - `Playback Limit` 建议保持默认 1（基底只该有一路）
   - `Virtual Voice` 行为保持默认

**为什么基底必须是 2D**：基底是"包围听者"的环境，不应该有方位。所以**不要把基底设成 3D**——它默认就是 2D（不参与定位），这正是我们要的。不要给它加 Attenuation。

---

## 五、间断随机声：Random Container 随机触发

**目标**：每类随机声在每次触发时随机挑一个变体，且避免连续重复听起来一样。

对 4 类各建一个 Random Container：

1. `Actor-Mixer Hierarchy` → 右键 `SFX\Bird` → **New Child → Container → Random Container**
2. 命名为 `RC_BirdChirp`
3. 把 3 个鸟鸣 Sound SFX **拖进**这个容器
4. 选中容器，在 Property Editor 里设置：
   - **Random Type**：`Standard`（纯随机）或 `Shuffle`（洗牌，避免重复更彻底）
   - 若有 **Avoid Repeating Last** / 避免上一条重复 的选项，**勾选**
   - 三个子对象的 `Weight` 保持 1（等概率）

最终结构：

```
SFX
├── RC_BirdChirp        (Random Container，内含 3 个鸟鸣)
├── RC_WaterBird        (Random Container，内含 3 个水鸟)
├── RC_LeavesGust       (Random Container，内含 3 个阵风)
└── RC_BicycleBell      (Random Container，内含 3 个铃声)
```

> 每类只有 3 个变体，**洗牌模式**比纯随机更能避免"刚响过又响一遍"的廉价感。

---

## 六、随机声的 Positioning：随距离变化

**目标**：随机声有明确方位，玩家靠近变响、走远变弱。

1. 选中某个 Random Container（如 `RC_BirdChirp`）→ 打开 **Positioning (定位)** 面板
2. **开启 3D**：在 Positioning 里选择 3D 定位方式（通常是 `Speaker Panning with Height` 或 `3D Spatialization` 相关选项，2025.1 默认即支持 3D 定位，关键是**不要选 2D**）
3. **绑定 Attenuation（衰减）**：
   - 在 Attenuation 属性处点 `>>` → 新建一个 ShareSet，命名 `ATT_Park_3D`
   - 编辑衰减曲线：`Max Distance` 设 **50**（米），曲线类型选 **Logarithmic（对数）**
   - 这样：听者在 0–5 米内几乎满音量，10 米开始明显衰减，50 米以后听不见
4. **给四个 Random Container 都绑定同一个 `ATT_Park_3D`**，保持空间感一致

### 关键区分（评分点，别搞混）

| 对象 | 定位 | Attenuation | 理由 |
| --- | --- | --- | --- |
| `amb_parklake_loop_01` | **2D** | **不绑定** | 基底是包围感，不该有方位 |
| 4 个 Random Container | **3D** | 绑定 `ATT_Park_3D` | 事件是"从某处传来"，需要方位与距离 |

这个区分本身就是设计意图的体现，报告里要写清楚。

---

## 七、Soundcaster Session 预览测试

1. 打开 **Soundcaster**（Window 菜单 → Soundcaster，或新建一个 Soundcaster Session）
2. 把 1 个基底的 Play Action + 4 个 Random Container 各建一个 Play Action，拖进 Soundcaster 的模块槽
3. 点播放按钮逐个试听：
   - **基底**：确认循环播放时**听不出接缝**，能一直播下去
   - **随机声**：反复点同一个 Play Action，确认每次都换一个变体（随机生效）
4. **测试距离变化**：打开 **Game Object 3D Viewer**，拖动 Game Object 与 Listener 的距离，听随机声的音量变化
5. 有条件的话录一段预览（OBS 或手机拍屏幕），放到 `assets/` 里作为佐证

### 截图清单（报告要用，至少 5 张）

| 编号 | 截图内容 | 文件名 |
| --- | --- | --- |
| 1 | Actor-Mixer Hierarchy 完整层级 | `shot_01_hierarchy.png` |
| 2 | 基底的 Loop 属性已勾选 | `shot_02_loop_property.png` |
| 3 | Random Container 的容器设置 | `shot_03_random_container.png` |
| 4 | Attenuation 曲线（含 Max Distance） | `shot_04_attenuation.png` |
| 5 | Soundcaster 中有播放中的模块 | `shot_05_soundcaster.png` |

---

## 八、生成 SoundBank（可选但建议）

1. 菜单 `Project → Generate SoundBanks…`
2. 勾选要包含的 Event，生成 Windows 平台
3. 生成成功后在 `GeneratedSoundBanks/` 下能看到 `.bnk`
4. **这个目录已被 `.gitignore` 忽略**，不要提交

生成一次能证明工程是完整可用的，比只截图更有说服力。

---

## 九、常见问题

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| 基底循环处有"跳" | 导出时首尾不连续 | 回 Reaper 的 `docs/03` 2.3 重做尾巴叠头 |
| 基底只能播一次 | Loop 没勾，或被父级 override | 检查属性框的继承标记 |
| 随机声每次都一样 | Random Container 没生效 / 只有一个子对象 | 确认 3 个变体都拖进容器了 |
| 随机声没有方位感 | 仍在 2D 定位 | Positioning 里开 3D |
| 距离变化不明显 | 没绑 Attenuation 或 Max Distance 太大 | 绑定 `ATT_Park_3D`，Max Distance 设 50 |
| 导入后声音变小 | 源文件电平被 Normalize 得太低 | Reaper 里峰值做到 -3 ~ -6 dBFS |
| `git status` 出现一堆二进制 | `.gitignore` 没生效 | 用 `check-ignore` 验证，注意 `.cache/` 末尾斜杠 |

---

## 十、这一步的交付物

- [ ] Audiokinetic 账号已注册，Wwise **2025.1.11.9262** 已安装
- [ ] 工程 `ParkLakeAmbience` 建在 `final/WwiseProject/`
- [ ] `.gitignore` 生效（`check-ignore` 能匹配）
- [ ] 13 个资产已导入并归好类
- [ ] 基底勾选 Loop，循环无缝
- [ ] 4 个 Random Container，随机生效
- [ ] 4 个容器均开启 3D + 绑定 `ATT_Park_3D`
- [ ] Soundcaster 测试通过 + 5 张截图
- [ ] SoundBank 至少成功生成过一次
