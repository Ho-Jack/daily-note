## 前言

本文主要记录如何安装Kubernetes Dashboard，并配置控制台的安全访问，包括用户和角色的创建，以及获取认证令牌登录控制台。

## 安装Dashboard

1.执行以下命令

```shell
shell
复制代码kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.5.0/aio/deploy/recommended.yaml
```

2.等待`kubernetes-dashboard`的创建及配置

```shell
shell复制代码namespace/kubernetes-dashboard created
serviceaccount/kubernetes-dashboard created
service/kubernetes-dashboard created
secret/kubernetes-dashboard-certs created
secret/kubernetes-dashboard-csrf created
secret/kubernetes-dashboard-key-holder created
configmap/kubernetes-dashboard-settings created
role.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrole.rbac.authorization.k8s.io/kubernetes-dashboard created
rolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
deployment.apps/kubernetes-dashboard created
service/dashboard-metrics-scraper created
deployment.apps/dashboard-metrics-scraper created
```

## 启动Dashboard

1.执行以下命令

```shell
shell
复制代码kubectl proxy
```

2.或者指定监听端口

```shell
shell
复制代码kubectl proxy --port=8001 &
```

3.浏览器访问：[http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A8001%2Fapi%2Fv1%2Fnamespaces%2Fkubernetes-dashboard%2Fservices%2Fhttps%3Akubernetes-dashboard%3A%2Fproxy%2F)

## 访问控制

RBAC：Roles based Access Control
 Kubernetes Dashboard 是基于 RBAC 实现的安全访问，进入 Dashboard 时需要提供 Bearer Token 登录 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a644091b75294c02beedec2703a11c8e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### 创建用户（管理员）

使用Bearer Token，以管理员权限登录Dashboard

#### 创建一个Service Account

以下示例创建一个Service Account `admin-user`
 1.创建文件：k8s-dashboard-adminuser.yaml
 `metadata.name`，Service Account
 `metadata.namespace`，所属命名空间

```yaml
yaml复制代码apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```

2.在yaml文件所在目录执行命令

```shell
shell
复制代码kubectl apply -f k8s-dashboard-adminuser.yaml
```

#### 创建一个ClusterRoleBinding

在Kubernetes集群配置之后（通过`kubeadm`或其他集群管理工具），
 Kubernetes默认存在一个`Cluster Role`（集群角色）：`cluster-admin`
 查看集群角色：

```shell
shell
复制代码kubectl get clusterroles
```

以下示例使用集群角色`cluster-admin`绑定到Service Account `admin-user`
 1.创建文件：k8s-dashboard-adminuser2clusteradmin.yaml

```yaml
yaml复制代码apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

2.在yaml文件所在目录执行命令

```shell
shell
复制代码kubectl apply -f k8s-dashboard-adminuser2clusteradmin.yaml
```

### 获取Bearer Token

1.通过以下命令获取Bearer Token
 `-n`，namespace，指定命名空间

```shell
shell
复制代码kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
```

2.获取得到JWT

```shell
shell
复制代码eyJhbGciOiJSUzI1NiIsImtpZCI6IkdfYXVQNXVRZ0d5MGVWV3FveWg2REt6bHM2cEpuMG5xUDF4Rk1LU25adzQifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLXJiNjZuIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI0MTFjYmM0NC02YzJkLTQwM2EtOWY4Yy03N2FjYzQ4MDQ3OTIiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.lSWeiMQ47ZBXMkzBlaGDvqtGLbpRXVwgGCsKSOXX5q9XWLiAgWxrDt8ypsjff1frlhaOgloYiwwZQZBuqBJXyuixxdyI-KQhQHwvngXiZrFZLzNBtp3K9uPuKUMX2NxJMsLnPDEFHx8tXkbba__xwryiJ8rvrckwj4KohTfsq5t2p8Jdrl2FFdGRYncOIHpE8uNEJpJpHzlyMSSvtAj1im1E2X4YyzZOmNmmrvq3dZG7jTXq8uUiDwNBZC6aNdqwd7c38eukl6pJqzjUz0aGhdm6n9Z9AzY37VfSfe0WXr0MFhPvOYY5PL1mBtkb5lC_Kd45WtYpTK49ODKoqbSQYg
```

3.使用token即可登入Dashboard

### 移除用户

通过以下命令可删除 ServiceAccount 和 ClusterRoleBinding

```shell
shell复制代码kubectl -n kubernetes-dashboard delete serviceaccount admin-user
kubectl -n kubernetes-dashboard delete clusterrolebinding admin-user
```



作者：WEIII
链接：https://juejin.cn/post/7246199759975071801
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。