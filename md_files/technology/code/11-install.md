---
title: 无root权限安装软件
sidebar: true
# isShowComments: true
---

# 无root权限安装软件

<ClientOnly>
<title-pv/>
</ClientOnly>

## 源代码安装
1. 首先下载想安装的软件的源码
```
wget 你想下载的源码压缩包的链接
tar -xzf *.tar.gz
tar -xvf *.tar
```

2. 进入bin文件夹，执行以下命令
```
./configure --prefix=/home/yourname/software/bin
make
make install
```

3. 配置环境变量
```
vim ~/.bashrc
export PATH=$PATH:/home/yourname/software/bin
source ~/.bashrc
```
## deb安装

1. 首先下载想安装的软件的deb包
```
wget 你想下载的源码压缩包的链接
```
2. 安装软件包
```
dpkg -x *.deb /home/yourname/software
```
3. 将软件目录添加到环境变量，方法同上

<ClientOnly>
  <leave/>
</ClientOnly/>