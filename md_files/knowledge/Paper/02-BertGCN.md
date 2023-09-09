---
title: 论文解读-BertGCN
sidebar: true
# isShowComments: true
---

# BertGCN: Transductive Text Classification by Combining GCN and BERT

<ClientOnly>
<title-pv/>
</ClientOnly>

BertGCN也是两部分Build Graph及Model Train。

1.构图：Build Graph这部分与TextGCN是一样的，没啥区别就略过了，重点来聊聊模型部分。

2.初始化：BertGCN在node embedding初始化时，不是采用随机初始化策略，而是用bert处理document节点进行初始化，而word节点初始embedding直接初始化为0。

3.融合BERT模块与GCN模块得到的结果、模型训练

在融合Bert与GCN训练这部分，文中指出，将Bert encoder部分得到embedding后丢进GCN里，直接联合训练，会有两个问题出现，
1. 梯度回传时，Bert部分得不到有效的梯度优化。
2. GCN是全图更新的，假设图是1w个document节点，则bert部分1w个document同时进行bert encoder得到document embedding,然后丢到GCN layer中更新训练，这显然是做不到的。

针对这些问题，文中提出了插值更新的方法。最后的插值更新就是将GCN那部分得到document embedding的及Bert单独作用于文本的两个document embedding加起来得到融合分类概率Z，然后采用cross entropy损失函数做一个分类预测。

由于BERT的存在，BertGCN在训练时只能一次加载一个batch而非整个图。为此，BertGCN使用了记忆存储库（Memory Bank） 技术解决该问题。记忆存储库
保存了所有文档结点的特征，将图结点与训练时的每个batch进行分离，每个batch只需要从中取所需的一小部分结点特征即可。

简要来说，记忆存储机制通过每次迭代，动态地更新一小部分文档结点，使用这部分结点训练模型。这就避免了一次性将所有特征读入BERT进行计算，极大减少了内存开销。

但由此带来的一个问题是，由于文档结点是分批更新的，所以在一个Epoch的不同迭代步，输入到模型里的特征会出现不一致的现象。为此，BertGCN在更新BERT模块时采用较小的学习率，减少特征之间的不一致。为加速训练，BertGCN还在训练之前用一个在下游数据集上训练好的BERT模型初始化BertGCN中的BERT模块。


<ClientOnly>
  <leave/>
</ClientOnly/>