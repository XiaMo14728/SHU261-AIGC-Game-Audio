# Git 基础操作实践记录

> 对应作业要求第 1 条："注册 GitHub 账户，熟悉 Git 基础操作"
> 本文件用于记录本次作业中实际练习的 Git 操作与其作用。

---

## 1. 环境准备

| 方式 | 说明 |
| --- | --- |
| **GitHub Desktop** | 图形化客户端，自动附带 Git 运行时，适合初学者按阶段理解"工作区 → 暂存区 → 本地仓库 → 远程仓库"的流程 |
| **Git for Windows** | 命令行工具，提供完整的 Git 能力，推荐后续深入学习时使用 |

首次使用需要配置身份（这笔信息会写入每一次提交记录）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git config --global init.defaultBranch main
```

查看当前配置：

```bash
git config --global --list
```

---

## 2. 核心概念

| 概念 | 说明 |
| --- | --- |
| **工作区（Working Directory）** | 你正在编辑的文件目录 |
| **暂存区（Staging Area）** | 准备提交的改动清单，`git add` 把改动放进来 |
| **本地仓库（Local Repository）** | `.git` 目录，保存全部提交历史 |
| **远程仓库（Remote）** | GitHub 上的仓库，默认名为 `origin` |
| **分支（Branch）** | 独立的开发线，默认分支为 `main` |

一次完整的提交流程：**修改文件 → `git add` 暂存 → `git commit` 提交到本地 → `git push` 推送到远程**。

---

## 3. 仓库创建与关联

**方式一：GitHub 网页/Desktop 新建仓库后克隆到本地**

```bash
git clone https://github.com/<用户名>/SHU261-AIGC-Game-Audio.git
cd SHU261-AIGC-Game-Audio
```

**方式二：本地已有目录，反向创建并关联远程仓库**

```bash
git init                                  # 初始化本地仓库
git add .
git commit -m "docs: 添加 AIGC 游戏音频调研报告"
git branch -M main                        # 确保主分支名为 main
git remote add origin https://github.com/<用户名>/SHU261-AIGC-Game-Audio.git
git push -u origin main                   # -u 建立本地与远程分支的跟踪关系
```

> **要点**：创建仓库时必须选择 **Public（公开）**，这是本课程的硬性要求。

---

## 4. 日常操作命令

### 4.1 查看状态与差异

```bash
git status                  # 查看哪些文件被修改/暂存
git diff                    # 查看未暂存的具体改动内容
git diff --staged           # 查看已暂存的改动内容
```

### 4.2 暂存与提交

```bash
git add README.md                  # 暂存单个文件
git add docs/                      # 暂存整个目录
git add .                          # 暂存所有改动

git commit -m "docs: 完成 AIGC 游戏音频调研报告初稿"
git commit -am "fix: 修正报告中的来源链接"    # 跳过 add，直接提交已跟踪文件的改动
```

### 4.3 查看历史

```bash
git log --oneline --graph --all     # 图形化查看提交历史
git log -p docs/                    # 查看某目录的历史改动细节
```

### 4.4 推送到 GitHub

```bash
git push                            # 推送当前分支
git push -u origin main             # 首次推送并建立跟踪
```

### 4.5 撤销与回退

```bash
git restore README.md               # 丢弃工作区中未暂存的修改
git restore --staged README.md      # 把文件从暂存区撤出（保留改动）
git revert <commit-id>              # 生成一个反向提交来撤销某次提交（已推送时推荐）
```

> **注意**：`git reset --hard` 会永久丢弃未提交的改动，已推送到远程的分支上不要使用需要强推的改写历史操作。

---

## 5. 分支操作

```bash
git branch                          # 查看本地分支
git branch -a                       # 查看全部分支（含远程）
git switch -c feature/final-report  # 新建并切换到新分支
git switch main                     # 切回 main

git merge feature/final-report      # 把特性分支合并进当前分支
git branch -d feature/final-report  # 删除已合并的分支
```

**实践建议**：单个作业文档直接提交到 `main` 即可；涉及大改版（例如期末作业）时新建分支，改完再合并，可以保证 `main` 上始终有一个可提交的完整版本。

---

## 6. 忽略文件

在仓库根目录创建 `.gitignore`，把不需要纳入版本管理的文件排除：

```gitignore
# 系统文件
.DS_Store
Thumbs.db
desktop.ini

# 编辑器和 IDE
.vscode/
.idea/

# 临时文件
*.tmp
*.bak
~$*
```

已被跟踪的文件再加入 `.gitignore` 不会自动失效，需要先执行 `git rm --cached <文件>`。

---

## 7. 冲突处理

当本地与远程同时修改了同一处内容，`git push` 会被拒绝：

```bash
git pull                            # 先拉取远程改动
# 手动编辑冲突文件，删除 <<<<<<< ======= >>>>>>> 标记并保留正确内容
git add <冲突文件>
git commit -m "merge: 解决 README 冲突"
git push
```

---

## 8. 本次作业的提交记录规划

```bash
# 1. 初始化仓库
git init && git branch -M main

# 2. 首次提交：仓库说明与目录骨架
git add README.md .gitignore
git commit -m "chore: 初始化课程作业仓库结构"

# 3. 添加调研报告
git add docs/
git commit -m "docs: 添加《当下 AIGC 在游戏音频设计中的应用》调研报告"

# 4. 添加 Git 操作笔记与辅助材料
git add notes/ assets/
git commit -m "docs: 添加 Git 操作记录与素材目录说明"

# 5. 关联远程并推送
git remote add origin https://github.com/<用户名>/SHU261-AIGC-Game-Audio.git
git push -u origin main
```

**提交信息规范（Conventional Commits 简化版）**：`chore:` 杂项、`docs:` 文档、`fix:` 修复、`feat:` 新增内容。规范的提交信息能让历史记录本身成为一份可读的进度说明。

---

## 9. 常用命令速查

| 目的 | 命令 |
| --- | --- |
| 初始化仓库 | `git init` |
| 克隆仓库 | `git clone <url>` |
| 查看状态 | `git status` |
| 暂存改动 | `git add <文件>` |
| 提交 | `git commit -m "说明"` |
| 查看历史 | `git log --oneline` |
| 推送 | `git push` |
| 拉取 | `git pull` |
| 新建分支 | `git switch -c <分支名>` |
| 合并分支 | `git merge <分支名>` |
| 关联远程 | `git remote add origin <url>` |
| 撤销工作区改动 | `git restore <文件>` |
