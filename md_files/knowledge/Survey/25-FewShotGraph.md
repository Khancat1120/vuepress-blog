---
title: Few-shot learning in Graph
sidebar: true
# isShowComments: true
---
# Few-shot learning in Graph
<ClientOnly>
<title-pv/>
</ClientOnly>

## Type

### Metric-based FSL:

This approach typically adopts the framework of Prototypical Networks, where node or graph embeddings are learned, and then prototypes for each class are calculated as the mean of the support samples' embeddings.
During the classification of query nodes, the class of the query node is determined by calculating the Euclidean distance between the query node's embedding and the prototypes of different classes.
For example, in node-level FSL, GFL (Graph-Structured Prototype) designs graph-structured prototypes to capture the relational structure of support samples and further refines them with a graph representation gate to include the whole graph information.

### Optimization-based FSL:

This method relies on the framework of Model-Agnostic Meta-Learning (MAML), where the model is optimized to quickly adapt to new tasks through gradient updates.
In the optimization phase, task-specific parameters are first updated for each node class, and then all task-specific classification losses are accumulated to update the task-agnostic parameters.
Finally, the optimized task-agnostic parameters (shared by base classes) are further quickly adapted to predict the labels of nodes in new classes through gradient updates over a few labeled nodes.
For instance, in node-level FSL, Meta-GNN (Meta-Graph Neural Networks) is the first work that combines Graph Neural Networks (GNNs) and MAML for node classification.
### Differences:

* Metric-based methods focus on learning task-specific similarity metrics, while optimization-based methods focus on learning a well-initialized base learner that can quickly adapt to new few-shot tasks.
* Metric-based methods usually generate class prototypes during the training phase and use these prototypes for classification during the testing phase. In contrast, optimization-based methods optimize model parameters during the training phase and adapt these parameters to new tasks through fine-tuning during the testing phase.
* Metric-based methods may be more direct in handling new classes because they rely on precomputed prototypes. Optimization-based methods, on the other hand, provide a more flexible framework for adapting to new tasks by learning how to quickly adjust model parameters through meta-learning processes.


## Task

### Node-level FSL

* Metric-based Methods: These methods typically adopt the framework of Prototypical Networks (ProNet), where node embeddings are learned and prototypes for each class are calculated. These prototypes are then used to classify query nodes. For instance, GFL (Graph-Structured Prototype) designs graph-structured prototypes to capture the relational structure of support samples and refines them with a graph representation gate to include the entire graph information.
* Optimization-based Methods: These methods are based on Model-Agnostic Meta-Learning (MAML), optimizing gradients to quickly adapt to new tasks. For example, Meta-GNN is the first work to combine Graph Neural Networks (GNNs) and MAML for node classification.

### Edge-level FSL:

* Metric-based Methods: These methods rely on frameworks like Matching Networks (MatchNet) or Translation Networks (TransNet), learning relation embeddings by aggregating node pair embeddings and using matching scores to determine the acceptability of query samples. For example, GMatching is the first attempt to solve one-shot relation prediction problems on knowledge graphs.
* Optimization-based Methods: These methods also leverage MAML for model optimization, optimizing GNNs to address the challenges of few-shot relation prediction. For instance, Meta-KGR is the first work for few-shot multi-hop relation prediction on knowledge graphs.

## Graph-level FSL:

* Metric-based Methods: These methods focus on computing the distance between graph class prototypes and query graphs to predict labels of query graphs. For example, SuperClass uses graph-level GNNs (such as GIN) to learn graph embeddings and clusters graphs into different super-classes based on their spectral properties.
* Optimization-based Methods: These methods also utilize MAML to optimize few-shot graph classification models. For example, AS-MAML generates graph embeddings by concatenating mean and max-pooling of all node embeddings encoded by GNNs and further leverages a reinforcement learning-based controller to adaptively control MAML for model optimization.


<ClientOnly>
  <leave/>
</ClientOnly/>
