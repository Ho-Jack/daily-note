# Tailwind /Windi  CSS  

## windi css是什么

> Windi CSS 作为 Tailwind **的按需替代品**

Windi CSS 与Tailwind  相比的优势:

- Tailwind v2.0 的完全兼容性

  > Tailwind 是一种现代化的 CSS 框架,只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。
  >
  > 意思: 样式直接写在html上即可

  1. 提供了大量的 CSS 类名，可以用于快速创建样式。

     | 类名                     | 用途                         | 示例                                       |
     | :----------------------- | :--------------------------- | :----------------------------------------- |
     | `.w-1/2`                 | 宽度 50%                     | `<div class="w-1/2">50% 宽</div>`          |
     | `.h-10`                  | 高度 10rem                   | `<div class="h-10">...</div>`              |
     | `.p-4`                   | 内边距 4rem                  | `<div class="p-4">...</div>`               |
     | `.text-center`           | 水平居中对齐                 | `<div class="text-center">...</div>`       |
     | `.bg-gray-100`           | 背景颜色                     | `<div class="bg-gray-100">...</div>`       |
     | `.flex`                  | 元素为 flex 布局             | `<div class="flex">...</div>`              |
     | `.flex-col`              | 子元素垂直排列               | `<div class="flex flex-col">...</div>`     |
     | `.items-center`          | 垂直居中对齐                 | `<div class="items-center flex">...</div>` |
     | `.text-sm`               | 文本大小                     | `<p class="text-sm">Paragraph</p>`         |
     | `.font-semibold`         | 字重 medium                  | `<p class="font-semibold">Paragraph</p>`   |
     | `.hover:text-red-500`    | 鼠标悬停变色                 | `<p class="hover:text-red-500">...</p>`    |
     | `.focus:bg-gray-100`     | 聚焦背景色                   | `<input class="focus:bg-gray-100">`        |
     | `.border-b`  `.border-l` | 只有下边和左边有边框         |                                            |
     | `.my-4`                  | 上下外边距为 4rem            |                                            |
     | `.mx-auto`               | 左右外边距为 auto (自动居中) |                                            |
     | `.bg-cover`              | 背景图片填充整个元素         |                                            |

     

  2. 类名可以直接映射到 CSS 属性，使得样式更易于理解和维护。

     ```html
     <div class="w-1/2 h-12 bg-red-500 font-bold text-2xl">
       Some text
     </div>
     ```

     转化为css

     ```css
     div {
       width: 50%;
       height: 12rem;
       background-color: red;
       font-weight: bold;
       font-size: 2rem;
     }
     ```

  3. 提供了丰富的工具函数，例如用于创建间距和字体比例的函数等。

     | 工具函数         | 示例                                   | 用途                       |
     | :--------------- | :------------------------------------- | :------------------------- |
     | w-1/2 等         | `<div class="w-1/2">50% 宽</div>`      | 设置元素宽度               |
     | h-10 等          | `<div class="h-10">10rem 高</div>`     | 设置元素高度               |
     | border-*         | `<div class="border-b border-l">`      | 设置指定边框               |
     | m-* 和 p-*       | `<div class="my-4">`                   | 设置 margin 和 padding     |
     | bg-*             | `<div class="bg-cover"></div>`         | 设置背景图片               |
     | from-*           | `<div class="from-gray-100">`          | 设置从指定颜色渐变         |
     | to-*             | `<div class="to-gray-100">`            | 设置到指定颜色渐变         |
     | -translate-x-1/2 | `<div class="-translate-x-1/2"></div>` | 水平移动指定距离           |
     | -translate-y-1/2 | `<div class="-translate-y-1/2"></div>` | 垂直移动指定距离           |
     | 文本工具函数     | `<p class="text-lg">`                  | 设置文本大小、颜色、加粗等 |
     | 响应式类         | `.sm:w-1/2 `                           | 在不同屏幕尺寸下生效       |

  4. 通过配置文件(`tailwind.config.js`)来自定义类名和样式

     4.1. 定义新的颜色样式

     ```js
     // tailwind.config.js
     module.exports = {
       theme: {
         extend: {
           colors: {
             'custom-blue': '#0abfbe'
           }
         }
       }
     }
     ```

     使用这个新颜色

     ```html
     <div class="bg-custom-blue">...</div>
     ```

     

     4.2.定义新的尺寸类

     ```js
     // tailwind.config.js
     module.exports = {
       theme: {
         extend: {
           spacing: {
             '128': '32rem'
           }
         }
       }
     }
     ```

     使用这个新尺寸类

     ```html
     <div class="p-128">...</div> 
     <!-- padding: 32rem -->
     ```

     

     

  5. 响应式设计

     | 响应式前缀 | 最小宽度 | CSS                                  |
     | ---------- | -------- | ------------------------------------ |
     | `sm`       | 640px    | `@media (min-width: 640px) { ... }`  |
     | `md`       | 768px    | `@media (min-width: 768px) { ... }`  |
     | `lg`       | 1024px   | `@media (min-width: 1024px) { ... }` |
     | `xl`       | 1280px   | `@media (min-width: 1280px) { ... }` |
     | `2xl`      | 1536px   | `@media (min-width: 1536px) { ... }` |

     

  6. 夜间模式

     > 通过在html代码中添加夜间模式标识符

     ```js
     // tailwind.config.js
     module.exports = {
       darkMode: 'class',
       // ...
     }
     ```

     JS代码中切换模式逻辑

     ```js
         if (this.isDark) {
             document.documentElement.classList.add('dark')
             document.documentElement.classList.remove('light')
           } else {
             document.documentElement.classList.add('light')
             document.documentElement.classList.remove('dark')
           }
     ```

     html 代码中设置夜间模式的样式

     >当切换换为夜间模式时,该div盒子背景颜色由蓝色切换为绿色(蓝色→绿色)

     ```html
     <div class="w-32 h-32 bg-blue-500 dark:bg-green-500"></div>
     ```

     

  7. 函数式CSS解决方案(css in js)

     ```
     
     ```

     

  

- 提供了更快的加载时间

- 一系列额外的酷炫功能



```
Tailwind Css框架解决的问题/痛点

取名困难，节点结构一多，取名真的是个难事。当然了，我们可以用一些规范或者选择器的方式去规避一些取名问题。
需要用 JS 控制样式的时候又得多写一个类，尤其交互多的场景。
组件复用大家都懂，但是样式复用少之又少，这样就造成了冗余css代码变多。
全局污染，这个其实现在挺多工具都能帮我们自动解决了。
死代码问题。JS 我们通过 tree shaking 的方式去除用不到的代码减少文件体积，但是 CSS 该怎么去除？尤其当项目变大以后，无用 CSS 代码总会出现。
样式表的插入顺序影响了 CSS 到底是如何生效的。

作者：kassel守夜人
链接：https://juejin.cn/post/7235965783633297468
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



## 优势



## 前言





与预编译处理器的区别?选择哪个?

Sass/Less/Stylus等预处理器

预处理器的核心优势是为了让开发人员更快书写样式代码，而TailwindCSS旨在消除样式代码

TailwindCSS有学习成本   预处理器你熟悉css即可拿来即用



windi css 停止更新?  下一个 unocss?

