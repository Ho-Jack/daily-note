## IoC



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

  

## AOP（面向切面编程）：

> AOP :Aspect Orientd Programming （面向切面编程）
>
> 模块化,不用修改原来的代码，可以对方法进行单独个性化定制增强

- 通知方法增强:    使用动态代理的技术，在不修改源码的情况下对方法进行功能增强
- 事务管理:  核心就是保持数据的一致性

## context上下文和bean

> 所有被spring管理的、由spring创建的、用于依赖注入的对象，就叫做一个bean。Spring创建并完成依赖注入后，所有bean统一放在一个叫做context的上下文中进行管理。

### spring自动装配bean的三种方式

1. 隐式的bean发现机制和自动装配(自动扫描装配形式)

    Spring从两个角度来实现自动化装配：

   - 组件扫描（component scanning）

     > **@ComponentScan**注解，会自动扫描该类的属性，然后Spring会自动发现应用上下文中所创建的bean。

   - .自动装配（autowiring）

     >**@Autowired**注解进行注入,然后Spring会根据之间的关系自动满足bean之间的依赖。

2. 在Java中进行显式配置。(注解形式)

3. 在XML中进行显式配置。(xml形式)

## 容器：

> 实例的容器，管理创建的对象 
>
> 容器:设计好的一套存储对象和数据的一套轮子(模式)，容器管理着bean对象的创建和使用
>
> Spring容器负责创建对象，装配它们，配置它们并管理它们的整个生命周期，从生存到死亡

### 容器在spring中使用有两个形式:

- 以xlm配置文件的容器:

  1. 定义在一般名为的xml配置文件
  2. 依赖注入

- 以@Configuration注解标识的注解加载配置类

  在java标准类通过注解注释的加载配置类

### 容器的实现(使用)   :

- 容器管理着bean的生命周期
- 容器控制着bean的依赖注入

## 注解：

>  注解使用：以代替xml配置文件的另一种javaspring容器，可以简化配置，提高开发效率

### 原始注解:

#### 类的实例化:

- 通用方法：

##### @Component

>使用在任何类上用于实例化Bean
>
>在类上使用表明这个类是个组件类，需要Spring为这个类创建bean

- 特定类上使用的方法:

##### @Controller

> 使用在web层类上用于实例化Bean

##### @Service

> 使用在service层类上用于实例化Bean

##### @Repository

> 使用在dao层类上用于实例化Bean



#### 类型依赖注入:

  ##### @Autowired

> 自动注入这类型的依赖 (常用，自动注入装配)
>
> 使用在字段上用于根据类型依赖注入
> Spring会根据扫描了的属性之间的关系,自动满足bean之间的依赖

##### @Qualifier

>结合@Autowired一起使用用于根据名称进行依赖注入
>@Qualifier("userDao")

##### @Resource

>相当于@Autowired+@Qualifier，按照名称进行注入
> @Resource(name = "userDao")

#####  @Value

> 注入普通属性值  相当于赋值

  

#### bean的使用范围：

#####  @Scope

> 标注Bean的作用范围
>
> @Scope("prototype")   ( 模拟在xml配置文件中的prototype关键词进行bean对象注入)多例
> @Scope("singlenton") 默认单例

##### @PostConstruct

> 初始化方法

##### @PreDestroy

> 销毁方法



### 新注解：

#### @Configuration 

> 注释自身为配置容器
>
> 标志该类是Spring核心配置类,当创建容器时会从该类上加载注解数据
>
> spring创建容器的两种形式:
> - 定义的applicationContext.xml配置文件
> - 以@Configuration标记的配置类                        

#### @PropertySource

>  加载外部的properties文件 到spring容器   (常用在加载数据源对象的外置配置文件)

#### @ComponentScan

>  用于指定 Spring 在初始化容器时要扫描的包。

#### @Bean

>  spring会将当前方法的返回值,以指定的名称存储到spring容器中,需要把返回的对象注册到Spring的应用上下文中

#### @Import

> 用于导入其他配置类



## 上下文对象Context

> 全局的储存信息的空间，通过获取应用上下文获取该容器定义的所有对象信息

### 生命周期:

> 服务器启动，其就存在，服务器关闭，其才释放

### Spring自带了多种类型的应用上下文:

#### AnnotationConfigApplicationContext

> 从一个或多个基于Java的配置类中加载Spring应用上下文。

#### AnnotationConfigWebApplicationContext：

> 从一个或多个基于Java的配置类中加载Spring Web应用上下文。

#### ClassPathXmlApplicationContext：

> 从类路径下的一个或多个XML配置文件中加载上下文定义，把应用上下文的定义文件作为类资源。

#### FileSystemXmlapplicationcontext：

> 从文件系统下的一个或多个XML配置文件中加载上下文定义。

#### XmlWebApplicationContext：

> 从Web应用下的一个或多个 XML配置文件中加载上下文定义。

## AOP切面编程

>将相同逻辑的重复代码横向抽取出来，使用动态代理技术将这些重复代码织入到目标对象方法中，实现和原来一样的功能。

