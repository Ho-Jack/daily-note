where: WHERE 语句，拼接 + WHERE 条件
and: AND 语句，拼接 + AND 字段=值
andNew: AND 语句，拼接 + AND (字段=值)
or: OR 语句，拼接 + OR 字段=值
orNew: OR 语句，拼接 + OR (字段=值)
eq: 等于=
allEq: 基于 map 内容等于=
ne: 不等于<>
gt: 大于>
ge: 大于等于>=
lt: 小于<
le: 小于等于<=
like: 模糊查询 LIKE
notLike: NOT LIKE模糊查询
in: IN 查询
notIn: NOT IN 查询
isNull: NULL 值查询
isNotNull: IS NOT NULL
groupBy: 分组 GROUP BY
having: HAVING 关键词
orderBy: 排序 ORDER BY
orderAsc: Asc 排序 ORDER BY
orderDesc: DESC 排序 ORDER BY
exists: EXISTS 条件语句
notExists: NOT EXISTS 条件语句
between: BETWEEN 条件语句
notBetween: NOT BETWEEN 条件语句
addFilter: 自由拼接 SQL
last: 拼接在最后，例如：last(“LIMIT 1”)





# Mybatis-01

## 1. 框架

​	框架相当于是一个脚手架，内部已经写好了很多代码，我们只要其基础上进行开发就可以提高我们的开发效率。

​	

框架阶段学习：

①先去学习如何使用框架

②然后再使用熟练的情况下去猜测内部的原理

③通过源码去验证自己的猜测。

## 2.Mybatis介绍

- MyBatis 是一款优秀的持久层框架。
- MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。
- 官网：https://mybatis.org/mybatis-3/zh/#



## 3. 快速入门

①数据准备

```sql
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mybatis_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mybatis_db`;
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(50) DEFAULT NULL,
 `age` int(11) DEFAULT NULL,
 `address` varchar(50) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
insert  into `user`(`id`,`username`,`age`,`address`) values (1,'UZI',19,'上海'),(2,'PDD',25,'上海');
```

②导入依赖

```xml
       <!--mybatis依赖-->
       <dependency>
           <groupId>org.mybatis</groupId>
           <artifactId>mybatis</artifactId>
           <version>3.5.4</version>
       </dependency>
       <!--mysql驱动-->
       <dependency>
           <groupId>mysql</groupId>
           <artifactId>mysql-connector-java</artifactId>
           <version>5.1.47</version>
       </dependency>
```

③编写核心配置

在资源目录下创建：mybatis-config.xml 内容如下：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
       PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
   <environments default="development">
       <environment id="development">
           <transactionManager type="JDBC"/>
           <dataSource type="POOLED">
               <property name="driver" value="com.mysql.jdbc.Driver"/>
               <property name="url" value="jdbc:mysql://localhost:3306/test"/>
               <property name="username" value="root"/>
               <property name="password" value="root"/>
           </dataSource>
       </environment>
   </environments>
   <mappers>
       <mapper resource="com/sangeng/dao/UserDao.xml"/>
   </mappers>
</configuration>
```

④定义接口及对应的xml映射文件

com.sangeng.dao.UserDao:

```java
public interface UserDao {
   List<User> findAll();
}
```

资源目录下：com/sangeng/dao/UserDao.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
       PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.sangeng.dao.UserDao">

   <select id="findAll" resultType="com.sangeng.pojo.User">
    select * from user
   </select>
</mapper>
```

⑤编写测试类

获取SqlSession,通过SqlSession获取UserDao调用对应的方法

```java
   public static void main(String[] args) throws IOException {
       //定义mybatis配置文件的路径
       String resource = "mybatis-config.xml";
       InputStream inputStream = Resources.getResourceAsStream(resource);
       SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
       //获取Sqlsession对象
       SqlSession sqlSession = sqlSessionFactory.openSession();
       //获取UserDao实现类对象
       UserDao userDao = sqlSession.getMapper(UserDao.class);
       //调用方法测试
       List<User> userList = userDao.findAll();
       System.out.println(userList);
       //释放资源
       sqlSession.close();
  }
```

## 3.9 高效编程

### 3.9.1 配置代码模板



![图片](https://mmbiz.qpic.cn/mmbiz_png/Q5Skwpp0BtycVgnRlquUR9UF0p6JNrL952PVwJ0GEHicuesyZffDmGdzUMt7xiagB0Ju2k6eUHlqZvaKodARCZKw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



### 3.9.2 Mybatis插件

​		下载安装Free Mybatis plugin，安装完后重启IDEA

## 4. 参数获取

### 4.1 一个参数

#### 4.1.1 基本参数

​	我们可以使用#{}直接来取值，写任意名字都可以获取到参数。但是一般用方法的参数名来取。

例如：

接口中方法定义如下

```java
User findById(Integer id);
```

xml中内容如下:

```java
<select id="findById" resultType="com.sangeng.pojo.User"> select * from user where id = #{id}</select>
```



#### 4.1.2 POJO

​	我们可以使用POJO中的属性名来获取对应的值。

例如：

接口中方法定义如下

```java
User findByUser(User user);
```

xml中内容如下：

```xml
   <select id="findByUser" resultType="com.sangeng.pojo.User">
      select * from user where id = #{id} and username = #{username} and age = #{age} and address = #{address}
   </select>
