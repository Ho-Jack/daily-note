### [DIV居中的几种方法](https://www.cnblogs.com/ones/p/4362531.html)

1、

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

4、flex布局

```css
 .center {  
  display: -webkit-flex;  
   -webkit-justify-content: center;  
   -webkit-align-items: center;  
  } 
```

缺点：需要支持Html5

5、

```css
    .center {
          position: absolute;  
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%); 
         -ms-transform: translate(-50%,-50%);
         -moz-transform: translate(-50%,-50%);
         -o-transform: translate(-50%,-50%);
       
     }
```

缺点：需要支持Html5

6、

```css
  .div {
     margin: auto;
     position: absolute;
     left: 0;
     right: 0;
} 
```

