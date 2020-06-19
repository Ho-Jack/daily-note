共同点：都是保存在浏览器端、且同源的
不同点：
 1.cookie数据始终在**同源的http请求中携带**（即使不需要），即cookie在浏览器和服务器间来回传递。
    cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下
    sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。

2.存储大小限制也不同，cookie数据不能超过4K，sessionStorage和localStorage可以达到5M

3.sessionStorage：仅在当前浏览器窗口关闭之前有效（浏览器关闭，即清除）；
    localStorage：始终有效，窗口或浏览器关闭也一直保存，本地存储，因此用作持久数据；
    cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭

4.作用域不同
    sessionStorage：不在不同的浏览器窗口中共享，即使是同一个页面；
    localstorage：在所有同源窗口中都是共享的；也就是说只要浏览器不关闭，数据仍然存在
    cookie: 也是在所有同源窗口中都是共享的.也就是说只要浏览器不关闭，数据仍然存在

```js
localStorage.getItem(key)
sessionStorage.getItem(key)
```

```js
localStorage.setItem(key,value)
sessionStorage.setItem(key,value)
```

注意： 储存对象、数组等格式的数据，需转化为字符串格式（JSON 格式， 序列化）

```js
sessionStorage.setItem('key',JSON.stringify(obj))
var info= JSON.parse(sessionStorage.getItem(key))
```

