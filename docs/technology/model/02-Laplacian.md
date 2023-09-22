---
title: GNN for node classification in cora dataset
sidebar: true
# isShowComments: true
---

# GNN for node classification in cora dataset

<ClientOnly>
<title-pv/>
</ClientOnly>


```python
# -*- coding: utf-8 -*-
"""Laplacian-2.ipynb"""

!pip3 install networkx

import os
import collections
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import scipy.sparse as sp
import torch
from torch import Tensor
import torch.nn.functional as F
import torch.optim.lr_scheduler as lr_scheduler
import networkx as nx

# 创建一个空的无向图，其中节点从1开始编号
G = nx.Graph(create_using=nx.DiGraph())

n = 8
# 添加节点和边
for i in range(n):
  G.add_edge(i, (i + 1)%n)

# 生成邻接矩阵
adj_matrix = nx.adjacency_matrix(G)

# 转换邻接矩阵为 NumPy 数组
adj = adj_matrix.toarray()

degree = torch.tensor([sum(i) for i in adj])
degree = torch.pow(degree, -0.5)
degree = torch.diag(degree)
unit_matrix = torch.eye(len(adj))

laplacian = unit_matrix - torch.mm(torch.mm(degree, torch.tensor(adj).float()), degree)
print(laplacian)

# 计算拉普拉斯矩阵的特征值和特征向量
eigenvalues, eigenvectors = np.linalg.eigh(laplacian.numpy())
eigenvectors = eigenvectors.T
print(eigenvalues)
print(eigenvectors)
# inverse_transformed = np.dot(eigenvectors, np.diag(eigenvalues)).dot(np.transpose(eigenvectors))
# mean = 0  # 均值
# std_deviation = 0.001  # 标准差，控制噪声的强度
# noise = np.random.normal(mean, std_deviation, eigenvectors.shape)
# noisy_eigenvectors = eigenvectors + noise
# inverse_transformed_noisy = np.dot(noisy_eigenvectors, np.diag(eigenvalues)).dot(np.transpose(noisy_eigenvectors))
# inverse_transformed = np.dot(eigenvectors, np.diag(eigenvalues)).dot(np.transpose(eigenvectors))

num_eigenvectors = eigenvectors.shape[0]
fig, axes = plt.subplots(num_eigenvectors, 1, figsize=(6, 2 * num_eigenvectors))

# 循环遍历特征向量矩阵的每一行并在不同的子图中绘制
for i in range(num_eigenvectors):
    axes[i].plot(eigenvectors[i, :])
    axes[i].set_title(f'Eigenvector {i+1} with eigenvalue {eigenvalues[i]}')
    axes[i].set_xlabel('Index')
    axes[i].set_ylabel('Value')
    x = np.arange(len(eigenvectors[i, :]))
    axes[i].set_xticks(x)

# 调整子图之间的间距
plt.tight_layout()

# 显示图形
plt.show()
```








<ClientOnly>
  <leave/>
</ClientOnly/>