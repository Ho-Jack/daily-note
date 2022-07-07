## @TableName

- 描述：表名注解，标识实体类对应的表
- 使用位置：实体类

```java
@TableName("sys_user")
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

| 属性             | 类型     | 必须指定 | 默认值 | 描述                                                         |
| :--------------- | :------- | :------- | :----- | :----------------------------------------------------------- |
| value            | String   | 否       | ""     | 表名                                                         |
| schema           | String   | 否       | ""     | schema                                                       |
| keepGlobalPrefix | boolean  | 否       | false  | 是否保持使用全局的 tablePrefix 的值（当全局 tablePrefix 生效时） |
| resultMap        | String   | 否       | ""     | xml 中 resultMap 的 id（用于满足特定类型的实体类对象绑定）   |
| autoResultMap    | boolean  | 否       | false  | 是否自动构建 resultMap 并使用（如果设置 resultMap 则不会进行 resultMap 的自动构建与注入） |
| excludeProperty  | String[] | 否       | {}     | 需要排除的属性名 @since 3.3.1                                |



**关于 `autoResultMap` 的说明：**

MP 会自动构建一个 `resultMap` 并注入到 MyBatis 里（一般用不上），请注意以下内容：

因为 MP 底层是 MyBatis，所以 MP 只是帮您注入了常用 CRUD 到 MyBatis 里，注入之前是动态的（根据您的 Entity 字段以及注解变化而变化），但是注入之后是静态的（等于 XML 配置中的内容）。

而对于 `typeHandler` 属性，MyBatis 只支持写在 2 个地方:

1. 定义在 resultMap 里，作用于查询结果的封装
2. 定义在 `insert` 和 `update` 语句的 `#{property}` 中的 `property` 后面（例：`#{property,typehandler=xxx.xxx.xxx}`），并且只作用于当前 `设置值`

除了以上两种直接指定 `typeHandler` 的形式，MyBatis 有一个全局扫描自定义 `typeHandler` 包的配置，原理是根据您的 `property` 类型去找其对应的 `typeHandler` 并使用。

## @TableId

- 描述：主键注解
- 使用位置：实体类主键字段

```java
@TableName("sys_user")
public class User {
    @TableId
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```



| 属性  | 类型   | 必须指定 | 默认值      | 描述         |
| :---- | :----- | :------- | :---------- | :----------- |
| value | String | 否       | ""          | 主键字段名   |
| type  | Enum   | 否       | IdType.NONE | 指定主键类型 |



### IdType

