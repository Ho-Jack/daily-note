# Nacos `/nɑ:kəʊs/`

> 一个更易于构建云原生应用的**动态服务发现**、**配置管理**和**服务管理**平台。

 Nacos 就是注册中心 + 配置中心的组合，提供简单易用的特性集，帮助我们解决微服务开发必会涉及到的服务注册与发现，服务配置，服务管理等问题。

## 1. Nacos特性

- 服务发现和服务健康监测
- 动态配置服务
- 动态 DNS 服务
- 服务及其元数据管理
- ....



## 2.  服务注册与发现框架对比

| 服务注册与发现框架 | CAP 模型 | 控制台管理 | 社区活跃度        |
| ------------------ | -------- | ---------- | ----------------- |
| Eureka             | AP       | 支持       | 低 (2.x 版本闭源) |
| Zookeeper          | CP       | 不支持     | 中                |
| Consul             | CP       | 支持       | 高                |
| Nacos              | AP       | 支持       | 高                |

![Nacos-服务注册与发现框架对比](D:\notes\daily-note\JavaNote\img\Nacos-服务注册与发现框架对比.jpg)

- Nacos 是专为 Dubbo 而生的注册中心与配置中心
- Nacos 完全兼容 Spring Cloud
- Nacos 支持 Service Mesh 集成，Kubernetes 集成





```
docker run --rm -e MODE=standalone --name nacos-test -p 8848:8848 -d nacos/nacos-server
```

