## JS基础

### 1、数据类型

以下是比较重要的几个 js 变量要掌握的点。

#### 1.1 基本的数据类型介绍，及值类型和引用类型的理解

在 JS 中共有 `8` 种基础的数据类型，分别为： `Undefined` 、 `Null` 、 `Boolean` 、 `Number` 、 `String` 、 `Object` 、 `Symbol` 、 `BigInt` 。

其中 `Symbol` 和 `BigInt` 是 ES6 新增的数据类型，可能会被单独问：

- Symbol 代表独一无二的值，最大的用法是用来定义对象的唯一属性名。

  > `Symbol()`函数只有一个参数，字符串`description`。这个字符串参数的唯一作用是辅助调试，也就是它的`toString()`值。但是请注意，两个具有相同`description`的`symbol`也是**不相等**的。
  >
  > ```javascript
  > const symbol1 = Symbol('my symbol');
  > const symbol2 = Symbol('my symbol');
  > 
  > symbol1 === symbol2; // false
  > console.log(symbol1); // 'Symbol(my symbol)'
  > ```
  >
  > 避免对象属性名重复导致覆盖问题
  >
  > ```javascript
  > const name =Symbol('name')
  > const object={
  >     [name]:'objName'
  > }
  > ```
  >
  > 

- BigInt 可以表示任意大小的**整数**。

  ```
  BigInt(安全存储、操作大整数)
  Symbol(标记,永远不相等，解决属性名冲突问题)   Symbol('a')===Symbol('a')  //false
  ```

  

**值类型的赋值变动过程如下：**

```javascript
let a = 100;
let b = a;
a = 200;
console.log(b); // 100
```

![图片 1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55df6cb63d3346be9ec1f572a1514853~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp) 值类型是直接存储在**栈（stack）**中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；

**引用类型的赋值变动过程如下：**

```javascript
let a = { age: 20 };
let b = a;
b.age = 30;
console.log(a.age); // 30

```

![图片 2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c5c43d1c584ed4b8e4cce8855bab52~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp) 引用类型存储在**堆（heap）**中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；

#### 1.2 数据类型的判断

- **typeof**：能判断所有**值类型，函数**。不可对 **null、对象、数组**进行精确判断，因为都返回 `object` 。

```javascript
console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function
// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
```

- **instanceof**：能判断**对象**类型，不能判断基本数据类型，**其内部运行机制是判断在其原型链中能否找到该类型的原型**。比如考虑以下代码：

```javascript
class People {}
class Student extends People {}

const vortesnail = new Student();

console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true

```

其实现就是顺着**原型链**去找，如果能找到对应的 `Xxxxx.prototype` 即为 `true` 。比如这里的 `vortesnail` 作为实例，顺着原型链能找到 `Student.prototype` 及 `People.prototype` ，所以都为 `true` 。

- **Object.prototype.toString.call()**：所有原始数据类型都是能判断的，还有 **Error 对象，Date 对象**等。

```javascript
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]
```

在面试中有一个经常被问的问题就是：如何判断变量是否为数组？

```javascript
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"

```

#### 1.3 手写深拷贝

这个题一定要会啊！笔者面试过程中疯狂被问到！

文章推荐：[如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)

```javascript
/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
 */

function deepClone(obj = {}, map = new Map()) {
  if (typeof obj !== "object") {
    return obj;
  }
  if (map.get(obj)) {
    return map.get(obj);
  }

  let result = {};
  // 初始化返回结果
  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString(obj) === "[object Array]"
  ) {
    result = [];
  }
  // 防止循环引用
  map.set(obj, result);
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map);
    }
  }

  // 返回结果
  return result;
}

```

#### 1.4 根据 0.1+0.2 ! == 0.3，讲讲 IEEE 754 ，如何让其相等？

