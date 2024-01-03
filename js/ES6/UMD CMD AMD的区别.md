**AMD (Asynchronous Module Definition 异步模块定义)**
 commonjs是同步加载的，不适用于浏览器环境，所有有了AMD CMD； AMD是异步加载的，模块的加载不影响后面语句的运行。所有依赖这个模块的语句都定义在一个回调函数中，等 加载完之后，这个回调才会运行。AMD 的模块引入由 define 方法来定义

**CMD (Common Module Definition)**
 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。CMD 推崇依赖就近，AMD 推崇依赖前置。

**UMD (Universal Module Definition 通用规范模块)**

> `UMD` 是 `AMD` 和 `CommonJS` 的一个糅合。`AMD` 是浏览器优先，异步加载；`CommonJS` 是服务器优先，同步加载。

统一浏览器端(AMD)和非浏览器端(commonjs)的模块化方案。

1. 先判断是否支持AMD(define是否存在),存在则使用AMD方式加载模块；
2. 再判断是否支持commonjs(exports是否存在)，存在则使用commonjs模块格式
3. 前两个都不存在，则将模块公开到全局



作者：鱼丸仙仙
链接：https://juejin.cn/post/7146151385707315213
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





# js 模块化(CommonJS, AMD, UMD, CMD, ES6)



### 模块化

模块化开发是一种管理方式，一种生产方式，也是一种解决问题的方案。一个模块就是实现某个特定功能的文件，我们可以很方便的使用别人的代码，想要什么模块，就引入那个模块。但是模块开发要遵循一定的规范，后面就出现了我们所熟悉的一系列规范。

### 1. CommonJS 规范

`CommonJS` 主要用在 **`node` 开发**上，每个文件就是一个模块，每个文件都有自己的一个作用域。通过`module.exports` 暴露 `public` 成员。

此外，`CommonJS` 通过 `require` 引入模块依赖，`require` 函数可以引入 `node` 的内置模块、自定义模块和 `npm` 等第三方模块。

**定义模块：**

```js
// 定义模块 math.js
var basicNum = 0;
function add(a, b) {
  return a + b;
}
// 在这里写上需要向外暴露的函数、变量
module.exports = { 
  add: add,
  basicNum: basicNum
}
```

**加载模块：**

```js
// 引入 math.js 模块
var math = require('./math');
math.add(2, 3); // 5
```

优点：

1. 简单并且容易使用
2. 服务器端模块便于重用

缺点：

1. 同步的模块加载方式不适合在浏览器环境中
2. 不能非阻塞的并行加载多个模块

### 2. AMD 规范

`AMD` 是 (Asynchronous Module Definition) 的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

在 `AMD` 规范中，我们使用 `define` 定义模块，使用 `require` 加载模块，但是不同于 `CommonJS`，它要求两个参数：

**定义模块：**

```js
define(id?, dependencies?, factory);
```

> - `id` 是定义的模块名，这个参数是 **可选的**，如果没有定义该参数，模块名字应该默认为模块加载器请求的指定脚本的名字，如果有该参数，模块名必须是顶级的绝对的。
> - `dependencies` 是定义的模块中所依赖的 **模块数组**，也是 **可选的**，依赖模块优先级执行，并且执行结果按照数组中的排序依次以参数的形式传入 `factory`。
> - `factory` 是模块初始化要执行的函数或对象，是 **必需的**。

**加载模块：**

```js
require([module], callback);
```

第一个参数 `module`，是一个数组，里面的成员就是要加载的模块；第二个参数 `callback`，则是加载成功之后的回调函数。如果将前面的 `CommonJS` 改写成 `AMD` 形式，就是下面这样：

```js
require(['./math'], function (math) {
  math.add(2, 3);
});
```

优点：

1. 适合在浏览器环境中异步加载模块
2. 可以并行加载多个模块

缺点：

1. 提高了开发成本
2. 不符合通用的模块化思维方式

### 3. UMD 规范

`UMD` 是 (Universal Module Definition) **通用模块定义** 的缩写。`UMD` 是 `AMD` 和 `CommonJS` 的一个糅合。`AMD` 是浏览器优先，异步加载；`CommonJS` 是服务器优先，同步加载。

既然要通用，怎么办呢？那就先判断是否支持 `node` 的模块，支持就使用 `node`；再判断是否支持 `AMD`，支持则使用 `AMD` 的方式加载。这就是所谓的 `UMD`。

**示例：**

```js
(function (window, factory) {
  if (typeof exports === "object") {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(factory);
  } else {
    // 浏览器全局定义
    window.eventUtil = factory();
  }
})(this, function () {
  // do something
});
```

### 4. CMD 规范

`CMD` 是 (Common Module Definition) **公共模块定义** 的缩写。`CMD` 可能是在 `CommonJS` 之后抽象出来的一套模块化语法定义和使用的标准。

在 `CMD` 规范中，一个模块就是一个文件。

**定义模块：**

```js
define(factory);
```

`define` 接收 `factory` 参数，它可以是一个函数，也可以是一个对象或一个字符串。

> - 当 `factory` 是一个对象或是一个字符串时，表示该模块的接口就是这个对象或者字符串。
> - 当 `factory` 是一个函数时，表示是该模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。`factory` 在执行时，默认传入三个参数：`require`、`exports`、`module`。其中 `require` 用来加载其它模块，`exports` 用来向外提供模块接口。`module` 是一个对象，存储着与当前模块相关联的一些属性和方法。

**加载模块：**

我们可以通过 `SeaJs` 的 `use` 方法加载模块:

```js
seajs.use([module], callback);
```

优点：可以很容易在 `node` 中运行

缺点：依赖 `SPM` 打包，模块的加载逻辑偏重

### 5. ES6 模块化 ESM

`ES6` 模块的设计思想是尽量的 **静态化**，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。`CommonJS` 和 `AMD` 模块，都只能在运行时确定这些东西。

在 `ES6` 中，我们使用 `export` 关键字来导出模块，使用 `import` 关键字来引入模块。

**引入模块：**

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码实质是从 `fs` 模块中加载 3 个方法，其他方法不加载。这种加载称为 **“编译时加载”** 或者 **静态加载**，即 `ES6` 可以在编译时就完成模块加载，效率要比 `CommonJS` 模块的加载方式高。当然，这也导致了没法引用 `ES6` 模块本身，因为它不是对象。

**导出模块：**

```js
let firstName = 'Zhou';
let lastName = 'ShuYi';
let year = 1994;

export { firstName, lastName, year };
```

上面代码在 `export` 后面，使用大括号指定所要输出的一组变量。`export` 除了输出变量，还可以输出函数或类。

优点：容易进行静态分析

缺点：原生浏览器端还没有实现该标准

### AMD 和 CMD 的区别

> 1. 对于依赖的模块，`AMD` 是 **提前执行**，`CMD` 是 **延迟执行**。
> 2. `AMD` 推崇 **依赖前置**，`CMD` 推崇 **依赖就近**。
> 3. `AMD` 的 API 默认是一个当多个用，`CMD` 的 API 严格区分，推崇职责单一。

### ES6 模块与 CommonJS 模块的差异

> 1. `CommonJS` 模块输出的是一个 **值的拷贝**，`ES6` 模块输出的是 **值的引用**。
> 2. `CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口。
> 3. `CommonJS` 模块的 `require()` 是 **同步加载** 模块，`ES6` 模块的 `import` 命令是 **异步加载**，有一个独立的模块依赖的解析阶段。