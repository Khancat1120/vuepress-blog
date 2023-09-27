---
title: DGL踩坑记录
sidebar: true
# isShowComments: true
---

# DGL踩坑记录

<ClientOnly>
<title-pv/>
</ClientOnly>

DGL（Deep Graph Library）是一个很方便的用于处理图数据和图神经网络（GNN）的开源Python工具库，它提供了用于构建、分析和操作各种类型的图结构的工具和函数，结合numpy，pandas，torch_geometric等等使用可以事半功倍。DGL和networkx比较像，但不像networkx那样着重于网络分析。不过其中不乏一些鬼才设计容易让初学者陷入困惑，特此写下踩坑记录。

## 图的创建
### 同质图

1. 通过torch张量创建

```python
import dgl
import numpy as np
# 使用NumPy数组创建同质图
graph = dgl.graph((np.array([0, 1, 2, 0]), np.array([1, 2, 3, 0])))

# 创建同质图
G = dgl.graph(edge_dict)
# Graph(num_nodes=4, num_edges=4,
#       ndata_schemes={}
#       edata_schemes={})

```

需要注意的一些地方是，dgl要求节点必须是连续的，也就是说如果你空降编号999，而4到998都是没定义过边的，也是默认你拥有这些点，如果在图中有没有边链接的点，需要通过graph函数的num_nodes属性指定有多少单点。

```python
# 使用NumPy数组创建同质图
graph = dgl.graph((np.array([0, 1, 2, 0, 999]), np.array([1, 2, 3, 0, 0])))

# 创建同质图
G = dgl.graph(edge_dict)
# Graph(num_nodes=1000, num_edges=5,
#       ndata_schemes={}
#       edata_schemes={})
```

在dgl的图中，所有边都是有向的，如果要创建无向图，需要创建双向边或直接使用无向图创建函数

```python
src, dst = torch.tensor([0,0,0,1]), torch.tensor([1,2,3,3])
u = torch.cat((src,dst))
v = torch.cat((dst,src))
#或
bg = dgl.to_bidirected(g)
```

2. 一条一条创建

添加节点：
```python
# 添加一个节点
graph.add_nodes(1)  # 添加一个节点，节点编号从0开始

# 添加多个节点
num_nodes = 5
graph.add_nodes(num_nodes)  # 添加5个节点，节点编号从0到4
```

添加边：
```python
# 添加一条边，连接节点0和节点1
graph.add_edge(0, 1)

# 添加多条边，可以使用列表指定要连接的边
src_list = [0, 1, 2]
dst_list = [3, 4, 0]
graph.add_edges(src_list, dst_list)

# 添加有向边，使用边的类型
src_list = [0, 1, 2]
dst_list = [3, 4, 0]
graph.add_edges(src_list, dst_list, etype='directed')  # 指定边的类型为'directed'
```
### 特征

```python
"建图"
g = dgl.graph(([0, 0, 1, 5], [1, 2, 2, 0])) # 6 nodes, 4 edges

"指定特征"
g.ndata['x'] = torch.ones(g.num_nodes(), 3)
g.ndata['y'] = torch.randn(g.num_nodes(), 5) # 不同名字可以有不同的特征
g.edata['x'] = torch.ones(g.num_edges(), dtype=torch.int32)

"查看特征"
print(g.ndata) # 输出dict  {'x':tensor, 'y':tensor}
print(g.edata) # {'x': tensor([1, 1, 1, 1], dtype=torch.int32)}

print(g.ndata['x'][1]) # tensor([1., 1., 1.])
print(g.edata['x'][torch.tensor([0, 3])])  # 查看第0和3号的特征
# tensor([1, 1], dtype=torch.int32)
```

::: tip 注意事项
* 只有数字类型可以做特征（e.g., float, double, and int），特征可以是标量，向量，矩阵或多维张量
* 点特征之间，边特征之间名字要不同，但点特征与边特征之间名字可以相同
* 无法给点/边的子集设置特征，特征tensor的最高维必须等于点/边数
* 特征张量是row-major的，即每一行是一个点/边的特征
:::

