---
title: DIV居中的几种方法
date: 2020-04-15 10:22:00
tags: [CSS, 样式]
---

## [DIV居中的几种方法](https://www.cnblogs.com/ones/p/4362531.html)

1、针对**inline**, 内联块**inline-block**, 内联表**inline-table**, **inline-flex**元素及**img**,**span**,**button**等内联元素

```css
body{  
  text-align:center;  
 } 
```

缺点：body内所有内容一并居中

2、  (好像有问题)

```css
.center{
     position: fixed;
     left: 50%;
}
```

缺点：需要设置position属性，网页复杂时容易扰乱页面布局,而且只是元素的起始位置居中

3、 margin

```css
 .center{
     width:500px;
     margin: 0 auto;
 }
```

缺点：需要设置div宽度

4、flex布局 （垂直水平居中）

```css
 .center {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  } 
```

缺点：需要支持HTML5

5、

```css
  .div {
     position: absolute;
     margin: auto;
      /**水平居中**/
     left: 0;
     right: 0;
      /**垂直居中**/
     top: 0;
     bottom: 0;
} 
```

缺点：父元素必须设置position值，否则相对浏览器定位

6、绝对布局方式（垂直居中）

- 已知高度

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; 
}
```

- 未知高度

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

7、绝对布局方式（垂直水平居中）

```css
.parent {
    position: relative;
}
.child {
          position: absolute;  
          top: 50%;      
          left: 50%;
          transform: translate(-50%,-50%); 
     }
```

说明： 元素的定位（position）的`left`和`top`是 元素左上角的相对定位
           transform: translateX(-50%，-50%） 移动元素来弥补定位的不足

缺点：需要支持HTML5 并且 需要父元素设置position