### 目的:
           1. AOP能够使这些服务**模块化**，并以声明的方式将它们应用到组件中去。
           2. 组件会具有更高的内聚性并且会更加关注自身的业务。
           3. 在程序运行期间，在**不修改源码**的情况下对方法进行功能增强,并通过**配置的方式**完成指定目标的方法增强。

```
*AOP本质实现底层基于动态代理技术：
    两种动态技术构成底层
        1.JDK原生代理     基于接口的动态代理技术
        2.cglib代理       基于父类(继承)的动态代理技术

*动态代理结构:
    *JDK 代理   目标对象   ----->   接口   --->代理对象
    *cglib代理  目标对象    ----( 基于父类动态代理技术）--->  代理对象
```



### AOP 实现方式:
- xml配置文件
- 注解加载类

#### xml配置文件实现切面编程:

1. 导入 AOP 相关坐标

2. 创建目标接口和目标类（内部有切点）

3. 创建切面类（内部有增强方法）

4. 将目标类和切面类的对象创建权交给 spring

   ```java
    <!--配置目标类-->
   <bean id="target" class="com.itheima.aop.Target"></bean>
   <!--配置切面类-->
   <bean id="myAspect" class="com.itheima.aop.MyAspect"></bean>    
   ```

5. 在` applicationContext.xml `中配置织入关系

6. 测试代码

   ```
          1.在测试代码中实现接口方法；
          2.在测试方法中使用模目标类调用切点方法  -->实现代理类
          3.该代理类会被xml织入的增强方法进行加注增强。
   ```

#### 注解加载类实现切面编程(推荐):

1. 创建目标接口和目标类（内部有切点）

2. 创建切面类（内部有增强方法）           

3. 将目标类和切面类的对象创建权交给 spring

   > 使用@Component 注解标注，告诉spring容器，这个是我定义的目标类和切面类

   - @Component("目标对象名")
   - @Component("切面对象名")

4. 在切面类中使用注解配置织入关系

   - 使用@Component注解告诉spring容器标注该类是切面类

       @Component("myAspect")

   - 使用@Aspect注解告诉spring容器标注该类织入 

      @Aspect       

5. 在配置文件中开启组件扫描和 AOP 的自动代理
   在xml配置文件中注入

   ```java
   <!--组件扫描-->
   <context:component-scan base-package="com.itheima.aop"/>
   <!--aop的自动代理-->
   <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
   ```

6. 测试

   ```
   1.在测试代码中实现接口方法；
   2.在测试方法中使用模目标类调用切点方法  -->实现代理类
   3.该代理类会被注解切面类织入的增强方法进行加注增强。 
   ```

#### 使用注解的测试类

```java
package com.hw.anno;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

/**
 * @Author LiangHanWu
 * @Date 2021-06-07 19:36
 * @Version 1.0
 */
@Component("myAspect")  //实例化类的的bean 将切面类的对象创建权交给 spring
@Aspect  //当前MyAspect是一个切面类
public class MyAspect {

    /*
    注入前置增强通知 增强方法在切入点方法执行前执行
    <aop:before method="before" pointcut="execution(* com.lhw.aop.*.*(..))"
    */
    //配置前置通知
    @Before("execution(* com.lhw.anno.*.*(..))")
    public void before(){
        System.out.println("前置增强.....");
    }

    public void afterReturn(){
        System.out.println("后置增强.....");
    }

    //ProceedingJoinPoint  真正执行的连接点 = 切点
    @Around("execution(* com.lhw.anno.*.*(..))")
    public Object around(ProceedingJoinPoint pjp) throws Throwable{
        System.out.println("环绕前增强....");
        //切入方法
        Object proceed = pjp.proceed();
        System.out.println("环绕后增强....");
        return proceed;
    }

    //切点表示式的抽取
    @After("com.hw.anno.MyAspect.pointcut()")
    public void afterThrowing(){
        System.out.println("异常抛出增强.....");
    }

    @After("execution(* com.lhw.anno.*.*(..))")
    public void after(){
        System.out.println("最终增强...");
    }

    //定义切点表示式
    @Pointcut("execution(* com.lhw.anno.*.*(..))")
    public void pointcut(){
        System.out.println("我是被抽取的....");
    }
}
```





## Spring全家桶

![spring架构](D:\notes\daily-note\JAVA\spring架构.png)

core组件是spring所有组件的核心；beans组件和context组件，是实现IOC和依赖注入的基础；AOP组件用来实现面向切面编程；web组件包括springmvc是web服务的控制层实现。

- Spring Boot 工具框架 

  >简化Spring应用和服务的创建、开发与部署，简化了配置文件，使用嵌入式web服务器，含有诸多开箱即用的微服务功能，可以和spring cloud联合部署。

- Spring framework ： IoC AOP

  > spring框架，包括了ioc依赖注入，Context上下文、bean管理、springmvc等众多功能模块，其它spring项目比如spring boot也会依赖spring框架。

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



## 常用注释

### 类型注释

#### @Controller

> 

#### @Service

#### @Component

> 在类上使用表明这个类是个组件类，需要Spring为这个类创建bean

#### @Bean

> 使用在方法上，告诉Spring这个方法将会返回一个Bean对象，需要把返回的对象注册到Spring的应用上下文中。