```



#### 4.1.3 Map

​	我们可以使用map中的key来获取对应的值。

例如：

接口中方法定义如下

```java
User findByMap(Map map);
```

xml中内容如下：

```xml
   <select id="findByMap" resultType="com.sangeng.pojo.User">
       select * from user where id = #{id} and username = #{username} and age = #{age} and address = #{address}
   </select>
```

方法调用：

```java
       Map map = new HashMap();
       map.put("id",2);
       map.put("username","PDD");
       map.put("age",25);
       map.put("address","上海");
       userDao.findByMap(map);
```



### 4.2 多个参数

​	Mybatis会把多个参数放入一个Map集合中，默认的key是argx和paramx这种格式。

例如：

接口中方法定义如下

```java
User findByCondition(Integer id,String username);
```

最终map中的键值对如下：

```xml
{arg1=PDD, arg0=2, param1=2, param2=PDD}
```



​	我们虽然可以使用对应的默认key来获取值，但是这种方式可读性不好。我们一般在方法参数前使用@Param来设置参数名。

例如：

接口中方法定义

```java
User findByCondition(@Param("id") Integer id,@Param("username") String username);
```

最终map中的键值对如下：

```
{id=2, param1=2, username=PDD, param2=PDD}
```

所以我们就可以使用如下方式来获取参数

```xml
   <select id="findByCondition" resultType="com.sangeng.pojo.User">
        select * from user where id = #{id} and username = #{username}
   </select>
