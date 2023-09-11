---
title: Graph Neural Network
sidebar: true
# isShowComments: true
---
# Graph Data Augmentation
<ClientOnly>
<title-pv/>
</ClientOnly>

In recent years, data-driven reasoning has significantly improved its generalization ability and model performance with the introduction of data augmentation technology. Data augmentation technology increases the amount of training data by creating reasonable variations of existing data without the need for additional real labels, and has been widely applied in computer vision (CV) and natural language processing (NLP).

With the rapid development of graph machine learning methods such as graph neural networks, people's interest and demand for graph data augmentation (GDA) technology continue to increase. However, due to the irregular and non Euclidean structure of graph data, it is difficult to directly apply the data augmentation technique (DA) used in CV and NLP to the field of graph.

In addition, graph machine learning faces unique challenges, such as:

* Incomplete feature data
* Sparsity of Structural Data Caused by Power Law Distribution
* Lack of labeled data due to the high cost of manual annotation
* Excessive smoothing caused by message passing in GNN.

In order to address these challenges, there are increasing works on graph data augmentation. Similar to data augmentation techniques such as CV and NLP, graph data augmentation **creates data objects through modification or generation**. However, due to the fact that graphs are connected data, unlike images and text, the data objects in graph machine learning are usually non independent and identically distributed. Therefore, whether it is node level, edge level, or graph level tasks, graph data augmentation techniques often make changes to the entire graph dataset.

Base on this，GraphCL（NIPS 2020）provided four most commonly used augmentation strategies，namely:
* Node dropping,
* Edge perturbation
* Attribute masking
* Subgraph sampling

Although the above attempts to apply data augmentation to Graphs often <font color="red">fail to generate views on the semantics of the original graph or adapt augmentation strategies</font>  to specific graph learning tasks.

## Contrastive Learning

Contrastive learning and metric learning are both methods in the field of machine learning, used to learn the similarity and distance between data. They have some similarities, but there are also obvious differences:

Similarities:

* Objective: Both Contrastive learning and metric learning aim to learn similarity or distance measures between data points. They attempt to place similar samples in close proximity and dissimilar samples in distant locations.

* Purpose: Both methods are widely used in various machine learning tasks, such as image retrieval, facial recognition, recommendation systems, clustering, etc., to help models better understand the relationships between data.

Difference:

* Loss function:
    * Contrastive learning: Contrastive learning usually uses a Contrastive loss function, which requires the distance between similar samples to be as small as possible and the distance between dissimilar samples to be as large as possible. Common Contrastive learning methods include Siamese network, Triplet network, and recent self supervised learning methods such as Contrastive Predictive Coding (CPC) and SimCLR.
    * Metric learning: Metric learning also involves learning distance or similarity measures, but typically uses different types of loss functions, such as triplet loss or Hinge loss. Metric learning places more emphasis on learning distance metrics that are suitable for specific tasks, such as facial distance metrics in face recognition.

* Application field:
    * Contrastive learning: Contrastive learning is commonly used for self supervised learning and representation learning tasks, such as learning embedded representations of images, text, or audio. It is very useful in learning the representation of unlabeled data.

    * Metric learning: Metric learning is more commonly used for supervised learning tasks, especially those that require learning similarity or distance, such as face recognition, object detection, clustering, etc.

* Learning style:
    * Contrastive learning: Contrastive learning typically involves learning an embedding space where similar samples are closer in the space. It focuses on mapping data to a representation space with good properties.

    * Metric learning: Metric learning typically involves learning a distance or similarity measurement function that can be used to measure the distance or similarity between two data points. It focuses on defining a measurement function to effectively measure the relationships between data points.

In summary, both Contrastive learning and metric learning are important methods for learning the relationships between data, but their application scenarios, loss functions, and learning methods are slightly different. The choice of method depends on the nature of the task and the characteristics of the data. Sometimes, these two methods can also be combined to improve model performance.

## 



## 



<ClientOnly>
  <leave/>
</ClientOnly/>