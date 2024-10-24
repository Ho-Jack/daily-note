# Java常用注解Annotations 

## 面向对象，AOP......注解
#### @Override 

> 注明这是一个重写的方法 覆盖父类方法

#### @Test

> 单元测试法

#### @Retention

> 生命周期

## 封装JavaBean常用的注解：

### projectlombok插件的注解

> 美: ['lɔmbɔk] 
>
> Lombok 一个Java库,通过用简单的语法和注解（Annoation）代替众多的冗余代码,自动生成 `getter` 、`setter`、`equals`、`hashCode` 等等方法

#### @Data 

> 注在类上，省去代码中大量的get()、 set()、 toString()等方法

#### @AllArgsConstructor 

> 注在类上，提供类的**全参构造** 

#### @NoArgsConstructor 

> 注在类上，提供类的**无参构造**

#### @Setter 

> 注在属性上，提供 set 方法

#### @Getter 

> 注在属性上，提供 get 方法

#### @toString

#### @EqualsAndHashCode

> 注在类上，默认对类的所有字段实现equals()和hashCode()方法
>
> - 重写hashCode()    哈希算法提高比较效率,都有重复,需要先hashCode() 再equals() 
>
> - 重写equals()      比较对象的各个字段值是否相等
>
>   
>
> - @EqualsAndHashCode(of={"id", "age"}, exclude = {"name"})
>   指定字段，排除字段
>
> - @EqualsAndHashCode(callSuer=true)
>   覆盖父类字段(生成的方法中调用父类的方法,比较父类的属性,如id等定义在父类中,callSuer=false时,即使id不相等比较2个对象也是true的情况)

#### @Log4j/@Slf4j 

> 注在类上，提供对的 Logger 对象，变量名为 log

## SpringMVC常用的注解

#### @RestController =  `@Controller`  + `@ResponseBody `

> 组合注解，组合了@Controller和@ResponseBody
>
> @Controller 标识是一个Controller，Spring包扫描创建实例
>
> @ResponseBody 返回对象换为json字符串
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

> 获取POST请求的**body**>**部分**<数据（接收http请求的json转换为java对象）
>
> 直接使用得到是 **key=value&key=value…** 结构的数据。
>
> ~~HTTP请求中的data整个数据~~
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

## 校验注解

### @Validated和@Vaild

#### 注解位置：

@Validated：可以用在**类型**、方法和方法参数上。但是不能用在成员属性（字段）上

@Valid：可以用在方法、构造函数、方法参数和**成员属性（字段）**上

#### 分组校验：

使用实体类的情况下更好的区分出新增、修改和其他操作验证的不同，可以通`@Validated`注解和`groups`属性设置

1. 在validate文件夹下，**新增类接口，用于标识出不同的操作类型**

   ```java
   //AddGroup接口文件
   public interface AddGroup
   {
   }
   //EditGroup接口文件
   public interface EditGroup
   {
   }
   ```

   

2. **Controller.java**

   ```java
   // 新增
   public AjaxResult addSave(@Validated(AddGroup.class) @RequestBody Xxxx xxxx)
   {
       return success(xxxx);
   }
   
   // 编辑
   public AjaxResult editSave(@Validated(EditGroup.class) @RequestBody Xxxx xxxx)
   {
       return success(xxxx);
   }
   ```

3. 实体类

   ```java
   // 仅在新增时验证
   @NotNull(message = "不能为空", groups = {AddGroup.class})
   private String xxxx;
   
   // 在新增和修改时验证
   @NotBlank(message = "不能为空", groups = {AddGroup.class, EditGroup.class})
   private String xxxx;
   ```



@Validated：提供了一个分组功能，可以在入参验证时，根据不同的分组采用不同的验证机制

@Valid：作为标准JSR-303规范，还没有吸收分组的功能





#### 总结：

Spring validation验证框架对入参实体进行嵌套验证必须在相应属性（字段）加上@Valid而不是@Validated

@Validated：不能用在成员属性（字段）上，也无法提示框架进行嵌套验证。

@Valid：能够用在成员属性（字段）上，提示验证框架进行嵌套验证。

```java
@Data
public class UserModel {
    @NotBlank
    private String name;
    
    @Valid //用在成员属性上，使得FamilyModell实例对象校验生效
    private FamilyModel familyModel;
}

public class FamilyModel 
    @NotBlank
    private String motherName;
    @NotBlank
    private String fatherName;
}
```

### 约束性：

#### 值校验：

| 注解         | 功能                                                         |
| ------------ | ------------------------------------------------------------ |
| @NotNull     | 不能为null，**可以是空**                                     |
| @Null        | 必须为null                                                   |
| @NotBlank    | 字符串不能为null,字符串trim()后也不能等于“”                  |
| @NotEmpty    | 不能为null，集合、数组、map等size()不能为0；字符串trim()后可以等于“” |
| @AssertFalse | 可以为null,如果不为null的话必须为false                       |
| @AssertTrue  | 可以为null,如果不为null的话必须为true                        |

#### 范围校验： 

| 注解                          | 功能                     |
| ----------------------------- | ------------------------ |
| @Max                          | 最大不得超过此最大值     |
| @Min                          | 最大不得小于此最小值     |
| @Future                       | 日期必须在当前日期的未来 |
| @Past                         | 日期必须在当前日期的过去 |
| @DecimalMax(value = "最大值") | 设置不能超过最大值       |
| @DecimalMin                   | 设置不能超过最小值       |
| @Range                        | 值必须在指定范围内       |


#### 长度校验：
| 注解                                | 功能                                        |
| ----------------------------------- | ------------------------------------------- |
| @Size(min = 最小值, max = 最大值)   | 集合、数组、map等的size()值必须在指定范围内 |
| @Length(min = 最小值, max = 最大值) | 长度必须在指定范围内                        |



#### 格式校验

| 注解     | 功能                                                       |
| -------- | ---------------------------------------------------------- |
| @Pattern | 必须满足指定的正则表达式                                   |
| @Email   | 必须是email格式                                            |
| @URL     | 必须是一个URL                                              |
| @Digits  | 设置必须是数字且数字整数的位数和小数的位数必须在指定范围内 |




## spring常用的注解
### Ioc的类注解：



#### @Component

> 除了控制器、servcie和DAO之外的类一律使用此注解声明
>
> 类注解，声明此类被Spring容器进行管理，相当于bean标签的作用(**new Object创建对象的控制权反转给了Spring框架**)

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

#### @Bean

> 多用于第三方类无法写@Component的情况

### IoC控制反转的方法注解：

#### @PostConstruct

> 方法注解，声明一个方法为当前类的**初始化方法**（在构造器之后执行），相当于bean标签的**init-method属性**

#### @PreDestroy

> 方法注解，声明一个方法为当前类的**销毁方法**（在对象从容器中释放之前执行），相当于bean标签的**destory-method属性**



### DI依赖注入的注解：

> @Autowired
>
> 自动装配：Spring在实例化当前bean的时候从**Spring容器(其他bean/实体类)**中找到匹配的实例赋值给当前bean的属性
>
> 自动装配策略有两种：
>
> - byName  根据当前Bean的**属性名**在Spring容器中寻找匹配的对象 ，如果根据name找打了bean但是类型不匹配则抛出异常（private Clazz clazz 是找clazz 这个属性）.
> - **byType**  根据当前Bean的**属性类型**在Spring容器中寻找匹配的对象，如果根据类型找到了多个bean也会抛出异常（private Clazz clazz 是找Clazz这个类型）

#### @Autowired

> 用在JavaBean中的注解，默认通过**byType**形式，用来给指定的字段或方法注入所需的外部资源
>
> **1、属性注解、2、方法注解（set方法）**，声明当前**属性自动装配，默认byType**
>
> **@Autowired(required = false)**  requried属性:是否为必须自动装配
>
> （默认必须——如果没有找到类型与属性类型匹配的bean则抛出异常）

- @Autowired:方法自动装配

```java
//方法注解用在setter方法
@Autowired
public void setClazz(@Qualifier("c2") Clazz clazz) {
    this.clazz = clazz;
}
```

@Autowired:属性自动装配

```java
@Controller 
public class UserController{
    @Autowired
    UserService userService;
    //自动setter
     //public void setUserService(UserService injectdService){}
}
```

##### @Qualifier

>使用情况:@Autowired如果要使用byName，需要使用@Qualifier一起配合
>
>结合@Autowired一起使用: byName  根据当前Bean的**属性名**在Spring容器中寻找匹配的对象
>@Qualifier("userDao")

#####  @Value

> 注入普通属性值  相当于赋值

#### @Resource

> 与@Autowired功能相似,功能更齐全,是JSR-250定义的注解
>
> **默认byName**,byName没有找到对应的bean，则**继续根据byType**寻找,都没用就抛出异常
>
> @Resource能用在：类、成员变量和方法上。
>
> 最重要的两个参数是：name 和 type。

```java
@Service("courseDAO")
@Scope("prototype")
public class CourseDAOImpl extends HibernateDaoSupport implements CourseDAO{
		...    
}
//使用方法1
@Autowried  //byType
private CourseDAOImpl  courseDAOImpl;
//使用方法2
@Resource
```





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



### XML系统参数:

 XML配置参数

```xml
--- #第三方接口地址
other-system:
  url: 'http://192.168.166.116:8080'
```

##### @Configuration

##### @ConfigurationPropertiesSca

##### @ConfigurationProperties

> `@ConfigurationProperties`需要和`@Configuration`/`@component`配合使用
>
> 作用:**声明**XM系统参数

- prefix

  > XML中表示配置的前缀

- @Component

  > XML系统参数实体类中必须要加上 @Component ,使这个类注入到 IOC 容器中
  >
  > 更细粒度控制:`@ComponentScan`或`@SpringBootApplication`注解配置扫描路径

- @Data (@Getter @Setter)

```java
@Data
@Component
@ConfigurationProperties(prefix = "other-system")
public class OtherSystemConfig {
    private String url;
}
```



##### @EnableConfigurationProperties

> 作用: **让使用了 @ConfigurationProperties 注解的类生效,并且将该类注入到 IOC 容器中,交由 IOC 容器进行管理**
>
> 不用`@Configuration`/`@component` 的情况,就用`@EnableConfigurationProperties`注解中**手动导入配置文件**
>
> value设置: {类名.class}

- ```java
  @EnableConfigurationProperties({类名.class})
  ```

  ```java
//@Component   
  //如果是使用 @EnableConfigurationProperties让 @ConfigurationProperties生效 就不需要 @Component注解
@ConfigurationProperties(prefix = "other-system")
  public class OtherSystemConfig {
      private String url;
  }
  ```
  
  
  
  
  

### @ConfigurationProperties的2种生效方式

-  使用 @Component 进行依赖注入

  ```java
    @Component  
    public class OtherSystemHttpUtils {
        @Autowired
        private OtherSystemConfig otherSystemConfig;
    }
  ```

  

-  使用@EnableConfigurationProperties({类名.class}) 注入

  ```java
    @Configuration
    @EnableConfigurationProperties(OtherSystemConfig.class)
    public class OtherSystemHttpUtils {
        @Autowired
        private OtherSystemConfig otherSystemConfig;
  }
  ```

  



  



## MyBatis注解

> 貌似少用，之后再补充



@BeforeEach    //测试API中的注解，在执行@Test注解时会提前先执行

#### @Mapper

> 简化mapper映射文件 (Mapper接口,继承BaseMapper)
>
> 不需要在spring配置中设置扫描地址，通过`mapper.xml`里面的**namespace**属性对应相关的mapper类(接口)，spring将动态的生成Bean后注入到ServiceImpl中

#### SQL相关 :

##### @Select

###### @Results和@Result

```java
@Select("Select * from user")
@Results({
    @Result(id = true, column = "id", property = "id"),
    @Result(column = "name", property = "name"),
    @Result(column = "sex", property = "sex"),
    @Result(column = "age", property = "age")
})
List<User> queryAllUser();
```

###### @ResultMap

````java
@Select({"select id, name, class_id from student where id = #{id}"})
@ResultMap(value="studentMap")
Student selectById(integer id);
````



##### @Insert

###### @Options

```java
@Insert("insert into user(id,name) values(#{id},#{name})")
@Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id") 
public int insert(User user);
```

##### @Update

##### @Delete

#### 关系映射: 

##### 一对一

###### @One

````java
@Select("select * from student")  
@Results({  
    @Result(id=true,property="id",column="id"),  
    @Result(property="name",column="name"),  
    @Result(property="age",column="age"),  
    @Result(property="address",column="address_id",
          one=@One(select="cn.mybatis.mydemo.mappers.AddressMapper.getAddress"))  
})  
public List<Student> getAllStudents();  
````



##### 一对多

> 可以使用集合遍历来组成

###### @Many

```java
@Select("select * from t_class where id=#{id}")  
@Results({  
    @Result(id=true,column="id",property="id"),  
    @Result(column="class_name",property="className"),  
    @Result(property="students", column="id",    
            many=@Many(select="cn.mybatis.mydemo.mappers.StudentMapper.getStudentsByClassId"))  
    })  
public Class getClass(int id); 
```

##### 多对多

> 需要个中间表
>
> 用户表
>
> 角色表
>
> 用户角色中间表

```xaml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.keafmd.dao.IUserDao">

    <!--定义User的resultMap-->
    <resultMap id="userMap" type="user">
        <id property="id" column="id"></id>
        <result property="username" column="username"></result>
        <result property="address" column="address"></result>
        <result property="sex" column="sex"></result>
        <result property="birthday" column="birthday"></result>
        <!--配置角色集合的映射-->
        <collection property="roles" ofType="role">
            <id property="roleId" column="rid"></id>
            <result property="roleName" column="role_name"></result>
            <result property="roleDesc" column="role_desc"></result>
        </collection>

    </resultMap>

    <!--配置查询所有-->
    <select id="findAll" resultMap="userMap">
         select tp.*,ti.*
        from test_package tp
                 left  join testPackage_testItem   tpIt  on   tpIt.test_package_id = tp.id
                 left  join test_item ti on tpIt.test_item_id = ti.item_id
    </select>

</mapper>

```

left join语句将三个表关联查询



#### @Param

> 标注在DAO/DAL/Mapper接口中的方法参数上，给参数命名后就可以通过 **#{xxx}** 的形式注入sql语句中(与映射文件#{xx}变量关联)
>
> 注解声明参数的别名(**用在DAO/DO/Mapper接口的操作方法中如果有多个参数情况**)
>
> **`注意`** 如果DAO/DO/Mapper操作方法没有通过@Param指定参数别名，在SQL映射文件中也可以通过`arg0,arg1...`或者`param1,param2,...`获取参数

- DAO/DO/Mapper接口：用`@Param()`给操作方法的参数设置别名

  ```java
  //不写Mapper XML 映射文件可以用 @select注解
  @select("select * from user  where user_name = #{userName} and user_password=#{password}")
  public User selectUser(@Param("userName") String name,@Param("password") String pwd);
  ```

- 映射到XML中的`<select>`标签，通过`#{别名}`获取到指定参数

  ```java
  <select id="selectUser" resultMap="User">  
     select * from user  where user_name = #{userName} and user_password=#{password}  
  </select>
  ```

  与 @RequestParam比较：

  @RequestParam用在Controller层，将请求参数和控制器方法的形参创建映射关系





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

> 用于定义配置类，可**替换xml配置文件**，被注解的类内部包含有一个或多个被@Bean注解的方法，这些方法将会被`AnnotationConfigApplicationContext`或`AnnotationConfigWebApplicationContext`类进行扫描，并用于构建bean定义，初始化Spring容器。
>
>  @Configuation等价于`<Beans></Beans>`
>
>  @Bean等价于`<Bean></Bean>`

#### @RefreshScope





## Spring Data

#### @Transactional

> - 作用于类：当把@Transactional 注解放在类上时，表示所有该类的public方法都配置相同的事务属性信息。
>
> - 作用于方法：当类配置了@Transactional，方法也配置了@Transactional，方法的事务会覆盖类的事务配置信息。
>
> - 作用于接口：不推荐这种使用方法，因为一旦标注在Interface上并且配置了Spring AOP 使用CGLib动态代理，将会导致@Transactional注解失效

| 参数                   | 意义                                             |
| ---------------------- | ------------------------------------------------ |
| isolation              | 事务隔离级别，默认为DEFAULT                      |
| propagation            | 事务传播机制，默认为REQUIRED                     |
| readOnly               | 事务读写性，默认为false                          |
| noRollbackFor          | 一组异常类，遇到时不回滚，默认为{}               |
| noRollbackForClassName | 一组异常类名，遇到时不回滚，默认为{}             |
| **rollbackFor**        | 一组异常类，遇到时回滚，默认为{}                 |
| rollbackForClassName   | 一组异常类名，遇到时回滚，默认为{}               |
| timeout                | 超时时间，以秒为单位                             |
| value                  | 可选的限定描述符，指定使用的事务管理器，默认为“” |

```java
    @Transactional(rollbackFor = Exception.class)
     throw new ServiceException("异常原因！");
```





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

## Swagger

#### @Api 

> **用在类上**，标记一个 Controller 类作为 Swagger 文档资源（**接口目录标题**）
>
> 配合：@RestController
>
> tags：接口说明，可以在页面中显示； `@Api(tags={"controller接口目录"})`

#### @ApiOperation 

> **用在 Controller 里的方法上**，说明方法的作用，每一个接口的定义 （**接口的名称和说明**）
>
> `@ApiOperation(value = "接口名称",notes = "详细说明")`

#### @ApiModel 

> 表示一个**JavaBean实体类**，用于实体类中的参数接收总说明(**接口参数总说明**)
>
> `@ApiModel(value = "类", description = "参数总说明")`

#### @ApiModelProperty 

> 在类的属性上，添加属性描述；(**接口的参数说明**)
>
> `@ApiModelProperty(value = "属性说明" required = true, example = "123456")`

#### @ApiParam (少用)

> 用于 Controller 中方法的参数说明
>
> `@ApiParam(value = "参数说明", required = "是否必填")`



#### @ApiImplicitParam 

>  作用在接口方法上，描述单个**参数信息**，只能作用在方法上；

- name：参数名，对应方法中单独的参数名称。
- value：参数中文说明。
- required：是否必填。
- paramType：参数类型，取值为 path、query、body、header、form。
- dataType：参数数据类型。
- defaultValue：默认值。

#### @ApiImplicitParams 

> 作用在接口方法上，描述**多个**参数信息,嵌套`@ApiImplicitParam `使用
>
> `@ApiImplicitParams({ @ApiImplicitParam(name = "id", value = "用户ID", dataType = "string", paramType = "query", required = true, defaultValue = "1") })`

#### @ApiResponse 和 @ApiResponses

> @ApiResponse 用于方法上，说明接口响应的一些信息；
>
> `@ApiResponses` 嵌套多个 `@ApiRespons`





## 若依注解

#### @Anonymous

> token校验放行



