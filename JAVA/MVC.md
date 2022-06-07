### MVC：

- M——Model（模型，即JavaBean）
- V——View（视图，即页面）
- C——Controller（控制层，即与前端交互的类）



### DAO层：

> 封装与数据库相关的业务

DAO层叫数据访问层，全称为data access object，属于一种比较底层，比较基础的操作，具体到对于某个表的增删改查，也就是说某个DAO一定是和数据库的某一张表一一对应的，其中封装了增删改查基本操作，建议DAO只做原子操作，增删改查。

### Service层：

> 1、设计接口
>
> 2、设计实现类
>
> 3、调用已定义的dao层接口

Service层叫服务层，被称为服务，粗略的理解就是对一个或多个DAO进行的再次封装，封装成一个服务，所以这里也就不会是一个原子操作了，需要事物控制。

### Controler层：

>  负责具体的业务模块流程的控制 ,调用service层接口来控制业务流程

Controler负责请求转发，接受页面过来的参数，传给Service处理，接到返回值，再传给页面。

### 总结：
个人理解DAO面向表，Service面向业务。后端开发时先数据库设计出所有表，然后对每一张表设计出DAO层，然后根据具体的业务逻辑进一步封装DAO层成一个Service层，对外提供成一个服务。

 Service层处于中间层，既**调用DAO层的接口**，又要提**供接口给Controller层**的类来进行调用。 每个模型都有一个Service接口，每个接口分别封装各自的业务处理方法。 



### 模型规约:

- DO（Data Object）：与数据库表结构一一对应，通过DAO层向上传输数据源对象。
- DTO（Data Transfer Object）：数据传输对象，Service或Manager向外传输的对象。
- BO（Business Object）：业务对象。由Service层输出的封装业务逻辑的对象。
- AO（Application Object）：应用对象。在Web层与Service层之间抽象的复用对象模型，极为贴近展示层，复用度不高。
- VO（View Object）：显示层对象，通常是Web向模板渲染引擎层传输的对象。
- Query：数据查询对象，各层接收上层的查询请求。注意超过2个参数的查询封装，禁止使用Map类来传输。

| 层次                | 领域模型 |
| ------------------- | -------- |
| Controller/TService | VO/DTO   |
| Service/Manager     | AO/BO    |
| DAO                 | DO       |



 1.允许Service/Manager可以操作数据领域模型，业务逻辑处理和数据组装。 

2.Controller/TService层的领域模型不允许传入DAO层

 3.不允许DAO层的数据传入到Controller/TService.

![](D:\notes\daily-note\JAVA\java数据与架构关系.png)