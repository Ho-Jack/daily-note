### 1、请求资源类型不同
（1） href是Hypertext Reference的缩写，表示超文本引用。用来建立当前元素和文档之间的**链接**。常用的有：link、a。
（2）在请求 src 资源时会将其指向的资源**下载并应用**到文档中，常用的有script，img 、iframe；

### 2、作用结果不同
（1）href 用于在当前文档和引用资源之间确立联系；

（2）src 用于替换当前内容；

### 3、 浏览器解析方式不同
（1）若在文档中添加href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。

（2）当浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

既然我们上面提到了link和@import导入css文件是不同的，那我们就顺便说说两者的区别，如果您已经知道，就可以不用往下看了哈

link和@import的区别
两者都是外部引用 CSS 的方式，但是存在一定的区别：
（1）link是XHTML标签，除了能够加载CSS，还可以定义RSS等其他事务；而@import属于CSS范畴，只可以加载CSS。
（2）link引用CSS时，在页面载入时同时加载；@import需要页面完全载入以后再加载。
（3）link是XHTML标签，无兼容问题；@import则是在CSS2.1提出的，低版本的浏览器不支持。
（4）link支持使用Javascript控制DOM改变样式；而@import不支持。

参考资料：https://zhuanlan.zhihu.com/p/35571428
