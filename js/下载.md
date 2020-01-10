---
title: a标签下载功能的实现
date: 2018-08-07 20:00:00
tags: [开发笔记，JS]
---

##### a标签下载问题

```h5
<a  href="写的是相对路径"  
      download = “ 不写默认文件名，作用是防止浏览器对jpg等格式文件直接打开而不是下载” />
```

##### 导出功能

```js
window.open(url)   //url是接口，后台提供的导出接口
```



另一种情况是创建div标签，动态创建a标签：
```
<div name="downloadfile" "downloadExcel()">下载</div>
function downloadExcel() {
    let a = document.createElement('a')
    a.href ="/user/downloadExcel"
    a.click();
} 
```

