---
title: import和require
date: 2020-05-22  11:31:38
tags: [JS, ES6, 开发笔记]
---



# 前端模块化方法import和require，别再瞎用import方法了!

> 整理和归类是ES6 Modules模块化的方法之间的差异，用最简洁的语言告诉你import该如何用！原创总结！如果看完还不懂什么情况用export，什么情况用export default！什么情况用`import X from 'x'` 什么时候用 `import {x1,x2} from 'x'`请来打我！
>
> 阅读这篇文章你可以了解到：
>
> 1、import 和require的区别和如何使用他们
>
> 2、什么情况用export，什么情况用export default
>
> 3、什么情况用`import X from 'x'` 什么时候用 `import {x1,x2} from 'x'`
>
> 4、Vue单文件组件SFC为什么使用`export default{}`
>
> 5、为什么有大佬说不要使用默认导出export default，要用命名导出export
>
> 6、webpack打包后的Js如何被import和require引入

## import和require的语法区别

- ### ES6(`ES6 Modules` 模块):         export  default/export            import 
- ### Commonjs模块:                       module.exports/exports        require   

## import 和require的区别

- ### require： 1.运行时加载（同步加载，性能低）     2.拷贝到本页面   3.全部引入


- ### import： 1.编译时加载（异步加载，性能高）      2.只引用定义     3.按需加载

## ES6的模块化方法:

> 导入导出语法：**export  default/export            import** 
>
> 无论是否声明了 strict mode，导入的模块都运行在**严格模式**下。
>
> ES6导出模块主要分为：1、 export default默认导出   2、export命名导出

### import的几种写法：

> 下面会用到的几个伪代码名词解释
>
> - defaultExport： 将引用模块默认导出的名称。
> - module-name：要导入的模块。这通常是包含模块的 .js 文件的相对或绝对路径名，可以不包括 .js 扩展名。某些打包 工具可以允许或要求使用该扩展；检查你的运行环境，只允许单引号和双引号的字符串。
> - name：引用时将用作一种命名空间的模块对象的名称。
> - alias，aliasN： 将引用指定的导入的名称。

- 导入**默认值**:   

  > 只适用默认导出	`export defalut`
  >
  > defaultExport 随便设，可以设置任意字面量，但不推荐
  >
  > defaultExport一般都是根据文件名或导入的变量名来设

  ```js
   import  defaultExport  from 'module-name';
  ```

- 导入**整个**模块的内容:  

  > 将 es6 模块的所有命名输出以及defalut输出打包成一个对象赋值给**重命名变量**
  >
  > 使用范围广，export和export default均适应
  >
  > 默认导出需要，xxx.default，往里拿default才能使用

  ```js
   import * as name from 'module-name';
  ```

  

- 导入**多个**导出:     

   > 只能用于`export`导出多个，对`export default `无效
   >
   > 需要用几个就解构几个，也可以单个导出 `import { export1 } from 'module-name'; `
   
   ```js
   import { export1 , export2 } from 'module-name'; 
   ```


- 导入时重命名导出:   

  ```JS
   import { export as alias } from 'module-name';
  ```

- 导入时重命名多个导出:
  
  ```js
 import { export1, export2 as alias2 , [...] } from 'module-name';
  
   import defaultExport, { export [ , [...] ] } from 'module-name';
  
   import defaultExport, * as name from 'module-name';
  ```
  
- 仅为副作用导入模块:   
  
  > 模块仅为副作用（中性词、无贬义含义）而导入，而不是导入模块中的任何内容，这将**运行模块中的全局代码**，但实际上不导入任何值
  
  ```js
    import 'module-name'; 
    //（运行模块中的全局代码）
    //(模块设置了一些可供其他模块使用的全局状态,这些模块可能没有任何出口)
  ```
  
  例：
  
  ```html
  //外部js文件（没有任何export导出出口）
  // var  myModule='这是副作用'  //无效
  window.myModule='这是副作用'
  
  //vue中导入副作用模块
  <script>
  import './myModule.js'  //导入副作用模块
  export default{
   mounted(){
      console.log(myModule)   //打印 -'这是副作用'
   }
  }
  </script>
  ```
  
  
  
