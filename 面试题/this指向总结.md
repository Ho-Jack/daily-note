## this指向总结

> 解析器在调用函数每次都会向函数内部传递进一个隐含的参数 this ，this指向的是一个对象，这个对象我们称为函数执行的` 上下文对象`，

### 根据函数的调用方式的不同，this会指向不同的对象:

- #### 1.以函数的形式调用时，this永远都是window     // XX()  

- #### 2.以方法的形式调用时，this就是调用方法的那个对象 //  A.XX()

- #### 3.构造函数式调用，this就是新创建的对象      //new XX({A:a})  

- #### 4.箭头函数，数会捕获其所在上下文的this值，作为自己的this值

  (箭头函数不能作为对象的属性)

​             ①A在全局环境下定义，this==window

​             ②在A函数下定义。this==A

(由其外部的函数决定，外部函数this就是它的this,不能在对象属性定义(this为window))

- #### 5.改变函数this的指向：  call、apply

 ```
function.call(thisArg, arg1, arg2, ...)

function.apply(thisArg, [argsArray])
 ```

  第一个参数就是this的指向

  箭头函数的this无法通过bind，call，apply来直接修改（可以间接修改）。

### 在严格模式下和非严格模式下this表现不同:

```javascript
'use strict'; 
var a = 1;
 function fun() 
    var a = 2; 
    return this.a; 
 }

fun(); //报错 Cannot read property 'a' of undefined
```

 说明：**严格模式下，this指向undefined**;（this不能指向window）

 ```javascript
var a = 1; 
function fun() {
  var a = 2;
  return this.a;

 }

fun();  //1  以函数的形式调用时，this永远都是window 
 ```

说明：非严格模式下this指向window;

结论：当函数独立调用的时候，在严格模式下它的this指向undefined，在非严格模式下，当this指向undefined的时候，自动指向全局对象(浏览器中就是window)

 

### 当this不在函数中用的时候：

```javascript
var a = 1000; 
var obj = {
   a: 1, 
   b: this.a + 1 
}

console.log(obj.b);  //1001
```

说明：当obj在全局声明的时候，obj内部属性中的this指向全局对象

```javascript
var a = 1; 
var obj = {
     a: 2,
     b: function() {
     return this.a;
   } 
}

obj.b()   //2  当函数以方法形式调用时，this指向调用的对象
```

说明：当函数以方法形式调用时，this指向调用的对象

 

### 箭头函数this的指向（外部函数的this就是箭头函数的this）：

```javascript
var a = 1;
var obj = { a: 2 }; 

function fun() {
  var a = 3; 
  let f = () => console.log(this.a);
 //箭头函数在fun函数里面，（箭头函数的this=fun函数的this）
  f(); 
}; 

fun();         //1   以函数调形式用this是window,
fun.call(obj); //2   this指向obj
```

