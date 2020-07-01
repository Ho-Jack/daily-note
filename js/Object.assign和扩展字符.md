---
title: Object.assign()和扩展字符...
date: 2020-06-29 09:54:00
tags: [JS, ES6, 开发笔记]
---

##  Object.assign()和扩展字符...

###  作用基本相同，可以合并对象

```js
let  obj1={a:1}
let  obj2={b:2}
Object.assign(obj1,obj2)   //{a: 1, b: 2}
{...obj1,...obj2 }         //{a: 1, b: 2}
{obj1,...obj2}             //{obj1: {a:1}, b: 2}  
```



### Object.assign() 会调用 setter

```js
class MyClass {
    set val(v) {
        console.log('触发setter', v);
        return v;
    }
}

const obj = new MyClass();

Object.assign(obj,  { val:  42  }); // 触发setter 42

{...obj, ...{val: 42}}; // 没有触发setter
```

即 Object.assign() 修改了一个对象，因此它可以触发 ES6 setter。

注意：如果一个 Object 使用了 Object.defineProperty 修改了 set 方法，再调用 Object.assign()，会用意想不到的错误。（因为 Object.assign() 会触发 setter）。


