

```js
  (function () {
    var docEl = document.documentElement;
    var resize = 'orientationchange' in window ? 'orientationchange' :'resize';
            var setRem = function () {
           var screenWidth = docEl.clientWidth || window.screen.width || 375;
                docEl.style.fontSize = (100 * screenWidth / 1000) + 'px';
            };
            // 屏幕大小变化后重新设置rem字号
            window.addEventListener(resize, setRem, false);
            setRem();
        })();
```



---------------------
作者：麦乐乐 
来源：CSDN 
原文：https://blog.csdn.net/qq_41831345/article/details/80651050 
版权声明：本文为博主原创文章，转载请附上博文链接！