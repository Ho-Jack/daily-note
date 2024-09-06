# Kubernetes (k8s)

> K8S，就是基于容器的集群管理平台,操作部署多个容器的工具;
>
> 解决了Docker应用于具体的业务实现存在编排、管理和调度等问题;
>
> k8s具有对Docker及容器进行更高级更灵活的管理;

## 概念:

一个K8S系统，通常称为一个K8S**集群**（Cluster [ˈklʌstər]）,包括一个Master主节点和一群Node节点;

**K8S是负责自动化运维管理多个Docker程序的集群**



## K8s解决的问题:

###### 服务发现和负载均衡:

- K8S可以使用 DNS 名称或自己的 IP 地址公开容器，如果到容器的流量很大，[Kubernetes](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzI0MDQ4MTM5NQ%3D%3D%26mid%3D2247494581%26idx%3D2%26sn%3Df417309b54d5c031fb96f3ffca63cd53%26chksm%3De9188ea9de6f07bf24e8b52d74135eb840f8d39f23879067d07c6949d0a83fe4dd8fb093b014%26scene%3D21%23wechat_redirect) 可以负载均衡并分配网络流量，从而使部署稳定。

###### 存储编排:

- K8S允许自动挂载选择的存储系统，例如本地存储、公共云提供商等。

###### 自动部署和回滚

- 自动的对容器进行部署，如果发生紧急事件，当前的新版本出现了生产事故并且当前来不及进行修复的话可以回滚到历史稳定版本。
- Kubernetes中的四种部署策略：滚动更新、重新创建、蓝绿部署和金丝雀部署。



#### 集群主要包括两个部分：

> Kubernetes 中一个集群通常由多个节点（Node）组成，其中 Master 节点作为整个集群的控制中心，主要负责集群的管理和调度工作。

- **一个Master节点（主节点）**:Master节点主要还是负责管理和控制
- **一群Node节点（计算节点）**:Node节点是工作负载节点，里面是具体的容器

![image-20230626092628417](img\集群-节点.png)

- Master Node具备：请求入口管理（API Server），Worker Node调度（Scheduler），监控和自动调节（Controller Manager），以及存储功能（etcd）；
- Worker Node具备：状态和监控收集（Kubelet），网络和负载均衡（Kube-Proxy）、保障容器化运行环境（Container Runtime）、以及定制化功能（Add-Ons）



##### Master节点

![img](img\master节点.jpg)

Master节点包括API Server、Scheduler、Controller manager、etcd。

- API Server是整个系统的对外接口,提供的HTTP Rest接口，，是所有资源的增、删、改、查等操作的唯一入口，也是集群控制的入口进程,供客户端和其它组件调用，相当于“营业厅”。

- Scheduler负责对集群内部的资源进行调度（Pod调度），相当于“调度室”。

- Controller manager负责管理控制器，相当于“大总管”。





##### Node节点

![img](img\node节点.png)

Node节点包括Docker、kubelet、kube-proxy、Fluentd、kube-dns（可选），还有就是**Pod**。

- Pod是Kubernetes最基本的操作单元。一个Pod代表着集群中运行的一个进程，它内部封装了一个或多个紧密相关的容器。除了Pod之外，K8S还有一个**Service**的概念，一个Service可以看作一组提供相同服务的Pod的对外访问接口。

  > **Pod可以被理解成一群可以共享网络、存储和计算资源的容器化服务的集合**
  >
  > **一个Pod内可以有多个容器container**

- Docker，创建容器的。

- Kubelet(节点代理)，主要负责监视指派到它所在Node上的Pod，包括创建、修改、监控、删除等。

- Kube-proxy，主要负责为Pod对象提供代理。

- Fluentd，主要负责日志收集、存储与查询。



![image-20230626103018215](img\节点.png)

###### 每个Node上都运行着以下关键组件：

- **`kubelet`：** 负责Pod对应的容器创建、启停等任务，同时与Master密切协作，实现集群管理的基本功能。
- **`kube-proxy`：** 实现Kubernetes Service的通信与负载均衡机制的重要组件。
- **Container Runtime：** 下载镜像、运行容器。如Docker引擎，负责本机的容器创建和管理工作。

###### 节点操作命令:

- `kubectl get nodes`可以查看在集群中有多少个Node：

  ```shell
  [xcbeyond@localhost ~]$ kubectl get nodes
  NAME       STATUS   ROLES    AGE   VERSION
  minikube   Ready    master   17d   v1.19.0
  ```