- 异步导入（返回一个 Promise 对象。）
  
  > 可以在函数内动态导入，由于异步有时候需要配合async/await使用
  
  ```js
  import()    
  ```
  
  例：  
  
  ```js
   import('./myModule.js').then(  res=>{ 
          //res 就是要导入的内容
   }) 
  ```
  
  

### export的几种方法：

> - **默认**导出export default  （单个导出，但对象能导出多个）
> - **命名**导出export   （多个导出）

#### 默认导出export default

> 导入限制：
>
> 1、默认导入：` import  defaultExport  from 'module-name';`   （推荐）
>
>   默认导出的`defaultExport `可以随意取名（这是个问题，也可以不是问题，养成好的编程习惯就ok）
>
> 2、导入整个模块并重命名： `improt * as X from 'module-name'`  但是需要` X.defualet`来访问



##### 默认导出-对象（导出多个）

> 形如: `export default {}`
>
> 作用：默认导出多个（字面量、函数声明、类）
>
> Vue在单文件组件SFC正是用这种形式导出组件

- 通过默认导出对象，来导出多个不同类型的内容

  ```javascript
  //可能有多个函数
  //函数声明
  function Fn1 (){   }  
  //函数表达式
  const Fn2 = () => {   }  
  
  export default{  Fn1,Fn2   }
  
  //实际是ES6对象简写
  export default{  
      Fn1: function (){   }  ,
      Fn2: Fn2 
  }
  ```

  如何引入默认导出的对象

  ```javascript
  //引入形式1
  import  XX form ' '
  XX.Fn1()    
  XX.Fn2()
  //引入形式2
  import * as XX form ' '
  XX.default.Fn1()    
  XX.default.Fn2()
  ```

  默认导出对象，导出的是对象需要再往对象里拿一层，才能拿到对象的属性，如：`XX.Fn1()`或`XX.default.Fn1()    `


##### 默认导出-字面量

- 变量声明和函数表达式，都只能导出对于的**字面量**

  ```javascript
  //变量声明
  const XX={}   
  //函数表达式
  const XX=()=>{ }   
  //导出字面量
  export default XX
  ```

- 默认导出不能导出变量声明，命名导出可以

  ```javascript
  //默认导出，不能导出变量声明
  export default const x = {}   //错误
  
  //导出变量声明只能用，命名导出
  export  const  x={}     //正确
  ```

- 默认导出不能导出函数表达式，命名导出可以

  ```javascript
  //默认导出不能导出函数表达
  export default const XX = ()=>{ }   //错误
  
  //函数表达式只能用，命名导出
  export const XX = () => {};        //正确
  ```


##### 默认导出-函数声明

- 函数声明

  ```javascript
  export default function X(){
  
  }
  ```

##### 默认导出-类

- 类

  ```javascript
  export default class xx {}
  //错误
  export default const xx = {}
  ```


除了默认导出对象外（默认导出字面量、函数声明、类），其他通过` import  defaultExport  from 'module-name'`导入的模块，defaultExport  就是对导入的内容，函数使用:`defaultExpor()` ; 类使用：`new defaultExport ({x1:1,x2:2})`;

#### 命名导出 export   

> 命名导出，对导入有限制：
>
> 1、多个导入：`import { export1 , export2 } from 'module-name'; `   导出文件必须有多个导出
>
> 2、导入整个模块并重命名： `improt * as X from 'module-name'`    X是导出内容打包成一个对象,需要对X解构

- 对象

  ```javascript
  export{}
  ```

- 变量

  ```javascript
  export const XX ={}
  ```

- 函数

  ```javascript
  export function  XX(){ }
  ```


例：

##### 命名导出-单个 （不推荐）

