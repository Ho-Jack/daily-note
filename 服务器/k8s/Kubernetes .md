# Kubernetes (k8s)

> K8S，就是基于容器的集群管理平台,操作部署多个容器的工具; 解决了Docker应用于具体的业务实现存在编排、管理和调度等问题;k8s具有对Docker及容器进行更高级更灵活的管理;

概念:

一个K8S系统，通常称为一个**K8S集群（Cluster）**。

**K8S是负责自动化运维管理多个Docker程序的集群**



这个集群主要包括两个部分：

- **一个Master节点（主节点）**:Master节点主要还是负责管理和控制
- **一群Node节点（计算节点）**:Node节点是工作负载节点，里面是具体的容器

![image-20230626092628417](D:\notes\daily-note\服务器\k8s\img\集群-节点.png)

- Master Node具备：请求入口管理（API Server），Worker Node调度（Scheduler），监控和自动调节（Controller Manager），以及存储功能（etcd）；
- Worker Node具备：状态和监控收集（Kubelet），网络和负载均衡（Kube-Proxy）、保障容器化运行环境（Container Runtime）、以及定制化功能（Add-Ons）



### Master节点

![img](D:\notes\daily-note\服务器\k8s\img\master节点.jpg)

Master节点包括API Server、Scheduler、Controller manager、etcd。

- API Server是整个系统的对外接口,提供的HTTP Rest接口，，是所有资源的增、删、改、查等操作的唯一入口，也是集群控制的入口进程,供客户端和其它组件调用，相当于“营业厅”。

- Scheduler负责对集群内部的资源进行调度（Pod调度），相当于“调度室”。

- Controller manager负责管理控制器，相当于“大总管”。





### Node节点

![img](D:\notes\daily-note\服务器\k8s\img\node节点.png)

Node节点包括Docker、kubelet、kube-proxy、Fluentd、kube-dns（可选），还有就是**Pod**。

- Pod是Kubernetes最基本的操作单元。一个Pod代表着集群中运行的一个进程，它内部封装了一个或多个紧密相关的容器。除了Pod之外，K8S还有一个**Service**的概念，一个Service可以看作一组提供相同服务的Pod的对外访问接口。

  > **Pod可以被理解成一群可以共享网络、存储和计算资源的容器化服务的集合**
  >
  > **一个Pod内可以有多个容器container**

- Docker，创建容器的。

- Kubelet，主要负责监视指派到它所在Node上的Pod，包括创建、修改、监控、删除等。

- Kube-proxy，主要负责为Pod对象提供代理。

- Fluentd，主要负责日志收集、存储与查询。



![image-20230626103018215](D:\notes\daily-note\服务器\k8s\img\节点.png)

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

Kubernetes最基本的操作单元

一个Pod代表着集群中运行的一个进程，它内部封装了一个或多个紧密相关的容器。

**Pod可以被理解成一群可以共享网络、存储和计算资源的容器化服务的集合**

**一个Pod内可以有多个容器container**

**同一个Pod之间的Container可以通过localhost互相访问，并且可以挂载Pod内所有的数据卷；但是不同的Pod之间的Container不能用localhost访问，也不能挂载其他Pod的数据卷**。





#### Volume 数据卷:

- 数据卷volume是Pod内部的磁盘资源

**volume是K8S的对象，对应一个实体的数据卷；而volumeMounts只是container的挂载点，对应container的其中一个参数**。但是，**volumeMounts依赖于volume**，只有当Pod内有volume资源的时候，该Pod内部的container才可能有volumeMounts。



#### Container 容器:

- Pod下的一个`container`

- 一个Pod内可以有多个容器container

  

  

容器的分类:

- 标准容器 Application Container。
- 初始化容器 Init Container。
- 边车容器 Sidecar Container。
- 临时容器 Ephemeral Container。



#### Deployment(无状态) 和 ReplicaSet（简称RS）:

