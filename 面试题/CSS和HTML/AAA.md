## HTML篇

### 1. DOCTYPE(文档类型) 的作用：

DOCTYPE是HTML5中的文档类型声明，它必须声明在HTML⽂档的第⼀⾏，它的目的是告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型来定义和解析文档。

拓展 ： `!doctype html` 的作用就是让浏览器进入`标准页面渲染模式`，使用W3C的标准解析渲染页面，浏览器以其支持的最高标准呈现页面；如果不写，浏览器就会进入`怪异页面渲染模式`，浏览器使用自己的怪异模式解析渲染页面，页面以一种比较宽松的向后兼容的方式显示，我们需要避免此类情况发生。

### 2. 行内元素有哪些？块级元素有哪些？ 空元素有那些？

- 行内元素：`a b span img input select strong`；
- 块级元素：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p`；
- 空元素有：`<br>`、`<hr>`、`<img>`、`<input>`、`<link>`、`<meta>`；

### 3. src和href有什么区别 ？

相同点：他们都是用来进行外部资源的引入的；

`src`属性用在img标签引入图片，script标签引入js；他们的外部资源引入都会替换掉自身，并且他们的解析会暂停其他资源处理和下载，所以js资源一般会放在页面底部;

`href`属性常用在link标签用来引入css，和a标签用来指定超链接；他们的外部资源引入不会替换掉自身，并且他们的解析和其它资源的处理和下载是同步进行的。

### 4. html5有哪些新的特性？

1，语义化的标签（header 头，footer 脚，nav 导航，article 文章内容，aside 侧边）

2，多媒体的支持（video，audo）

3，canvas（画布）、Geolocation（地理定位）、websocket（通信协议）

4，离线缓存

5，数据存储：localStorage、sessionStorage

6，css3的圆角，阴影，渐变，动画，flex布局....

7、表单新增了很多表单控件（日期，数字，邮箱，颜色，滑块，。。。）

8、拖拽api：draggable = true

9、history api （go、forward、back、pushstate）现在常见的单页面应用就是利用html5新增的hisotry api 实现

### 5. 浏览器的标准模式和怪异模式下有什么区别 ？

标准模式和怪异模式的由来：

在HTML和CSS标准为完成之前，各个浏览对于html和css的解析都有各自不同的解析方式，而很多旧版本的网页都是按照这些非标准的模式去实现的页面，在HTMl和CSS标准定义完成后，浏览器开始按照w3c规定标准来解析页面，另一方面又得保证之前的页面能够正常显示，因此浏览器都会有两种渲染模式：标准模式和怪异模式，在标准模式下，浏览器按照w3c提供的标准解析和渲染页面，在怪异模式下，浏览按照非标准的方式对文档进行解析渲染，

浏览会更具html doctype来确定使用哪种模式来执行页面的渲染

### 6. 标准模式和怪异模式下常见的区别 ？

1，盒子模型：在标准模式下IE盒模型（content（宽高） + 填充padding + 边框border + 边距margin），怪异模式下（content + maring）而content区域包括了（content，padding，border）

而在css3中可以通过 box-sizing来控制盒模型content-box, padding-box, border-box

2，行内元素的高度：标准模式下不生效，怪异模式下会生效

3，margin： 在标准模式下margin: 0 auto; 会水平居中，怪异模式下不会

### 7. 常见的布局方式有哪些 ？

1. flex布局（也称弹性布局）：主要用来作移动页面适配不同的屏幕大小，让浏览自动划分区域
2. grid布局: 类似flex布局，但是grid是利用行和列将一个盒子划分成一个二维的区域，也有点类似与栅格系统，利用grid可以实现flex能够实现的一切
3. 流式布局（也称百分比布局）：利用百分比和浮动划分区域大小和布局展示，超出的部分自动换行显示
4. 响应式布局：利用html5的媒体查询功能，更具屏幕不同的宽度来指定不同的样式，从而到达一个网站多个设备完美显示
5. 多栏布局（栅格系统）：利用百分比+浮动的方式进行页面划分，通常一些ui组件库都会提供栅格系统

三栏布局，双飞翼布局，圣杯布局，左+中+右的布局方式，左边右边固定宽度中间自适应

### 8. 如何让一个元素垂直水平都居中 ？

1，flex：给父元素添加display:block; 给子元素添加margin：auto；

2，flex：给父元素添加display：flex； justify-content： center； align-items：center

3，定位：子元素是固定宽高（position：absolute，top:0,; left:0; right:0; bottom：0;）

4，定位：子元素position:absolute; top: 50%; left:50%; transform: translate(-50%， -50%);

5，将父元素转换成display: table-cell;

8、在css中那些样式是可以继承的？

大部分可以继承的样式都是文字样式，行高，颜色，大小，字体，....

 

### 9. position有哪些属性，分别都是干嘛的 ？

absolute：绝对定位，相对于父级有定位的元素定位，元素自身的位置不会保留（脱离文档流）

relative：相对定位，相对于元素自身定位，元素自身的位置会保留

fixed：固定定位, 相当于浏览器的屏幕进行定位（脱离文档流）

sticky：粘性定位，粘性定位是相对定位和固定定位的混合，元素在浏览滚动条内是不会发生移动的，当浏览器滚动超过当前元素位置，当前元素改为固定定位跟谁浏览器移动，一般用来是实现图钉效果

### 10. 什么是BFC ？

BFC：指的是块级格式化上下文。

满足下列条件之一就可触发BFC:

- 根元素，即html
- float的值不为none（默认）
- overflow的值不为visible（默认）
- display的值为table-cell, table-caption, inline-block, flex, 或者 inline-flex 中的其中一个
- position的值为absolute或fixed

### 11. css样式的优先级 ？

! important优先级为最高， 行内，内嵌，外联，id，class，元素，

嵌套层级越明确样式优先级越高

### 12. css的选择器 ？

id选择器

class选择器

元素选择器

伪类选择器

:hover

:link

:active

:visited

:after

:before

:nth-child

:frist-child

:last-child

:disabled

:checked

子代选择器 (ul > li)

后代选择器 (ul li)

属性选择器(a[class], a=[class="hover"])

相邻选择器(ul + div) 后面一个

兄弟选择器(ul ~ div) 后面所有

### 13. css中常见的单位有哪些 ？

px: 正常的像素大小，但是在高清显示屏上1px可能代表4个

rem: 是一个相对单位，相对于html的font-size大小，比如html的font-size：100px；那么1rem就是100px

em：和rem一样，只不过em是相对于自身的font-size

vw：是一个相对单位。有点类似于百分比，但是vw和vh始终都相对于屏幕的大小，100vw就相当屏幕的100%

%：相对于父元素有大小才会启作用的单位

### 14. 在css中如何隐藏一个元素 ？

1，display：none；隐藏一个元素，元素会消失在渲染树中，在页面中也不会占位

2，visibity:hidden ; 隐藏一个元素，但是该元素所占据的位置还在

3，opcity:0；将元素变成透明，元素位置还在，元素如果有事件依然可点击

 

### 15. css清除浮动有哪些方法?

1, clear: both;

2, 在父元素使用overflow: hidden;

3，使用伪元素

 

### 16. 如何解决移动端1像素边框的问题？**

通过伪元素插入一个高度为1px，宽度200%的元素，通过transform：scale（50%）进行缩放，可以实现移动端1px边框

 

.box:after: {

content: '';

display: block;

height: 1px;

width: 200%;

transform-origin: left top;

transform: scale(50%);

}

### 17. transition和animation的区别？

transition是过渡动画指得是从一个值到另一个值直接动画过渡

animation是关键镇动画，可以通过添加帧的方式，实现多个值之间更为精准的动画效果

### 18. iframe标签的作用？

iframe是用来在网页中嵌入另一个网页的标签，ifram标签上有一个src属性接收的就是另一个网页的页面地址，

### 19. script标签上添加async或者defer属性的作用是什么 ？

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e0f72236d104073a0be041779d14046~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

正常情况下script标签用来加载脚本，是一个阻塞浏览器渲染的流程，也就是在加载js的时候页面会停止渲染（卡住），等到js都加载完成后继续渲染，所以我们一般情况下都会把script标签放到页面的底部去加载，

但是当添加defer或者async属性的时候就不会阻塞浏览器渲染了，变成了异步加载

async: 属性标签当前引入的js是异步执行，如果加载好，就会开始执行，执行是会阻塞页面的渲染的

defer：属性表示延迟执行引入js，不会阻塞页面的渲染。js的加载是异步的，而执行会延迟到页面解析完成后才执行

### 20. 渐进增强和优雅降级之间的区别 ？

`渐进增强` ：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验，-

`优雅降级` ：一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要，渐进增强则意味着往前看，同时保证其根基处于安全地带；而优雅降级是从复杂的现状开始的，并试图减少用户体验的供给，（功能衰竭）意味着往回看

### 21. 页面统计数据中，常用的 PV、UV 指标分别是什么？

`PV(页面访问量)`：同一用户多次浏览也会累加；

`UV(独立访客量)`：是指通过互联网访问、浏览这个网页的自然人。访问您网站的一台电脑客户端为一个访客。 00:00-24:00内相同的客户端只被计算一次。

### 22. 什么是 DOM 和 BOM？

- DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。
- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。



