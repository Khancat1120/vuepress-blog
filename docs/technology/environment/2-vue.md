---
title: Vue运行环境配置
sidebar: true
# isShowComments: true
---

# 服务器端Vue运行环境配置

<ClientOnly>
<title-pv/>
</ClientOnly>

## Vue安装

### 安装nodejs
于nodejs的官网下载对应安装包：https://nodejs.org/en/download/
在服务器下解压，将bin文件夹添加到环境变量。
验证是否安装成功：
```
node -v
npm -v
```
### 安装cnpm
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
并安装vue-cli脚手架
```
cnpm install -g vue-cli
```
输入以验证是否安装成功
```
vue
```
### 下载vuepress模板
进入官网下载vuepress的模板，或者github上下载博客模板
```
https://v2.vuepress.vuejs.org/
```
安装vuepress
```
npm install -g vuepress
```

### 启动
```
npm install
```
在服务器本地运行
```
npm run dev
```
打包为网页
```
npm run build
```

<ClientOnly>
  <leave/>
</ClientOnly/>