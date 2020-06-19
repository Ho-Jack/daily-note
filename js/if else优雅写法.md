---
title: if else 优雅写法
date: 2020-06-04 14:29:00
tags: [JS, 开发笔记]
---

##  if else 优雅写法

### 普通写法：

```js
if(a > b){
  console.log('a大');
}else{
  console.log('b大');
};
```

### 省略括号写法：

```js
if(a > b) console.log('a大');
if(a < b) console.log('b大');
```

```js
if(a > b) console.log('a大');
else console.log('b大');
```

### 三元运算符写法

```js
console.log(a>b ? 'a大' : 'b大');
```

### ES6 map写法：

```js
let orderStatus = ''
 
if (res.data.status == '1') {
    orderStatus = '待付款'
} else if (res.data.status == '2') {
    orderStatus == '待发货'
} else if (res.data.status == '3') {
    orderStatus == '已发货'
} else if (res.data.status == '4') {
    orderStatus == '待收货'
} else if （res.data.status == '5'）{
    orderStatus == '已完成'
}
```

```js
let orderStatus
let orderMap = new  Map([ 
    [1,'待付款'],
    [2,'待发货'],
    [3,'已发货'],
    [4,'待收货'],
    [5,'已完成'],
    ])
orderStatus = orderMap.get(res.data.status)
```



