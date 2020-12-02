---
title: getElementById的骚操作
date: 2020-08-24 21:09:00
tags: [JS, ES6, 开发笔记]
---

### getElementById的骚操作

```html
<span id="spanName"></span>
```



```js
骚操作（直接用id名字调用竟然也可以正确运行）：
spanName.innerHTML ='12345'


标准的id选择器调用语法是:
document.getElementById('spanName').innerHTML ='12345'
```

  注意：这个最初是 `IE` 里面的，后来 `firefox` `chrome` 好像也支持了。 不建议使用，这个不是标准里面的，将来不一定支持。 