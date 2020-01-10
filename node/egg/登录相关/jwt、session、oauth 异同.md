#### 1，jwt 和session机制

首先jwt 和session机制 都是用户认证的，oauth 不是

session 的流程：

```
1、用户向服务器发送用户名和密码。

2、服务器验证通过后，在当前对话（session）里面保存相关数据，  
比如用户角色、登录时间等等。

3、服务器向用户返回一个 session_id，写入用户的 Cookie。

4、用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。

5、服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。
  
```

jwt 的流程：

```
即 ：（json web token）


1、用户向服务器发送用户名和密码。

2、服务器验证通过后，生成jwt，可以有选择的在其中    保存用户信息及数据。也可以加密。    

3、服务器向用户返回jwt。

4、用户随后的每一次请求，都会在 cookie 或者   
   header或参数里，将 jwt 传回服务器鉴权。

5、服务器收到jwt，找到前期保存的数据，由此得知用户的身份。
```

jwt 长相：

```
分为 头部（header),载荷（payload)，签证（signature). 用 “.” 分隔。

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1
NDM0ODg3NjgsImp0aSI6ImFjYzhmZjIzLWM1MjgtNDk3OS04N
TYwLWY0NGFmYWNhNDY4MiIsImlzcyI6ImJpenN2YyIsIm5iZ
iI6NTQzNDgxNTY4LCJzdWIiOiJ0b2tlbi14ajZqOTo3emg1Y
md2OGI1cWZrN2JoNnJxZ3o3djV0OGJ2amhiNHNoazQ5aGh6O
GtjcWN6NmpnNWI3ejIifQ.dRKURNOUFOlgO7zBxMajF7-8Wn
0zYs8x2t0UU6SYtP4
```

**即： session 存数据于server端，而jwt 存数据于client**

优缺 ：

```
jwt
没有跨域问题、集群下登录信息同步的问题。
一旦签发，到期前无法简单废止，最好用https。
server无状态，性能高。

session
扩展性不好，存在跨域 和 集群session同步的问题。
面对csrf 攻击，不如jwt。
```

#### 2，oauth 用于第三方认证

目的在于让客户端安全可控地获取"用户"的授权

> 比如说，登录微博（客户端）的时候，懒得新建账号了就用qq账号登录，选择qq登录。这时 就是oauth登场时刻了。 的场景。现在一般是oauth2，版本2.

```
oauth场景，客户端不必保存登录用户（qq）的登录密码。  
更精细的控制权限，即权限的到期时间，提升安全性。

有四种模式：

    授权码模式（authorization code）
    简化模式（implicit）
    密码模式（resource owner password credentials）
    客户端模式（client credentials）
```

