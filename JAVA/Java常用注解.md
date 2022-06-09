# Java常用注解Annotations 

## 面向对象，AOP......注解
#### @Override 

> 注明这是一个重写的方法 覆盖父类方法

#### @Test

> 单元测试法

#### @Retention

> 生命周期

## SpringMVC常用的注解

#### @RestController =  `@Controller`  + `@ResponseBody `

> 组合注解，组合了@Controller和@ResponseBody
>
> @Controller 标识是一个Controller，Spring包扫描创建实例
>
> @ResponseBody 返回对象利用jackson工具类转换为json字符串
>
> 1. 类前注解，表示可以被浏览器访问（只在类上）
>
> 2. 返回JSON格式的数据

```java
//让浏览器访问类/方法
@RestController
public class HelloBoot{
    //访问接口： http://localhost:8080/a
    @RequestMapping('a')
    public String hello(){
        return 'hello'
    }
}
```



#### @RequestMapping

> 作用是规定浏览器的访问方式（可以在类上和方法上）
>
> 将 URL 请求与业务方法进行映射

| 属性    | 作用                                                         |
| ------- | ------------------------------------------------------------ |
| value   | **用于指定请求的 URL**。和 path 属性的作用一样。             |
| method  | **用于控制请求的方式。** 取值：<br/>RequestMethod.**GET**<br/>RequestMethod.**POST** |
| params  | 用于指定限制请求参数的条件。 它支持简单的表达式。要求请求参数的 key 和 value 必须和 配置的一模一样。例如：<br/>params = {“accountName”}：表示请求参数必须有 accountName<br/>params = {“moeny!100”}：表示请求参数中 money 不能是 100。 |
| headers | 用于指定限制请求消息头的条件。                               |



方法上：

```java
public class HelloBoot{
    //访问接口： http://localhost:8080/abc
    @RequestMapping('abc')
    public String hello(){
        return 'hello'
    }
}
```

类上

```java
@RequestMapping('hello')
public class HelloBoot{
    //访问接口： http://localhost:8080/hello/abc
    @RequestMapping('abc')
    public String hello(){
        return 'hello'
    }
}
```

##### @getMapping 

> `@getMapping` == ` @RequestMapping(method = RequestMethod.GET)`
>
> 详细规定了只获取get()请求的参数，和@requestMapping相近

##### @postMapping

> `@getMapping` == `@RequestMapping(method = RequestMethod.POST)`
>
> 详细规定了只获取post()请求的参数，和@requestMapping相近

##### @PutMapping

##### @PatchMapping

##### @DeleteMapping



#### @RequestParam

> 将指定的请求参数赋值给方法中的形参
>
> **URL表示在请求中，必须提供 key** ,` /url?key=value`

| 属性         | 意义                                                         |
| ------------ | ------------------------------------------------------------ |
| **value**    | **指定请求参数中的名称**                                     |
| **required** | 请求参数中是否必须提供此参数。 **默认值：true**。表示必须提供，当 required 为 true 时，如果请求中必须提供此参数，不提供将报错 |

```java

//useRequestParam?name=test
@RequestMapping("/useRequestParam") 
public String useRequestParam(@RequestParam("name")String username,       
							  @RequestParam(value="age", required=false)Integer age){  
	System.out.println(username + "," + age);  
	return "success";
}
```

#### @RequestBody

> 获取POST请求的**body**部分数据（接收http请求的json转换为java对象）
>
> 直接使用得到是 **key=value&key=value…** 结构的数据。
>
> GET 请求方式不适用。

``` java
@RequestMapping("/useRequestBody")
public String useRequestBody(@RequestBody(required = false) String bodyMsg){  	
	System.out.println(bodyMsg);  
	return "success"; 
} 
post 请求运行结果： username=xxx&password=xxx
get ：null
    
<form action="springmvc/useRequestBody" method="post"> 
    用户名称：<input type="text" name="username"> <br/>  
    用户密码：<input type="password" name="password">
    <input type="submit" value=" 保存 ">
</form>
```





#### @PathVariable

> 路径变量,解析restful参数的数据，标识接收单个参数
>
> 当使用@RequestMapping URI template 样式映射时， 即 someUrl/{paramId}, 这时的paramId可通过 @Pathvariable注解绑定它传过来的值到方法的参数上。

``` java
//http://localhost:8080/user/unsert3/1/小明/18
@RequestMapping("insert3/{id}/{name}/{age}")
public String insert3(@PathVariable Integer id,
                     @PathVariable String name,
                     @PathVariable Integet age){
    System.out.printIn("id="+id+",name"+name+",age"+age)
}
```

#### @ResponseBody：

> 注解实现将conreoller方法返回**对象转化为json对象**响应给客户端。
>
> 作用：将Controller的方法返回的对象，通过适当的HttpMessageConverter转换为指定格式后，写入到Response对象的body数据区。
>
> 使用时机：返回的数据不是html标签的页面，而是其他某种格式的数据时（如json、xml等）使用；

#### @SpringBootApplication

