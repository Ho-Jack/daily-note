---
title: JS 严格模式
date: 2020-06-01 11:33:00
tags: [JS, 开发笔记]
---

## JS 严格模式

### 一、严格模式介绍

除了正常运行模式，ECMAscript 5添加了第二种运行模式："严格模式"（strict mode）。顾名思义，这种模式使得Javascript在更严格的条件下运行。

设立"严格模式"的目的，主要有以下几个：

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。

"严格模式"体现了Javascript更合理、更安全、更严谨的发展方向，包括IE 10在内的主流浏览器，都已经支持它，许多大项目已经开始全面拥抱它。

另一方面，同样的代码，在"严格模式"中，可能会有不一样的运行结果；一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。

### 二、严格模式使用

#### **1、为整个脚本开启严格模式**

为整个脚本文件开启严格模式，需要在所有语句之前放一个特定语句 "use strict"; （或 'use strict';）

```js
// 整个脚本都开启严格模式的语法
"use strict";
var v = "Hi!  I'm a strict mode script!";
```

#### **2、为函数开启严格模式**

要给某个函数开启严格模式，得把 "use strict";  (或 'use strict'; )声明一字不漏地放在函数体所有语句之前。

```js
function strict(){
  // 函数级别严格模式语法
  'use strict';
  function nested() { return "And so am I!"; }
  return "Hi!  I'm a strict mode function!  " + nested();
}
function notStrict() { return "I'm not strict."; }
```

### 三、严格模式的改变

#### **1、普通变量**

- 变量都必须先用var命令声明，然后再使用。
- 对**不可写属性**赋值，将报错。
- 对**只读属性**赋值，将报错。
- 对禁止扩展的对象添加新属性，将报错。
- 删除一个**不可删除的属性**，将报错。
- 删除声明变量，将报错。
- 不能使用前缀0表示八进制数:var n = 023和var s = "\047"将报错。

```js
//严格模式下，变量都必须先用var命令声明，然后再使用。
//在正常模式中，变量没有声明就赋值，默认是全局变量。
demo1 = "success";
console.log(demo1); // 报错

//严格模式下对不可写属性赋值，将报错。
var demo2 = {};
Object.defineProperty(demo2, "x", { value: 42, writable: false });
demo2.x = 9; //报错

//严格模式下对只读属性赋值，将报错。
var demo3 = { get x() { return 17; } };
demo3.x = 5;  //报错

//严格模式下对禁止扩展的对象添加新属性，将报错。
var demo4 = {};
Object.preventExtensions(demo4);
demo4.newProp = "ohai"; //报错

//严格模式下删除一个不可删除的属性，将报错。
delete Object.prototype; //报错  （函数对象都有一个prototype）

//严格模式下无法删除变量。只有configurable设置为true的对象属性，才能被删除。
var x;
delete x; // 报错

var demo5 = Object.create(null, {'x': {
    value: 1,
    configurable: true
}});
delete demo5.x; // 删除成功

//严格模式下对八进制语法:var n = 023和var s = "\047"将报错。
var n = 023; //报错
```

#### **2、重名问题**

严格模式下函数不能有重名的参数  （  arguments 美 ['ɑɡjʊmənts] 争论）

```js
//严格模式下函数不能有重名的参数
//正常模式下，如果函数有多个重名的参数，可以用arguments[i]读取。
function demo6(a,a,b){return ;} //报错
```

#### **3、禁止this关键字指向全局对象**

严格模式下，全局作用域的函数中的this不再指向全局window而是undefined。
 如果使用构造函数时，如果忘了加new，this不再指向全局对象，而是undefined报错。

```js
function demo7_1(){
    console.log(this);
}
function demo7_2(){
    function demo7_3(){
    console.log(this);
    }
    demo7_3();
}
demo7_1(); //undefined
demo7_2(); //undefined

function demo7_4(){
   this.a = 1;
};
demo7_4();// 报错，使用构造函数时，如果忘了加new，this不再指向全局对象，而是undefined.a。
```

#### **4、静态绑定**

- 禁止使用with语句
  
  > with 语句用于设置代码在特定对象中的作用域。
  >
  > ```js
  > let obj={
  >     a:1,
  >     b:2,
  >     c:3
  > }
  > //改变obj对象属性的值，用with可以一劳永逸
  > with (obj) {
  > 	a = 3;   //obj.a = 3;
  > 	b = 4;   //obj.b = 4;
  > 	c = 5;   //obj.c = 5;
  > }
  > ```


- eval语句本身就是一个作用域，它所生成的变量只能用于eval内部。

```js
//严格模式下禁用with
let obj={
    a:1,
    b:2,
    c:3
}
with (obj){
    a = 3;   //obj.a = 3;
	b = 4;   //obj.b = 4;
	c = 5;   //obj.c = 5;
}
// 报错 Uncaught SyntaxError: Strict mode code may not include a with statemen


//正常模式下，eval语句的作用域，取决于它处于全局作用域，还是处于函数作用域。
//严格模式下，eval语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于eval内部。
//严格模式下，eval语句内传入的字符串也是按照严格模式执行。
function demo9() {
    var x = 2;
    eval("var y = 1; console.log(y); "); //1
    eval("var x = 12");
    console.log(x); //2
    console.log(y); 
    //正常模式下  输出 1   y是在当前 demo9作用域中的
    //严格模式下，报错：y is not defined   （eval本身就是一个作用域，无法穿透获取eval内部的变量）
}
demo9();
```

#### **5、arguments对象的限制**

- 不允许对arguments赋值
- arguments不再追踪参数的变化
- 禁止使用arguments.callee

```js
//不允许对arguments赋值
arguments++; //报错

//arguments不再追踪参数的变化
//在非严格模式中,修改arguments对象中某个索引属性的值,和这个属性对应的形参变量的值也会同时变化,反之亦然。
//在严格模式中arguments 对象会以形参变量的拷贝的形式被创建和初始化，因此arguments对象的改变不会影响形参。
function demo10_1(a) {
    a = 2;
    return [a, arguments[0]];
}
console.log(demo10_1(1)); // 正常模式为[2,2]

function demo10_2(a) {
    "use strict"
    a = 2;
    return [a, arguments[0]];
}
console.log(demo10_2(1)); // 严格模式为[2,1]

//禁止使用arguments.callee
var demo11 = function() { return arguments.callee; };
demo11(); // 报错
```

#### **6、禁止在函数内部遍历调用栈**

```js
function demo12(){
    demo12.caller; // 报错
    demo12.arguments; // 报错
}
demo12();
```

#### **7、保留字**

使用未来保留字(也许会在ECMAScript 6中使用):implements, interface, let, package, private, protected, public, static,和yield作为变量名或函数名会报错。


