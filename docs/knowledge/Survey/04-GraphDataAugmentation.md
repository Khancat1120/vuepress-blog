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

Basic mixup method use formula as below:

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
Mixup method can generation pseudo labels with high quality by mixing up labeled and unlabeled images and other labeled image as training set. **ICT** first launched a semi-supervised method by utilizing consistent loss. Consistency regularization is another commonly used operation in semi supervised learning, in addition to pseudo labels. It assumes that if we perturb the input to a certain extent, the model predictions should be similar.
<img src="/img/paper-4-2.png" style="margin-bottom: -20px;">
Here strong or weak augmentation often include three aspects:
* Data augmentation
* Adversarial training
* Transformation, e.g., automatic exposure, brightness, color, contrast, sharpness, equalization, posterize, overexposure, rotate, translate

#### Domain Adaptation
Domain Adaptation can be seen as cross-domain semi-supervised learning where the source domain is labeled and the target domain is unlabeled. Based on this approach, Mixup can provide high-quality pseudo labels for the target domain. The existing usage methods include:

1. Adversarial training + domain sample Mixup, such as **Dual Mixup** and **Virtual Mixup**, treats Mixup as a regularization method to enhance the diversity of features learned by the model

2. When using intra domain and inter domain mixups in combination, multiple methods are used to obtain sample pseudo labels for unlabeled target domains. The prediction target of the model is obtained through the mixture of pseudo labels and true labels. The acquisition of pseudo labels is the key to the success of these methods. 

3. Use collaborative training similar to Teacher Student to train multiple classifiers, and then mix the provided labels with samples with real labels to provide pseudo labels for Mixup. The main function played by Mixup here is to reduce the noise of pseudo labels.

#### Generation
Manifold Mixup pointed out that Mixup can be used to regularize GAN. Note that this mixing must be cross domain, that is, mixing Fake to Fake and Fake to Real. However, in the Real Image domain, such as Real to Real mixing, mixing can actually reduce the generation effect of the model. In fact, the mixed image produced by Real to Real is not a Real Image, which is also worth studying. However, in summary, this mixing is meaningful for improving the generation model.

In addition, Mixup can also be used for training VAE and GAN hybrid generation models [5], as shown in the following figure. The entire generation model consists of an autoencoder and a discriminator. Among them, the autoencoder maps the input to the feature space and maps it back to the original space through the decoder, using classical reconstruction loss for training, requiring the distance between the pre and post mapping to be as close as possible. The discriminator tries to distinguish the features before and after the mapping, usually trained with a binary loss function. In addition, it is also required that the generated results of the autoencoder can confuse the discriminator. Because autoencoder is generated one-on-one, in order to maximize the discriminator's ability to utilize as many samples as possible, reference [5] proposes that for two features

By fusing in the feature space, mixed features can be obtained in the feature space <div style="white-space: nowrap; width: 50%; height: 50%;"><tex>h_{mixup}</tex></div>, and then map back to <div style="white-space: nowrap; width: 50%; height: 50%;"><tex>X_{mixup}</tex></div> in the original space.

<img src="/img/paper-4-3.png" style="margin-bottom: -20px;">

## G-Mixup

**Title**: G-Mixup: Graph Data Augmentation for Graph Classification.

This paper proposed a Mix-up method for graph-level classification. It first generates graphons from different graphs. The dimension of graphon is valued as average node numbers of each graph, and then generate graphs by mix-uped graphons with mix-uped label as well. The mixup-ed sample is fed to model thus improving robustness of model.

## GCL

**Title**: Graph Contrastive Learning with Augmentations



## AutoGCL



## MEGA


<ClientOnly>
  <leave/>
</ClientOnly/>