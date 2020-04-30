- ##### 元素上：

```
 @scroll.native=""   
```

- ##### 方法：

```js
mounted(){
    // 监听resize事件，
    window.onresize = () => {}
    window.addEventListener("resize", ()=>{}, true);
   // 监听滚动条scroll事件
    window.onscroll = () => {}
    window.addEventListener("scroll", ()=>{}, true);
}

```

  

可能出现问题：父元素添加overflow:auto后就会无法监听scroll事件

解决方案：    window.addEventListener("scroll", ()=>{}, true);  第三个参数传 true