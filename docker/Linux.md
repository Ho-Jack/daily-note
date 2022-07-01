### 切换apt-get仓库地址

```css
sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
    sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

apt-get clean
```



## docker 容器切换镜像源

1. 配置sources.list文件

```
mv /etc/apt/sources.list /etc/apt/sources.list.bak
echo 'deb http://mirrors.163.com/debian/ stretch main non-free contrib' > /etc/apt/sources.list
echo 'deb http://mirrors.163.com/debian/ stretch-updates main non-free contrib' >> /etc/apt/sources.list
echo 'deb http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib' >> /etc/apt/sources.list
```

2. 同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引

   ```shell
   apt-get  update
   ```

3. 





## apt-get仓库切换为国内镜像源
1. 查看所用的源:

   ```shell
   sudo gedit /etc/apt/sources.list 
   ```

2. 重命名原来的源作为备份：

   ```shell
   sudo mv /etc/apt/sources.list /etc/apt/sources.list.backup
   ```

3. 新建一个sources.list文件

   ```shell
   sudo gedit /etc/apt/sources.list
   ```

4. 复制以下内容并保存（阿里云源）：

   ```shell
   deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
   deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
   deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
   ```

5. 更新apt软件源：

   ```
   sudo apt-get update
   ```

   