建议先阅读这篇文章了解 IEEE 754 ：[硬核基础二进制篇（一）0.1 + 0.2 != 0.3 和 IEEE-754 标准](https://juejin.cn/post/6940405970954616839)。 再阅读这篇文章了解如何运算：[0.1 + 0.2 不等于 0.3？为什么 JavaScript 有这种“骚”操作？](https://juejin.cn/post/6844903680362151950)。 

原因总结：

- `进制转换` ：js 在做数字计算的时候，0.1 和 0.2 都会被转成二进制后无限循环 ，但是 js 采用的 IEEE 754 二进制浮点运算，最大可以存储 53 位有效数字，于是大于 53 位后面的会全部截掉，将导致精度丢失。
- `对阶运算` ：由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移（`0舍1入`），尾数位移时可能会发生数丢失的情况，影响精度。

解决办法：

1. 转为整数（大数）运算。

```javascript
function add(a, b) {
  const maxLen = Math.max(
    a.toString().split(".")[1].length,
    b.toString().split(".")[1].length
  );
  const base = 10 ** maxLen;
  const bigA = BigInt(base * a);
  const bigB = BigInt(base * b);
  const bigRes = (bigA + bigB) / BigInt(base); // 如果是 (1n + 2n) / 10n 是等于 0n的。。。
  return Number(bigRes);
}

```

这里代码是有问题的，因为最后计算 `bigRes` 的大数相除（即 `/`）是会把小数部分截掉的，所以我很疑惑为什么网络上很多文章都说可以通过**先转为整数运算再除回去，为了防止转为的整数超出 js 表示范围，还可以运用到 ES6 新增的大数类型，我真的很疑惑，希望有好心人能解答下。**

1. 使用 `Number.EPSILON` 误差范围。

```javascript
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true

```

`Number.EPSILON` 的实质是一个可以接受的最小误差范围，一般来说为 `Math.pow(2, -52)` 。 

1. 转成字符串，对字符串做加法运算。

```javascript
// 字符串数字相加
var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  const res = [];
  let carry = 0;
  while (i >= 0 || j >= 0) {
    const n1 = i >= 0 ? Number(num1[i]) : 0;
    const n2 = j >= 0 ? Number(num2[j]) : 0;
    const sum = n1 + n2 + carry;
    res.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  if (carry) {
    res.unshift(carry);
  }
  return res.join("");
};

function isEqual(a, b, sum) {
  const [intStr1, deciStr1] = a.toString().split(".");
  const [intStr2, deciStr2] = b.toString().split(".");
  const inteSum = addStrings(intStr1, intStr2); // 获取整数相加部分
  const deciSum = addStrings(deciStr1, deciStr2); // 获取小数相加部分
  return inteSum + "." + deciSum === String(sum);
}

console.log(isEqual(0.1, 0.2, 0.3)); // true

```

这是 leetcode 上一道原题：[415. 字符串相加](https://link.juejin.cn?target=https%3A%2F%2Fleetcode-cn.com%2Fproblems%2Fadd-strings%2F)。区别在于原题没有考虑小数，但是也是很简单的，我们分为两个部分计算就行。

### 2、 原型和原型链

可以说这部分每家面试官都会问了。。首先理解的话，其实一张图即可，一段代码即可。

```javascript
function Foo() {}

let f1 = new Foo();
let f2 = new Foo();

```

千万别畏惧下面这张图，特别有用，一定要搞懂，熟到提笔就能默画出来。 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a61ca07672a45d3aecf382100cc9719~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

总结：

- 原型：每一个 JavaScript 对象（null 除外）在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性，其实就是 `prototype` 对象。
- 原型链：由相互关联的原型组成的**链状结构**就是原型链。

先说出总结的话，再举例子说明如何顺着原型链找到某个属性。

推荐的阅读：[JavaScript 深入之从原型到原型链](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2Fblog%2Fissues%2F2) 掌握基本概念，再阅读这篇文章[轻松理解 JS 原型原型链](https://juejin.cn/post/6844903989088092174)加深上图的印象。

### 3、 作用域与作用域链

- 作用域：规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。换句话说，作用域决定了代码区块中变量和其他资源的可见性。（全局作用域、函数作用域、块级作用域）
- 作用域链：从当前作用域开始一层层往上找某个变量，如果找到全局作用域还没找到，就放弃寻找 。这种层级关系就是作用域链。（由多个执行上下文的**变量对象**构成的链表就叫做作用域链，学习下面的内容之后再考虑这句话）

**需要注意的是，js 采用的是静态作用域，所以函数的作用域在函数定义时就确定了。**

推荐阅读：先阅读[JavaScript 深入之词法作用域和动态作用域](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F3)，再阅读[深入理解 JavaScript 作用域和作用域链](https://juejin.cn/post/6844903797135769614)。 

### 4、 执行上下文

这部分一定要按顺序连续读这几篇文章，必须多读几遍：

- [JavaScript 深入之执行上下文栈](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F4)；
- [JavaScript 深入之变量对象](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F5)；
- [JavaScript 深入之作用域链](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F6)；
- [JavaScript 深入之执行上下文](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F8)。

总结：当 JavaScript 代码执行一段可执行代码时，会创建对应的执行上下文。对于每个执行上下文，都有三个重要属性：

- 变量对象（Variable object，VO）；
- 作用域链（Scope chain）；
- this。（关于 this 指向问题，在上面推荐的深入系列也有讲从 ES 规范讲的，但是实在是难懂，对于应付面试来说以下这篇阮一峰的文章应该就可以了：[JavaScript 的 this 原理](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2018%2F06%2Fjavascript-this.html)）

### 5、 闭包

根据 MDN 中文的定义，闭包的定义如下：

> 在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域。

也可以这样说：

> 闭包是指那些能够访问自由变量的函数。 自由变量是指在函数中使用的，但既不是**函数参数**也不是**函数的局部变量**的**变量**。 闭包 = 函数 + 函数能够访问的自由变量。

在经过上一小节“执行上下文”的学习，再来阅读这篇文章：[JavaScript 深入之闭包](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F9)，你会对闭包的实质有一定的了解。在回答时，我们这样答：

在某个内部函数的执行上下文创建时，会将父级函数的**活动对象**加到内部函数的 `[[scope]]` 中，形成作用域链，所以即使父级函数的执行上下文销毁（即执行上下文栈弹出父级函数的执行上下文），但是因为其**活动对象**还是实际存储在内存中可被内部函数访问到的，从而实现了闭包。

闭包应用： 函数作为参数被传递：

```javascript
function print(fn) {
  const a = 200;
  fn();
}

const a = 100;
function fn() {
  console.log(a);
}

print(fn); // 100

```

函数作为返回值被返回：

```javascript
function create() {
  const a = 100;

  return function () {
    console.log(a);
  };
}

const fn = create();
const a = 200;
fn(); // 100

```

**闭包：自由变量的查找，是在函数定义的地方，向上级作用域查找。不是在执行的地方。** ****

应用实例：比如缓存工具，隐藏数据，只提供 API 。

```javascript
function createCache() {
  const data = {}; // 闭包中被隐藏的数据，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}

const c = createCache();
c.set("a", 100);
console.log(c.get("a")); // 100

```

### 6、 call、apply、bind 实现

这部分实现还是要知道的，就算工作中不会自己手写，但是说不准面试官就是要问，知道点原理也好，可以扩宽我们写代码的思路。

**call**

> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

举个例子：

```javascript
var obj = {
  value: "vortesnail",
};

function fn() {
  console.log(this.value);
}

fn.call(obj); // vortesnail

```

通过 `call` 方法我们做到了以下两点：

- `call` 改变了 this 的指向，指向到 `obj` 。
- `fn` 函数执行了。

那么如果我们自己写 `call` 方法的话，可以怎么做呢？我们先考虑改造 `obj` 。

```javascript
var obj = {
  value: "vortesnail",
  fn: function () {
    console.log(this.value);
  },
};

obj.fn(); // vortesnail

```

这时候 this 就指向了 `obj` ，但是这样做我们手动给 `obj` 增加了一个 `fn` 属性，这显然是不行的，不用担心，我们执行完再使用对象属性的删除方法（delete）不就行了？

```javascript
obj.fn = fn;
obj.fn();
delete obj.fn;

```

根据这个思路，我们就可以写出来了：

```javascript
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 首先获取参数
  let args = [...arguments].slice(1);
  let result = null;
  // 判断 context 是否传入，如果没有传就设置为 window
  context = context || window;
  // 将被调用的方法设置为 context 的属性
  // this 即为我们要调用的方法
  context.fn = this;
  // 执行要被调用的方法
  result = context.fn(...args);
  // 删除手动增加的属性方法
  delete context.fn;
  // 将执行结果返回
  return result;
};

```

**apply**

我们会了 `call` 的实现之后，`apply` 就变得很简单了，他们没有任何区别，除了传参方式。

```javascript
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  let result = null;
  context = context || window;
  // 与上面代码相比，我们使用 Symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // 执行要被调用的方法
  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }
  delete context[fnSymbol];
  return result;
};

```

**bind**

`bind` 返回的是一个函数，这个地方可以详细阅读这篇文章，讲的非常清楚：[解析 bind 原理，并手写 bind 实现](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FsisterAn%2FJavaScript-Algorithms%2Fissues%2F81)。

```javascript
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 获取参数
  const args = [...arguments].slice(1),
  const fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      // 当前的这个 arguments 是指 Fn 的参数
      args.concat(...arguments)
    );
  };
};

```

### 7、 new 实现

1. 首先创一个新的空对象。
2. 根据原型链，设置空对象的 `__proto__` 为构造函数的 `prototype` 。
3. 构造函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）。
4. 判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象。

```javascript
function myNew(context) {
  const obj = new Object();
  obj.__proto__ = context.prototype;
  const res = context.apply(obj, [...arguments].slice(1));
  return typeof res === "object" ? res : obj;
}

```

### 8、 异步

这部分着重要理解 Promise、async awiat、event loop 等。

#### 8.1 event loop、宏任务和微任务

首先推荐一个可以在线看代码流程的网站：[loupe](https://link.juejin.cn?target=http%3A%2F%2Flatentflip.com%2Floupe%2F%3Fcode%3DJC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)。 然后看下这个视频学习下：[到底什么是 Event Loop 呢？](https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1oV411k7XY%2F%3Fspm_id_from%3D333.788.recommend_more_video.-1)

简单的例子：

```javascript
console.log("Hi");

setTimeout(function cb() {
  console.log("cb"); // cb 即 callback
}, 5000);

console.log("Bye");

```

它的执行过程是这样的： ![屏幕录制 2021-07-19 15.01.09.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e15fc609aa84eac973c5b8ff163c11c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp) Web APIs 会创建对应的线程，比如 `setTimeout` 会创建定时器线程，`ajax` 请求会创建 http 线程。。。这是由 js 的运行环境决定的，比如浏览器。

看完上面的视频之后，至少大家画 Event Loop 的图讲解不是啥问题了，但是涉及到**宏任务**和**微任务**，我们还得拜读一下这篇文章：[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.cn/post/6844903512845860872)。如果意犹未尽，不如再读下这篇非常详细带有大量动图的文章：[做一些动图，学习一下 EventLoop](https://juejin.cn/post/6969028296893792286#comment)。想了解事件循环和页面渲染之间关系的又可以再阅读这篇文章：[深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.cn/post/6844904165462769678)。

**注意：1.Call Stack 调用栈空闲 -> 2.尝试 DOM 渲染 -> 触发 Event loop**。

- 每次 Call Stack 清空（即每次轮询结束），即同步任务执行完。
- 都是 DOM 重新渲染的机会，DOM 结构有改变则重新渲染。
- 然后再去触发下一次 Event loop。

宏任务：setTimeout，setInterval，Ajax，DOM 事件。 微任务：Promise async/await。

两者区别：

- 宏任务：DOM 渲染后触发，如 `setTimeout` 、`setInterval` 、`DOM 事件` 、`script` 。
- 微任务：DOM 渲染前触发，如 `Promise.then` 、`MutationObserver` 、Node 环境下的 `process.nextTick` 。

**从 event loop 解释，为何微任务执行更早？**

- 微任务是 ES6 语法规定的（被压入 micro task queue）。
- 宏任务是由浏览器规定的（通过 Web APIs 压入 Callback queue）。
- 宏任务执行时间一般比较长。
- 每一次宏任务开始之前一定是伴随着一次 event loop 结束的，而微任务是在一次 event loop 结束前执行的。

#### 8.2 Promise

关于这一块儿没什么好说的，最好是实现一遍 Promise A+ 规范，多少有点印象，当然面试官也不会叫你默写一个完整的出来，但是你起码要知道实现原理。

> 关于 Promise 的所有使用方式，可参照这篇文章：[ECMAScript 6 入门 - Promise 对象](https://link.juejin.cn?target=https%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fpromise)。 手写 Promise 源码的解析文章，可阅读此篇文章：[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-0)。 关于 Promise 的面试题，可参考这篇文章：[要就来 45 道 Promise 面试题一次爽到底](https://juejin.cn/post/6844904077537574919)。

实现一个 Promise.all：

```javascript
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 参数可以不是数组，但必须具有 Iterator 接口
    if (typeof promises[Symbol.iterator] !== "function") {
      reject("Type error");
    }
    if (promises.length === 0) {
      resolve([]);
    } else {
      const res = [];
      let count = 0;
      const len = promises.length;
      for (let i = 0; i < len; i++) {
        //考虑到 promises[i] 可能是 thenable 对象也可能是普通值
        Promise.resolve(promises[i])
          .then((data) => {
            res[i] = data;
            if (++count === len) {
              resolve(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
  });
};

```

#### 8.3 async/await 和 Promise 的关系

- async/await 是消灭异步回调的终极武器。
- 但和 Promise 并不互斥，反而，两者相辅相成。
- 执行 async 函数，返回的一定是 Promise 对象。
- await 相当于 Promise 的 then。
- tru...catch 可捕获异常，代替了 Promise 的 catch。

### 9、 浏览器的垃圾回收机制

这里看这篇文章即可：[「硬核 JS」你真的了解垃圾回收机制吗](https://juejin.cn/post/6981588276356317214)。

总结一下：

有两种垃圾回收策略：

- **标记清除**：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。
- **引用计数**：它把**对象是否不再需要**简化定义为**对象有没有其他对象引用到它**。如果没有引用指向该对象（引用计数为 0），对象将被垃圾回收机制回收。

标记清除的缺点：

- **内存碎片化**，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。
- **分配速度慢**，因为即便是使用 First-fit 策略，其操作仍是一个 O(n) 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。

解决以上的缺点可以使用 **标记整理（Mark-Compact）算法 **，标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存（如下图） ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb543f2fdc634e29add495b8f2ff048f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

引用计数的缺点：

- 需要一个计数器，所占内存空间大，因为我们也不知道被引用数量的上限。
- 解决不了循环引用导致的无法回收问题。

V8 的垃圾回收机制也是基于标记清除算法，不过对其做了一些优化。

- 针对新生区采用并行回收。
- 针对老生区采用增量标记与惰性回收。

### 10、 实现一个 EventMitter 类

EventMitter 就是发布订阅模式的典型应用：

```typescript
export class EventEmitter {
  private _events: Record<string, Array<Function>>;

  constructor() {
    this._events = Object.create(null);
  }

  emit(evt: string, ...args: any[]) {
    if (!this._events[evt]) return false;

    const fns = [...this._events[evt]];
    fns.forEach((fn) => {
      fn.apply(this, args);
    });

    return true;
  }

  on(evt: string, fn: Function) {
    if (typeof fn !== "function") {
      throw new TypeError("The evet-triggered callback must be a function");
    }
    if (!this._events[evt]) {
      this._events[evt] = [fn];
    } else {
      this._events[evt].push(fn);
    }
  }

  once(evt: string, fn: Function) {
    const execFn = () => {
      fn.apply(this);
      this.off(evt, execFn);
    };
    this.on(evt, execFn);
  }

  off(evt: string, fn?: Function) {
    if (!this._events[evt]) return;
    if (!fn) {
      this._events[evt] && (this._events[evt].length = 0);
    }

    let cb;
    const cbLen = this._events[evt].length;
    for (let i = 0; i < cbLen; i++) {
      cb = this._events[evt][i];
      if (cb === fn) {
        this._events[evt].splice(i, 1);
        break;
      }
    }
  }

  removeAllListeners(evt?: string) {
    if (evt) {
      this._events[evt] && (this._events[evt].length = 0);
    } else {
      this._events = Object.create(null);
    }
  }
}
```


作者：vortesnail
链接：https://juejin.cn/post/7061588533214969892
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。