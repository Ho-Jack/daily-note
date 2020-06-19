---
title: iframe父子页面互调（利用postMessage解决跨域问题）
date: 2020-06-08 19:26:57
tags: [JS, 开发笔记]
---

## iframe父子页面互调（利用postMessage解决跨域问题）

## 说明

>  window.postMessage()方法可以安全地实现**Window对象之间的跨域通信**。例如，在一个页面和它生成的弹出窗口之间，或者是页面和嵌入其中的iframe之间。

通常情况下，不同页面上的脚本允许彼此访问，当且仅当它们源自的页面共享相同的协议，端口号和主机（也称为“同源策略”）。window.postMessage()提供了一个受控的机制来安全地规避这个限制（如果使用得当的话）。

一般来说，一个窗口可以获得对另一个窗口的引用(例如，通过targetWindow=window.opener)，然后使用targetWindow.postMessage()在其上派发MessageEvent。接收窗口随后可根据需要自行处理此事件。传递给window.postMessage()的参数通过事件对象暴露给接收窗口。

## 发送端

### 发送消息的基本语法：

```js
targetWindow.postMessage(message, targetOrigin, [transfer]);
```

### targetWindow

targetWindow就是接收消息的窗口的引用。 获得该引用的方法包括：

- HTMLIFrameElement.contentWindow
- Window.frames +索引值
- Window.open
- Window.opener
- Window.parent


### message

message就是要发送到目标窗口的消息。 数据使用结构化克隆算法进行序列化。 这意味着我们可以将各种各样的数据对象安全地传递到目标窗口，而**无需自己对其进行序列化**。

### targetOrigin

targetOrigin就是指定目标窗口的来源，必须与消息发送目标相一致，可以是字符串“*”或URI。 * 表示任何目标窗口都可接收，为安全起见，请一定要明确提定接收方的URI。

### transfer

transfer是可选参数



### postMessage程序

```javascript
var receiver = document.getElementById('receiver').contentWindow;
var btn = document.getElementById('send');
btn.addEventListener('click', function (e) {
    e.preventDefault();
    var val = document.getElementById('text').value;
    receiver.postMessage("Hello "+val+"！", "http://res.42du.cn");
}); 
```



## 接收端

目标窗口通过**window.addEventListener("message", XX, false);**侦听发送过来的消息：

```javascript
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event){
  if (event.origin !== "http://www.42du.cn")
    return;
}
```

event对象有三个属性，
- event.data表示接收到的消息；
- event.origin表示postMessage的发送来源，包括协议，域名和端口；
- event.source表示发送消息的窗口对象的引用; 







## 完整程序

### 发送程序

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>42度空间-window.postMessage()跨域消息传递</title>
</head>
<body>
<div>
    <input id="text" type="text" value="42度空间" />
    <button id="send" >发送消息</button>
</div>
<iframe id="receiver" src="http://res.42du.cn/static/html/receiver.html" width="500" height="60">
    <p>你的浏览器不支持IFrame。</p>
</iframe>
<script>
    window.onload = function() {
        var receiver = document.getElementById('receiver').contentWindow;
        var btn = document.getElementById('send');
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var val = document.getElementById('text').value;
            receiver.postMessage("Hello "+val+"！", "http://res.42du.cn");
        });
    }
</script>
</body>
</html>
```



### 接收程序

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>42度空间-从www.42du.cn接收消息</title>
</head>
<body>
<div id="message">
    Hello World!
</div>
<script>
    window.onload = function() {
        var messageEle = document.getElementById('message');
        window.addEventListener('message', function (e) {
            alert(e.origin);
            if (e.origin !== "http://www.42du.cn") {
                return;
            }
            messageEle.innerHTML = "从"+ e.origin +"收到消息： " + e.data;
        });
    }
</script>
</body>
</html>
```



作者：毛三十
链接：https://www.jianshu.com/p/62f1c080748a
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。