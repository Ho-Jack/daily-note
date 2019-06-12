---
title: Vue实例里this的使用
date: 2019-2-11 18:00:00
tags: [JS,ES6,开发笔记]
---

# Vue实例里this的使用

> ### 在Vue所有的生命周期钩子方法（如created，mounted， updated以及destroyed）里使用this，
>
> ### this指向调用它的Vue实例。 

```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.js"></script>
    <script src="https://unpkg.com/vue@2.5.9/dist/vue.js"></script>
</head>
<div id="app" style="width: 100%;height: auto;font-size:20px;">
    <p id="id1"></p>
    <p id="id2"></p>
</div>
<script type="text/javascript">
    var message = "Hello!";
    var app = new Vue({
        el:"#app",
        data:{
            message: "你好！"
        },
        created: function() {
          this.showMessage1();    //this 1   指向vue实例
          this.showMessage2();   //this 2     指向vue实例
          //  created函数为vue实例的钩子方法，它里面使用的this指的是vue实例。
        },
        methods:{
            showMessage1:function(){
                setTimeout( function() {
                   document.getElementById("id1").innerText = this.message;  //this 3 
                    //普通函数，这里的this是window  所以输出 Hello！
        //   对于普通函数（包括匿名函数），this指的是直接的调用者，在非严格模式下，如果没有直接调用者，this指的是window。showMessage1()里setTimeout使用了匿名函数，this指向window。
                }, 10)
            },
            showMessage2:function() {
                setTimeout(() => {
                   document.getElementById("id2").innerText = this.message;  //this 4
    //箭头函数，箭头函数是没有自己的this，在它内部使用的this是由它定义的宿主对象决定。
    //showMessage2()里定义的箭头函数宿主对象为vue实例，所以它里面使用的this指向vue实例。
                    //输出 你好！
                }, 10)
            }
        }
    });
</script>
</html>
```



### 绑定vue实例到this的方法

为了避免this指向出现歧义，有两种方法绑定this。

  **1.使用bind**

showMessage1()可以改为：

```js
howMessage1:function(){
    setTimeout(function() {
       document.getElementById("id1").innerText = this.message;  //this 3
    }.bind(this), 10)
}
```

对setTimeout()里的匿名函数使用bind()绑定到vue实例的this。这样在匿名函数内的this也为vue实例。

  **2.把vue实例的this赋值给另一个变量再使用**  that=this 

showMessage1()也可以改为

```js
showMessage1:function(){
    var that = this;
    setTimeout(function() {
       document.getElementById("id1").innerText = that.message;  //改为that
    }.bind(this), 10)
}
```