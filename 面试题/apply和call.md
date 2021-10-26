## 普通函数的this

### this 永远指向最后调用它的那个对象

```js
var name = "windowsName";
function a() {
    var name = "Cherry";
    
    console.log(this.name);          // windowsName

    console.log("inner:" + this);    // inner: Window
}
a();    //本质是 window.a()
console.log("outer:" + this)         // outer: Window
```

解释:`a()`前面没有调用的对象那么就是全局对象 window，这就相当于是 `window.a()`；

注意:这里我们没有使用严格模式，如果使用严格模式的话，全局对象就是 `undefined`，
那么就会报错 `Uncaught TypeError: Cannot read property 'name' of undefined`。
**(严格模式下 this 不能指向window  而是指向undefined)**

```js
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // Cherry
    }
}
a.fn();   //a调用fn()  所以this就是a
```
```js
var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
    }
    window.a.fn();  //最后调用它的对象仍然是对象 a。
```

```js
var name = "windowsName";
var a = {
    // name: "Cherry",
    fn : function () {
        console.log(this.name);      // undefined
    }
}
window.a.fn();
```

解释：为什么是undefined？
**this 永远指向最后调用它的那个对象**，因为最后调用 fn 的对象是 a，所以就算 a 中没有 name 这个属性，也不会继续向上一个对象寻找 `this.name`，而是直接输出 `undefined`。



```js
var name = "windowsName";
var a = {
    name : null,
    // name: "Cherry",
    fn : function () {
        console.log(this.name);      // windowsName
    }
}

var f = a.fn;
f();  //以函数调用时 this 是window
```
这里你可能会有疑问，为什么不是 `Cherry`，这是因为虽然将 a 对象的 fn 方法赋值给变量 f 了，但是**没有调用**，再接着跟我念这一句话：“**this 永远指向最后调用它的那个对象**”，由于刚刚的 f 并没有调用，所以 `fn()` 最后仍然是被 window 调用的。所以 this 指向的也就是 window。



## 怎么改变 this 的指向

改变 this 的指向我总结有以下几种方法：

- 使用 ES6 的箭头函数
- 在函数内部使用 `_this = this`
- 使用 `apply`、`call`、`bind`
- new 实例化一个对象



## 箭头函数

ES6 的箭头函数是可以避免 ES5 中使用 this 的坑的。**箭头函数的 this 始终指向`函数定义时`的 this，而非执行时。**，箭头函数需要记着这句话：“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。

**箭头函数的this 由外部函数的this决定**

```js
var name = "windowsName";

var a = {
    name : "Cherry",

    func1: function () {
        console.log(this.name)     
    },

    func2: function () {
        setTimeout( () => {
            this.func1()   
        },100);
    }

};

a.func2()     // Cherry
```



## 在函数内部使用 `_this = this`

如果不使用 ES6，那么这种方式应该是最简单的不会出错的方式了，我们是先将调用这个函数的对象保存在变量 `_this` 中，然后在函数中都使用这个 `_this`，这样 `_this` 就不会改变了。

```js
var name = "windowsName";

var a = {

    name : "Cherry",

    func1: function () {
        console.log(this.name)     
    },

    func2: function () {
        var _this = this;
        //setTimeout是window 对象 ： window.setTimeout()  
        //如果不限制this，this就是window
        setTimeout( function() {
            _this.func1()
        },100);
    }

};

a.func2()       // Cherry
```
这个例子中，在 func2 中，首先设置 `var _this = this;`，这里的 `this` 是调用 `func2` 的对象 a，为了防止在 `func2` 中的 setTimeout 被 window 调用而导致的在 setTimeout 中的 this 为 window。我们将 `this(指向变量 a)` 赋值给一个变量 `_this`，这样，在 `func2` 中我们使用 `_this` 就是指向对象 a 了。

## 使用 apply、call、bind

> 在JavaScript中，`call`、`apply`和`bind`是`Function`对象自带的三个方法，这三个方法的主要作用是改变函数中的`this`指向

```js
obj.call(thisObj, arg1, arg2, ...);
obj.apply(thisObj, [arg1, arg2, ...]);
obj.bind(thisObj, arg1, arg2, ...)
```

- 区别：   apply接受的是数组参数，call、bind接受的是连续参数，**bind 创建一个新的函数，必须手动去调用**

- 同:obj(即this)绑定到thisObj，这时候thisObj具备了obj的属性和方法。或者说thisObj『继承』了obj的属性和方法。绑定后会**立即执行**函数。 （bind不会立即执行，需手动执行）

```js
function add(j, k){
    return j+k;
}

function sub(j, k){
    return j-k;
}
```

```js
add(5,3); //8
add.call(sub, 5, 3); //8
add.apply(sub, [5, 3]); //8

sub(5, 3); //2
sub.call(add, 5, 3); //2
sub.apply(add, [5, 3]); //2
```

```js
   function add(j, k) {
        console.log(this);     
        return j + k;
    }
    function sub(j, k) {
        console.log(this);
        this.add(1,1)   //2  这里没啥用。！！sub和add的this都是同样的window对象   
        return j - k;
    }

    let that={
        A:1,
        B:2
    }
    
    add(5, 3); //8 this为window对象  有个add的属性(废话，函数add定义在全局变量 肯定有add这个函数)   
    sub(2,1)

    add.call(sub, 5, 3); //8 this为sub这个函数      
    
    sub.add(1,1)   //报错！！sub内并没有add这个属性 继承只能基于原型继承

    sub(2,1)  //1 进入函数内部 this为window对象 有个add的属性(废话，函数add定义在全局变量 肯定有add这个函数) 
  
    add.call(that, 5, 3); //8 this为that这个对象     
    add.apply(sub, [5, 3]); //8 this为sub这个函数        
```

