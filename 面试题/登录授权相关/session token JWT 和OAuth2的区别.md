# session、 token、  JWT 和OAuth2的区别

分类上:

- Session是一种认证机制
- Token、JWT是认证授权机制
- OAuth2是授权框架

从应用场景长说，

- Session：自己的简单网站；
- Token：分布式、跨系统、单点登录、允许第三方调用api接口、用户数据需要与第三方共享等不适合实现。
- JWT：场景可以同Token，但是获取验证token的实现逻辑不一样
- OAuth2：授权第三方应用、多平台单点登录

从具体实现来说，

- Session：基于cookie和sessionId
- Token的token： uid（用户唯一身份标识）+ timestamp（当前时间戳） + sign（签名）
- JWT的token：header（头部） + payload（负载 ）+ sign（签名）
- OAuth2：基于授权码code、client_id、client_secret等

## 常见的前后端鉴权方式 

1. Session-Cookie
2. Token 验证（包括 JWT，SSO）
3. OAuth2.0（开放授权)

## Session 

- session 是另一种记录服务器和客户端会话状态的机制(http请求是无状态的)
- session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的cookie 中
- SessionID 是连接 Cookie 和 Session 的一道桥梁

![session](img\session.png)





## Session 和 Cookie的区别

>- sessionID 是连接` Cookie `和` Session `的一道桥梁

- 安全性： Session 比 Cookie 安全，Session 是存储在**服务器端**的，Cookie 是存储在**客户端**的。
- 存取值的类型不同：Cookie 只支持存**字符串数据**，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存**任意数据类型**。
- 有效期不同： Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。
- 存储大小不同： 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。



## Token 

##### token生成流程

![token流程生成](img\token流程.png)

1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端
4. 客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 token
6. 服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据

- 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
- 基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 token 数据。用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库
- token 完全由应用管理，所以它可以避开同源策略



##### Refresh Token生成流程

如果有`refresh token` 机制,token分为

-  `access  token`  : 客户端与服务端之间正常传递的常规`token`,过期时间明显短于`reflesh token `
- `refresh token`:主要用于刷新 `access  token` 过期时间明显长于`access  token`

![reflesh token流程](img\reflesh token流程.png)



### Token 和 Session 的区别

###### 保存位置不同:

1、**Session是存放在服务器端的**，一旦服务器重启，Session数据会丢失。通常session是存储在内存中的，用户过多时，内存开销会比较大。

2、**Token是放在客户端存储的**，采用了时间换空间策略，它**也是无状态的**，所以在分布式环境中应用广泛。

###### 安全性:

`session`存在安全问题，CSRF跨站伪造请求攻击

**session比token容易受到跨站请求伪造(CSRF)攻击,主要原因有以下几点:**

1. session依赖cookie,cookie会自动发送,容易被CSRF利用。token可以不存储在cookie中。
2. session无法在服务端验证来源,来自任意源的请求只要cookie正确就可访问。token可以在服务器验证请求来源。
3. session状态存储在服务器端,所有服务器均可访问。分布式场景下无法验证来源。token状态由客户端维持,可以验证请求来源。
4. session无法在客户端验证,客户端无法区分legit和csrf请求。token可以在客户端预先验证和屏蔽csrf。
5. session依赖cookie,受到XSS攻击后可被窃取。token可以存放在cookie外或进行加密签名。
6. session无法在ajax请求头中自定义发送,易受CSRF攻击。token可以自定义请求头发送。

###### 数据传输不同

- Session依赖Cookie,Cookie会自动发送,无法在请求头自定义发送。
- Token可以手动放在请求头或请求体中发送。

###### 状态验证不同

- Session状态存储服务器端,客户端无法验证。
- Token状态客户端可辅助验证。

###### 分布式场景区别:

- Session需要依赖粘性Session实现分布式,限制较大。通常session是存储在内存中的，用户过多时，内存开销会比较大
- Token可以实现无状态的分布式架构



## JWT

- JSON Web Token（简称 JWT）是目前最流行的**跨域认证**解决方案。
- 是一种**认证授权机制**。
- JWT 是为了在网络应用环境间**传递声明**而执行的一种基于 JSON 的开放标准（[RFC 7519](https://link.juejin.cn?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc7519)）。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。
- 可以使用 HMAC 算法或者是 RSA 的公/私秘钥对 JWT 进行签名。因为数字签名的存在，这些传递的信息是可信的。

### Token 和 JWT 的区别  

###### 存储内容不同

- Token只包含少量安全相关的关键信息,如用户标识、时间戳等。
- JWT可以包含更多的用户信息 claims,除了标识信息外,还可以存放用户名、头像等非密信息。

###### 信息完整性保证不同

- 普通Token一般无法证明自身信息完整性。
- JWT包含签名信息,可以验证信息未被篡改。

###### 信息交互方式不同

- Token需要存储在服务器数据库中,需要查询验证。
- JWT可以直接通过解析 payload 获取信息,无需查询验证。

###### 是否加密不同

- 普通Token一般未加密。
- JWT payload 部分可以选择性加密。

###### 是否可扩展不同

- 普通Token只包含固定基础信息。
- JWT可以在payload中定制扩展信息。



**相同：**

- 都是访问资源的令牌
- 都可以记录用户的信息
- 都是使服务端无状态化
- 都是只有验证成功后，客户端才能访问服务端上受保护的资源

**区别：**

- Token：服务端验证客户端发送过来的 Token 时，还需要**查询数据库**获取用户信息，然后验证 Token 是否有效。
- JWT： 将 Token 和 Payload 加密后存储于客户端，服务端只需要使用**密钥解密**进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。





作者：秋天不落叶
链接：https://juejin.cn/post/6844904034181070861
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





作者：hannie76327
链接：https://juejin.cn/post/7028091738791084039
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。