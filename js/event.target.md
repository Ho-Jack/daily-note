---
title: target 事件属性
date: 2020-06-30 14:09:00
tags: [JS, ES6, 开发笔记]
---

##  target 事件属性

### 语法：

```js
event.target
event.srcElement   //是兼容IE的属性
```

> target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。
> 即返回当前元素的元素节点（Element）

```js
var btn6 = document.getElementById("btn6");
document.onclick = function(event){
  event = event || window.event;
  var targetElement = event.target || event.srcElement;
    //判断当前元素节点是否一致
  if(targetElement == btn6){
    alert(btn5.value);
  }
}
```



