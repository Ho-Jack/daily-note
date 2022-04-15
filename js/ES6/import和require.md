---
title: import和require
date: 2020-05-22  11:31:38
tags: [JS, ES6, 开发笔记]
---

# import和require



- ### ES6(`ES6 Modules` 模块):         export  default/export            import 
- ### Commonjs模块:                       module.exports/exports        require   

## import 和require的区别

- ### require： 1.运行时加载（同步加载，性能低）     2.拷贝到本页面   3.全部引入


- ### import： 1.编译时加载（异步加载，性能高）      2.只引用定义     3.按需加载

## ES6的模块化方法:

> 语法：**export  default/export            import** 
>
> import 语句用于导入由另一个模块导出的绑定。无论是否声明了 strict mode，导入的模块都运行在严格模式下。import语句不能在嵌入式脚本中使用。

### import的几种写法：

> - defaultExport： 将引用模块默认导出的名称。
> - module-name：要导入的模块。这通常是包含模块的 .js 文件的相对或绝对路径名，可以不包括 .js 扩展名。某些打包 工具可以允许或要求使用该扩展；检查你的运行环境，只允许单引号和双引号的字符串。
> - name：引用时将用作一种命名空间的模块对象的名称。
> - export，exportN： 要导入的导出名称
> - alias，aliasN： 将引用指定的导入的名称。

- 导入**默认值**:   

  > 只适用默认导出	`export defalut`
  >
  > defaultExport 随便设，可以设置任意字面量，但不推荐
  >
  > defaultExport一般都是根据文件名或导入的变量名来设

  ```js
   import  defaultExport  from “module-name”;
  ```

- **导入整个模块的内容**:  

  > 将 es6 模块的所有命名输出以及defalut输出打包成一个对象赋值给**重命名变量**
  >
  > 使用范围广，export和export default均适应
  >
  > 默认导出需要，xxx.default，往里拿default才能使用

  ```js
   import * as name from “module-name”;
  ```

  

- 导入多个导出:     

   > 只能用于`export`导出多个，对`export default `无效
   >
   > 需要用几个就解构几个，也可以单个导出 `import { export1 } from “module-name”; `
   
   ```js
   import { export1 , export2 } from “module-name”; 
   ```


- 导入时重命名导出:   

  ```JS
   import { export as alias } from “module-name”;
  ```

- 导入时重命名多个导出:
  
  ```js
 import { export1, export2 as alias2 , [...] } from “module-name”;
  
   import defaultExport, { export [ , [...] ] } from “module-name”;
  
   import defaultExport, * as name from “module-name”;
  ```
  
- 仅为副作用导入模块:   
  
  ```js
    import “module-name”; 
    //（运行模块中的全局代码）
    //(模块设置了一些可供其他模块使用的全局状态,这些模块可能没有任何出口)
  ```
  
