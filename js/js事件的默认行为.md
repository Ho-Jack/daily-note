---
title: JS事件默认行为
date: 2020-06-04 16:42:00
tags: [JS, 开发笔记]
---
##  默认行为
> 网页元素都会有默认的行为

JS事件的默认行为：

- a标签点击跳转
- form表单提交  <input type="submit">   
- contextmenu 右击弹出菜单



### 解决

 <input type="button">      type设为button

### 原生JS中：

-  e.preventDefault(); //取消默认事件

-   return false

  ```js
  <a href="https://www.baidu.com/" target="_blank" id="skip">百度</a>
  ```

  ```js
  var skip=document.getElementById("skip");
  skip.onclick=function(event){
   event.preventDefault();
  };
  ```

  ```js
  skip.onclick=function(event){
   return false;
  };
  ```

    

  ```html
  <a href="javascript:void(0);" id="skip"  > Click Me</a>
  ```

  ```html
  <a href="javascript:;" >  Click Me  </a>
  ```

  

### vue中： .prevent

```vue
<a href="https://www.baidu.com/" target="_blank"  @click.prevent=xx>百度</a>
```

