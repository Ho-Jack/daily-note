1. DNS Host 

    DNS  Host 都是设置域名/host和IP的关系

2. Host。DNS区别

   host是最初的host和IP设置的方法。在互联网的早期，网络只有几台电脑。人们用hosts文件记录机器名字到IP的映射，后来网络的规模越来越大。hosts文件记录映射已经不可行了，所以发明了DNS，域名系统（DoMan Name System）

   host设置是本地一个文件，DNS是一个服务器，可以看成是有一个远程服务器专门存放域名/host和IP的关系，这个就是DNS服务器

   简单来说，全球有很多域名服务器，用来存储从域名到IP地址的映射。每台终端，无论手机还是电脑，在联网的时候都会配置一个DNS地址，就是DNS服务器的IP地址。填的那个8.8.8.8就是所设立的DNS服务器。在上网的时候电脑会去向这些DNS服务器查询域名对应的IP。



hosts修改后释放 命令行

```
ipconfig/release
```

