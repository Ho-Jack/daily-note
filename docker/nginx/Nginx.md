# Nginx

## Nginx 优势

- 高并发高性能
- 可扩展性好
- 高可靠性
- 热部署
- 开源许可证

## Nginx 主要应用场景

- 静态资源服务，通过本地文件系统提供服务
- 反向代理服务、负载均衡
- API服务、权限控制，减少应用服务器压力

## Nginx 常用配置文件和目录

- /etc/nginx/nginx.conf                  核心配置文件

  > nginx默认配置项，配置反向代理与负载均衡都会加载此配置文件

- /etc/nginx/conf.d/default.conf     默认http服务器配置文件

  > conf.d文件夹,写一些http服务器配置文件,默认文件为`default.conf`
  >
  > ```nginx
  > #default.conf默认配置文件
  > server {
  >     listen 80;    //端口名  80就是默认ip
  >     server_name hojack.top;  //已经将hojack.top域名解析到服务器公网ip上了
  >     location / {
  >         root  /home/MyBlog/dist;  //打包的项目所在目录
  >         Index  index.html;
  >     }
  >    #反向代理-解决跨域
  >    #将apiV1接口代理至 http://demo.com
  >      location /apiV1 {
  >         proxy_pass http://demo.com
  >     }
  > }
  > ```
  >
  > 需要在`nginx.conf  `上加载`conf.d`文件下的配置文件
  >
  > ```nginx
  > http{
  >  include /etc/nginx/conf.d/*.conf;
  > }
  > ```

- /var/cache/nginx                        Nginx的缓存目录

- /var/log/nginx                             Nginx的日志目录

## 正向代理和反向代理

> - 正向代理>>>冒充客户端
>
> - 反向代理>>>冒充服务端

### 正向代理

> 正向代理的代理对象是客户端。正向代理就是代理服务器替客户端去访问目标服务器。

作用: 冒充客户端去访问目标服务器

例子: 

- A浏览器无法访问C服务器
- B浏览器可以访问C 服务器
- A冒充B 浏览器去访问 C 服务器

```nginx
server{
    resolver 8.8.8.8;  # 谷歌的域名解析地址
    listen 80;

    location / {
        # 当客户端请求我的时候，我会把请求转发给它
        # $http_host 要访问的主机名 $request_uri 请求路径
        proxy_pass http://$http_host$request_uri;
    }
}
```



### 反向代理

> 反向代理指代理后端服务器响应客户端请求的一个中介服务器，代理的对象是服务器。
>
> 使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到的结果返回给客户端。反向代理隐藏了真实的服务器，为服务器收发请求，使真实服务器对客户端不可见

作用: 冒充目标服务器,通过这个中间服务器去访问目标服务器

```nginx
    server {
        listen       80;   
        server_name  localhost;   #监听地址
        #访问到localhost:8080/的根目录,将代理至http://127.0.0.1:8090,通过8090来访问目标服务器
        location  / {       
           root html;                        #/html目录
           index  index.html index.htm;      #设置默认页    
           proxy_pass http://127.0.0.1:8090;  #请求转向        
        } 
    }
```



## nginx部署总结

### 1. 项目打包,并上传至服务器

将vue项目打包好的dist文件，传到服务器对应的 /home/MyBlog/dist 下

### 2. 配置Ngnix

- 加载conf.d下的文件到nginx.conf中

  ```nginx
  http{
   include /etc/nginx/conf.d/*.conf;
  }
  ```

- conf.d下编写 配置文件

  ```nginx
  server {
      listen 80;    //端口名  80就是默认ip
      server_name hojack.top;  //已经将hojack.top域名解析到服务器公网ip上了
      location / {
          root  /home/MyBlog/dist;  //打包的项目所在目录
          index  index.html;
      }
  }
  ```

- 想让该次配置生效，无需关闭ngnix服务，只需要重启服务即可，执行以下命令：

  ```shell
  cd  /usr/sbin/
  ```

  ```
  nginx -s reload
  ```

  



