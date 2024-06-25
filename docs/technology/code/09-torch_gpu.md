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

pytorch在load一个已经加载好的模型时，如果后来又修改了这个模型的代码然后通过state_dict加载参数，那有可能会导致显存清除不了的bug，最好不要以这种方式加载模型.

此外，如果显存不够用，并且确定不是由于显存未释放的bug导致的问题，可以使用torch.utils.checkpoint模块：
```python
import torch
import torch.nn as nn
import torch.utils.checkpoint as checkpoint

# 创建一个简单的模型
class MyModel(nn.Module):
    def __init__(self):
        super(MyModel, self).__init__()
        self.fc1 = nn.Linear(512, 256)
        self.fc2 = nn.Linear(256, 128)
        self.fc3 = nn.Linear(128, 10)

    def forward(self, x):
        x = checkpoint.checkpoint(self.fc1, x)  # 第一个计算块
        x = checkpoint.checkpoint(self.fc2, x)  # 第二个计算块
        x = self.fc3(x)  # 最后一个计算块
        return x

# 创建模型实例
model = MyModel()

# 创建输入数据
input_data = torch.randn(1, 512)

# 进行前向传播
output = model(input_data)


```

<ClientOnly>
  <leave/>
</ClientOnly/>