---
title: 通过VSCode连接堡垒机内的服务器
sidebar: true
# isShowComments: true
---

# 通过本机VSCode连接堡垒机内的服务器

<ClientOnly>
<title-pv/>
</ClientOnly>

最近被公司的堡垒机服务器困扰了很久，好不容易知道了ssh怎么连接
```shell
ssh user@user@hostIP@jump.xxxx.xx.xx -p xxxx
```
却又发现VSCode因为安全原因而不支持连接。最近学校的服务器刚刚crash，各种东西都相当不稳定，只能寄人篱下用别人组的堡垒机服务器。科研民工想弄个服务器用真的太麻烦了，差点就放弃了T_T，幸而得到师兄的指点得知了用VSCode连接服务器的方法，特此记录以备遗忘。

## VSCode安装remote ssh插件

extension里选择安装ssh插件，安装之后输入如下命令：
```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
此步骤目的是生成ssh_rsa文件，后面的邮箱可以随意填，这个注释实际上并不是必需的，但它是为了帮助您标识生成密钥的目的或所有者。

## 访问本机用户目录下的.ssh文件夹
不出意外的话，本机用户目录下的.ssh文件夹下会出现以下几个文件：
<img src="/img/ssh.png" style="margin-bottom: -20px;">
打开其中的id_rsa.pub文件（公钥），将里面的内容复制。

## 通过ssh访问堡垒机用户目录下的.ssh文件夹
输入如下命令：
```shell
vim authorized_keys
```
将刚刚复制的内容添加到该文件下，即可通过VSCode访问服务器。

## 原理

将 id_rsa.pub 的内容添加到堡垒机（Jump Server）的 authorized_keys 文件中是实现 SSH 访问堡垒机的一种常见方法，这是因为 SSH 使用了公钥验证的方式来实现安全访问。

以下是为什么这种方法可以让您访问堡垒机的原因：

公钥验证：SSH使用公钥/私钥对来进行身份验证。私钥保存在您的本地计算机上，而公钥保存在远程服务器上。当您尝试通过SSH连接到堡垒机时，SSH客户端会发送一个请求，请求使用私钥对数据进行签名。远程服务器（堡垒机）会使用已存储在 authorized_keys 文件中的公钥来验证签名的有效性。

加密和签名：在SSH连接建立之前，客户端和堡垒机之间的通信会使用公钥加密传输，以确保通信的安全性。当私钥成功验证时，连接将被建立，数据传输将在加密通道中进行。此外，私钥还可用于签名数据，以验证数据的完整性和真实性。

堡垒机的 authorized_keys 文件：堡垒机上的 authorized_keys 文件包含了被授权的公钥列表。只有具有匹配私钥的公钥才能成功进行身份验证并获得访问权限。通过将 id_rsa.pub 的内容添加到堡垒机的 authorized_keys 文件中将授权自己的公钥访问堡垒机。

<ClientOnly>
  <leave/>
</ClientOnly/>