- （返回一个 Promise 对象。）
  
  ```js
  import()    
  ```
  
  例：  
  
  ```js
  if(x === 2){
      import('myModual').then(  MyModual=>{ 
          new MyModual(); 
      }) 
  }
  ```
  
  （引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。没办法像require样根据条件动态加载。 于是[提案](https://link.juejin.im?target=https://github.com/tc39/proposal-dynamic-import)引入import()函数，编译时分析if语句,完成动态加载。）



### export的几种方法：

> - 默认导出export default  （单个导出，但对象能导出多个）
> - 命名导出export   （多个导出）

#### 默认导出export default

> 导入限制：
>
> 1、默认导入：` import  defaultExport  from “module-name”;`   
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

  

#### 命名导出 export   

> 命名导出，对导入有限制：
>
> 1、多个导入：`import { export1 , export2 } from “module-name”; `   导出文件必须有多个导出
>
> 2、导入整个模块并重命名： `improt * as X from 'module-name'`    需要对`X`解构

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

```javascript
//导出1-变量声明
export  const  x={}  
//导出2-对象
const  x={} 
export{ x } 
```

- 单个导出在引用的时候只能通过 `* as XX ` 来导入

```javascript
//单个导出只能用这种形式
import *as One from './exportOne.js'

//以下三种均无效
import {exportOne} from './exportOne.js' //无效
import exportOne from './exportOne.js'   //无效
import './exportOne.js'                  //无效
```



##### 命名导出-多个（变量声明、函数声明、函数表达式、类）

- 导出形式1-一个个导出（推荐）

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

- 导出形式2 -导出字面量对象

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
  
  export{
    x1,
    x2,
    x3,
    x4
  }
  ```

  

- 多个导出，以下2种形式都可以导入

```js
//引入形式1
import  * as  X  from  'xx'  
//使用
X.x1
//引入形式2-解构
import {x1,x2}  from  'xx'  
//使用
x1
```





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



例：

- dep.js

  ```javascript
  module.exports = {
          foo: function () { },
          bar: 'a'
      }
  ```

-  app.js

  ```javascript
   var dep = require('dep')
  ```

  

### 问题探讨：

### 1、import与webpack的关系？

import作为ES6 模块化方法，在经过webpack打包编译后转成ES5

- `import`经过`webpack`打包以后变成一些`Map`对象，`key`为模块路径，`value`为模块的可执行函数；
- 普通import：代码加载到浏览器以后从入口模块开始执行，其中执行的过程中，最重要的就是`webpack`定义的`__webpack_require__`函数，负责实际的模块加载并执行这些模块内容，返回执行结果，其实就是读取`Map`对象，然后执行相应的函数；
- 特殊的异步方法（import('xxModule')）：它会单独打成一个包，采用动态加载的方式，具体过程：当用户触发其加载的动作时，会动态的在`head`标签中创建一个`script`标签，然后发送一个`http`请求，加载模块，模块加载完成以后自动执行其中的代码，主要的工作有两个，更改缓存中模块的状态，另一个就是执行模块代码。（懒加载）

##### 拓展：webpack+import()   懒加载

> 可以实现：Vue组件懒加载（路由懒加载也是同理）
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

- `import X from 'x'`  默认导出的固定导入写法
- `import {x1,x2} from 'x'` 命名导出的固定导入写法

### 4、Vue单文件组件SFC为什么使用`export default{}`

- 单文件组件(.vue文件)将被vue-loader解析组装成一个ES Module，默认导出一个Vue.js 组件选项的对象

- 创建Vue实例的构造函数`Vue()`需要传入option api (选项对象)作为参数 `var vm = new Vue({  // 选项 })` 默认导出的选项对象将在入口文件传入new Vue进行实例化

  Vue2使用的是option Api（选项API） ，`export default{}`导出的是对象，这个对象是 Vue 实例的选项对象，以便于在其它地方可以使用 import 引入。

  
  
  原因：默认导入简单 `import  defaultExport  from “module-name”;`   defaultExport  就是要导出的**Vue选项对象**
  
  如果是命名导出，导入时要用   ` import * as name from “module-name”;`   需要导出整个模块并重命名
  
  
  
  

### 5、为什么有大佬说不要使用默认导出export default，要用命名导出export

默认导入：` import  defaultExport  from “module-name”;`   

默认导出的`defaultExport `可以随意取名，大部分人应该是根据文件名来取的

个人感觉：这是个问题，也可以不是问题，养成好的编程习惯就ok

拓展：由于Vue组件是默认导出，所以在引入组件的时候就可以进行重新命名组件名称(不推荐)

```
import Acomponent  from 'myComponent.vue'
import Bcomponent  from 'myComponent.vue'
```

### 6、组件库按需加载是什么原理

> 原理：组件库将不同组件打包时拆分不同JS文件并暴露install方法，提供外部应用通过Vue.use单独引入

这涉及了webpack打包知识，正常webpack打包出来的JS 是无法被其他应用导入，需要更改配置



### 7、webpack打包的js如何被ES6 import和commontjs 引入



