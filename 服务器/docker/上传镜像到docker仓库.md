# 上传镜像到docker仓库

构建好的本地镜像:`vite-vue-image`   tag为:v1

docker hub的仓库:`965389230/hojack-docker`

上传镜像命令:`docker push 965389230/hojack-docker:tagname`



需要将本地镜像打一个tagname才能通过命令上传



## 将镜像打标签

标准命令:

```shell
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```



例子:





将本地镜像:`vite-vue-image` 打标签

标签格式为: `仓库名+tag名`

- 仓库名:`965389230/hojack-docker`
- tag名: 自定义(可以是镜像的名称,为了方便区分)

```
 docker tag   vite-vue-image:v1 965389230/hojack-docker:vite-vue-image
```



## 上传镜像

上传镜像命令:`docker push 965389230/hojack-docker:tagname`

实例

```
docker push  965389230/hojack-docker:vite-vue-image
```



在docker中可以看到镜像`vite-vue-image` 已经新增了一个和仓库名一样`965389230/hojack-docker` 的镜像,而且tag为:`vite-vue-image`

也就是将原来的镜像复制一份并重命名

![image-20240117171510571](img\镜像列表.png)

