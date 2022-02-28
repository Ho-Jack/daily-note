---
title: import和require
date: 2020-05-22  11:31:38
tags: [JS, ES6, 开发笔记]
---



## import和require

>- **require**    特点： 1.运行时加载  2.拷贝到本页面   3.全部引入
>- **import**     特点： 1.编译时加载  2.只引用定义     3.按需加载
>
>- es6(`ES6 Modules` 模块):         export  default            import 
>- commonjs模块:     module.exports/exports     require   

### ES6的导出方法:

> import 语句用于导入由另一个模块导出的绑定。无论是否声明了 strict mode，导入的模块都运行在严格模式下。import语句不能在嵌入式脚本中使用。

import的几种写法：

- 导入默认值:   

  ```js
   import  defaultExport  from “module-name”;
  ```

- 导入整个模块的内容:  

  ```js
   import * as name from “module-name”;
  ```

- 导入单个导出:        
  
  ```js
     import { AA } from “module-name”;   
    
    //使用: 
     AA.xx
  ```
- 导入多个导出:     

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

 

export的几种方法：
1. ```js
   export default {}
   ```

2.  ```js
   const XX={}       
   export default XX
   ```

3. ```js
   export const XX ={}
   ```

4. ```js
   const XX=()=>{ }   
   export default XX
   ```

5.  ```js
   export function  XX(){ }
   ```

6. ```js
   //可能有多个函数
   function xx1 (){   }  
   function xx2 (){   }  
   export default{  xx1,xx2   }
   //使用
   import  XX form ' '
      XX.xx1    
      XX.xx2
   ```

例：
①导出的内容组合成一个对象返回  

```js
  import  * as  XX  from  ‘xx’  
```

   在xx.js下               


   ```js
export  const  x1={}  
export  const  x2={}
   ```



②导出这个默认 xx 的对象作为一个对象    

```js
import xx from ' xx'
```
在xx.js下   

```js
const xx ={}  
export default xx
```

 ③默认导出

在xx文件下

```js
export default{  }
```

引入

```js
import xx  from 'xx的路径'
```



## commonjs的导出方法

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

- #### 导出多个成员:

①      
```js
  module.exports.a = 123
  module.exports.b = 456
  module.exports.c = 789
```

②（推荐）  console.log(exports === module.exports) // => true

```js
exports.a = 123
exports.b = 456
exports.c = 789
exports.fn = function () { }
```



- ##### 导出单个成员（唯一的写法）：

```js
 module.exports = function (x, y) {  return x + y  }
```


注意：导出单个只能导出一次，后者会覆盖前者

 

例：

//dep.js

  ```js
    module.exports={
            foo:function(){}
            bar:‘a’ 
            }
  ```

 //app.js

   ```js
   var dep = require(‘dep’)
   ```

