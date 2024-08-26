在一个服务器上部署多个站点，所以需要开放多个端口来访问不同的站点

```undefined
iptables -A INPUT -ptcp --dport 9900 -j ACCEPT
```

原因：防火墙没开放端口。

```shell
sudo ufw allow 8081况·
```

阿里云 需要上阿里云上开启端口