```



### 4.3 总结

​	建议如果只有一个参数的时候不用做什么特殊处理。如果是有多个参数的情况下一定要加上@Param来设置参数名。





## 5. 核心类

### 5.1 SqlSessionFactory

​	SqlSessionFactory是一个SqlSession的工厂类。主要用来获取SqlSession对象。、

成员方法如下：

```java
SqlSession openSession();
//获取SqlSession对象，传入的参数代表创建的SqlSession是否自动提交
SqlSession openSession(boolean autoCommit);
```



### 5.2 SqlSession

​	 SqlSession 提供了在数据库执行 SQL 命令所需的所有方法 。它还提供了事务的相关操作。

成员方法如下：

```java
T getMapper(Class<T> type);//获取mapper对象
void commit();//提交事务
void rollback();//回滚事务
void close();//释放资源
```



## 6.Mybatis实现增删改查

### 6.1 新增

①接口中增加相关方法

```java
void insertUser(User user);
```

②映射文件UserDao.xml增加响应的标签

```xml
   <insert id="insertUser">
      insert into user values(null,#{username},#{age},#{address})
   </insert>
```

**注意：要记得提交事务。**

### 6.2 删除

①接口中增加相关方法

```java
void deleteById(Integer id);
```

②映射文件UserDao.xml增加响应的标签

```xml
   <delete id="deleteById">
      delete from user where id = #{id}
   </delete>
```

**注意：要记得提交事务。**

### 6.3 修改

①接口中增加相关方法

```java
void updateUser(User user);
```

②映射文件UserDao.xml增加响应的标签

```xml
   <!--更新用户-->
   <update id="updateUser">
      UPDATE USER SET age = #{age} , username = #{username},address = #{address} WHERE id = #{id}
   </update>
```

**注意：要记得提交事务。**

### 6.4 根据id查询

①接口中增加相关方法

```java
User findById(Integer id);
```

②映射文件UserDao.xml增加响应的标签

```xml
  <select id="findById" resultType="com.sangeng.pojo.User">
    select * from user where id = #{id}
   </select>
```



### 6.5 查询所有

①接口中增加相关方法

```java
List<User> findAll();
```

②映射文件UserDao.xml增加响应的标签

```xml
   <select id="findAll" resultType="com.sangeng.pojo.User">
    select * from user
   </select>
```



## 7. 配置文件详解

### 7.1 properties

​	可以使用properties读取properties配置文件。使用其中的resource属性来设置配置文件的路径。

​	然后使用${key}来获取配置文件中的值

例如：

在resources目录下有jdbc.properties文件，内容如下：

```xaml
jdbc.url=jdbc:mysql://localhost:3306/mybatis_db
jdbc.driver=com.mysql.jdbc.Driver
jdbc.username=root
jdbc.password=root
```

在mybatis-config.xml中：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
       PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
   <!--设置配置文件所在的路径-->
   <properties resource="jdbc.properties"></properties>
   <environments default="development">
       <environment id="development">
           <transactionManager type="JDBC"/>
           <dataSource type="POOLED">
               <!--获取配置文件中配置的对应的值来设置连接相关参数-->
               <property name="driver" value="${jdbc.driver}"/>
               <property name="url" value="${jdbc.url}"/>
               <property name="username" value="${jdbc.username}"/>
               <property name="password" value="${jdbc.password}"/>
           </dataSource>
       </environment>
   </environments>
</configuration>
```



### 7.2 settings

​	可以使用该标签来设置进行一些设置

例如：

```xml
   <settings>
       <!--开启自动驼峰命名映射-->
       <setting name="mapUnderscoreToCamelCase" value="true"/>
   </settings>
```

具体的设置参考：https://mybatis.org/mybatis-3/zh/configuration.html#settings

### 7.3 typeAliases

​	可以用来设置给全类名设置别名，简化书写。一般设置一个包下的类全部具有默认别名。默认别名是类目首字母小写。例如：com.sangeng.pojo.User别名为user

```xml
  <typeAliases>
       <package name="com.sangeng.dao"></package>
   </typeAliases>
```



### 7.4 environments

​	配置数据库相关的环境，例如事物管理器，连接池相关参数等。

```xml
   <!--设置默认环境-->
<environments default="development">
       
       <!--设置该环境的唯一标识-->
       <environment id="development">
           <transactionManager type="JDBC"/>
           <dataSource type="POOLED">
               <!--获取配置文件中配置的对应的值来设置连接相关参数-->
               <property name="driver" value="${jdbc.driver}"/>
               <property name="url" value="${jdbc.url}"/>
               <property name="username" value="${jdbc.username}"/>
               <property name="password" value="${jdbc.password}"/>
           </dataSource>
       </environment>
   </environments>
```



### 7.5 mappers

​	该标签的作用是加载映射的，加载方式有如下几种(**主要使用第四种**)：

​	①使用相对于类路径的资源引用，例如：

```xml
<!-- 使用相对于类路径的资源引用 -->
<mappers>
 <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
 <mapper resource="org/mybatis/builder/BlogMapper.xml"/>
 <mapper resource="org/mybatis/builder/PostMapper.xml"/>
</mappers>
```

​	②使用完全限定资源定位符（URL），例如：

```xml
<!-- 使用完全限定资源定位符（URL） -->
<mappers>
 <mapper url="file:///var/mappers/AuthorMapper.xml"/>
 <mapper url="file:///var/mappers/BlogMapper.xml"/>
 <mapper url="file:///var/mappers/PostMapper.xml"/>
</mappers>
```

​	③使用映射器接口实现类的完全限定类名，例如：

```xml
<!-- 使用映射器接口实现类的完全限定类名 -->
<mappers>
 <mapper class="org.mybatis.builder.AuthorMapper"/>
 <mapper class="org.mybatis.builder.BlogMapper"/>
 <mapper class="org.mybatis.builder.PostMapper"/>
</mappers>
```

​	④将包内的映射器接口实现全部注册为映射器，例如：

```xml
<!-- 定义dao接口所在的包。要求xml文件存放的路径和dao接口的包名要对应 -->
<mappers>
 <package name="org.mybatis.builder"/>
</mappers>
```

​	

## 8. 打印日志

①log4j配置  在resources目录下创建log4j.properties文件，内容如下：

```
### direct log messages to stdout ###
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### direct messages to file mylog.log ###
log4j.appender.file=org.apache.log4j.FileAppender
log4j.appender.file.File=c:/mylog.log
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### set log levels - for more verbose logging change 'info' to 'debug' ###

log4j.rootLogger=debug, stdout
```

②引入依赖

```xml
       <dependency>
           <groupId>log4j</groupId>
           <artifactId>log4j</artifactId>
           <version>1.2.17</version>
       </dependency>
```



## 9.获取参数时 #{}和${}的区别

​	如果使用#{}.他是预编译的sql可以防止SQL注入攻击	如果使用${}他是直接把参数值拿来进行拼接，这样会有SQL注入的危险

如果使用的是#{}来获取参数值日志如下：Preparing: select * from user where id = **?** and username = **?** and age = **?** and address = **?** Parameters: 2(Integer), 快乐风男(String), 29(Integer), 北京(String)

如果使用${}来获取参数值日志如下：Preparing: select * from user where id = 2 and username = 快乐风男 and age = 29 and address = 北京