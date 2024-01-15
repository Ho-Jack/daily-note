# ingress实现外部访问k8s

## K8S暴露服务的方式

Kubernetes 暴露服务的方式目前只有三种：LoadBlancer Service、NodePort Service、Ingress。



## Service和Ingress:

> Kubernetes 为 Pods 提供自己的 IP 地址，并为一组 Pod 提供相同的 DNS 名， 并且可以在它们之间进行负载均衡。

- Service:集群内部的网络拓扑。
- Ingress:集群外部需要Ingress访问集群内部

![img](img\service和ingress.jpg)

## Ingress

### 问题:

`service`和`pod`仅可在集群**内部**网络中通过IP地址访问

### 解决:

Ingress 公开了从集群外部到集群内服务的 HTTP 和 HTTPS 路由。 流量路由由 Ingress 资源上定义的规则控制。

可以将 Ingress 配置为服务提供外部可访问的 URL、负载均衡流量、终止 SSL/TLS，以及提供基于名称的虚拟主机等能力。



## Ingress工作模式

### 方式一：通过service NodePort的方式暴露Ingress Controller

访问流程1：域名( web.aliangedu.cn)-> 公网负载均衡器->service nodeport -> ingress controller(nginx) ->分布在各个节点的pod

这里的service nodeport是用来暴露ingress controller

注意：增加service层转发，增加响应时间，并且要加端口访问

### 方式二：hostNetwork=True 共享主机网络

访问流程2: 域名( web.aliangedu.cn)-> 公网负载均衡器-> ingress controller(nginx) ->分布在各个节点的pod

注意：域名必须得解析ingress controller pod所在节点IP，并且一个节点只能跑一个pod（端口冲突）

##### 公网负载均衡器的作用：

- 将内网k8s节点暴露到公网中
- 提供统一的访问入口
- 加强内网k8s集群安全性



## 实例

> 命名空间为` ngingx-namespace`

### 1.创建一个deployment

```yaml
apiVersion: apps/v1
kind: Deployment 
metadata:
  name: web
  namespace: ngingx-namespace
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portal
  template:
    metadata:
      labels:
        app: portal
    spec:
      containers:
      - name: web
        image: nginx:1.18
```



```
kubectl apply -f web-deployment.yaml
```

### 2.创建service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: ClusterIP 
  ports:
  - port: 80 
    protocol: TCP
    targetPort: 80 
  selector:
    app: portal
```



### 3.创建一个ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test-ingress
spec:
  ingressClassName: nginx # 指定控制器
  rules:
  - host: k8sdemo.com # 域名 基于域名做分流 每个规则都要配置域名
    http:
      paths:
      - path: / # 转发路径
        pathType: Prefix
        backend:
          service:
            name: test # 指定service的名称
            port:
              number: 80 # 指定service的端口
       
```



获取ingress的IP

```
kubectl get pod -n nginx-namespace -o wide
```





```
kubectl get svc -n nginx-namespace -o wide
```