| 值            | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| AUTO          | 数据库 ID 自增                                               |
| NONE          | 无状态，该类型为未设置主键类型（注解里等于跟随全局，全局里约等于 INPUT） |
| INPUT         | insert 前自行 set 主键值                                     |
| ASSIGN_ID     | 分配 ID(主键类型为 Number(Long 和 Integer)或 String)(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextId`(默认实现类为`DefaultIdentifierGenerator`雪花算法) |
| ASSIGN_UUID   | 分配 UUID,主键类型为 String(since 3.3.0),使用接口`IdentifierGenerator`的方法`nextUUID`(默认 default 方法) |
| ID_WORKER     | 分布式全局唯一 ID 长整型类型(please use `ASSIGN_ID`)         |
| UUID          | 32 位 UUID 字符串(please use `ASSIGN_UUID`)                  |
| ID_WORKER_STR | 分布式全局唯一 ID 字符串类型(please use `ASSIGN_ID`)         |

```java
@TableId(type = IdType.AUTO)
```



## @TableField

- 描述：字段注解（非主键）


```java
@TableName("sys_user")
public class User {
    @TableId
    private Long id;
    @TableField("nickname")
    private String name;
    private Integer age;
    private String email;
}
```


| 属性             | 类型                         | 必须指定 | 默认值                   | 描述                                                         |
| :--------------- | :--------------------------- | :------- | :----------------------- | :----------------------------------------------------------- |
| value            | String                       | 否       | ""                       | 数据库字段名                                                 |
| exist            | boolean                      | 否       | true                     | 是否为数据库表字段                                           |
| condition        | String                       | 否       | ""                       | 字段 `where` 实体查询比较条件，有值设置则按设置的值为准，没有则为默认全局的 `%s=#{%s}`，[参考(opens new window)](https://github.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-annotation/src/main/java/com/baomidou/mybatisplus/annotation/SqlCondition.java) |
| update           | String                       | 否       | ""                       | 字段 `update set` 部分注入，例如：当在version字段上注解`update="%s+1"` 表示更新时会 `set version=version+1` （该属性优先级高于 `el` 属性） |
| insertStrategy   | Enum                         | 否       | FieldStrategy.DEFAULT    | 举例：NOT_NULL `insert into table_a(<if test="columnProperty != null">column</if>) values (<if test="columnProperty != null">#{columnProperty}</if>)` |
| updateStrategy   | Enum                         | 否       | FieldStrategy.DEFAULT    | 举例：IGNORED `update table_a set column=#{columnProperty}`  |
| whereStrategy    | Enum                         | 否       | FieldStrategy.DEFAULT    | 举例：NOT_EMPTY `where <if test="columnProperty != null and columnProperty!=''">column=#{columnProperty}</if>` |
| fill             | Enum                         | 否       | FieldFill.DEFAULT        | 字段自动填充策略                                             |
| select           | boolean                      | 否       | true                     | 是否进行 select 查询                                         |
| keepGlobalFormat | boolean                      | 否       | false                    | 是否保持使用全局的 format 进行处理                           |
| jdbcType         | JdbcType                     | 否       | JdbcType.UNDEFINED       | JDBC 类型 (该默认值不代表会按照该值生效)                     |
| typeHandler      | Class<? extends TypeHandler> | 否       | UnknownTypeHandler.class | 类型处理器 (该默认值不代表会按照该值生效)                    |
| numericScale     | String                       | 否       | ""                       | 指定小数点后保留的位数                                       |



关于`jdbcType`和`typeHandler`以及`numericScale`的说明:

`numericScale`只生效于 update 的 sql. `jdbcType`和`typeHandler`如果不配合`@TableName#autoResultMap = true`一起使用,也只生效于 update 的 sql. 对于`typeHandler`如果你的字段类型和 set 进去的类型为`equals`关系,则只需要让你的`typeHandler`让 Mybatis 加载到即可,不需要使用注解

### FieldStrategy

| 值        | 描述                                                        |
| :-------- | :---------------------------------------------------------- |
| IGNORED   | 忽略判断                                                    |
| NOT_NULL  | 非 NULL 判断                                                |
| NOT_EMPTY | 非空判断(只对字符串类型字段,其他类型字段依然为非 NULL 判断) |
| DEFAULT   | 追随全局配置                                                |



### FieldFill

| 值            | 描述                 |
| :------------ | :------------------- |
| DEFAULT       | 默认不处理           |
| INSERT        | 插入时填充字段       |
| UPDATE        | 更新时填充字段       |
| INSERT_UPDATE | 插入和更新时填充字段 |



## @Version

- 描述：乐观锁注解、标记 `@Verison` 在字段上

## @EnumValue

- 描述：普通枚举类注解(注解在枚举字段上)

## @TableLogic

- 描述：表字段逻辑处理注解（逻辑删除）

| 属性   | 类型   | 必须指定 | 默认值 | 描述         |
| :----- | :----- | :------- | :----- | :----------- |
| value  | String | 否       | ""     | 逻辑未删除值 |
| delval | String | 否       | ""     | 逻辑删除值   |



## @SqlParser (Deprecated)

> see [@InterceptorIgnore](https://baomidou.com/pages/223848/#InterceptorIgnore)

## @KeySequence

- 描述：序列主键策略 `oracle`
- 属性：value、resultMap

| 属性  | 类型   | 必须指定 | 默认值     | 描述                                                         |
| :---- | :----- | :------- | :--------- | :----------------------------------------------------------- |
| value | String | 否       | ""         | 序列名                                                       |
| clazz | Class  | 否       | Long.class | id 的类型, 可以指定 String.class，这样返回的 Sequence 值是字符串"1" |



## @InterceptorIgnore

> see [插件主体](https://baomidou.com/pages/2976a3/)



## @OrderBy

- 描述：内置 SQL 默认指定排序，优先级低于 wrapper 条件查询

| 属性   | 类型    | 必须指定 | 默认值          | 描述           |
| :----- | :------ | :------- | :-------------- | :------------- |
| isDesc | boolean | 否       | true            | 是否倒序查询   |
| sort   | short   | 否       | Short.MAX_VALUE | 数字越小越靠前 |