---
title: Linux防火墙命令速记
categories:
  - 操作系统
tags:
  - linux
  - 命令
cover: /images/yw/3.png
abbrlink: 63602
date: 2023-05-01 12:39:04
---

<font color='orange' face='kaiti'>防火墙相关</font>

## 查询有哪些端口是开启的

```shell
firewall-cmd --list-port

```

## 查询9090端口是否开启：

```shell
firewall-cmd --query-port=9090/tcp

```

## 开启9090端口

```shell
firewall-cmd --zone=public --add-port=9090/tcp --permanent

```

## 重启防火墙生效

```shell
firewall-cmd --reload

```

> 命令含义：
> –zone #作用域
> –add-port=9090/tcp #添加端口，格式为：端口/通讯协议
> –permanent #永久生效，没有此参数重启后失效

## 删除9090端口

```shell
firewall-cmd --zone=public --remove-port=9090/tcp --permanent

```

## 重启防火墙生效

```shell
firewall-cmd --reload

```

## 关闭并禁用

```shell
systemctl stop firewalld
systemctl disable firewalld
```

<br>

<br>

<hr>

