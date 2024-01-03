---
title: this在Vue中的指向
date: 2019-02-11 16:00:00
tags: [JS,ES6,Vue,开发笔记]
---

## this在Vue中的指向

我们知道，如果Vue的data中有属性message，那么方法中直接用this.message就可以获取到这个message的值

> ##### 在Vue的methdos方法，普通函数的this指向的就是Vue的实例，this.message可以获取到data中的值，
>  ##### 而箭头函数的this指向了window，不能获取到值


##### 在vue的生命周期的钩子方法中使用箭头函数可能改变this的指向：（箭头函数不能作为对象的属性）

```js
methods:{  xx : ()=>{  this  }}       //this指向window  （箭头函数为对象的属性）
methods:{  xx : function (){  this  }}     //this指向vue实例 vm
```

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
    <div id="app">
       <button v-on:click="getMessage">获取message的值</button> 
    </div>
    <script>
        new Vue({
            el : '#app',
            data : {
                message : "hello vue!"
            },
            methods : {  
                // 普通函数this的指向是其调用者
                getMessage : function(){
                    // alert(this.message);
                    console.log(this);  // 指向Vue的实例
                },
                  // 箭头函数的this指向了window，其实应该指向vue的实例
                  // 箭头函数的指向是其定义的外部函数（有宿主对象决定）
                getMessage : ()=>{
                    console.log(this);  // window
                }
            }
        })
    </script>
</body>
</html>
```



