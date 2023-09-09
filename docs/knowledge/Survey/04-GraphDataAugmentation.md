---
title: Graph Data Augmentation
sidebar: true
# isShowComments: true
---
# Graph Data Augmentation
<ClientOnly>
<title-pv/>
</ClientOnly>

## Overview

In recent years, data-driven reasoning has significantly improved its generalization ability and model performance with the introduction of data augmentation technology. Data augmentation technology increases the amount of training data by creating reasonable variations of existing data without the need for additional real labels, and has been widely applied in computer vision (CV) and natural language processing (NLP).

With the rapid development of graph machine learning methods such as graph neural networks, people's interest and demand for graph data augmentation (GDA) technology continue to increase. However, due to the irregular and non Euclidean structure of graph data, it is difficult to directly apply the data augmentation technique (DA) used in CV and NLP to the field of graph.

In addition, graph machine learning faces unique challenges, such as:

* Incomplete feature data
* Sparsity of Structural Data Caused by Power Law Distribution.
* Lack of labeled data due to the high cost of manual annotation.
* Excessive smoothing caused by message passing in GNN.

In order to address these challenges, there are increasing works on graph data augmentation. Similar to data augmentation techniques such as CV and NLP, graph data augmentation **creates data objects through modification or generation**. However, due to the fact that graphs are connected data, unlike images and text, the data objects in graph machine learning are usually non independent and identically distributed. Therefore, whether it is node level, edge level, or graph level tasks, graph data augmentation techniques often make changes to the entire graph dataset.

Base on this，GraphCL（NIPS 2020）provided four most commonly used augmentation strategies，namely:
* Node dropping,
* Edge perturbation
* Attribute masking
* Subgraph sampling

Although the above attempts to apply data augmentation to Graphs often <font color="red">fail to generate views on the semantics of the original graph or adapt augmentation strategies</font>  to specific graph learning tasks.

### Mixup Method
Mixup[1] is a simple data augmentation method proposed in ICLR2017 used in computer vision. It improves model's generaliztion power as well as robust to adversarial attack by perform linear transformation on input data. 

Basic mixup method use formula as below <tex>\frac{\exp(1)}{\lambda+1}</tex>:

<div style="text-align: center;"><tex>
  X_m=\lambda X_i+(1-\lambda)X_j\\
  L_m=\lambda L_i+(1-\lambda)L_j
</tex></div>



It's applications are usually used for these four motivation.

#### Model normalization
1. **AdaMixup** founded that hybrid samples may be conflict with other real samples when we conduct Mixup, as shown in the following figure：

<img src="/img/paper-4-1.png" style="margin-bottom: -20px;">

They proposed a model to classify whether samples come from hybrid or real sample.

2. **CutMix** cut a part of image to merge two image in a smoother and more continues way. However this may cut the background of an image, which doesn't make contributions to features but do harm to label prediction.

3. **Patup** fix **CutMix**'s weakness, they do mix-up in high-dimension. And PuzzleMix mix different part with a hign information density in each images. 

#### Semi-supervised method 


#### 

#### 


## 



## 



<ClientOnly>
  <leave/>
</ClientOnly/>