- `kubectl describe node <node_name>`查看某个Node的详细信息：

  ```shell
  [xcbeyond@localhost ~]$ kubectl describe node minikube
  Name:               minikube
  Roles:              master
  Labels:             beta.kubernetes.io/arch=amd64
                      beta.kubernetes.io/os=linux
                      kubernetes.io/arch=amd64
                      kubernetes.io/hostname=minikube
                      kubernetes.io/os=linux
                      ……
  ```

  



### 总结Master和Node:

##### Master Node具备：

- 请求入口管理（API Server）
- Worker Node调度（Scheduler）
- 监控和自动调节（Controller Manager）
- 存储功能（etcd）

##### Worker Node具备：

- 状态和监控收集（Kubelet）
- 网络和负载均衡（Kube-Proxy）
- 保障容器化运行环境（Container Runtime）
- 定制化功能（Add-Ons）





### 重要概念解释:

#### Pod:

- Pod是K8s最小可部署单元
- **一个Pod内可以有多个容器container**(容器可以暂时认为是docker)

- 一个Pod代表着集群中运行的一个**进程**，它内部封装了一个或多个紧密相关的**容器**。
- 每一个Pod有唯一的IP地址,大多数情况Pod都存在同一个服务器,通过k8s进行网络隔离

- Pod可以被理解成一群可以**共享网络、存储和计算资源**的容器化服务的集合

- **同一个Pod之间的Container可以通过localhost互相访问，并且可以挂载Pod内所有的数据卷；但是不同的Pod之间的Container不能用localhost访问，也不能挂载其他Pod的数据卷**。



##### Pod 中容器部署形式:

###### Pod 中部署多个容器

比如 tomcat + mysql + 应用程序，这样就构成了一个完整的服务；

###### Pod 中只部署一个容器

比如部署 tomcat 容器，然后由多个 Pod 对外提供一个完整的服务

![Pod中容器的部署形式](img\Pod中容器的部署形式.webp)



Pause 容器:每个 Pod 中必须有一个 Pause 容器，主要作用是：提供一个共享的网络空间，方便 Pod 内容器间通信；提供一个 volumes 共享的挂载数据卷，统一管理容器数据

每个 Pod 之间是相互隔离，无法通信的







#### Container 容器:

> 容器可以理解为一个个应用

- Pod下的一个`container`

- 一个Pod内可以有多个容器container

  


容器的分类:

- 标准容器 Application Container。
- 初始化容器 Init Container。
- 边车容器 Sidecar Container。
- 临时容器 Ephemeral Container。



#### Service和Ingress:

> Kubernetes 为 Pods 提供自己的 IP 地址，并为一组 Pod 提供相同的 DNS 名， 并且可以在它们之间进行负载均衡。

- Service:集群内部的网络拓扑。
- Ingress:集群外部需要Ingress访问集群内部

##### Service

作用

- 解决Pod重启后ip变更的问题

- 让多个不同主机上的 Pod 能够相互通信

  ![service解决pod之间通讯问题](img\service解决pod之间通讯问题.png)

概念:

- Service:K8S中的服务（Service）并不是我们常说的“服务”的含义，而更像是**网关层**，是若干个Pod的流量入口、流量均衡器。
- **Service是K8S服务的核心，屏蔽了服务细节，统一对外暴露服务接口，真正做到了“微服务”**。
- K8S集群内的每一个Pod都有自己的IP（是不是很类似一个Pod就是一台服务器，然而事实上是多个Pod存在于一台服务器上，只不过是K8S做了网络隔离），在K8S集群内部还有DNS等网络服务（一个K8S集群就如同管理了多区域的服务器，可以做复杂的网络拓扑）





例子:

我们的一个服务A，部署了3个备份，也就是3个Pod；对于用户来说，只需要关注一个Service的入口就可以，而不需要操心究竟应该请求哪一个Pod。优势非常明显：**一方面外部用户不需要感知因为Pod上服务的意外崩溃、K8S重新拉起Pod而造成的IP变更，外部用户也不需要感知因升级、变更服务带来的Pod替换而造成的IP变化，另一方面，Service还可以做流量负载均衡**。





##### Ingress:

>Ingress 是对集群中服务的外部访问进行管理的 API 对象，典型的访问方式是 HTTP。
>Ingress 可以提供负载均衡、SSL 终结和基于名称的虚拟托管。

