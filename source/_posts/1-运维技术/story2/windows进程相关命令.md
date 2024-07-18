---
title: windows进程相关命令
categories:
  - 操作系统
tags:
  - windows
  - 命令
cover: /images/xt/2.png
abbrlink: 41852
date: 2023-05-01 12:39:04
---



## 查看端口号占用情况

```bash
netstat -ano |findstr 3798
```

## 查看进程的使用程序

```bash
tasklist |findstr 2452
```

## 杀掉进程

```
taskkill /T /F /PID 2452 
```
