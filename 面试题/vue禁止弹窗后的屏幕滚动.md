### vue禁止弹窗后的屏幕滚动

- 主要是是写一个点击出现弹窗禁止屏幕滚动的方法，关闭弹窗屏幕可以正常滚动

```js
methods : {
    //禁止滚动
    stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
    /取消滑动限制/
    move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
    }
}
```


