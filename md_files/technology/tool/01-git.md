---
title: Git学习笔记
sidebar: true
# isShowComments: true
---

# Git学习笔记

<ClientOnly>
<title-pv/>
</ClientOnly>


要查看当前登录到 Git 的账号，您可以使用以下 Git 命令查看全局配置中的用户信息：

```bash
git config --global user.name
git config --global user.email
```

这两个命令将显示当前全局配置中的用户名和电子邮件地址。这些信息通常与Git上的账号相关联。


::: 注意
这些命令将显示全局配置中的信息，这意味着它们用于您在计算机上的所有 Git 仓库。如果您希望查看特定仓库的配置，请进入该仓库的目录，并使用相同的命令，但不带 --global 标志，例如：
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


<ClientOnly>
  <leave/>
</ClientOnly/>