> SpringBoot提供的，标记这是一个SpringBoot的应用程序启动类。

```java
@SpringBootApplication
public class  startApplication{
    public static void main(String[] args){
        SpringApplication.run(startApplication.class,args)
    }
}
```





#### @CrossOrigin

> 用在class和method上用来支持跨域请求



## spring常用的注解
### Ioc的类注解：

#### @Component：

> 除了控制器、servcie和DAO之外的类一律使用此注解声明
>
> 类注解，声明此类被Spring容器进行管理，**相当于bean标签的作用**

#### @Controller 

> 类注解,主要声明将控制器类配置给Spring管理，例如Servlet

#### @Service 

> 类注解，主要声明业务处理类配置Spring管理，Service接口的实现类

#### @Repository

> 类注解，主要声明持久化类配置给Spring管理，DAO接口

#### @Scope

>类注解，用于声明当前类`单例模式`还是`非单例模式`，相当于bean标签的scope属性
>
>- @Scope("prototype") 表示声明当前类为非单例模式（**默认单例模式**,类生成同一个实例）

#### @Lazy

> 类注解，用于声明一个**单例模式**的Bean是否为懒汉模式
>
> - @Lazy(true) 表示声明为懒汉模式，在**获取对象第一次请求**的时候，才会创建实例
>
>   (默认为饿汉模式,bean在加载对象时候，对象就会创建实例)



### IoC的方法注解：

#### @PostConstruct

> 方法注解，声明一个方法为当前类的**初始化方法**（在构造器之后执行），相当于bean标签的**init-method属性**

#### @PreDestroy

> 方法注解，声明一个方法为当前类的**销毁方法**（在对象从容器中释放之前执行），相当于bean标签的**destory-method属性**



### DI的注解：

#### @Autowired

> **1、属性注解、2、方法注解（set方法）**，声明当前**属性自动装配，默认byType**
>
> **@Autowired(required = false)**  通过requried属性设置当前自动装配是否为必须（默认必须——如果没有找到类型与属性类型匹配的bean则抛出异常）
>
> - byType  →→  @Autowired
> - ref引用  →→  @Qualifier("bean的id")

```java
//方法注解用在setter方法
@Autowired
public void setClazz(@Qualifier("c2") Clazz clazz) {
    this.clazz = clazz;
}
```

> spring可以自动帮你把bean里面引用的对象的setter/getter方法省略，它会**自动帮你set/get**。

```java
@Controller 
public class UserController{
    @Autowired
    UserService userService;
    //自动setter
     //public void setUserService(UserService injectdService){}
}
```



#### @Resource

> 属性注解，也用于声明**属性自动装配，默认byName**
>
> - 默认装配方式为byName，如果根据byName没有找到对应的bean，则**继续根据byType**寻找对应的bean，根据byType如果依然没有找到Bean或者找到不止一个类型匹配的bean,则抛出异常。

### AOP面向切面编程
#### @Aspect

> 声明切面类
>
> 切面：由切点和通知组成

#### @Pointcut("execution(* cn.tedu.service.*.*(..))")

> 定义切入点
>
> 切点表达式： *表示1个 ..表示多个 *依次代表方法返回值，类名，方法名，(..)是参数列表

##### @Before

> 前置通知，方法有 JoinPoint 参数

##### @AfterReturning

> 后置通知 - 注解带有 returning 属性

##### @Around

> 环绕通知-增强法有 ProceedingJoinPoint 参数

##### @AfterThrowing

> 异常通知 - 注解中有 throwing 属性（了解内容）

##### @After 

> 最终通知

## MyBatis注解
@Data     //动态生成get/set,tostring等方法

@Accessors(chain=true)    /*开启链式加载，重写set方法*/

@NoArgsConstructor    //无参构造

@AllArgsConstructor    //有参构造



@BeforeEach    //测试API中的注解，在执行@Test注解时会提前先执行



@Param("sex") String sex 封装为Map.

## 其他注解
#### @ResponseBody   

>  对象转json

#### @RequestBody

> json转对象

## Service层

#### @Bean

#### @Value

> 此注解使用在字段、构造器参数和方法参数上。@Value可以指定属性取值的表达式，支持通过#{}使用SpringEL来取值，也支持使用${}来将属性来源中(Properties文件、本地环境变量、系统属性等)的值注入到bean的属性中。此注解值的注入发生在AutowiredAnnotationBeanPostProcessor类中。

#### @Autowried

#### @Component 

> 一种泛指，标记类是组件，Spring在扫描注解配置时，会标记这个类要被生成bean

#### @Configuration 

> 把一个类作为一个IOC容器，它的某个方法上如果注解了@Bean，就会作为这个Spring容器的Bean。

#### @RefreshScope





## Spring Data

@Transactional

@NoRepositoryBean

@Param

@Id

@Transient

@CreatedBy

@LastModifiedBy

 @CreatedDate

@LastModifiedDate

@Query

@Procedure

@Lock

@Modifying

@EnableJpaRepositories

@Document

@Field

@Query

@EnableMongoRepositories
