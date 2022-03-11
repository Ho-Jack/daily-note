#### 页面载入DOM 加载完成就执行，极大地提高web应用程序的响应速度。

- 第一种JQuery：

```javascript
$(document).ready(function(){
    // 在这里写你的JS代码...
})
```

- 简写JQuery：

```javascript
$(function(){
    // 你在这里写你的代码  
})
```

```javascript
$(()=>{

})
```

#### 必须等到页面内包括图片的所有元素和资源加载完毕后才能执行

- 原生JS

```javascript
window.onload=()=>{

}
```

- JQuery

```javascript
$(window).load(function() {
    
});
```

