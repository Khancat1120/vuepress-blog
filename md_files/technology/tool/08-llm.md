---
title: LLM Fine-tune 学习记录
sidebar: true
# isShowComments: true
---

# LLM Fine-tune 学习记录

<ClientOnly>
<title-pv/>
</ClientOnly>


## 参数字典

* stage
    * SFT：指令监督微调
    * pt：预训练
    * rm：奖励模型
* max_samples：样本数量
* fp16/bf16：精度高，范围有限/范围宽，精度有限
* gradient_accumulation_steps：实际模型更新权重之前，前向传播和反向传播的次数
* max_gradient_norm：梯度的某个范数如果超过了某个阈值，则进行梯度裁剪
* evaluation_strategy
    * no：训练时不做评估
    * steps：在每个eval_steps都进行评估
    * epoch：在每个epoch结束时评估
* per_device_train_batch_size：批处理大小：每块 GPU 上处理的样本数量
* lr_scheduler_type cosine：学习率调节器：采用的学习率调节器名称
* save_steps：保存间隔：每两次断点保存间的更新步数
* plot_loss：绘制损失函数图
* lora_target：lora作用模块，不同大模型有不同的作用模块
* overwrite_cache：是否覆盖cache，在重复训练一个数据集时可以删掉
* predict_with_generate：指示在生成模型的预测时使用生成模式
* val_size和test_size分别表示用于验证集和测试集的数据比例
* export_legacy_format：为True时输出bin，为false时输出safetensor格式


## 数据格式

## 训练

训练时需要的命令：

```bash
#!/bin/bash

CUDA_VISIBLE_DEVICES=0,1
export WANDB_MODE='offline'

accelerate launch --config_file config.yaml ../../src/train_bash.py \
    --stage sft \
    --do_train \
    --model_name_or_path /home/LAB/pangkh/LLM_factory/Llama-2-7b-hf \
    --dataset alpaca_gpt4_en,glaive_toolcall \
    --dataset_dir ../../data \
    --template default \
    --finetuning_type lora \
    --lora_target q_proj,v_proj \
    --output_dir ../../saves/LLaMA2-7B/lora/sft \
    --overwrite_cache \
    --overwrite_output_dir \
    --cutoff_len 1024 \
    --per_device_train_batch_size 1 \
    --per_device_eval_batch_size 1 \
    --gradient_accumulation_steps 2 \
    --lr_scheduler_type cosine \
    --logging_steps 10 \
    --save_steps 100 \
    --eval_steps 100 \
    --evaluation_strategy steps \
    --load_best_model_at_end \
    --learning_rate 5e-5 \
    --num_train_epochs 3.0 \
    --max_samples 3000 \
    --val_size 0.1 \
    --plot_loss \
    --fp16

```


## 评估

```bash
CUDA_VISIBLE_DEVICES=0 python src/evaluate.py \
    --model_name_or_path path_to_llama_model \
    --finetuning_type lora \
    --checkpoint_dir path_to_checkpoint \
    --template vanilla \
    --task ceval \
    --split validation \
    --lang zh \
    --n_shot 5 \
    --batch_size 4
```


## 预测

```bash
CUDA_VISIBLE_DEVICES=0 python src/train_bash.py \
    --stage sft \
    --model_name_or_path path_to_llama_model \
    --do_predict \
    --dataset alpaca_gpt4_zh \
    --template default \
    --finetuning_type lora \
    --checkpoint_dir path_to_checkpoint \
    --output_dir path_to_predict_result \
    --per_device_eval_batch_size 8 \
    --max_samples 100 \                     # 最大样本数：每个数据集最多使用的样本数
    --predict_with_generate
```

## 合并

```bash
python src/export_model.py \
    --model_name_or_path path_to_llama_model \
    --adapter_name_or_path path_to_checkpoint \
    --template default \
    --finetuning_type lora \
    --export_dir path_to_export \
    --export_size 2 \
    --export_legacy_format False
```

## 使用vLLM合并


## 参考链接

[LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)

<ClientOnly>
  <leave/>
</ClientOnly/>