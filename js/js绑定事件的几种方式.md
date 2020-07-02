---
title: JS绑定事件的几种方式
date: 2019-08-01 00:00:00
tags: [JS, 开发笔记]
---
## JS绑定事件的几种方式
>    在JavaScript中，有三种常用的绑定事件的方法：
> 1. 在DOM元素中直接绑定；
> 2. 在JavaScript代码中绑定；
> 3. 绑定事件监听函数。

 ### 1. 在DOM元素中直接绑定  onXXX = 'js代码'

> onXXX为事件名称，onclick 单击事件、 ondouble 双击事件、onmouseover移入事件、onmouseout移出事件

```html
<input  onclick='fun()' type='button'/>
<script>
function  fun(){
   (js代码) 
}
</script>
```

###  2.在JS代码中绑定    elementObject.onXXX=function(){     // 事件处理代码    }

>elementObject 为DOM对象( 例： document.getElementById()    ) 

```html
<input id="demo" type="button" value="点击我，显示 type 属性" />

<script type="text/javascript">
document.getElementById("demo").onclick=function(){
alert(this.getAttribute("type")); // this 指当前发生事件的HTML元素，这里是<div>标签
}
</script>
```

### 3. 绑定事件监听函数     (优点：可以监听多种事件)

####  elementObject.addEventListener(eventName,handle,useCapture);

| 参数          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| elementObject | DOM对象（即DOM元素）。                                       |
| eventName     | 事件名称。注意，这里的事件名称没有“ on ”，如鼠标单击事件 click ，鼠标双击事件 doubleclick ，鼠标移入事件 mouseover，鼠标移出事件 mouseout 等。 |
| handle        | 事件句柄函数，即用来处理事件的函数。                         |
| useCapture    | Boolean类型，是否在捕获阶段就触发事件，一般用false 。涉及到JavaScript事件流的概念 |

#### elementObject.attachEvent(eventName,handle);（ie8以下的浏览器）

| 参数          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| elementObject | DOM对象（即DOM元素）。                                       |
| eventName     | 事件名称。注意，与addEventListener()不同，这里的事件名称有“ on ”，如鼠标单击事件 onclick ，鼠标双击事件 ondoubleclick ，鼠标移入事件 onmouseover，鼠标移出事件 onmouseout 等。 |
| handle        | 事件句柄函数，即用来处理事件的函数。                         |

```js
<input id="XSS" type="text" />

let xss = document.getElementById('XSS')

    xss.addEventListener('change', () => {
        console.log(xss.value);
    })
```

