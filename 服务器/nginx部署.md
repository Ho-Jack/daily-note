---
title: Element-UI中分页组件在项目中如何用
date: 2019-11-17  16:46:34
tags: [部署, nginx, 开发笔记]
---

## nginx部署总结

1.将vue项目打包好的dist文件，传到服务器对应的 /home/MyBlog/dist 下

2.nginx 默认安装情况下，我们的nginx会位于linux服务器根目录下的/etc/nginx下，2个重要的东西 

 ①nginx.conf  （nginx默认配置项，配置反向代理与负载均衡都会加载此配置文件）  

②conf.d   （文件夹，我们增加一些配置文件，可以在此文件夹下写，之后配置到nginx.conf中）

- 加载conf.d下的文件到nginx.conf中

  ```shell
  http{
   include /etc/nginx/conf.d/*.conf;
  }
  ```

- conf.d下编写 配置文件

```shell
server {
    listen 80;    //端口名  80就是默认ip
    server_name hojack.top;  //已经将hojack.top域名解析到服务器公网ip上了
    location / {
        root  /home/MyBlog/dist;  //打包的项目所在目录
        Index  index.html;
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

  



nginx常用命令：

```shell
启动服务：nginx
退出服务：nginx -s quit
强制关闭服务：nginx -s stop
重载服务：nginx -s reload　　（重载服务配置文件，类似于重启，但服务不会中止）
验证配置文件：nginx -t
使用配置文件：nginx -c "配置文件路径"
使用帮助：nginx -h
```

1. 运行nginx  
   

```
sudo nginx -c    /etc/nginx/nginx.conf 
```

2. 停止 

 ```
sudo nginx -s quit 
 ```

   

