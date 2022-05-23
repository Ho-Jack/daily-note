---
title: 移动端布局单位适配
date: 2019-08-05 00:00:00
tags: [开发笔记, 移动端]
---
## 移动端布局单位适配

最简单最直接的方案就是直接用百分比设置元素的尺寸。
- 用百分比设置元素大小可以实现元素尺寸的自适应，但是无法实现字体大小的自适应
- 尺寸转化为百分比计算很麻烦
- 元素尺寸的高很难相对屏幕宽度设置百分比
百分比适用于某种具体场景，不是通用解决方案。


> rem是一个相对单位，1rem=根元素html的font-size值。我们只要设置html上font-size的大小，就可以改变rem所代表的大小。当页面中所有元素都使用rem单位时，你只需要改变根元素font-size值，所有元素就会按比例放大或者缩小。

 html下的font-size，默认是16px，1rem=16px，但是默认的16px不方便计算，为了方便计算，让1rem=100px，所以需要将html的font-size设置为100px，此时**1rem=100px**。如果我现在需要将一个div设置400px的宽度，那么我只需要用4rem就能表示400px。有时候能在一些文章里面看到对html设置font-size：62.5%；这里就是需要拿html默认的font-size：16px来计算了，16px的0.625倍，16px*0.625=10px。那么此时1rem=10px。究其原因就是为了方便计算。

###  js方案，根据屏幕宽度改变html的font-size值，就可以做到弹性布局。

```js
  (function () {
    var docEl = document.documentElement;  //html根标签
      //orientationchange 设备旋转的时候，会触发这个事件
    var resize = 'orientationchange' in window ? 'orientationchange' :'resize';
          var setRem = function () {
                //获取屏幕的宽度
                var screenWidth = docEl.clientWidth || window.screen.width || 375;
                //1000是设计稿的宽度
                //设计稿上的宽度/100 就能转为rem
                // 100 * screenWidth / 设计稿宽度=1rem
                docEl.style.fontSize = (100 * screenWidth / 1000) + 'px';
            };
            // 屏幕大小变化后重新设置rem字号
            window.addEventListener(resize, setRem, false);
            setRem();
        })();
```

 

```js
(function(doc, win) {
	var docEl = doc.documentElement,
        //判断resize事件还是设备旋转事件
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
            //小于768px都是手机
			if(clientWidth >= 750) {
                //移动端1rem=100px
                //设计稿div宽度/设计稿宽度*10  =rem的值  = 屏幕宽度/10
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

 总结： 用JS设置，比较方便，现在大部分网站采用这种方式。

###  媒体查询, 设定每种屏幕对应的font-size

```css
  @media only screen and (max-width: 1600px) and (min-width: 1280px){
    html{
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 1280px) and (min-width: 960px){
    html{
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 960px){
    html{
      font-size: 10px;
    }
  }
```

总结： 需要设置需要每种屏幕都设置对应的font-size,这些font-size都是根据比例算出来的，比较繁琐，而且还有可能漏掉某些屏幕尺寸 （不推荐）

###  使用vw设置，vw也是一个相对单位，100vw等于屏幕宽度

> vw：1vw等于视口宽度的1%
>
> vh：1vh等于视口高度的1%

```CSS
html{
    font-size: 10vw;
}
```

总结： 通过css的vw来设置，也很方便，而且不用写css，但是兼容性还不是特别好。 (可以直接用vw？？？)

### 网上另外一种做法：  html根标签使用 vw，  body使用rem

```
//  html font-size是用vw  然后body里的其他元素单位使用rem
```

前提: 

> 设计稿100px   适配750px的手机屏幕
> 设计稿/屏幕=100/750=0.13333333333333333  （1px等于0.13vw）
>       100px=13.333333vw=1rem

```css
html{
   font-size:13.3333333vw
}
//设计稿上面100px的div    1rem=100px (也就是 设计稿px/100   就能用rem)
div{
widht：1rem;
}
```





###   Vue 中 可以配合插件来转换    px2rem  和  lib-flexible

#### lib-flexible插件

安装插件

```shell
npm i lib-flexible -S
```

main.js入口文件引入

```js
import 'lib-flexible'  // 引入适配包
```

- 在html的head中添加一个`<meta name="viewport"/>`的标签

-  自动设置html的font-size为屏幕宽度除以10
   
      ```
          设计稿div宽度/设计稿宽度*10  =rem的值  = 屏幕宽度/10
          10rem就是屏幕的总宽度 
          设计稿px换算为rem 公式：设计稿div宽度/设计稿宽度*10 
      ```
      
      问题： 手动 转换 十分繁琐，可以使用px2rem-loader自动将css中的px转换成rem



####   postcss-plugin-px2rem （使用css预处理语言）/`px2rem-loader`包（**只适用于css样式**）

安装

```shell
npm i postcss-plugin-px2rem -D
```

在vue-cli3.0 去掉了build和config文件夹。所有的配置都放到了vue.config.js中（默认为空，如果没有这个文件自己写一个）。

vue.config.js的配置：

```js
module.exports={
	   css: {
      loaderOptions: {
        postcss: {
          plugins: [
              require('postcss-plugin-px2rem')({
                  rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                  // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                  // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                  // propBlackList: [], //黑名单
                  exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                  // selectorBlackList: [], //要忽略并保留为px的选择器
                  // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                  // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                  mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                  minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
              }),
          ]
      }
    }
    }
}
```



