---
title: Fine Tune Method
sidebar: true
# isShowComments: true
---
# Fine Tune Method
<ClientOnly>
<title-pv/>
</ClientOnly>

Fine-tuning is a process in machine learning, particularly in deep learning, where a pre-trained model is adapted to a new task or dataset. The goal is to leverage the knowledge learned by the model on a large dataset (often called the source domain) and apply it to a different but related task (the target domain). Here are some common fine-tuning methods in the past years:

* Full Fine-Tuning: This involves training the entire model end-to-end, including the pre-trained weights. The model is updated on the new task, and all layers are allowed to learn new weights. This is suitable when the target domain is significantly different from the source domain.

* Layer-Wise Pretraining: In this approach, the model is often divided into two parts: a base network and a classification layer. The base network is pre-trained on a large dataset, and the classification layer is fine-tuned on the target task. This is common in vision tasks like image classification.

* Transfer Learning: This is a broader term that encompasses fine-tuning. It involves taking a model trained on one task and adapting it to another related task. The pre-trained model can be used as a starting point, and additional layers or modifications can be added to better suit the new task.

* Freeze and Unfreeze: In this method, some layers of the pre-trained model are kept frozen (i.e., their weights are not updated), while others are allowed to learn new weights. This is useful when the lower layers (e.g., convolutional layers) have learned generic features that are useful for the new task, and only the higher layers (e.g., fully connected layers) need to be adapted.

* Multi-Task Learning: This involves fine-tuning a model that was trained on multiple tasks simultaneously. The model learns to handle different tasks, and fine-tuning can be applied to improve performance on a specific task.

* Domain Adaptation: This is a specialized form of fine-tuning where the model is adapted to perform well on a new domain. Techniques like adversarial training and domain adversarial neural networks (DANNs) are used to minimize the domain shift between the source and target domains.

* Data Augmentation: While not a fine-tuning method per se, data augmentation is often used in conjunction with fine-tuning to increase the diversity of the training data and improve the model's ability to generalize.

* Scheduled Sampling: This technique involves periodically sampling from the pre-trained model's output during fine-tuning, which can help prevent overfitting and improve generalization.

* Model Pruning: In some cases, fine-tuning involves pruning the pre-trained model, removing less important weights or entire layers, and then training the reduced model on the new task.

These methods can be combined or modified based on the specific requirements of the target task and the differences between the source and target domains. The choice of fine-tuning method can significantly impact the performance of the adapted model.

Below are some SOTA methods to fine tuning LLM.

## LoRA

### LoRA

The implementation process of LoRA is as follows:
* Add a bypass alongside the original pre-trained language model (PLM), perform a dimensionality reduction followed by an upscaling operation to simulate the so-called intrinsic rank.
* During training, fix the parameters of the PLM and only train the dimensionality reduction matrix A and the upscaling matrix B.
* The input and output dimensions of the model remain unchanged, and at the output, the BA is added to the parameters of the PLM.
* Initialize A with a random Gaussian distribution and initialize B with a zero matrix, ensuring that the bypass matrix remains a zero matrix at the beginning of the training.


<div style="text-align: center;">
  <img src="/img/lora.png" style="margin-bottom: -20px;" width="90%" height="90%">
</div>

Next, we will explain the implementation of LoRA from a formulaic perspective.
Assuming you want to fine-tune a pre-trained language model (such as GPT-3) for a downstream task, the need arises to update the parameters of the pre-trained model, which can be represented by the following formula:

$$
h = W_0 x + \delta W x = W_0 x + BAx
$$

$W_0$ represents the parameters initialized in the pre-trained model, and ΔW represents the parameters that need to be updated. If full parameter fine-tuning is performed, its parameter volume equals the volume of $W_0$ (for GPT-3, ΔW is approximately 175 billion). This shows that it is impossible for small-scale operations to fully fine-tune large language models.

Building on the work of predecessors, it has been discovered that pre-trained language models have a lower "intrinsic dimension." Even when randomly projected into a smaller subspace during task adaptation, they can still learn effectively. Therefore, what LoRA does is to add a small parameter module to learn the change $\delta W$.

During the training process, $W_0$ remains fixed and unchanged, while only the matrices A and B contain the trainable parameters and are subject to change.

In the inference process, there is no delay as the change is simply reintegrated back into the original model.

If you wish to switch tasks, during the task-switching process, you subtract BA and then replace it with B'A' that has been trained for another task.

### QLoRA

### QALoRA

## Adapter

## Prefix-tuning

## P-tuning

## Prompt-tuning


<ClientOnly>
  <leave/>
</ClientOnly/>