---
title: setTimeout在循环中的问题
date: 2020-01-15 16:45:03
tags: [JS, 开发笔记]
---

##  setTimeout在循环中的问题

> #### 同步优先于异步优先于回调

### 一、背景

最近在翻看以前的老书《node.js开发指南》，恰好碰到 for 循环 + setTimeout 的经典例子，于是重新梳理了思路并记录下。

### 二、写在前面，setTimeout 和 setInterval 的执行机制

在日常编码中，你会发现，给 setTimeout 和 setInterval 设定延迟时间往往并不准，或者干脆 setTimeout(function(){xxx},0) 也不是立马执行（特别是有耗时代码在前），这是因为 js 是**单线程**的，有一个**事件队列**机制，setTimeout 和 setInterval 的回调会到了延迟时间塞入事件队列中，排队执行。

> setTimeout ：延时 delay 毫秒之后，啥也不管，直接将回调函数加入事件队列。
> setInterval ：延时 delay 毫秒之后，先看看事件队列中是否存在还没有执行的回调函数（ setInterval 的回调函数），如果存在，就不要再往事件队列里加入回调函数了。
>
> #### `JS队列: 同步 > 微队列 (Promise) > 宏队列 (定时器、ajax、Dom)`

看下面示例：

```
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

结果：1 秒之后，同时输出 5 个 5。

因为 for 循环会先执行完（`同步优先于异步优先于回调`），这时五个 setTimeout 的回调全部塞入了事件队列中，然后 1 秒后一起执行了。



### 三、正文

接下来就是那道经典的代码：

```
Copyfor (var i = 0; i < 5; i++) { 
    setTimeout(function (){
        console.log(i);  
     },1000);  
}
```

结果：5 5 5 5 5

为什么不是 1 2 3 4 5，问题出在**作用域**上。

因为 setTimeout 的 console.log(i); 的i是 var 定义的，所以是函数级的作用域，不属于 for 循环体，属于 global(全局作用域)。等到 for 循环结束，i 已经等于 5 了，这个时候再执行 setTimeout 的五个回调函数（参考上面对事件机制的阐述），里面的 console.log(i); 的 i 去向上找作用域，只能找到 global下 的 i，即 5。所以输出都是 5。

**解决办法：人为给 console.log(i); 创造作用域，保存i的值。**

#### 解决办法一

```
for (var i = 0; i < 5; i++) { 
    (function(i){      //立刻执行函数
        setTimeout(function (){
            console.log(i);  
         },1000);  
    })(i);  
}
```

这里用到**立刻执行函数**。这样 console.log(i); 中的i就保存在每一次循环生成的立刻执行函数中的作用域里了。

#### 解决办法二

```
for (let i = 0; i < 5; i++) {     //let 代替 var
    setTimeout(function (){
        console.log(i);  
     },1000);  
}
```

**let** 为代码块的作用域，所以每一次 for 循环，console.log(i); 都引用到 for 代码块作用域下的i，因为这样被引用，所以 for 循环结束后，这些作用域在 setTimeout 未执行前都不会被释放。

### 四、补充

在写示例代码的过程中，发现一个语法点：

```
 function a(i){ 
    console.log(i);   
 }

for (var i = 0; i < 5; i++) { 
    setTimeout(a(i),1000); 
}   
```

报错：

> TypeError: "callback" argument must be a function
> at setTimeout (timers.js:421:11)
> ……

百度了下，原来 **setTimeout 不支持传带参数的函数**，有两种解决方案：

#### （1）匿名函数包装

```
 function a(i){ 
    console.log(i);   
}

for (var i = 0; i < 5; i++) { 
    setTimeout(function(){  //用匿名函数包装
        a(i);
    },1000); 
}   
```

#### （2）setTimeout 的第 3+ 个参数

> setTimeout(func, delay, param1, param2, ...)
> 第三个参数及以后的参数都可以作为 func 函数的参数

```
Copyfunction a(i){ 
    console.log(i);   
 }

for (var i = 0; i < 5; i++) { 
    setTimeout(a,1000,i);   //传入第3个参数
}  
```

作者：[ 小蒋不素小蒋](https://www.cnblogs.com/)

出处：https://www.cnblogs.com/xjnotxj/p/7452698.html

版权：本站使用「[CC BY 4.0](https://creativecommons.org/licenses/by/4.0)」创作共享协议，转载请在文章明显位置注明作者及出处。





#### setTimeout 在for 循环中 一次性执行所有函数的问题

##### 解决方案： 每次对毫毛进行加倍

```js
let time = [4, 3, 5, 1, 2];
let timeUp = 0;
for(let i = 0; i < time.length; i++){
    // 当i=1时，想其延时7s打印一个3
    timeUp+=time[i];
    setTimeout(function(){
        console.log(time[i]);
    }, timeUp*1000);
}
```

