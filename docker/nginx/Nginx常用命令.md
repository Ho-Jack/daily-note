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

   

