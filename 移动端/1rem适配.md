###  1rem适配

1rem=16px

1. 设置mate头

    ```html
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    ```
2. 设置根元素的字体大小

    ```css
   html{
   		font-size:16px;
   	}
   @media screen and (min-width:240px) {
       html {
           font-size:9px;
       }
   }
   @media screen and (min-width:320px) {
   	html {
   		font-size:12px;
   	}
   }
   @media screen and (min-width:375px) {
   	html{
   		font-size:14.0625px;
   	}
   }
   
    ```

3. 在js里面

   ```js
   window.onload=function(){
       //获取屏幕区域的宽度
       var width = document.documetElement.clienWidth;
       //获取html
       var htmlNode = document.querySelector('html');
       //设置字体大小
       htmlNode.style.fontSize = width + 'px';
   }
   ```

- 网易方案

  ```js
  function setRem () {
          let htmlRem = document.documentElement.clientWidth
          document.documentElement.style.fontSize = htmlRem/7.5 + 'px'
        }
  setRem()
  
  ```

  以上代码是以iphone6为设计稿，结果是1rem=100px的实际像素，因为iphone6的设备像素比是2所以1rem在浏览器的预览中是50px，也就是实现了1rem和设备宽度成7.5倍的关系，设备宽度改变1rem的实际大小也会改变，而且在屏幕中的比例是没有变的。（市面上大多数是这种方案）

  iphone6屏幕像素为750

