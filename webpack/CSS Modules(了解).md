## CSS Modules

> CSS-in-JS 
>
> CSS通俗讲，**只有全局作用域**，css中文为层叠样式表，后面的样式会**覆盖**前面的样式；
> 书写效率和维护性低；缺乏模块机制、变量、函数等概念；容易出现全局样式污染和样式冲突等
>
> **[CSS Modules](https://link.segmentfault.com/?enc=kpMMaL7aOhywxE07ED0Dyw%3D%3D.rV9iUdEwqhGQ2HERXooIMfI7wCA8EbGeTLBLN53o0ksYYHWGXWaeb%2F0sz%2FxOxggj)**是一种技术流的组织css代码的策略，它将为css提供默认的局部作用域。CSS Modules无法改变css全局作用域的本性，它是依靠动态生成class名这一手段，来实现局部作用域的。显然，这样的class名就可以是唯一的，不管原本的css代码写得有多随便，都可以这样转换得到不冲突的css代码。（模拟的局部作用域也没有关系，它是可靠的。）

> 指的是我们像 import js 一样去引入我们的 css 代码，代码中的每一个类名都是引入对象的一个属性，通过这种方式，即可在使用时明确指定所引用的 css 样式。并且 CSS Modules 在打包的时候会自动将类名转换成 hash 值，完全杜绝 css 类名冲突的问题。



官方文档：

> 所有的class和animation 默认都有各自的作用域的 `CSS` 文件。CSS Modules 并不是 CSS 官方的标准，也不是浏览器的特性，而是使用一些构建工具，比如 `webpack`，对 `CSS` 的class和选择器限定作用域的一种方式（类似**命名空间**）
>
> - 局部作用域
> - 模块功能

`CSS Module` 是通过工程化的方法，加入了**局部作用域和模块机制**来解决命名冲突的问题。`CSS Module` 通常会配合 `Sass` 或者 `Less` 一起使用。



