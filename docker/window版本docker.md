# window的Linux子系统容器WSL

## WSL(Windows Subsystem for Linux)

> WSL是一个Linux系统的容器,作为各种Linux版本的容器;WSL依赖于hyper-v虚拟化技术;

- hyper-v是微软开发的硬件虚拟化技术，可以在 Windows 上以虚拟机形式运行多个操作系统;

  hyper-v服务会对VM等虚拟机的正常服务造成影响;

- wsl2是基于Hyper-V 功能的子集提供了“**真正的 Linux 内核**”, WSL2依赖于hyper-v

### WSL下可以存在多个Linux系统版本

> WSL就是一个Linux容器,可以含多个不同版本的Linux系统(可以在微软商店下载)

- Ubuntu
- Debian
- CentOS(收费)

### 下载的Linux系统版本存放位置

- 下载Ubuntu系统

  ```shell
  wsl -i -d   Ubuntu-20.04
  ```

- 上述下载成功安装后存放在C盘的位置

  ```java
  C:\Users\用户名\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs
  ```

- 迁移Linux系统镜像至其他盘,减少C盘占用空间

  1. 查询WSL容器下已安装的Linux版本

     ```shell
     wsl -l -v
     
     #结果如下
       NAME                   STATE           VERSION
     * docker-desktop         Running         2
       Ubuntu                 Stopped         2
     ```

  2. 导出上述查询到的Linux版本为tar文件到指定系统盘

     ```shell
     wsl --export <Linux版本如:Ubuntu>   <导出扩展名为tar的文件,可以指定路径,如:d:\ubuntu20.04.tar>
     ```

  3. 注销要导出的Linux版本

     ```shell
     wsl --unregister <Linux版本如:Ubuntu> 
     ```

  4. 重新导入并安装

     ```shell
     wsl --import <Linux版本如:Ubuntu> <指定安装位置>  <步骤2中导出的tar文件路径> --version 2
     ```

     



### WSL的基本命令

