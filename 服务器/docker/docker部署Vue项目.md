# docker 通过构建镜像部署vue项目

#### vue项目部署须知

- 项目打包需要`node`环境,进行构建
- 前端构建产物需要通过`nginx`进行部署

因此如果要在docker容器上进行构建和部署需要有node环境和nginx

#### 最终成果:

在将前端源代码在有node环境的docker容器上进行打包,并使用容器内的nginx进行部署

最终将docker容器构建成镜像部署在服务器上

#### 具体步骤

> 通过gpt生成的步骤

1. 创建Dockerfile：在项目根目录下创建一个名为 `Dockerfile` 的文件，用于定义Docker镜像的构建过程。
2. 编写Dockerfile：在 `Dockerfile` 中，使用一个基础镜像（如 `node` 或 `nginx`）作为构建的起点，并将前端源代码复制到容器中。然后，在容器内执行打包命令，例如使用`npm run build`或其他适用于你的项目的打包脚本。
3. 安装Nginx：如果你选择的基础镜像不包含Nginx，你需要在Dockerfile中添加安装Nginx的步骤。
4. 配置Nginx：将Nginx的配置文件复制到容器中，并根据需要进行自定义配置，例如指定静态文件目录、代理等。
5. 构建Docker镜像：使用Docker命令在终端中执行构建命令，例如 `docker build -t your-image-name .`，其中 `your-image-name` 是你为镜像指定的名称。这将根据Dockerfile中的定义构建镜像。
6. 部署镜像：将构建好的Docker镜像上传至服务器，然后在服务器上运行该镜像以创建容器。使用Docker命令 `docker run` 或使用Docker编排工具（如Docker Compose或Kubernetes）来管理容器的运行。
7. 配置服务器：确保服务器上的网络配置允许对Nginx的访问，并将服务器的端口映射到容器内的Nginx端口，以使前端应用程序能够通过服务器的公共IP或域名进行访问。

#### 实践:

##### 1.创建Dockerfile文件

```shell
# 使用 Node.js 16 作为基础镜像
FROM node:16

# 将当前工作目录设置为/app
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到 /app 目录下
COPY /package*.json ./

# 运行 npm install 安装依赖
RUN npm install

# 将源代码复制到 /app 目录下(复制到容器中)
COPY . .

# 打包构建
RUN npm run build

# Nginx 镜像作为运行环境
FROM nginx:latest
#将构建产物复制到 Nginx 的默认静态文件目录
COPY --from=0 /app/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露容器的 8080 端口，此处其实只是一个声明作用，不写的话也可以，后面运行容器的
# docker run --name container_name -p <host_port>:<container_port>命令中container_port可以覆盖此处的声明，不写就默认80端口
## 暴露 Nginx 的默认 HTTP 端口
EXPOSE 8080

# 启动 nginx 服务
CMD ["nginx", "-g", "daemon off;"]

```



##### 2.构建镜像

构建镜像的命令如下：

```shell
docker build -t <image_name>:<tag> .
```

-  `-t `自定义镜像名和标签
- `.` 从当前目录查找dockerfile来构建镜像

实例:

构建镜像名为:`vite-vue-image`的镜像

```dockerfile
docker build -t vite-vue-image:v1 .
```



添加`.dockerignore` 过滤`node_modules`否则构建镜像会报错

##### 

##### 3.运行容器

构建运行容器

```shell
# 构建运行容器
# --name 指定容器名称为 vite-vue-container
# -p 指定外部端 8080 于容器内 8080端口连接，从而可以通过主机的 8080 端口来访问容器内的服务，要记得<container_port>这个端口被nginx监听到，因为nginx默认监听80端口而已
# -v 代表绑定卷 也就是本地的 dist 文件如果变更 容器内的 dist文件也会做出相应改变
# -v 宿主机目录:容器配置文件目录      映射配置文件
# 注意 -v 两侧均需要使用绝对路径
# -d 表示在后台运行
# 最后的 vite-vue-image:v1 表示使用指定的镜像
# docker run --name container_name -p <host_port>:<container_port> -v <path> -d <image_name>:<tag>
docker run --name vite-vue-container -p 8080:8080  -d vite-vue-image:v1

```



##### 4.修改nginx监听端口

问题: 由于nginx默认监听的是容器内的80端口,而向外面映射的端口是8080

在容器内`/etc/nginx/conf.d/default.conf`修改`nginx`配置,

```nginx
server {
    listen 80;  #需要修改为8080
    server_name localhost;

    # 静态文件服务
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```





#### 技巧: docker监听dist

启动容器的时候通过`-v ` 将dist打包文件映射到nginx映射的html文件夹,监听dist改变

- `-v `    宿主机目录:容器配置文件目录      

```
docker run --name vite-vue-container -p 8080:8080  -v D:\workspace\Vue\Vue3.0\vue3-cli-demo\dist:/usr/share/nginx/html -d vite-vue-image:v1  
```



PS:通过这种情况映射,可以更加灵活使用容器,容器使用的html文件是宿主机目录,可以随时打包上传到宿主机,当然可以去掉构建镜像时使用node环境和打包命令