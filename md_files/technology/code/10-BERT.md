---
title: BERT使用记录
sidebar: true
# isShowComments: true
---

# BERT使用记录

<ClientOnly>
<title-pv/>
</ClientOnly>


BERT（Bidirectional Encoder Representations from Transformers）是一种预训练语言模型，它使用了特殊的标记，如[MASK]和[CLS]，来执行不同的自然语言处理任务。下面详细解释这两个标记的含义和用途。

#### [MASK]标记

在BERT的预训练过程中，[MASK]标记用于“masked language model”（MLM）任务，即遮蔽语言建模。在这个任务中，输入文本的一部分单词被随机替换为[MASK]标记，BERT的任务是预测这些被遮蔽的单词。这种方法有助于模型学习理解和推断语言的上下文。

**代码示例：**
```python
from transformers import BertTokenizer, BertForMaskedLM
import torch

# 初始化tokenizer和模型
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForMaskedLM.from_pretrained('bert-base-uncased')

# 文本示例，其中包含[MASK]标记
text = "The capital of France is [MASK]."
inputs = tokenizer(text, return_tensors="pt")

# 预测[MASK]的位置
with torch.no_grad():
    predictions = model(**inputs).logits

# 获取预测的单词
masked_index = torch.where(inputs.input_ids == tokenizer.mask_token_id)[1]
predicted_token_id = predictions[0, masked_index].argmax(axis=-1)
predicted_token = tokenizer.decode(predicted_token_id)

print(f"Predicted token for [MASK]: {predicted_token}")
```

#### [CLS]标记

[CLS]是“classification”的缩写。在BERT中，每个输入序列的开始处添加了一个特殊的[CLS]标记。对于分类任务，如情感分析或意图识别，[CLS]标记对应的输出向量被用作整个输入序列的汇总表示。在微调阶段，这个向量通常连接到一个或多个全连接层来进行预测。

**代码示例：**
```python
from transformers import BertTokenizer, BertModel
import torch

# 初始化tokenizer和模型
tokenizer = BertVectorizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncensored')

# 文本示例
text = "[CLS] Hello, how are you? [SEP]"
inputs = tokenizer(text, return_tensors="pt")

# 获取输出
outputs = model(**inputs)
cls_embedding = outputs.last_hidden_state[:, 0, :]  # 第一个token即CLS的输出

print("CLS token embedding shape:", cls_embedding.shape)
```

### 总结

这两个标记在BERT的架构中扮演着关键角色，使得模型能够在预训练和微调阶段针对不同的任务进行优化和调整。[MASK]用于帮助模型学习语言的内在规律，而[CLS]则在序列的分类任务中捕捉全局信息。

<ClientOnly>
  <leave/>
</ClientOnly/>