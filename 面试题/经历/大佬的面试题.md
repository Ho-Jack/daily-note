## 高德

### 高德一面：

- 先聊项目，亮点、遇到的困难，做了哪些性能优化
- ts里interface和type的比较
- react组件通信的方式
- react-redux里的connect函数做了什么
- 如何向generator的next方法中传入参数
- Symbol通常用来做什么
- 编程题：链表翻转
- 八股文：flex，http缓存，原型链，react fiber理解，setState同步异步问题，React scheduler模块的原理

```
//题目继承和原型
function person() {
    this.age = 10;
}
person.prototype = {
    age: 1,
    getAge: function() {
        console.log(this.age);
    }
}
var p1 = new person();
var p2 = new person();
p1.getAge(); // ?
p2.age = 12;
person.prototype.age = 15;
p2.getAge();//?
person.__proto__.age = 18;
p1.__proto__.getAge();//?
p1.__proto__.age = 20;
person.prototype.getAge();//?
```



### 高德二面：

三道编程题：函数柯里化，浏览器事件循环，实现长列表滚动优化



### 高德三面：

讲项目，页面组件如何拆分

编程题：合并两个排序数组。。。





## 字节教育部门

### 字节一面：

- css布局问题，移动端抽屉css如何实现
- 原型链讲一讲
- 进程、线程，浏览器有哪些进程和线程，他们是如何协作的
- vue-router两种模式的区别
- node如和开启多进程
- 编程题：

promise实现ajax请求结果缓存

5万个div插入页面如何优化

实现removeElement(elm)方法，从dom树中删除elm



### 字节二面：

- 讲项目
- Taro如何处理多端兼容，Taro原理
- webpack treeshaking原理
- esModule和commonjs区别，比较深入
- cookie有哪些属性，分别用来干什么
- 跨域解决方案，手写jsonp
- xss，csrf攻击和防御措施
- 算法：动态规划-数组最大子段和，合并两个排序数组
- 编程题

- - 实现redux的compose方法



### 字节三面

- 讲项目
- 如何实现牛客的代码编辑器两端实时刷新的功能，需要注意和值得优化的点
- 如何实现网页扫码登录的功能
- jsbridge的实现原理
- 小程序项目中做了哪些性能优化
- 长列表滚动优化的方法
- 活动页面项目如何从技术的角度优化业务效果（答：性能优化、埋点+行为分析）



## 美团大象

### 美团一面：

- 讲项目，涉及到接口设计，token鉴权的细节，性能优化
- vue keep-alive原理，响应式原理和依赖收集的过程
- Vue computed和watch的原理、使用场景
- 用node做过什么
- 编程题：

实现urlParser解析url字符串，尽量保证健壮性

koa的洋葱模型如何实现的，写出koa-compose方法





### 美团二面：

- 讲项目，讲项目
- react为什么去掉componentWillReceiveProps这个生命周期
- webpack loader、plugin的工作原理
- 用css画一个🏠
- 编程题：快速排序





### 美团三面：

- 讲项目
- 算法题：去除字符串中连续重复的字符，二叉树的路径和
- 编程题：[{id: 1, parentId: 2}, {id: 2, parentId: null}]对象数组转换成树形结构





## 百度企业智能

### 百度一面：

- 编程题：

1. 1. 原型链相关
   2. 实现urlParser
   3. 实现promise.all
   4. 数组去重

- 事件循环相关的题
- 如何设计一个弹窗组件



### 百度二面：

- 浏览器缓存相关，浏览器渲染过程，http 状态码
- this指向问题，浏览器垃圾回收
- 跨域解决方案
- xss，csrf
- http0.9 - http3.0讲一讲
- 编程题：

防抖截流实现

- 算法题：

把一个整数转换成多个质数的乘积





### 百度三面：

- tcp三次握手
- 浏览器工作原理，一直在聊这个





## 猿辅导

### 一面

- 讲项目
- Taro如何实现兼容多个小程序，如何处理React 到小程序的转换
- Vue $nextTick原理
- Redux内部实现
- js面向对象相关的问题，结合this指向
- 算法题：leetcode1021原题（给定正整数 N，返回小于等于 N 且具有至少 1 位重复数字的正整数的个数。）

```
function B(){}
B.say = function() {console.log(1)} 
B.prototype.say = () => console.log(2)

new B().say() // ？

B.say()  // ？

(new B().say)() // ？

new B.say()  // ？
```



### 二面

- 讲项目
- 浏览器垃圾回收，堆、栈内存区别
- DNS查询的过程，递归查询、迭代查询
- http2.0的变化
- js基础：词法作用域、变量提升
- 编程题：实现一个多级菜单（主要用到组件的递归）



### 三面

- 讲项目
- 算法题

- - 合并区间leetcode56原题
  - 搜索二维矩阵leetcode240原题
  - 计算字符串中子串出现的次数
  - 输入数组，最大的与第一个元素交换，最小的与最后一个元素交换，输出数组



## 滴滴橙心

### 一面

- es6新增了哪些特性
- webpack优化
- vite的优势、内部实现
- 用过哪些设计模式
- 多个if else如何优化
- js的装饰器如何使用
- 使用过哪些react-hooks



### 二面

- Vueloader的原理
- webpack打包过程
- Vue的template如何拿到vue实例中的数据





# -------------

- 项目问的很多，简历里写的技能和亮点也会问
- 常规的前端基础知识js/css，html相关的问题很少。js引擎工作原理和浏览器的工作原理要有一定的了解
- 框架，会问你擅长的是哪一个框架，然后围绕这个框架问，原理、性能优化都问的比较深，最好是Vue、React都会
- 性能优化
- 前端工程化，类似于webpack、错误日志、性能监控等方面
- 编程题，都比较简单主要考察临场发挥能力，需要对常见的JS API和DOM API都比较熟悉，和浏览器事件循环相关的题100%出现
- 算法题：leetcode 简单或者中等难度，大部分都比较简单，hot100一定要刷