# 详细解释webpack的libraryTarget选项各个值的含义

| libraryTarget配置 | 作用                            | 使用范围                                                     |
| ----------------- | ------------------------------- | ------------------------------------------------------------ |
| var               | 分配给一个library设置的变量     | 只能在browser环境                                            |
| this              | 产生一个this的变量              | 只能在browser环境                                            |
| window            | 分配给this的一个属性            | 可以在浏览器环境、node环境                                   |
| global            | 分配给global一个属性            | node、需要配置target为node保证在node环境，不然还是设置带window对象上 |
| commonjs          | 分配给exports一个属性           | 用于CommonJS环境                                             |
| commonjs2         | 分配给module.exports一个属性    | 用于CommonJS环境，output.library会被忽略                     |
| AMD               | 将library暴露为一个AMD模块      | node环境无法使用                                             |
| umd               | 保证library在全部环境都可以使用 | 所有模式下，通常乾坤微应用就是这种模式                       |

`UMD (Universal Module Definition)`，就是一种`javascript`通用模块定义规范，让你的模块能在`javascript`所有运行环境中发挥作用。(主流`javascript`模块规范了，如`CommonJS`, `AMD`, `CMD`等)



> 以下介绍均使用配置项 `library: '$common'`

- `var` 暴露一个用var 定义的library设置的变量。在node环境下不支持

```
var $common = function (e) {
  var t = {};
  ......
}([]).default;

```

- `window` 针对浏览器环境使用，将library设置的变量赋给window对象，其它地方与var一模一样

```
window.$common = function (e) {
  var t = {};
  ......
}([]).default;

```

- `this` 将window替换为this，其余和window一模一样

```
this.$common = function (e) {
  var t = {};
  ......
}([]).default;

```

- `jsonp` 将 library设置的变量作为 jsonp回调函数

```
$common(function (e) {
  var t = {};
  ......
}([]).default);

```

- `global`  在global对象上定义一个library设置的变量。类似于window，只是它会受target属性影响，当target为默认值web时，会在window上注册，如果你想在global上注册，必须修改target为node。

```
global.$common = function (e) {
  var t = {};
  ......
}([]).default;
// 当target属性为web（默认值是web）时，global会变为window；node时则为global

```

- `assign` 暴露一个未定义的![common变量。在node环境不支持。覆盖](https://juejin.cn/equation?tex=common%E5%8F%98%E9%87%8F%E3%80%82%E5%9C%A8node%E7%8E%AF%E5%A2%83%E4%B8%8D%E6%94%AF%E6%8C%81%E3%80%82%E8%A6%86%E7%9B%96)common变量的值

```
$common = function (e) {
  var t = {};
  ......
}([]).default;

```

- `amd` 在define方法上定义$common变量，不能用script直接引用，必须通过第三方模块RequireJS来时用

```
define("$common", [], (function () {
  return function (e) {
    var t = {};
  }([]).default
}));

```

- `commonjs` 在export对象上定义library设置的变量。在node中支持，浏览器中不支持。

```
exports.$common = function (e) {
  var t = {};
  ......
}([]).default;

```

- `commonjs2` 直接用module.export导出export，会忽略library设置的变量。在node中支持，在浏览器中不支持。

```
module.exports = function (e) {
  var t = {};
  ......
}([]).default;

```

- `umd` 该方案支持commonjs、commonjs2、amd，可以在浏览器、node中通用。

```
! function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() :
  "function" == typeof define && define.amd ? define([], t) :
  "object" == typeof exports ? exports.$common = t() :
  e.$common = t()
}(window, (function () {
  return function (e) {
    var t = {};
  }([]).default
}));
```


作者：可乐爸
链接：https://juejin.cn/post/6844904144864559117
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。