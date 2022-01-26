两者都是外部引入CSS的方式，那么二者有什么区别呢？

1. @import是CSS提供的语法规则，只有导入样式表的作用；link是HTML提供的标签，不仅可以加载CSS文件，还可以定义RSS，rel连接属性等；
2. 加载页面时，link引入的CSS被同步加载，@import引入的CSS将在页面加载完毕后加载；
3. link标签作为HTML元素，不存在兼容性问题，而@import是CSS2.1才有的语法，故老版本浏览器（IE5之前）不能识别；
4. 可以通过JS操作DOM，来插入link标签改变样式；由于DOM方法是基于文档的，无法使用@import方式插入样式；(link可以使用 js 动态引入，@import不行)

建议使用link的方式引入CSS



```html
<style type="text/css">
	@import url(CSS文件路径地址);
</style>
<link href="CSSurl路径" rel="stylesheet" type="text/css" /
```

