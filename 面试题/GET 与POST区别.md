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





### 在java中传参区别

- ### @RequestParam

  > params传递参数，在url可见

  Content-Type:  application/x-www-form-urlencoded （默认值）

  

  RequestParam可以接受简单类型的属性，也可以接受对象类型。

  

  在java中：实质是将Request.getParameter() 中的Key-Value参数Map利用Spring的转化机制ConversionService配置，转化成参数接收对象或字段。





- ### @RequestBody

  > `data`传递参数

  content-type: application/json

  处理HttpEntity传递过来的数据，一般用来处理**非**Content-Type: application/x-www-form-urlencoded编码格式的数据。

  在GET请求中，不能使用@RequestBody。

  







##  axios中get请求不能传递数组类型参数，必须用QS插件

```csharp
1、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
// 输出结果：'a[0]=b&a[1]=c'
2、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
// 输出结果：'a[]=b&a[]=c'
3、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
// 输出结果：'a=b&a=c'
4、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })
// 输出结果：'a=b,c'
```

