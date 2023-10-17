---
title: PyTorch GPU使用踩坑记录
sidebar: true
# isShowComments: true
---

# PyTorch GPU使用踩坑记录

<ClientOnly>
<title-pv/>
</ClientOnly>

## 下载GPU监视工具

```shell
pip install nvitop
```

pytorch在load一个已经加载好的模型时，如果后来又修改了这个模型的代码然后通过state_dict加载参数，那有可能会导致显存清除不了的bug，最好不要以这种方式加载模型

<ClientOnly>
  <leave/>
</ClientOnly/>