对于有权图，可将权值作为图的边特征存储
```python
# edges 0->1, 0->2, 0->3, 1->3
edges = th.tensor([0, 0, 0, 1]), th.tensor([1, 2, 3, 3])
weights = th.tensor([0.1, 0.6, 0.9, 0.7]) # weight of each edge
g = dgl.graph(edges)
g.edata['w'] = weights
print(g)
# Graph(num_nodes=4, num_edges=4,
#      ndata_schemes={}
#      edata_schemes={'w' : Scheme(shape=(,), dtype=torch.float32)})
```


### 异质图

dgl中，每个关系指定一个图，异质图将由多个关系的图组成，首先，每个关系写成一个三元组<原节点类型，关系类型，目标节点类型>，如('drug', 'treats', 'disease')
该关系称为规范边类型（canonical edge types），接着写出图数据，该数据中每个关系都对应一个图。
```python
# 定义一个包含节点类型和边类型信息的字典
graph_data = {
    ('user', 'buys', 'item'): ([0, 1, 2], [7, 8, 9]),
    ('user', 'follows', 'user'): ([0, 1, 2], [3, 4, 555])
}

# 使用字典初始化异构图
hg = dgl.heterograph(graph_data)

# Graph(num_nodes={'item': 10, 'user': 556},
#       num_edges={('user', 'buys', 'item'): 3, ('user', 'follows', 'user'): 3},
#       metagraph=[('user', 'item', 'buys'), ('user', 'user', 'follows')])

```

提取出具有特定关系或具有特定的那些关系的子图，注意，该操作会删掉那些没有在边类型中出现过的边

```python
# 创建一个异质图，并添加边类型
hetero_graph = dgl.heterograph({
    ('user', 'follow', 'user'): [(0, 1), (1, 2), (2, 0)],
    ('user', 'like', 'post'): [(0, 0), (1, 1), (2, 2)],
    # 添加更多边...
})

# 要提取的边类型
edge_type_to_extract = ('user', 'follow', 'user')

# 使用 edges 方法提取指定边类型的所有源节点和目标节点
src_nodes, dst_nodes = hetero_graph.edges(etype=edge_type_to_extract)
```

若需要提取出多条边，使用下面的代码
```python
    hetero_graph = dgl.heterograph({
        ('user', 'follow', 'user'): [(0, 1), (1, 2), (2, 0)],
        ('user', 'like', 'post'): [(0, 0), (1, 1), (2, 2)],
        # 添加更多边...
    })

    # 要提取的不同边类型列表
    edge_types_to_extract = [('user', 'follow', 'user'), ('user', 'like', 'post')]

    # 提取所有指定边类型的边
    subgraph = dgl.edge_type_subgraph(hetero_graph, [('user', 'like', 'post')])
    subgraph = dgl.edge_type_subgraph(hetero_graph, edge_types_to_extract)
```


## 图的属性

创建一个图

```python
u, v = torch.tensor([0, 0, 0, 1, 2]), torch.tensor([1, 2, 3, 3, 1])
g = dgl.graph((u, v))
g.ndata['n_fe'] = torch.ones((g.num_nodes(), 3))
g.ndata['n_fe_matrix'] = torch.rand((g.num_nodes(), 3, 2))
g.edata['e_fe'] = torch.zeros(g.num_edges(), 5)

# Graph(num_nodes=4, num_edges=5,
#       ndata_schemes={'n_fe': Scheme(shape=(3,), dtype=torch.float32),
#                      'n_fe_matrix': Scheme(shape=(3, 2), dtype=torch.float32)}
#       edata_schemes={'e_fe': Scheme(shape=(5,), dtype=torch.float32)})

```

<img src="/img/dgl_1.png" style="margin-bottom: -20px;">

<img src="/img/dgl_2.png" style="margin-bottom: -20px;">

## 参考链接

[DGL-图属性](https://blog.csdn.net/Iam_Human/article/details/108398115)

<ClientOnly>
  <leave/>
</ClientOnly/>