> 单个导出在引用时候只能通过 **`  import * as name from 'module-name';`**来导入

```javascript
//导出单个1-变量声明
export  const  x1={}  
//导出单个2-对象
const  x2={} 
export{ x2 } 

//导出单个3-函数声明
export function x4(){
    
}
//导出单个4-函数表达式
export  const  x34= ()=>{
    
}
```

- 单个导出在引用的时候只能通过`  import * as name from 'module-name' `导入

```javascript
//单个导出只能用这种形式
import *as One from './exportOne.js'

//以下三种均无效
import {exportOne} from './exportOne.js' //无效
import exportOne from './exportOne.js'   //无效
import './exportOne.js'                  //无效
```



##### 命名导出-多个

> 命名导出，可以导出**变量声明、函数声明、函数表达式、类**

###### 命名多个导出形式1：一个个单独导出（推荐）

```javascript
//变量声明
export  const  x1={}  
//函数声明
export function x2(){
    
}
//函数表达式
export  const  x3= ()=>{
    
}
//类
export class x4{
    
}
```

###### 命名多个导出形式2 ：导出字面量对象

```javascript
//变量声明
const  x1 = {}
//函数声明
function x2 (){
    
}
//函数表达式
const  x3= ()=>{
    
}
//类
class x4{
    
}
//导出字面量对象
export{
  x1,
  x2,
  x3,
  x4
}
```



###### 命名多个导出➡️➡️导入形式

- 引入形式1-全部导入

  ```javascript
  import  * as  X  from  'xx'  
  //使用函数
  X.x1()
  ```

- 引入形式2-解构（推荐）

  ```javascript
  import {x1,x2}  from  'xx'  
  //使用函数
  x1()
  ```

  

## Commonjs的模块化方法

> commonjs:  require   export/module.export

### require:  模块导入
- 核心模块:            `

  ```js
  var fs = require('fs')   
  ```

- 第三方模块: 

  ```js
  //先下载对应模块     npm install markedvar           
  var marked = require('marked')    
  ```

- 自己写的：                                               

  ```js
    var foo = require('./foo.js')
  ```

- 自己写的（可以省略后缀名 .js） 
  
  ```js
    var foo = require('./foo')
  ```
  
  

###  exports： 模块导出

#### 导出多个成员:

#####  `module.exports.xx`

```js
  module.exports.a = 123
  module.exports.b = []
  module.exports.c = {}
```

##### `exports.x`            （推荐简写）  

>  **`exports === module.exports`**

```js
exports.a = 123
exports.b = {}
exports.c = []
exports.fn = function () { }
```

#### 导出单个成员（唯一的写法）：

##### `module.expoets=xx` 

```js
 module.exports = function (x, y) {  return x + y  }
```


注意：导出单个只能导出一次，后者会覆盖前者







### 问题探讨：

### 1、import与webpack的关系？

>  ` import  defaultExport  from 'module-name'`和`import('module-name')`经过`webpack`编译打包后最终变成了什么？在浏览器中是如何运行的？

import作为ES6 模块化方法，在经过webpack编译打包后转成ES5，通过script标签挂载JS（大概讲，webpack不同配置下可能不一样，为了向下兼容，会引入一些babel将ES6语法转为ES5）

- **普通`import`**经过`webpack`打包以后变成一些**`Map`对象**，`key`为模块路径，`value`为模块的可执行函数；

  普通import：代码加载到浏览器以后从入口模块开始执行，其中执行的过程中，最重要的就是`webpack`定义的`__webpack_require__`函数，负责实际的模块加载并执行这些模块内容，返回执行结果，其实就是**读取`Map`对象，然后执行相应的函数**；
- 特殊的**异步import方法**（import('xxModule')）：它会**单独打成一个包**，采用动态加载的方式，具体过程：当用户触发其加载的动作时，会**动态的在`head`标签中创建一个`script`标签**，然后发送一个`http`请求，加载模块，模块加载完成以后自动执行其中的代码，主要的工作有两个，更改缓存中模块的状态，另一个就是执行模块代码。（懒加载）

##### 拓展：webpack+import()   懒加载

> webpack+import() 可以实现：Vue组件懒加载（路由懒加载也是同理）
>
> Webpack会处理在代码中所有被import()的模块，都将打成一个单独的包，放在chunk存储的目录下。在浏览器运行到这一行代码时，就会自动请求这个资源，实现异步加载

- Vue父组件

```html
<template>
    <div>
       <Child1></Child1>
       <Child2></Child2>
    </div>
