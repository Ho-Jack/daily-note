##### css reset 和 normalize.css 有什么区别

- 两者都是通过重置样式，保持浏览器样式的一致性
- 前者几乎为所有标签添加了样式，后者保持了许多浏览器样式，保持尽可能的一致
- 后者修复了常见的桌面端和移动端浏览器的bug：包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。
- 前者中含有大段的继承链
- 后者模块化，文档较前者来说丰富

> - **reset** 的目的，是将**所有**的浏览器的自带样式**重置**掉，这样更易于保持各浏览器渲染的一致性。
>
> - **normalize** 的理念则是**尽量保留**浏览器的默认样式，不进行太多的重置。
> -  [ˈnɔrməlaɪz] 标准化的

**Normalize.css的目标**

1、保留有用的浏览器默认样式，而不是一概将它们“抹杀”。

2、normalize.css作用在范围更广的元素上面。

3、修正了一些bug及主流浏览器在渲染上的不一致。

4、提高了可用性。

5、用更加详细的文档及注释来解释代码的含义。



总结：Reset 相对「暴力」，不管你有没有用，统统重置成一样的效果，且影响的范围很大，讲求跨浏览器的一致性。Normalize 给我的感觉就是不讲求样式一致，而讲求通用性和可维护性。



### CSS reset

```css
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

