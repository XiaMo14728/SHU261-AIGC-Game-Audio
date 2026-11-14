# SHU261 基础实践 · 期末作业 Final

> **主题**：环境声设计（Environmental Sound Design）
> **场景**：城市公园湖畔步道 · 清晨
> **技术路线**：AIGC 生成素材 → Reaper 剪辑导出 → Wwise 工程实现

---

## 作业要求对照表

| # | 要求 | 状态 | 对应文件/位置 |
| --- | --- | --- | --- |
| 1 | 确定场景，准备照片/图片 + 文字说明 | 🔶 文档已就绪，照片待补 | `docs/01-场景分析与说明.md`、`images/` |
| 2 | 分析场景，明确素材需求（≥1 种基底持续声 + ≥1 种间断短声） | ✅ | `docs/01-场景分析与说明.md` |
| 3 | 收集素材（录音 / 音效库 / AIGC） | ⬜ 待生成 | `docs/02-素材收集与AIGC提示词.md` |
| 4 | DAW 剪辑导出：≥1 个 >30s 基底（48kHz/24bit/stereo WAV） | ⬜ | `docs/03-Reaper剪辑与导出.md` |
| 5 | DAW 剪辑导出：≥3 个间断随机声（同上格式） | ⬜ | `assets/audio/` |
| 6 | 注册 Audiokinetic 账号，安装 Launcher 与 **Wwise 2025.1.11.9262** | ⬜ 待安装 | `docs/04-Wwise工程配置.md` |
| 7 | 新建 Wwise 工程，**工程名不含中文** | ⬜ | `WwiseProject/` |
| 8 | 正确配置 `.gitignore`，排除无关/非必要文件 | 🔶 基线已写，待建工程后校准 | `WwiseProject/.gitignore` |
| 9 | 导入基底环境声，设置参数使其持续循环 | ⬜ | `docs/04-Wwise工程配置.md` |
| 10 | 导入间断随机声，用 Random Container 随机触发 | ⬜ | `docs/04-Wwise工程配置.md` |
| 11 | 设置随机声 Positioning，随距离变化 | ⬜ | `docs/04-Wwise工程配置.md` |
| 12 | Soundcaster Session 预览测试 | ⬜ | `docs/04-Wwise工程配置.md` |
| 13 | 上传 GitHub + 邮件发链接 | ⬜ | 本目录 |
| 14 | 期末报告 PDF 上传至智慧实习实训管理平台 | ⬜ | `docs/05-期末报告.md` → PDF |

---

## 目录结构

```
final/
├── README.md                          # 本文件：要求对照与进度
├── docs/
│   ├── 01-场景分析与说明.md            # 场景文字说明 + 声景分层 + 素材需求
│   ├── 02-素材收集与AIGC提示词.md      # AIGC 工具选择、逐条提示词、采集规范
│   ├── 03-Reaper剪辑与导出.md          # 剪辑流程、循环点处理、导出参数
│   ├── 04-Wwise工程配置.md             # 安装、导入、循环、Random、Positioning、Soundcaster
│   └── 05-期末报告.md                  # 报告正文（用于导出 PDF）
├── assets/audio/                      # 导出的声音资产（48kHz/24bit/stereo WAV）
├── images/                            # 场景照片/图片
└── WwiseProject/                      # Wwise 工程（工程名：ParkLakeAmbience）
    └── .gitignore                     # Wwise 工程忽略规则
```

---

## 硬性技术规范（评分点，别踩）

| 项目 | 规范 |
| --- | --- |
| 音频格式 | **48 kHz / 24 bit / stereo `.wav`**（三者缺一不可） |
| 基底环境声 | 时长 **> 30 秒**，且能**无缝循环** |
| 间断随机声 | **至少 3 个**资产，可随机触发 |
| Wwise 版本 | **2025.1.11.9262**（统一起见，不要用别的版本） |
| Wwise 工程名 | **不能用中文**（本项目用 `ParkLakeAmbience`） |
| 提交格式 | 邮件标题 `SHU261基础实践_Final_学号_姓名`；报告用 PDF |

---

## 工具链

| 工具 | 版本/来源 | 状态 |
| --- | --- | --- |
| Reaper | 7.86 x64（Cockos 官方签名，已验证） | ✅ 安装包已下载：`~/Downloads/reaper786_x64-install.exe` |
| Audiokinetic Launcher | 官网注册后下载 | ⬜ 需在浏览器操作 |
| Wwise | 2025.1.11.9262（Launcher 内选择版本） | ⬜ |
| AIGC 音效工具 | ElevenLabs（ElevenCreative → Sound Effects） | ✅ 站点可直连，账号待注册 |
| 基底环境声来源 | Pixabay Sound Effects / 爱给网 / ElevenLabs 拼接 | ⬜ Stable Audio 注册受地区阻断，已改用此路线 |

---

## 进度记录

- [x] 确定场景与素材需求，写出场景说明
- [x] 定好资产命名规范与导出参数
- [ ] 生成/收集素材
- [ ] Reaper 剪辑导出
- [ ] 安装 Wwise 并建工程
- [ ] 配置 Loop / Random / Positioning / Soundcaster
- [ ] 推送仓库 + 发邮件 + 传 PDF
