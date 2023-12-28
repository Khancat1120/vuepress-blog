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
* During training, fix the parameters of the PLM and only train the dimensionality reduction matrix <smalltex>A</smalltex> and the upscaling matrix <smalltex>B</smalltex>.
* The input and output dimensions of the model remain unchanged, and at the output, the BA is added to the parameters of the PLM.
* Initialize <smalltex>A</smalltex> with a random Gaussian distribution and initialize <smalltex>B</smalltex> with a zero matrix, ensuring that the bypass matrix remains a zero matrix at the beginning of the training.


<div style="text-align: center;">
  <img src="/img/lora.png" style="margin-bottom: -20px;" width="90%" height="90%">
</div>

Next, we will explain the implementation of LoRA from a formulaic perspective.
Assuming you want to fine-tune a pre-trained language model (such as GPT-3) for a downstream task, the need arises to update the parameters of the pre-trained model, which can be represented by the following formula:

<div style="text-align: center;"><tex>
h = W_0 x + \delta W x = W_0 x + BAx
</tex></div>

<smalltex>W_0</smalltex> represents the parameters initialized in the pre-trained model, and ΔW represents the parameters that need to be updated. If full parameter fine-tuning is performed, its parameter volume equals the volume of <smalltex>W_0</smalltex> (for GPT-3, ΔW is approximately 175 billion). This shows that it is impossible for small-scale operations to fully fine-tune large language models.

Building on the work of predecessors, it has been discovered that pre-trained language models have a lower "intrinsic dimension." Even when randomly projected into a smaller subspace during task adaptation, they can still learn effectively. Therefore, what LoRA does is to add a small parameter module to learn the change <smalltex>\delta W</smalltex>.

During the training process, <smalltex>W_0</smalltex> remains fixed and unchanged, while only the matrices <smalltex>A</smalltex> and <smalltex>B</smalltex> contain the trainable parameters and are subject to change.

In the inference process, there is no delay as the change is simply reintegrated back into the original model.

If you wish to switch tasks, during the task-switching process, you subtract <smalltex>BA</smalltex> and then replace it with $BA￥ that has been trained for another task.

In summary, leveraging the intrinsic low-rank nature of large models, LoRA adds a bypass matrix to simulate full fine-tuning, making it a simple and effective solution for lightweight fine-tuning. This technology has been widely applied in the fine-tuning of large models, such as Alpaca, stable diffusion with LoRA, and it can be effectively combined with other parameter-efficient fine-tuning methods, such as State-of-the-art Parameter-Efficient Fine-Tuning (PEFT).

### QLoRA

### QALoRA

## Adapter

In the pre-trained model, Adapter modules (as shown in the structure on the left side of the figure) are added to each layer (or certain layers), and during fine-tuning, the main body of the pre-trained model is frozen, with the Adapter modules learning knowledge specific to the downstream task. Each Adapter module consists of two feedforward sub-layers. The first feedforward sub-layer takes the output of the Transformer block as input and projects the original input dimension d to m, controlling the size of m to limit the parameter count of the Adapter module, typically with m << d. In the output stage, the input dimension is restored through the second feedforward sub-layer, projecting m back to d as the output of the Adapter module (as shown in the structure on the right side of the figure). By adding Adapter modules, an easily scalable downstream model is created. Whenever a new downstream task arises, Adapter modules are added to avoid the issues of full model fine-tuning and catastrophic forgetting. The Adapter method does not require fine-tuning all parameters of the pre-trained model. Instead, it introduces a small number of parameters specific to the task to store knowledge about that task, reducing the computational power required for model fine-tuning.

<div style="text-align: center;">
  <img src="/img/Adapter.png" style="margin-bottom: -20px;" width="90%" height="90%">
</div>

 AdapterFusion divides the learning process into two stages:
1. Knowledge Extraction Phase: Train Adapter modules to learn specific knowledge for downstream tasks, encapsulating this knowledge within the parameters of the Adapter modules.
2. Knowledge Composition Phase: Fix the pre-trained model parameters Θ and the task-specific Adapter parameters Φ, introduce new parameters Ψ, and train with datasets from N downstream tasks, allowing AdapterFusion to learn how to combine the knowledge from N adapters to solve specific tasks. Parameters Ψ include Key, Value, and Query for each layer (as shown in the architecture on the right side of the figure). In each layer of the Transformer, the output of the feedforward network sub-layer serves as the Query, and the Value and Key inputs are the outputs of their respective adapters. The Query and Key are multiplied and passed into the SoftMax function, where AdapterFusion learns to weight the adapters based on the context. In a given context, AdapterFusion learns the parameter mixture of the trained adapters, identifying and activating the most useful adapters based on the given input.

