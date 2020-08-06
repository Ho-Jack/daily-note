

## 海康威视Web插件兼容iframe的踩坑实践

###  原因：
> 海康威视3.1开发指南，明确指出了，目前仅支持配合 div 标签使用，不支持基于 iframe 方式也不支持浏览器页面弹出页面的使用方式 
>
> 由于客户要求进行iframe适配



### 遇见问题1： 嵌套iframe ，提示跨域问题。

查看控制台报错，提示 海康插件（jsWebControl-1.0.0.min.js）源码中（h=window.top,p=h.document.title） 无法获取当前浏览器的title ，出现的问题，

### 解决方案：

  删除  源码中 相关用到的（p=h.document.title）代码  



### 遇见问题2： 跨域解决，视频插件 初始化位置有问题

经过研究，发现插件初始化位置是根据浏览器的初始位置来进行初始化的，导致视频插件位置不是以iframe的相对位置来初始化的。

解决方案：父窗口将iframe的相对位置 offset.top和offset.left传给iframe窗口中的视频插件，视频插件再根据相对位置初始化插件，需要用到window.postMessage()方法（可以安全地实现**Window对象之间的跨域通信**。）

### 父

```html
  <div id="myVideo" style="margin-left:20%;width: 80%;height: 60%; ">
      <iframe src="url" width="100%" height="100%" id="iframe"></iframe>
  </div>
```

```js
    function fd(wait) {
        let timer = null
        return function () {
            if (timer != null) clearTimeout(timer)
            timer = setTimeout(() => {
                 postIframe()
                console.log('函数防抖触发');
            }, wait)
        }
    }
    let myfd = fd(1000)
    window.onresize = function () {      
      myfd()
    }
   window.onload=function(){
        postIframe()
   }

    function postIframe() {
        let myMessage = $('#myVideo').offset() // iframe相对浏览器的偏移量 top 和left
        let parentHeight = $('#myVideo').height()  //iframe窗口大小
        let parentWidth = $('#myVideo').width()  // //iframe窗口大小

      
        var receiver = document.getElementById('iframe').contentWindow;
        receiver.postMessage({ parentHeight, parentWidth, myMessage }, '*');
    }
```

### 子

```js
 function changeVideo() {
   //操作dom元素，修改插件的窗口大小
        $("#playWnd").css("width", newWidth + "px");
        $("#playWnd").css("height", newheight + "px");
 //操作dom元素 修改插件的相对浏览器的相对位置
        $("#playWnd").css("margin-top", Number(inittop) + 1 + "px");
        $("#playWnd").css("margin-left", Number(initLeft) + 1 + "px");

        if (oWebControl != null) {
            oWebControl.JS_Resize(newWidth, newheight);
            $(".hikRight").css("left", newWidth - 11 + "px");     
        }
    }

```

```js
    $(function () {
        //监听message
        window.addEventListener('message', function (e) {
       
        //    console.log(e.data)  //e.data为传递过来的数据
            inittop = e.data.myMessage.top
            initLeft = e.data.myMessage.left
            newheight = e.data.parentHeight
            newWidth = e.data.parentWidth
            changeVideo()    //通过修改dom控制视频窗口位置
           videoTimer = setTimeout(() => {
                $("#playWnd").css("margin-top", 0 + "px");
                $("#playWnd").css("margin-left", 0 + "px"); 
            }, 1000)
        })
    

        //初始化视频插件
        initPlugin()

    })
```

### 问题3：视频插件闪烁

研究源码发现，发现`initPlugin()`和`init()`函数分别加载了插件，但是加载的方式不同。`initPlugin()`加载通过浏览器窗口计算div所在位置,`init()`通过当前iframe计算div所在位置，结果就是两个插件显示位置不一样，导致插件闪烁。

解决方案： 在init()函数 初始化成功后 将插件的位置设为iframe 的（0,0,）位置

```js
   .then(function (oData) {
 oWebControl.JS_Resize(newWidth, newheight) 
       // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
                    $("#playWnd").css("margin-top", -1 + "px");
                    $("#playWnd").css("margin-left",0+ "px");
                })
```