- Ingress是整个K8S集群的接入层，复杂集群内外通讯

![img](img\service和ingress.jpg)



###### ClusterIP

ClusterIP 是 Service 的默认类型，它会分配一个**集群内部的虚拟 IP 地址**，并将该地址绑定到 Service 上。当其他 Pod 或容器需要访问 Service 时，只需要使用该虚拟 IP 地址即可。

######  NodePort

NodePort 是一种扩展 ClusterIP 的功能，它会在**每个节点上分配一个唯一的端口号**，并将该端口号映射到 Service 上。当其他节点或外部网络需要访问 Service 时，只需要使用该节点 IP 地址和映射的端口号即可。



#### Namespace

Namespace（命令空间）是用来做资源的逻辑隔离的，比如的**Pod、Deployment、Service都属于资源**，不同Namespace下资源可以重名。同一Namespace下资源名需唯一

- 一个集群内部的逻辑隔离机制（鉴权、资源等）
- 每个资源都属于一个Namespace
- 同一个Namespace中资源命名唯一
- 不同Namespace中资源可重名

####  Label

它是一个说明性标签，Label 相当于是每一个 Pod 的别名，后期容器部署时都是根据 Label 找到 Pod



#### Volume 数据卷:

- 数据卷volume是Pod内部的磁盘资源

**volume是K8S的对象，对应一个实体的数据卷；而volumeMounts只是container的挂载点，对应container的其中一个参数**。但是，**volumeMounts依赖于volume**，只有当Pod内有volume资源的时候，该Pod内部的container才可能有volumeMounts。





#### Deployment(无状态) 和 ReplicaSet（简称RS）:

- Deployment的作用是管理和控制Pod和ReplicaSet
- ReplicaSet的作用就是管理和控制Pod

![image-20230626110947645](D:\notes\daily-note\服务器\k8s\img\Deployment 和 ReplicaSet（简称RS）.png)





#### StatefulSet(有状态):

> `StatefulSet`从本质上来说，可以看作Deployment/RC的一个特殊变种

##### 前提知识:

RC或Deployment控制**Pod的名字是随机产生**的，Pod的IP地址也是在运行期才确定且可能有变动的，我们事先无法为每个Pod确定唯一不变的ID，为了能够在其他节点上恢复某个失败的节点，这种集群中的Pod需要挂接某种共享存储

##### 作用

解决Deployment无状态的情况,为中间件集群，例如MySQL集群、MongoDB集群、Kafka集群、Zookeeper集群等提供有状态的服务



MySQL集群、MongoDB集群、Kafka集群、Zookeeper集群等，这些应用集群有以下一些共同点。

- 每个节点都有固定的身份ID，通过这个ID，集群中的成员可以相互发现并且通信。
- 集群的规模是比较固定的，集群规模不能随意变动。
- 集群里的每个节点都是有状态的，通常会持久化数据到永久存储中。
- 如果磁盘损坏，则集群里的某个节点无法正常运行，集群功能受损。







##### StatefulSet的特性:

- StatefulSet里的每个Pod都有稳定、唯一的网络标识，可以用来发现集群内的其他成员。假设StatefulSet的名字叫kafka，那么第一个Pod叫kafak-0，第二个Pod叫kafak-1，以此类推。
- StatefulSet控制的Pod副本的启停顺序是受控的，操作第n个Pod时，前n-1个Pod已经时运行且准备好的状态。
- StatefulSet里的Pod采用稳定的持久化存储卷，通过PV/PVC来实现，删除Pod时默认不会删除与StatefulSet相关的存储卷（为了保证数据的安全）。









### 没有 Docker 可以使用 k8s 吗？

k8s 只是一个容器编排器，没有容器拿什么编排？！

k8s 经常与 Docker 进行搭配使用，但是也可以使用其他容器，如RunC、Containerted 等。



### [Docker Desktop 下使用 K8s - ageovb - 博客园 (cnblogs.com)](https://www.cnblogs.com/ageovb/p/15471084.html#配置-web-控制台可选)



# K8s相关命令

##  kubectl 

kubectl 是 Kubernetes 自带的客户端，可以用它来直接操作 [Kubernetes](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzI0MDQ4MTM5NQ%3D%3D%26mid%3D2247511786%26idx%3D2%26sn%3Da7d8593664ca65dd59753d9b5468696e%26chksm%3De918cbf6de6f42e0670d0d9531c2a4d98788dab74af28217d4bfa0762efaa6f11d3bf785a405%26scene%3D21%23wechat_redirect) 集群。