<div style="text-align: center;">
  <img src="/img/AdapterFusion.png" style="margin-bottom: -20px;" width="90%" height="90%">
</div>

The authors address the issues of catastrophic forgetting, task interference, and training instability by dividing the training of adapters into knowledge extraction and knowledge composition. The addition of Adapter modules also leads to an increase in the overall parameter count of the model, which can reduce the model's performance during inference.

Adapter Fusion optimizes the Adapter approach by dividing the learning process into two stages to enhance performance on downstream tasks. The authors compare and contrast the performance of full model fine-tuning (Full), Adapter, and AdapterFusion across various datasets. AdapterFusion outperforms full model fine-tuning and Adapter in most cases, especially on MRPC (a dataset for similarity and entailment tasks) and RTE (a dataset for recognizing text entailment), where its performance is significantly better than the other two methods.


## Prefix-tuning

 Prefix-tuning is a technique for fine-tuning large language models (LLMs) that involves adding a small set of "prefix" parameters to the model, which are specific to a particular task. This method aims to improve the model's performance on a given task without the need for full parameter fine-tuning, which can be computationally expensive and resource-intensive.

The concept of prefix-tuning was introduced to address the limitations of full parameter fine-tuning, where the entire model is updated with task-specific data. Prefix-tuning, on the other hand, only updates a small subset of parameters that are added as a prefix to the input text. These prefix parameters are designed to guide the model's behavior for the specific task at hand.

<div style="text-align: center;">
  <img src="/img/Prefix.png" style="margin-bottom: -20px;" width="90%" height="90%">
</div>


1. Introduction of Prefix Parameters: In prefix-tuning, a few parameters are added to the beginning of the input sequence. These parameters, often referred to as "prefix tokens," are specific to the task and are used to provide context or instructions to the model.

2. Task-Specific Guidance: The prefix tokens serve as a form of task-specific guidance, similar to how a human might be given instructions before performing a task. For example, in a translation task, the prefix might include the word "Translate" followed by the source language and the text to be translated.

3. Model Training: During training, the model learns to adjust its output based on the prefix tokens. The rest of the model's parameters remain frozen, and only the prefix parameters are updated.

4. Efficiency: Prefix-tuning is efficient because it requires training only a small number of parameters compared to full fine-tuning. This makes it suitable for tasks with limited data or when computational resources are scarce.

5. Performance: Studies have shown that prefix-tuning can achieve comparable performance to full fine-tuning on certain tasks, especially in low-data settings or when dealing with unseen topics.

6. Challenges: Despite its efficiency, prefix-tuning may not always outperform full fine-tuning, particularly on more complex tasks or when the model needs to learn more nuanced behaviors specific to the task.


## P-tuning

P-tuning, also known as Prompt Tuning, is a technique for fine-tuning large language models (LLMs) that involves the use of prompts to guide the model's behavior. It is a form of prompt engineering that aims to improve the model's performance on specific tasks by providing it with additional context or instructions through carefully crafted input text. 

<div style="text-align: center;">
  <img src="/img/PTuning.png" style="margin-bottom: -20px;" width="90%" height="90%">
</div>


P-Tuning, as described in the paper "GPT Understands, Too" (2021), is an innovative approach to fine-tuning large language models (LLMs) that focuses on the use of prompts to guide the model's behavior. The method aims to overcome the limitations of traditional prompt-based fine-tuning, which can sometimes lead to suboptimal performance due to the discrete nature of the prompts and the potential for the model to get stuck in local optima.

* Prompt Embedding: In P-Tuning, prompts are converted into learnable embedding layers. This is a departure from the typical approach of using fixed, discrete tokens as prompts, which can be problematic for continuous models like GPT.

* Prompt Encoder: To address the issue of local optima, the authors propose using a prompt encoder, which consists of a multilayer perceptron (MLP) followed by a long short-term memory (LSTM) network. This encoder is trained to generate continuous prompt embeddings that are more flexible and can better capture the nuances of the task at hand.

* Training Process: During training, the prompt encoder is used to generate prompt embeddings that are then concatenated with the input tokens. These combined embeddings are fed into the pre-trained language model, which is fine-tuned on the task-specific data.

* Advantages:

 * Continuous Representation: By using a continuous representation for prompts, P-Tuning allows for smoother gradients and potentially better optimization.
 * Reduced Local Optima: The prompt encoder helps to avoid getting stuck in local optima by generating embeddings that are more closely related to the task requirements.
 * Improved Performance: The authors demonstrate that P-Tuning can achieve results comparable to full fine-tuning, especially for smaller models and on tasks where the model's architecture is not fully utilized.


<ClientOnly>
  <leave/>
</ClientOnly/>