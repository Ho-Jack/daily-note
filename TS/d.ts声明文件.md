## d.ts

> 声明文件(TypeScript Declaration File): `*.d.ts`
>
> `.d.ts`为后缀

### 作用：原生 js 的声明文件,使原生JS可以在TS中调用

主流的库都是 JS编写的，并不支持类型系统。不需要用TS重写主流的库，这个时候我们只需要编写仅包含类型注释的 d.ts 文件，在 TS 代码中，可以在仍然使用纯 JS 库的同时，获得静态类型检查的 TS 优势；

### 支持原生JS的声明文件方案：

-  DefinitelyTyped（需要下载tsd工具来管理Typescript 定义的库）
- typings （需要下载typings工具来管理Typescript 定义的库）
- @types  （TS2.0后推荐）

### @Types

#### npm下载语法：`npm install @types/xxx --save-dev`

#### @types优势：

> @types充分利用npm进行管理和维护,在`node_modules/@types`文件夹下如果有对应的声明文件，则不需要添加额外的@types/xx,即可正常使用（绝大多数公共库都已经支持@types）

- 不需要使用另外一套系统来管理类型定义

- TypeScript 将会默认的查看` ./node_modules/@types` 文件夹，自动从这里来获取模块的类型定义

- 类型定义不在` ./node_modules/@types` 文件夹中，可以使用 typesRoot 来配置，只有在 typeRoots 中的包才会被包含,配置如下:

  tsconfig.json配置文件

  ```javascript
  {
     "compilerOptions": {
         "typeRoots" : ["./typings"],   // 声明文件目录，默认node_modules/@types
         "types":[],                    // 声明文件包，[]则不会包含任何包。
     }
  }
  ```

  如果使用 typesRoot 来配置，只有在 typeRoots 中的包才会被包含；

  如果配置了 types，则只有列出的包才会包含

### *.d.ts 和@types的区别

`@types`是`npm`的一个分支，下载后在` /node_modules/@types` 文件夹下用来存放`*.d.ts`文件，如果对应的`npm`包存放在`@types`中，要使用必须下载！如果是自己本地的`*.d.ts`声明文件，则和@types没有任何关系！

如果相关依赖包没有对应的`@types`就需要自己手写

### 书写声明文件

库的使用场景主要有以下几种：

- 全局变量：通过 <script> 标签引入第三方库，注入全局变量
- npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
- UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
- 直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
- 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
- 模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构