</template>

<script>
export default{
components:{
   Child1:()=>import(./child1.vue),
   Child2:()=>import(./child2.vue)
 }
} 
</script>
```

webpack会编译处理代码中，被`import()`引用的模块，比如`chulid1.vue`这个组件将会被打包成一个单独JS文件，只有被访问的组件，才会下载对于的js，懒加载，这样能有效减少首屏加载时间。

### 2、什么情况用export，什么情况用export default

- export default导出只有**一个**对象、函数声明、变量字面量（函数表达式的字变量、变量声明的字面量、）、类

- export一般是**混合多种类**导出（变量声明、函数声明、函数表达式、类），单个也可以但是不推荐

### 3、什么情况用`import X from 'x'` 什么时候用 `import {x1,x2} from 'x'`

- `import X from 'x'`  默认导出的推荐导入写法
- `import {x1,x2} from 'x'` 命名导出的推荐导入写法

### 4、Vue单文件组件SFC为什么使用`export default{}`

- 单文件组件(.vue文件)将被vue-loader解析组装成一个ES Module，默认导出一个Vue.js 组件选项的对象

- 创建Vue实例的构造函数`Vue()`需要传入option api (选项对象)作为参数，也就是 `var vm = new Vue({  // 选项 })` 默认导出的选项对象将在入口文件传入new Vue进行实例化

  Vue2使用的是option Api（选项API） ，`export default{}`导出的是对象，这个对象是 Vue 实例的选项对象，以便于在其它地方可以使用 import 引入。

  
  
  原因：默认导入简单 `import  defaultExport  from 'module-name';`   defaultExport  就是要导出的**Vue选项对象**
  
  如果是命名导出，导入时要用   ` import * as name from 'module-name';`   需要导出整个模块并重命名
  
  
  
  

### 5、为什么有大佬说不要使用默认导出export default，要用命名导出export

默认导入：` import  defaultExport  from 'module-name';`   

默认导出的`defaultExport `可以随意取名，大部分人应该是根据文件名来取的

个人感觉：这是个问题，也可以不是问题，养成好的编程习惯就ok

拓展：由于Vue组件是默认导出，所以在引入组件的时候就可以进行重新命名组件名称(不推荐)

```
import Acomponent  from 'myComponent.vue'
import Bcomponent  from 'myComponent.vue'
```





### 6、webpack打包后的Js如何被import和require引入

> 为什么同样是webpack打包的JS，Element-UI等组件库的可以被其他引用引入，而自己项目的js却不行？
>
> 涉及到webpack打包output配置模块的`library`和`libraryTarget` 属性设置

默认情况下，webpack打包的JS是可以看作是一个**自执行函数**，是无法被ES6 import和commontjs 引入的，只能通过挂在**srcript标签**的形式引入

如果想支持被ES6 import和commontjs 引入，需要修改webpack打包output模块的`library`和`libraryTarget` 属性设置，设置为commonjs、commonjs2、umd等都能被ES6 import和commontjs 引入

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



### 7、组件库按需加载是什么原理

- 1、涉及组件库的打包

  原理：组件库将不同组件打包时拆分不同JS文件并暴露install方法，提供外部应用通过Vue.use单独引入

  这涉及了webpack打包知识，正常webpack打包出来的JS 是无法被其他应用导入，需要更改webpack打包配置，

  

  

  

- 2、涉及外部应用引入的方式和 [babel-plugin-import]插件的使用