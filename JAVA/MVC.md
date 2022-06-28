## MVC：

- M——Model（模型，即JavaBean）
- V——View（视图，即页面）
- C——Controller（控制层，即与前端交互的类）

## 架构

### Controler层：

>  负责具体的业务模块流程的控制 ,调用service层接口来控制业务流程

Controler负责**请求转发**，接受页面过来的参数，传给Service处理，接到返回值，再传给页面。

- Controller类:提供给管理后台的 RESTful API (业务方法)
- VO类: 接口的入参 ReqVO、出参 RespVO  (业务对象)

### Service层：

> 1、设计接口
>
> 2、设计实现类
>
> 3、调用已定义的dao层接口

Service层叫服务层，**中间层**，处理Dal

- Service 接口:  业务逻辑的接口定义
- ServiceImpl 类: 业务逻辑的实现类(实现提供给Controller调用的方法)

### DAL层:

> Data Access Layer，数据访问层
>
> **封装与数据库相关的业务** crud操作

-  DO类  :(Data Object，映射数据库表、或者 Redis 对象)
-  Mapper 接口: 数据库的操作
- RedisDAO 类: Redis 的操作



### MQ消息队列:

- Message 类: 发送和消费的消息
- Producer 类: 消息的生产者
- Consumer类: 消息的消费者

### Convert:

- Convert 接口:  DTO / VO / DO 等对象之间的转换器



### API层

- Api接口: 提供给其它模块的 API 接口

- DTO类: Api 接口的入参 ReqDTO、出参 RespDTO

  

- ApiImpl 类 : 写在biz模块下,提供给其它模块的 API 实现类







### 总结：
个人理解DAO/DAL面向表，Service面向业务。后端开发时先数据库设计出所有表，然后对每一张表设计出DAO层/DAL层，然后根据具体的业务逻辑进一步封装DAO层成一个Service层，对外提供成一个服务。

 Service层处于中间层，既**调用DAO层的接口**，又要提**供接口给Controller层**的类来进行调用。 每个模型都有一个Service接口，每个接口分别封装各自的业务处理方法。 



### 模型规约:

- DO（Data Object）：与数据库表结构一一对应，通过DAO层向上传输数据源对象。

- DTO（Data Transfer Object）：**数据传输对象**，Service或Manager向外传输的对象。

- BO（Business Object）：业务对象。由Service层输出的封装业务逻辑的对象。

- AO（Application Object）：应用对象。在Web层与Service层之间抽象的复用对象模型，极为贴近展示层，复用度不高。

- VO（View Object）：显示层对象，通常是Web向模板渲染引擎层传输的对象。

- Query：数据查询对象，各层接收上层的查询请求。注意超过2个参数的查询封装，禁止使用Map类来传输。

  

| 层次                | 领域模型 |
| ------------------- | -------- |
| Controller/TService | VO/DTO   |
| Service/Manager     | AO/BO    |
| DAL                 | DO       |



 1.允许Service/Manager可以操作数据领域模型，业务逻辑处理和数据组装。 

2.Controller/TService层的领域模型不允许传入DAO层

 3.不允许DAO层的数据传入到Controller/TService.

![](D:\notes\daily-note\JAVA\java数据与架构关系.png)