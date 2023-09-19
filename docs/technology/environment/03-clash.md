---
title: Linux环境下配置clash
sidebar: true
# isShowComments: true
---

# Linux环境下配置clash

<ClientOnly>
<title-pv/>
</ClientOnly>

## 下载
https://github.com/Dreamacro/clash/releases
选择最新版本的 clash-linux-amd64 安装包。

## 安装
安装到 /etc/clash
```
cd /etc
mkdir clash
wget https://github.com/Dreamacro/clash/releases/download/v1.13.0/clash-linux-amd64-v1.13.0.gz
```
如果下载不了，就本地下载后用rz命令上传到服务器
运行解压安装包；
```
gzip -d clash-linux-amd64-v1.13.0.gz
```
下载订阅：
```
wget -O config.yaml <url>
```

修改运行文件名
```
mv clash-linux-amd64-v1.13.0 clash
```
添加权限
```
chmod +x clash
```
启动服务时会自动下载 Country.mmdb，需要等待一会，如果没有该文件则需要去网上下载。


'-d'指示配置文件目录，由于在同一目录，后面跟'.'就好
```
sudo ./clash -d .
```
如果需要后台运行
```
nohup sudo ./clash -d . &
```
修改系统代理
```
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7891
```
取消代理 
```
unset all_proxy
unset http_proxy
unset https_proxy
```
以上命令只在当前终端有效，如需长期生效，则需要写在环境变量里。
测试
```
curl https://www.google.com
```

<ClientOnly>
  <leave/>
</ClientOnly/>