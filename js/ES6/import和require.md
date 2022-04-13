---
title: import和require
date: 2020-05-22  11:31:38
tags: [JS, ES6, 开发笔记]
---

# import和require



- es6(`ES6 Modules` 模块):         export  default/export            import 
- commonjs模块:                       module.exports/exports        require   



### import

> 特点： 1.运行时加载  2.拷贝到本页面   3.全部引入

### require

> 特点： 1.编译时加载  2.只引用定义     3.按需加载

## ES6的导出方法:

> import 语句用于导入由另一个模块导出的绑定。无论是否声明了 strict mode，导入的模块都运行在严格模式下。import语句不能在嵌入式脚本中使用。

### import的几种写法：

- 导入**默认值**:   

  > defaultExport 随便设，可以设置任意字面量，但不推荐

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

> - defaultExport： 将引用模块默认导出的名称。
> - module-name：要导入的模块。这通常是包含模块的 .js 文件的相对或绝对路径名，可以不包括 .js 扩展名。某些打包 工具可以允许或要求使用该扩展；检查你的运行环境，只允许单引号和双引号的字符串。
> - name：引用时将用作一种命名空间的模块对象的名称。
> - export，exportN： 要导入的导出名称
> - alias，aliasN： 将引用指定的导入的名称。

 

### export的几种方法：

#### 默认导出export default

> 导入限制：
>
> 1、默认导入：` import  defaultExport  from “module-name”;`   
>
>   `defaultExport `可以随意取名（这是个问题，也可以不是问题，养成好的编程习惯就ok）
>
> 2、导入整个模块并重命名： `improt * as X from 'module-name'`  但是需要` X.defualet`来访问

- 对象

  ```javascript
  export default {}
  ```

- 变量

  ```javascript
  //对象
  const XX={}   
  //函数表达式
  const XX=()=>{ }   
  
  export default XX
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

##### 命名导出-单个

```javascript
//导出1
export  const  x={}  
//导出2
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



##### 命名导出-多个对象集合

在xx.js下

```javascript
//导出形式1（推荐）
export  const  x1={}  
export  const  x2={}
//导出形式2
 const  x1={} 
 const  x2={}
 export{
  x1,
  x2   
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



##### 默认导出-单个变量

```javascript
const x ={}  
export default x

//以下这种会报错
export default const x = {}   //错误
//命名导出单个 就能实现上面这种，，但引入方式得改调整
export  const  x={}  
```

导入名称可以随便设,`x`和`xx是同一值

```javascript
import x from './xx.js'

import xx from './xx.js'
```

导入整个模块重名,需要通过 `xx.default`获取模块

```javascript
import * as xxx from './xx.js'
//使用
xxx.default === const x ={}  
```

##### 默认导出-单个函数

```javascript
//形式1
export default function Fn(){

}
//形式2-函数表达式
const Fn =()=>{
    
}
export default Fn

//错误导出函数表达式
export default const Fn =()=>{
    
}
//只能用命名导出，但引入方式得改调整
export const Fn =()=>{
    
}
```

##### 默认导出-类

```javascript
export default class xx {}
//错误
export default const xx = {}
```



##### 默认导出-对象（导出Vue组件）

> 形如： `export default {}`

- 导出

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

- 引入

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

总结：

由于Vue组件是默认导出，所以在引入组件的时候就可以进行重新命名组件名称(不推荐)

```
import Acomponent  from 'myComponent.vue'
import Bcomponent  from 'myComponent.vue'
```

##### webpack+import()   懒加载-实现异步组件

> Webpack会处理在代码中所有被import()的模块，都将打成一个单独的包，放在chunk存储的目录下。在浏览器运行到这一行代码时，就会自动请求这个资源，实现异步加载



## Commonjs的导出方法

> commonjs:  require   export/module.export

### require:  模块导入
- 核心模块:            `

  ```js
  var fs = require('fs')   
  ```

- 第三方模块: 

  ```js
  //先下载对应模块     npm install markedvar           
  marked = require('marked')    
  ```

- 自己写的：                                               

  ```js
    var foo = require('./foo.js')
  ```

- 自己写的（可以省略后缀名 .js） 
  
  ```js
    var foo = require('./foo.js')
  ```
  
  

###  exports： 模块导出

#### 导出多个成员:

#####  `module.exports.xx`

```js
  module.exports.a = 123
  module.exports.b = 456
  module.exports.c = 789
```

##### `exports.x`            （推荐）  

>  **`exports === module.exports`**

```js
exports.a = 123
exports.b = 456
exports.c = 789
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

组件库按需加载是什么原理

webpack打包的js如何被ES6 import和commontjs 引入





