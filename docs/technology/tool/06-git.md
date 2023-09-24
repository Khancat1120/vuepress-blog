---
title: Git学习笔记
sidebar: true
# isShowComments: true
---

# Git学习笔记

<ClientOnly>
<title-pv/>
</ClientOnly>

## 登录

要查看当前登录到 Git 的账号，可以使用以下 Git 命令查看全局配置中的用户信息：

```bash
git config --global user.name
git config --global user.email
```

这两个命令将显示当前全局配置中的用户名和电子邮件地址。这些信息通常与Git上的账号相关联。


::: 注意

这些命令将显示全局配置中的信息，这意味着它们用于在计算机上的所有 Git 仓库。如果您希望查看特定仓库的配置，请进入该仓库的目录，并使用相同的命令，但不带 --global 标志，例如：
```bash
cd /path/to/your/repository
git config user.name
git config user.email
```
:::

在git切换登录账号时，通常会出现用户凭据问题，解决办法：
```bash
git credential reject
```

## 分支

在Git中，分支（Branch）是用来管理和跟踪代码开发的一个重要概念。分支实际上是代码库的不同版本或线路的副本，每个分支都可以独立地进行修改和开发，而不会影响其他分支。这允许团队协同开发，同时保持代码的稳定性和版本控制。以下是Git中不同分支的一些常见含义：

* 主分支（Main/Branch）：主分支通常被称为main或master，是代码库的默认分支。它包含了项目的稳定版本，通常是生产环境中正在运行的代码。新功能通常不会直接添加到主分支，而是在其他分支上进行开发和测试，然后合并到主分支中。

* 特性分支（Feature Branch）：特性分支是为了开发新功能或修复Bug而创建的分支。每个特性分支通常对应一个特定的任务或问题，开发完成后，可以将特性分支合并回主分支。

* 发布分支（Release Branch）：发布分支用于准备发布新版本的代码。在发布前，可以在发布分支上进行最后的测试、修复bug和文档更新。一旦准备就绪，发布分支通常会合并回主分支，然后发布到生产环境。

* 热修复分支（Hotfix Branch）：热修复分支用于紧急修复生产环境中的严重Bug，而不需要等待下一个正式发布。修复完成后，热修复分支会合并回主分支和适用的发布分支。

### 创建分支：

要创建一个新的分支，可以使用以下命令：

```bash
git branch <branch-name>
```
例如，创建一个名为"feature-xyz"的特性分支：
```bash
git branch feature-xyz
```
2. 切换分支：

要切换到一个分支，可以使用以下命令：

```bash
git checkout <branch-name>
```
或者使用Git 2.23及更高版本的更现代的切换方式：

```bash
git switch <branch-name>
```
例如，切换到"feature-xyz"分支：

```bash
git checkout feature-xyz
```
或：
```bash
git switch feature-xyz
```
3. 合并分支：

要将一个分支的更改合并到另一个分支，可以使用以下命令：

```bash
git merge <branch-name>
```
例如，将"feature-xyz"分支的更改合并到主分支：

```bash
git checkout main  # 切换回主分支
git merge feature-xyz
```
当你要合并两个分支时，如果这两个分支之间存在代码差异，Git会尝试自动合并这些差异。这个过程中可能会发生冲突（conflicts），因为Git无法确定应该保留哪个版本的代码。当出现冲突时，需要手动解决这些冲突。

4. 删除分支：

要删除一个分支，可以使用以下命令：

```bash
git branch -d <branch-name>
```
例如，删除"feature-xyz"分支：

```bash
git branch -d feature-xyz
```
这些是Git分支的基本操作示例。请注意，分支操作可能会影响代码库的历史，因此在执行合并或删除分支操作之前，请确保您了解其影响，并在需要时进行适当的备份和测试。此外，使用合并请求或拉取请求来协作开发，以确保团队成员可以审查和讨论更改。


<ClientOnly>
  <leave/>
</ClientOnly/>