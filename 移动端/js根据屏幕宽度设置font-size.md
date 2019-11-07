---
title: js根据屏幕宽度设置font-size
date: 2019-08-05 00:00:00
tags: [开发笔记, 移动端]
---
> > rem是css中的长度单位，1rem=根元素html的font-size值。当页面中所有元素都使用rem单位时，你只需要改变根元素font-size值，所有元素就会按比例放大或者缩小。因此我们只需要写一小段js代码，根据屏幕宽度改变html的font-size值，就可以做到弹性布局。



```js
  (function () {
    var docEl = document.documentElement;
    var resize = 'orientationchange' in window ? 'orientationchange' :'resize';
            var setRem = function () {
                //获取屏幕的宽度
           var screenWidth = docEl.clientWidth || window.screen.width || 375;
                //1000是设计稿的宽度
                docEl.style.fontSize = (100 * screenWidth / 1000) + 'px';
            };
            // 屏幕大小变化后重新设置rem字号
            window.addEventListener(resize, setRem, false);
            setRem();
        })();
```

   

