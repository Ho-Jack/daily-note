Cookies 、sessionStorage和localStorage
共同点：都是保存在浏览器端、且同源的
不同点：
 1.cookie数据始终在**同源的http请求中携带**（即使不需要），即cookie在浏览器和服务器间来回传递。
    cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下
    sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。

2.存储大小限制也不同，
    cookie数据不能超过4K，
    sessionStorage和localStorage可以达到5M

3.保存时间不一样（时效不一样）
    ssionStorage：仅在当前浏览器窗口关闭之前有效（浏览器关闭，即清除）；
    localStorage：始终有效，窗口或浏览器关闭也一直保存，本地存储，因此用作持久数据；
    cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭

4.作用域不同
    sessionStorage：不在不同的浏览器窗口中共享，即使是同一个页面（作用于一个窗口）；
    localstorage：在所有**同源窗口**中都是共享的；也就是说只要浏览器不关闭，数据仍然存在
    cookie: 也是在所有**同源窗口**中都是共享的.也就是说只要浏览器不关闭，数据仍然存在

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





 cookie安全性不高， document.cookie即可获取  （可以设置 httpOnly，限制在js 中获取）

### session

 1，session 在服务器端，cookie 在客户端（浏览器）
 2，session 默认被存在在服务器的一个文件里（不是内存）
 3，session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session_id）
 4，session 可以放在 文件、数据库、或内存中都可以。
 5，用户验证这种场合一般会用 session 



