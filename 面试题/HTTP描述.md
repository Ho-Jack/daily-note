### 基本概念：

HTTP，全称为 HyperText Transfer Protocol，即为超文本传输协议。是互联网应用最为广泛的一种网络协议
所有的 www 文件都必须遵守这个标准。

### http特性：

HTTP 是无连接**无状态**的
HTTP 一般构建于 TCP/IP 协议之上，默认端口号是 80
HTTP 可以分为两个部分，即请求和响应。

### http请求：

HTTP 定义了在与服务器交互的不同方式，最常用的方法有 4 种
分别是 GET，POST，PUT， DELETE。URL 全称为资源描述符，可以这么认为：一个 URL 地址
对应着一个网络上的资源，而 HTTP 中的 GET，POST，PUT，DELETE 
就对应着对这个资源的查询，修改，增添，删除4个操作。

HTTP 请求由 3 个部分构成，分别是：状态行，请求头(Request Header)，请求正文。

HTTP 响应由 3 个部分构成，分别是：状态行，响应头(Response Header)，响应正文。

HTTP 响应中包含一个状态码，用来表示服务器对客户端响应的结果。

状态码一般由3位构成：

1xx : 表示请求已经接受了，继续处理。
2xx : 表示请求已经处理掉了。
3xx : 重定向。
4xx : 一般表示客户端有错误，请求无法实现。
5xx : 一般为服务器端的错误。



### 比如常见的状态码：

200 OK 客户端请求成功。
301 Moved Permanently 请求永久重定向。
302 Moved Temporarily 请求临时重定向。
304 Not Modified 文件未修改，可以直接使用缓存的文件。
400 Bad Request 由于客户端请求有语法错误，不能被服务器所理解。
401 Unauthorized 请求未经授权，无法访问。
403 Forbidden 服务器收到请求，但是拒绝提供服务。服务器通常会在响应正文中给出不提供服务的原因。
404 Not Found 请求的资源不存在，比如输入了错误的URL。
500 Internal Server Error 服务器发生不可预期的错误，导致无法完成客户端的请求。
503 Service Unavailable 服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常。

大概还有一些关于http请求和响应头信息的介绍。