>一个 *Deployment* 控制器为 [Pods](https://link.zhihu.com/?target=https%3A//kubernetes.io/docs/concepts/workloads/pods/pod-overview/) 和 [ReplicaSets](https://link.zhihu.com/?target=https%3A//kubernetes.io/zh/docs/concepts/workloads/controllers/replicaset/) 提供声明式的更新能力。
>你负责描述 Deployment 中的 *目标状态*，而 Deployment 控制器以受控速率更改实际状态， 使其变为期望状态。你可以定义 Deployment 以创建新的 ReplicaSet，或删除现有 Deployment，并通过新的 Deployment 收养其资源。

![image-20230626110947645](D:\notes\daily-note\服务器\k8s\img\Deployment 和 ReplicaSet（简称RS）.png)

- Deployment的作用是管理和控制Pod和ReplicaSet
- ReplicaSet的作用就是管理和控制Pod

##### Deployment典型使用场景：

- 创建Deployment对象来生成对应的Replica set并完成Pod副本的创建。
- 检查Deployment的状态来看部署动作是否完成（Pod副本数是否达到预期值）。
- 更新Deployment来创建新的Pod。
- 如果当前Deployment不稳定，则回滚到一个先前的Deployment版本。
- 暂停Deployment以便于一次性修改多个PodTemplateSpec的配置项，之后再恢复Deployment，进行新的发布。
- 扩展Deployment以应对高负载。
- 查看Deployment状态，以此作为发布是否成功的指标。



#### StatefulSet(有状态):

> `StatefulSet`从本质上来说，可以看作Deployment/RC的一个特殊变种

##### 前提知识:

RC或Deployment控制Pod的名字是随机产生的，Pod的IP地址也是在运行期才确定且可能有变动的，我们事先无法为每个Pod确定唯一不变的ID，为了能够在其他节点上恢复某个失败的节点，这种集群中的Pod需要挂接某种共享存储

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





#### Service和Ingress:

>将运行在一组 [Pods](https://link.zhihu.com/?target=https%3A//kubernetes.io/docs/concepts/workloads/pods/pod-overview/) 上的应用程序公开为网络服务的抽象方法。
>使用 Kubernetes，您无需修改应用程序即可使用不熟悉的服务发现机制。 Kubernetes 为 Pods 提供自己的 IP 地址，并为一组 Pod 提供相同的 DNS 名， 并且可以在它们之间进行负载均衡。

##### Service

- Service:K8S中的服务（Service）并不是我们常说的“服务”的含义，而更像是网关层，是若干个Pod的流量入口、流量均衡器。
- **Service是K8S服务的核心，屏蔽了服务细节，统一对外暴露服务接口，真正做到了“微服务”**。
- K8S集群内的每一个Pod都有自己的IP（是不是很类似一个Pod就是一台服务器，然而事实上是多个Pod存在于一台服务器上，只不过是K8S做了网络隔离），在K8S集群内部还有DNS等网络服务（一个K8S集群就如同管理了多区域的服务器，可以做复杂的网络拓扑）

例子:

我们的一个服务A，部署了3个备份，也就是3个Pod；对于用户来说，只需要关注一个Service的入口就可以，而不需要操心究竟应该请求哪一个Pod。优势非常明显：**一方面外部用户不需要感知因为Pod上服务的意外崩溃、K8S重新拉起Pod而造成的IP变更，外部用户也不需要感知因升级、变更服务带来的Pod替换而造成的IP变化，另一方面，Service还可以做流量负载均衡**。



- Service主要负责K8S集群内部的网络拓扑。集群外部需要Ingress访问集群内部

##### Ingress:

>Ingress 是对集群中服务的外部访问进行管理的 API 对象，典型的访问方式是 HTTP。
>Ingress 可以提供负载均衡、SSL 终结和基于名称的虚拟托管。

- Ingress是整个K8S集群的接入层，复杂集群内外通讯

![img](D:\notes\daily-note\服务器\k8s\img\service和ingress.jpg)





### 没有 Docker 可以使用 k8s 吗？

k8s 只是一个容器编排器，没有容器拿什么编排？！

k8s 经常与 Docker 进行搭配使用，但是也可以使用其他容器，如RunC、Containerted 等。