kubectl 就是 Kubernetes API 的一个客户端而已

> Kubernetes API 是一个 HTTP REST API 服务，该 API 服务才是 Kubernetes 的真正用到的用户接口，所以 [Kubernetes](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzI0MDQ4MTM5NQ%3D%3D%26mid%3D2247509844%26idx%3D2%26sn%3Ddaa4fa549e9f139d0e16a14e79366a85%26chksm%3De918c248de6f4b5eb908c65748e916fd2cd2a3a422b0a61105b10c725f97a04771b3fe0a4d6b%26scene%3D21%23wechat_redirect) 通过该 API 进行实际的控制。这也就意味着每个 [Kubernetes](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzI0MDQ4MTM5NQ%3D%3D%26mid%3D2247504836%26idx%3D3%26sn%3D7caf359d1d02eeab1e5bc848cc6e8dd3%26chksm%3De918b6d8de6f3fce878aaedfd6d7370015b9c2b7a0c3210aa516ce1205a68689b88430d4ba0e%26scene%3D21%23wechat_redirect) 的操作都会通过 API 端点暴露出去，当然也就可以通过对这些 API 端口进行 HTTP 请求来执行相应的操作。所以，kubectl 最主要的工作就是执行 [Kubernetes](https://link.zhihu.com/?target=http%3A//mp.weixin.qq.com/s%3F__biz%3DMzI0MDQ4MTM5NQ%3D%3D%26mid%3D2247507390%26idx%3D2%26sn%3D5887ec3021ce80e44a4c62e2253560a8%26chksm%3De918b8a2de6f31b45a71be736919c2a99f4ed2f77b48c10c7482bada97198f9a35682962e683%26scene%3D21%23wechat_redirect) API 的 HTTP 请求。

## 工具使用参数

```text
get       #显示一个或多个资源  (查看 Pod 是否正常)
describe  #显示资源详情
apply     #将 yaml 文件的配置应用到 Pod 中
create    #从文件或标准输入创建资源
update   #从文件或标准输入更新资源
delete   #通过文件名、标准输入、资源名或者 label 删除资源
log       #输出 pod 中一个容器的日志
rolling-update  #对指定的 RC 执行滚动升级
exec  #在容器内部执行命令
port-forward #将本地端口转发到 Pod
proxy   #为 Kubernetes API server 启动代理服务器
run     #在集群中使用指定镜像启动容器
expose   #将 SVC 或 pod 暴露为新的 kubernetes service
label     #更新资源的 label
config   #修改 kubernetes 配置文件
cluster-info #显示集群信息
api-versions #以”组/版本”的格式输出服务端支持的 API 版本
version       #输出服务端和客户端的版本信息
help         #显示各个命令的帮助信息
ingress-nginx  #管理 ingress 服务的插件(官方安装和使用方式)
```

## **使用相关配置**

```text
# Kubectl自动补全
$ source <(kubectl completion zsh)
$ source <(kubectl completion bash)

# 显示合并后的 kubeconfig 配置
$ kubectl config view

# 获取pod和svc的文档
$ kubectl explain pods,svc
```

## create创建资源对象

### **分步骤创建**

```text
# yaml
kubectl create -f xxx-rc.yaml
kubectl create -f xxx-service.yaml

# json
kubectl create -f ./pod.json
cat pod.json | kubectl create -f -

# yaml2json
kubectl create -f docker-registry.yaml --edit -o json
```

### **一次性创建**

```text
kubectl create -f xxx-service.yaml -f xxx-rc.yaml
```

### **根据目录下所有的 yaml 文件定义内容进行创建**

```text
kubectl create -f <目录>
```

### **使用 url 来创建资源**

```text
kubectl create -f https://git.io/vPieo
```

## get 查看资源对象

### **查看所有 Node 或 Namespace 对象**

```text
kubectl get nodes
kubectl get namespace
```

### GET查看所有 Pod 对象

```text
# 查看子命令帮助信息
kubectl get --help

# 列出默认namespace中的所有pod
kubectl get pods

# 列出指定namespace中的所有pod
kubectl get pods --namespace=test

# 列出所有namespace中的所有pod
kubectl get pods --all-namespaces

# 列出所有pod并显示详细信息
kubectl get pods -o wide
kubectl get replicationcontroller web
kubectl get -k dir/
kubectl get -f pod.yaml -o json
kubectl get rc/web service/frontend pods/web-pod-13je7
kubectl get pods/app-prod-78998bf7c6-ttp9g --namespace=test -o wide
kubectl get -o template pod/web-pod-13je7 --template={{.status.phase}}

# 列出该namespace中的所有pod包括未初始化的
kubectl get pods,rc,services --include-uninitialized
```

### **查看所有 RC 对象**

```text
kubectl get rc
```

### **查看所有 Deployment 对象**

```text
# 查看全部deployment
kubectl get deployment

# 列出指定deployment
kubectl get deployment my-app
```

### **查看所有 Service 对象**

```text
kubectl get svc
kubectl get service
```

### **查看不同 Namespace 下的 Pod 对象**

```text
kubectl get pods -n default
kubectl get pods --all-namespace
```



## describe 查看资源描述

### **显示 Pod 详细信息**

```text
kubectl describe pods/nginx
kubectl describe pods my-pod
kubectl describe -f pod.json
```

### **查看 Node 详细信息**

```text
kubectl describe nodes c1
```

### **查看 RC 关联的 Pod 信息**

```text
kubectl describe pods <rc-name>
```

## rolling-update 更新修补资源

### **滚动更新**

```text
# 滚动更新 pod frontend-v1
kubectl rolling-update frontend-v1 -f frontend-v2.json

# 更新资源名称并更新镜像
kubectl rolling-update frontend-v1 frontend-v2 --image=image:v2

# 更新 frontend pod 中的镜像
kubectl rolling-update frontend --image=image:v2

# 退出已存在的进行中的滚动更新
kubectl rolling-update frontend-v1 frontend-v2 --rollback

# 强制替换; 删除后重新创建资源; 服务会中断
kubectl replace --force -f ./pod.json

# 添加标签
kubectl label pods my-pod new-label=awesome

# 添加注解
kubectl annotate pods my-pod icon-url=http://goo.gl/XXBTWq
```

### **修补资源**

```text
# 部分更新节点
kubectl patch node k8s-node-1 -p '{"spec":{"unschedulable":true}}'

# 更新容器镜像；spec.containers[*].name 是必须的，因为这是合并的关键字
kubectl patch pod valid-pod -p \
    '{"spec":{"containers":[{"name":"kubernetes-serve-hostname","image":"new image"}]}}'
```

### **Scale 资源**

```text
# Scale a replicaset named 'foo' to 3
kubectl scale --replicas=3 rs/foo

# Scale a resource specified in "foo.yaml" to 3
kubectl scale --replicas=3 -f foo.yaml

# If the deployment named mysql's current size is 2, scale mysql to 3
kubectl scale --current-replicas=2 --replicas=3 deployment/mysql

# Scale multiple replication controllers
kubectl scale --replicas=5 rc/foo rc/bar rc/baz
```

## delete删除资源对

### **基于 xxx.yaml 文件删除 Pod 对象**

```text
# yaml文件名字按照你创建时的文件一致
kubectl delete -f xxx.yaml
```

### **删除包括某个 label 的 pod 对象**

```text
kubectl delete pods -l name=<label-name>
```

### **删除包括某个 label 的 service 对象**

```text
kubectl delete services -l name=<label-name>
```

### **删除包括某个 label 的 pod 和 service 对象**

```text
kubectl delete pods,services -l name=<label-name>
```

### **删除所有 pod/services 对象**

```text
kubectl delete pods --all
kubectl delete service --all
kubectl delete deployment --all
```

## edit 编辑资源文件

在编辑器中编辑任何 API 资源

```text
# 编辑名为docker-registry的service
kubectl edit svc/docker-registry
```

## **直接执行命令**

在寄主机上，不进入容器直接执行命令

### **执行 pod 的 date 命令，默认使用 pod 的第一个容器执行**

```text
kubectl exec mypod -- date
kubectl exec mypod --namespace=test -- date
```

### **指定 pod 中某个容器执行 date 命令**

```text
kubectl exec mypod -c ruby-container -- date
```

### **进入某个容器**

```text
kubectl exec mypod -c ruby-container -it -- bash
```

## logs 查看容器日志

### **直接查看日志**

```text
# 不实时刷新kubectl logs mypod
kubectl logs mypod --namespace=test
```

### **查看日志实时刷新**

```text
kubectl logs -f mypod -c ruby-container
```