微软文档很详细:[WSL |的基本命令微软文档 (microsoft.com)](https://docs.microsoft.com/en-us/windows/wsl/basic-commands)

- 设置默认 WSL容器 版本

  > window系统有 WSL 1 或 WSL 2  这2个版本,一般都是用WSL2

  ```shell
  wsl --set-default-version <可以写1或2>
  ```

- 列出兼容和可下载的 Linux 版本(可以下载使用的版本)

  ```shell
  wsl --list --online
  wsl -l -o
  ```

  结果如下:

  ```shell
  NAME            FRIENDLY NAME
  Ubuntu          Ubuntu
  Debian          Debian GNU/Linux
  kali-linux      Kali Linux Rolling
  openSUSE-42     openSUSE Leap 42
  SLES-12         SUSE Linux Enterprise Server v12
  Ubuntu-16.04    Ubuntu 16.04 LTS
  Ubuntu-18.04    Ubuntu 18.04 LTS
  Ubuntu-20.04    Ubuntu 20.04 LTS
  ```

- 下载上面查询到的可用的Linux版本

  比如下载`Ubuntu-20.04`这个版本(也可以通过微软商店下载)

  ```SHELL
  wsl --install -d   Ubuntu-20.04
  wsl -i -d   Ubuntu-20.04
  ```

- 列出WSL容器已安装的Linux版本

  ```shell
  wsl --list --verbose
  wsl -l -v 
  ```

  结果如下:

  ```shell
    NAME                   STATE           VERSION
  * docker-desktop         Running         2
    Ubuntu                 Stopped         2
    docker-desktop-data    Running         2
  ```

- 从上述查询到的已安装的Linux版本,设置为默认的Linux版本

  ```shell
  wsl --set-default <WSL容器下的已安装的Linux版本>
  wsl -s <WSL容器下的已安装的Linux版本>
  ```

- 进入WSL容器下默认的Linux版本(进去上述设置的Linux版本)

  > 进入后就是Linux系统啦,可以使用各种Linux命令

  ```shell
  wsl ~
  ```

  切回window目录

  ```
  ~cd~
  ```

  

- 进入WSL容器下指定的已安装的Linux版本(`wsl -l -v`可以查已安装的Linux版本)

  ``` shell
  wsl --distribution <Linux版本的名字> --user <对应Linux版本的用户,如root>
  wsl -d <Linux版本的名字> -u <对应Linux版本的用户,如root>
  ```




## Window下安装Docker

> Docker是运行在Linux系统下的容器,也就是Docker的运行环境是Linux系统
>
> WSL是window的Linux系统容器,而WSL依赖于hyper-v;因此window下安装Docker需要hyper-v和WSL;

### 1. Window安装Docker的三种方式:

- 安装Docker Desktop for Windows（推荐,有WSL2环境就能直接按照可视化应用程序）
- 直接在Linux中安装Docker ce（此种方式和在linux虚拟机安装docker类似）
- ~~Docker Toolbox for Windows（兼容Windows 10以下安装的方式，这里不讨论这种方式，不推荐）~~

### 2. 安装Docker Desktop for Windows的环境要求

- hyper-v 
- WSL2(最新版本**Docker Desktop for Windows** 要求是WSL2)

### 3. **Docker Desktop for Windows**安装步骤

1. 开启hyper-v 和WSL2
2. 下载并安装`Docker Desktop for Windows`



### 4. 修改镜像和容器等数据存储位置(可选)

> `Docker Desktop for Windows` 运行数据都在 WSL 的Linux版本中,在安装后自带2个Linux版本
>
> - docker-desktop存放程序（内存占用小，根据需要，可以不用修改）
> - docker-desktop-data (存放镜像,占用硬盘空间大)

#### 迁移docker-desktop-data :

> docker-desktop-data存放的是镜像需要的硬盘空间较多!

1. 导出`docker-desktop-data `为tar文件到指定系统盘

   ```shell
   wsl --export docker-desktop-data   d:\docker-desktop-data.tar
   ```

2. 注销docker-desktop-data

   ```shell
   wsl --unregister docker-desktop-data
   ```

3. 重新导入并安装

   ```shell
   wsl --import docker-desktop-data d:\WSL\docker-desktop-data.tar d:\docker-desktop-data.tar  --version 2
   ```

   



### 5. 设置WSL容器下其他Linux版本访问(操作)Docker

#### `Docker Desktop for Windows`有2中形式访问docker来操作镜像与容器

>`Docker Desktop for Windows`安装后即可在window下访问Docker,也可以通过WSL容器下的Linux访问Docker!

- Windows container: 通过window  访问
-  Linux container: 通过WSL容器下安装的Linux版本访问

![image-20220701112626206](\img\docker选择访问途径.png)

#### `Docker Desktop for Windows`切换至Linux container 来访问Docker

> `Docker Desktop for Windows`安装后,默认带有`dokcer-desktop-data`这个Linux版本,可以设置其他Linux版本访问Docker;

1. 已经下载了Ubuntu等其他的Linux版本

   ```
   wsl -i -d   Ubuntu-20.04
   ```

   能查询到Ubuntu

   ```shell
   wsl -l -v
   #查询结果如下:
     NAME                   STATE           VERSION
   * docker-desktop         Running         2
     Ubuntu                 Stopped         2
     docker-desktop-data    Running         2
   ```

2. 点击桌面右下角`Docker Desktop for Windows`图标选择`Swhitch to Linux containers`

   > 切换到Linux容器,如果显示`Swhitch to Windows containers` 就是设置成功

3. 进入` Settings > Resources > WSL Integration`

   

   ![image-20220701105902580](.\img\docker设置Linux访问.png)

   

   
   
   4.重启`Docker Desktop for Windows`即可进入WSL容器的Linux版本,使用Docker命令了
   
   

无论是在`Windows container`还` Linux container `容器中访问Docker,使用命令`docker ps `查询到的容器都是一样的,都能访问

![docker通过Window和Linux查询容器](\img\docker通过Window和Linux查询容器.png)



### 6. 设置镜像加速器

配置Docker国内镜像加速下载: Setting>>Docker Engine

> 科大镜像：https://docker.mirrors.ustc.edu.cn/
> 网易：https://hub-mirror.c.163.com/
> 阿里云：https://<你的ID>.mirror.aliyuncs.com
> 七牛云加速器：https://reg-mirror.qiniu.com

```json
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ],
  "insecure-registries": [],
  "debug": false,
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "builder": {
    "gc": {
      "enabled": true,
      "defaultKeepStorage": "20GB"
    }
  }
}
```



