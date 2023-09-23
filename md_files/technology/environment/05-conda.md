---
title: conda踩坑记录
sidebar: true
# isShowComments: true
---

# conda踩坑记录

<ClientOnly>
<title-pv/>
</ClientOnly>

## conda创建虚拟环境

```shell
conda create -y -n xxxx python=3.xx
conda activate xxxx # 或 source activate xxxx
```

虽然理论上来说，conda是环境分割的，但是很坑的一个地方是，有时候在conda环境内用的pip和主目录下的pip是一样的，而不是自己建立环境指定的pip，这时候如果用pip安装包需要这样解决：

```shell
# 使用 python -m pip install packName 代替 pip install packName
python -m pip install packName
```

但是还是有可能报错，这时候需要使用conda install pip再次下载pip

```shell
conda install pip
```

## conda清理缓存

```shell
conda clean -all -y
```

## conda换源



<ClientOnly>
  <leave/>
</ClientOnly/>