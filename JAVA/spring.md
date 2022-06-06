### IoC：Inversion of Control（控制反转）:

> 指将对象的创建权，反转给了Spring容器；

- 正控：使用某个对象，必须通过new关键字来创建该对象。

- 反控：只管从Spring容器中获取需要使用的对象，无需关心对象的创建过程，这也就是把对象的创建控制权反转给了Spring框架。

### DI：Dependency Injection（依赖注入）

> 指Spring创建对象的过程中，将对象依赖的属性（简单值、对象、集合）通过配置信息设置给该对象。

### 总结IoC和DI：

IoC和DI其实是同一个概念的不同角度描述，DI相对IoC而言，明确描述了“被注入对象依赖IoC容器配置依赖对象”。

- IoC ：把**创建对象**的工作交给Spring完成

- DI：Spring在创建对象的同时完成**对象属性的赋值**

  

### AOP：Aspect Orientd Programming （面向切面编程）

> 可以在不改变原有业务逻辑的情况下实现对业务的增强

### 容器：

> 实例的容器，管理创建的对象 

## Spring全家桶

- Spring Boot 工具框架 
- Spring framework ： IoC AOP



### Core Container

> Spring 容器组件，用于完成实例的创建和管理
>
> - core
> - beans 实例管理
> - context 容器上下文

### AOP   Aspects

>Spring AOP组件，实现面向切面编程
>
>- aop
>- aspects

### Web

>Spring Web 组件实际指的是Spirng MVC框架，实现web项目的MVC控制
>
>- web（Spring对web项目的支持）
>- webmvc （SpringMVC组件）

### Data Access

> Spring 数据访问组件，也是一个基于JDBC封装的持久层框架（即使没有mybatis，Spring也可以完成持久化操作）
>
> - tx

### Test

> Spring的单元测试组件，提供了Spring环境下的单元测试支持
>
> - test