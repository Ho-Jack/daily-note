---
title: get请求和post请求的区别
date: 2020-04-11 04:00:00
tags: [JS, ES6, 开发笔记]

---

##  get请求和post请求的区别

get请求：params

post请求： params 、data

```
因为params是添加到url的请求字符串中的，用于get请求。 且有缓存性

而data是添加到请求体（body）中的， 用于post请求。
```



#### 最直观的区别get把参数包含在URL中，post通过request body传递参数，相对于get比较安全

get请求URL传参有长度限制，post没有，要手动设置 (GET的最大长度显示是因为 浏览器和 web服务器限制了 URI的长度,HTTP协议并没用限制)

get请求会被浏览器**主动缓存**，post不会

get在浏览器回退是无害的，post会再次提交请求

get和post报文格式不同

get请求是幂等性的，而post请求不是（新增和删除数据一般不用post请求就是这个原因）

GET一般用于查询信息，POST一般用于提交某种信息进行某些修改操作

GET产生一个TCP数据包；POST产生两个TCP数据包

