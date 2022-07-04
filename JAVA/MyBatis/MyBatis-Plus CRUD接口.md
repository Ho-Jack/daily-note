## Service CRUD 接口

> tip 说明:
>
> - 通用 Service CRUD 封装[IService](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/service/IService.java)接口，进一步封装 CRUD 采用 `get 查询单行` `remove 删除` `list 查询集合` `page 分页` 前缀命名方式区分 `Mapper` 层避免混淆，
> - 泛型 `T` 为任意实体对象
> - 建议如果存在自定义通用 Service 方法的可能，请创建自己的 `IBaseService` 继承 `Mybatis-Plus` 提供的基类
> - 对象 `Wrapper` 为 [条件构造器](https://github.com/baomidou/mybatis-plus-doc/blob/master/docs/01.指南/02.核心功能/wrapper.html) 

### Save

```java
// 插入一条记录（选择字段，策略插入）
boolean save(T entity);
// 插入（批量）
boolean saveBatch(Collection<T> entityList);
// 插入（批量）
boolean saveBatch(Collection<T> entityList, int batchSize);
```

#### 参数说明

| 类型          | 参数名     | 描述         |
| ------------- | ---------- | ------------ |
| T             | entity     | 实体对象     |
| Collection<T> | entityList | 实体对象集合 |
| int           | batchSize  | 插入批次数量 |

### SaveOrUpdate

```java
// TableId 注解存在更新记录，否插入一条记录
boolean saveOrUpdate(T entity);
// 根据updateWrapper尝试更新，否继续执行saveOrUpdate(T)方法
boolean saveOrUpdate(T entity, Wrapper<T> updateWrapper);
// 批量修改插入
boolean saveOrUpdateBatch(Collection<T> entityList);
// 批量修改插入
boolean saveOrUpdateBatch(Collection<T> entityList, int batchSize);
```

#### 参数说明

| 类型          | 参数名        | 描述                             |
| ------------- | ------------- | -------------------------------- |
| T             | entity        | 实体对象                         |
| Wrapper<T>    | updateWrapper | 实体对象封装操作类 UpdateWrapper |
| Collection<T> | entityList    | 实体对象集合                     |
| int           | batchSize     | 插入批次数量                     |

### Remove

```java
// 根据 entity 条件，删除记录
boolean remove(Wrapper<T> queryWrapper);
// 根据 ID 删除
boolean removeById(Serializable id);
// 根据 columnMap 条件，删除记录
boolean removeByMap(Map<String, Object> columnMap);
// 删除（根据ID 批量删除）
boolean removeByIds(Collection<? extends Serializable> idList);
```

#### 参数说明

| 类型                               | 参数名       | 描述                    |
| ---------------------------------- | ------------ | ----------------------- |
| Wrapper<T>                         | queryWrapper | 实体包装类 QueryWrapper |
| Serializable                       | id           | 主键 ID                 |
| Map<String, Object>                | columnMap    | 表字段 map 对象         |
| Collection<? extends Serializable> | idList       | 主键 ID 列表            |

### Update

```
// 根据 UpdateWrapper 条件，更新记录 需要设置sqlset
boolean update(Wrapper<T> updateWrapper);
// 根据 whereWrapper 条件，更新记录
boolean update(T updateEntity, Wrapper<T> whereWrapper);
// 根据 ID 选择修改
boolean updateById(T entity);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList, int batchSize);
```

#### 参数说明

| 类型          | 参数名        | 描述                             |
| ------------- | ------------- | -------------------------------- |
| Wrapper<T>    | updateWrapper | 实体对象封装操作类 UpdateWrapper |
| T             | entity        | 实体对象                         |
| Collection<T> | entityList    | 实体对象集合                     |
| int           | batchSize     | 更新批次数量                     |

### Get

```
// 根据 ID 查询
T getById(Serializable id);
// 根据 Wrapper，查询一条记录。结果集，如果是多个会抛出异常，随机取一条加上限制条件 wrapper.last("LIMIT 1")
T getOne(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
T getOne(Wrapper<T> queryWrapper, boolean throwEx);
// 根据 Wrapper，查询一条记录
Map<String, Object> getMap(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
<V> V getObj(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

#### 参数说明

| 类型                        | 参数名       | 描述                            |
| --------------------------- | ------------ | ------------------------------- |
| Serializable                | id           | 主键 ID                         |
| Wrapper<T>                  | queryWrapper | 实体对象封装操作类 QueryWrapper |
| boolean                     | throwEx      | 有多个 result 是否抛出异常      |
| T                           | entity       | 实体对象                        |
| Function<? super Object, V> | mapper       | 转换函数                        |

### List

```
// 查询所有
List<T> list();
// 查询列表
List<T> list(Wrapper<T> queryWrapper);
// 查询（根据ID 批量查询）
Collection<T> listByIds(Collection<? extends Serializable> idList);
// 查询（根据 columnMap 条件）
Collection<T> listByMap(Map<String, Object> columnMap);
// 查询所有列表
List<Map<String, Object>> listMaps();
// 查询列表
List<Map<String, Object>> listMaps(Wrapper<T> queryWrapper);
// 查询全部记录
List<Object> listObjs();
// 查询全部记录
<V> List<V> listObjs(Function<? super Object, V> mapper);
// 根据 Wrapper 条件，查询全部记录
List<Object> listObjs(Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录
<V> List<V> listObjs(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

#### 参数说明

| 类型                               | 参数名       | 描述                            |
| ---------------------------------- | ------------ | ------------------------------- |
| Wrapper<T>                         | queryWrapper | 实体对象封装操作类 QueryWrapper |
| Collection<? extends Serializable> | idList       | 主键 ID 列表                    |
| Map<String, Object>                | columnMap    | 表字段 map 对象                 |
| Function<? super Object, V>        | mapper       | 转换函数                        |

### Page

```
// 无条件分页查询
IPage<T> page(IPage<T> page);
// 条件分页查询
IPage<T> page(IPage<T> page, Wrapper<T> queryWrapper);
// 无条件分页查询
IPage<Map<String, Object>> pageMaps(IPage<T> page);
// 条件分页查询
IPage<Map<String, Object>> pageMaps(IPage<T> page, Wrapper<T> queryWrapper);
```

#### 参数说明

| 类型       | 参数名       | 描述                            |
| ---------- | ------------ | ------------------------------- |
| IPage<T>   | page         | 翻页对象                        |
| Wrapper<T> | queryWrapper | 实体对象封装操作类 QueryWrapper |

### Count

```
// 查询总记录数
int count();
// 根据 Wrapper 条件，查询总记录数
int count(Wrapper<T> queryWrapper);
```

#### 参数说明

| 类型       | 参数名       | 描述                            |
| ---------- | ------------ | ------------------------------- |
| Wrapper<T> | queryWrapper | 实体对象封装操作类 QueryWrapper |

### Chain

#### query

```
// 链式查询 普通
QueryChainWrapper<T> query();
// 链式查询 lambda 式。注意：不支持 Kotlin
LambdaQueryChainWrapper<T> lambdaQuery();

// 示例：
query().eq("column", value).one();
lambdaQuery().eq(Entity::getId, value).list();
```

#### update

```
// 链式更改 普通
UpdateChainWrapper<T> update();
// 链式更改 lambda 式。注意：不支持 Kotlin
LambdaUpdateChainWrapper<T> lambdaUpdate();

// 示例：
update().eq("column", value).remove();
lambdaUpdate().eq(Entity::getId, value).update(entity);
```

## Mapper CRUD 接口

> tip 说明:
>
> - 通用 CRUD 封装[BaseMapper](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/mapper/BaseMapper.java)接口，为 `Mybatis-Plus` 启动时自动解析实体表关系映射转换为 `Mybatis` 内部对象注入容器
> - 泛型 `T` 为任意实体对象
> - 参数 `Serializable` 为任意类型主键 `Mybatis-Plus` 不推荐使用复合主键约定每一张表都有自己的唯一 `id` 主键
> - 对象 `Wrapper` 为 [条件构造器](https://github.com/baomidou/mybatis-plus-doc/blob/master/docs/01.指南/02.核心功能/wrapper.html) 

### Insert

```java
// 插入一条记录
int insert(T entity);
```

#### 参数说明

| 类型 | 参数名 | 描述     |
| ---- | ------ | -------- |
| T    | entity | 实体对象 |

### Delete

```java
// 根据 entity 条件，删除记录
int delete(@Param(Constants.WRAPPER) Wrapper<T> wrapper);
// 删除（根据ID 批量删除）
int deleteBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);
// 根据 ID 删除
int deleteById(Serializable id);
// 根据 columnMap 条件，删除记录
int deleteByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);
```

#### 参数说明

| 类型                               | 参数名    | 描述                                 |
| ---------------------------------- | --------- | ------------------------------------ |
| Wrapper<T>                         | wrapper   | 实体对象封装操作类（可以为 null）    |
| Collection<? extends Serializable> | idList    | 主键 ID 列表(不能为 null 以及 empty) |
| Serializable                       | id        | 主键 ID                              |
| Map<String, Object>                | columnMap | 表字段 map 对象                      |

### Update

```java
// 根据 whereWrapper 条件，更新记录
int update(@Param(Constants.ENTITY) T updateEntity, @Param(Constants.WRAPPER) Wrapper<T> whereWrapper);
// 根据 ID 修改
int updateById(@Param(Constants.ENTITY) T entity);
```

#### 参数说明

| 类型       | 参数名        | 描述                                                         |
| ---------- | ------------- | ------------------------------------------------------------ |
| T          | entity        | 实体对象 (set 条件值,可为 null)                              |
| Wrapper<T> | updateWrapper | 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句） |

### Select

```java
// 根据 ID 查询
T selectById(Serializable id);
// 根据 entity 条件，查询一条记录
T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

// 查询（根据ID 批量查询）
List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);
// 根据 entity 条件，查询全部记录
List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 查询（根据 columnMap 条件）
List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);
// 根据 Wrapper 条件，查询全部记录
List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录。注意： 只返回第一个字段的值
List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

// 根据 entity 条件，查询全部记录（并翻页）
IPage<T> selectPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录（并翻页）
IPage<Map<String, Object>> selectMapsPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询总记录数
Integer selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
```

#### 参数说明

| 类型                               | 参数名       | 描述                                     |
| ---------------------------------- | ------------ | ---------------------------------------- |
| Serializable                       | id           | 主键 ID                                  |
| Wrapper<T>                         | queryWrapper | 实体对象封装操作类（可以为 null）        |
| Collection<? extends Serializable> | idList       | 主键 ID 列表(不能为 null 以及 empty)     |
| Map<String, Object>                | columnMap    | 表字段 map 对象                          |
| IPage<T>                           | page         | 分页查询条件（可以为 RowBounds.DEFAULT） |

## mapper 层 选装件

>  tip 说明: 选装件位于 `com.baomidou.mybatisplus.extension.injector.methods` 包下 需要配合[Sql 注入器](https://github.com/baomidou/mybatis-plus-doc/blob/master/pages/42ea4a)使用,[案例](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-sql-injector)
> 使用详细见[源码注释](https://gitee.com/baomidou/mybatis-plus/tree/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/methods) 

### [AlwaysUpdateSomeColumnById](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/methods/AlwaysUpdateSomeColumnById.java)

```
int alwaysUpdateSomeColumnById(T entity);
```

### [insertBatchSomeColumn](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/methods/InsertBatchSomeColumn.java)

```
int insertBatchSomeColumn(List<T> entityList);
```

### [logicDeleteByIdWithFill](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/injector/methods/LogicDeleteByIdWithFill.java)

```
int logicDeleteByIdWithFill(T entity);
```

## ActiveRecord 模式

::: tip 说明:

- 实体类只需继承 Model 类即可进行强大的 CRUD 操作
- 需要项目中已注入对应实体的BaseMapper :::

### 操作步骤：

- 继承 [Model](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/activerecord/Model.java)

```
class User extends Model<User>{
    // fields...
}
```

- 调用`CRUD`方法(演示部分api，仅供参考)

```
User user = new User();
user.insert();
user.selectAll();
user.updateById();
user.deleteById();
// ...
```

## SimpleQuery 工具类

> tip 说明:
>
> - 对`selectList`查询后的结果用`Stream`流进行了一些封装，使其可以返回一些指定结果，简洁了api的调用
> - 需要项目中已注入对应实体的BaseMapper
> - 使用方式见: [测试用例](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus/src/test/java/com/baomidou/mybatisplus/test/toolkit/SimpleQueryTest.java)
> - 对于下方参数`peeks`，其类型为`Consumer...`，可一直往后叠加操作例如：`List<Long> ids = SimpleQuery.list(Wrappers.lambdaQuery(), Entity::getId, System.out::println, user -> userNames.add(user.getName()));` 

### keyMap

```
// 查询表内记录，封装返回为Map<属性,实体>
Map<A, E> keyMap(LambdaQueryWrapper<E> wrapper, SFunction<E, A> sFunction, Consumer<E>... peeks);
// 查询表内记录，封装返回为Map<属性,实体>，考虑了并行流的情况
Map<A, E> keyMap(LambdaQueryWrapper<E> wrapper, SFunction<E, A> sFunction, boolean isParallel, Consumer<E>... peeks);
```

##### 参数说明

| 类型                  | 参数名     | 描述                                            |
| --------------------- | ---------- | ----------------------------------------------- |
| E                     | entity     | 实体对象                                        |
| A                     | attribute  | 实体属性类型,也是map中key的类型                 |
| LambdaQueryWrapper<E> | wrapper    | 支持lambda的条件构造器                          |
| SFunction<E, A>       | sFunction  | 实体中属性的getter,用于封装后map中作为key的条件 |
| boolean               | isParallel | 为true时底层使用并行流执行                      |
| Consumer<E>...        | peeks      | 可叠加的后续操作                                |

### map

```
// 查询表内记录，封装返回为Map<属性,属性>
Map<A, P> map(LambdaQueryWrapper<E> wrapper, SFunction<E, A> keyFunc, SFunction<E, P> valueFunc, Consumer<E>... peeks);
// 查询表内记录，封装返回为Map<属性,属性>，考虑了并行流的情况
Map<A, P> map(LambdaQueryWrapper<E> wrapper, SFunction<E, A> keyFunc, SFunction<E, P> valueFunc, boolean isParallel, Consumer<E>... peeks);
```

##### 参数说明

| 类型                  | 参数名     | 描述                              |
| --------------------- | ---------- | --------------------------------- |
| E                     | entity     | 实体对象                          |
| A                     | attribute  | 实体属性类型,也是map中key的类型   |
| P                     | attribute  | 实体属性类型,也是map中value的类型 |
| LambdaQueryWrapper<E> | wrapper    | 支持lambda的条件构造器            |
| SFunction<E, A>       | keyFunc    | 封装后map中作为key的条件          |
| SFunction<E, P>       | valueFunc  | 封装后map中作为value的条件        |
| boolean               | isParallel | 为true时底层使用并行流执行        |
| Consumer<E>...        | peeks      | 可叠加的后续操作                  |

### group

```
// 查询表内记录，封装返回为Map<属性,List<实体>>
Map<K, List<T>> group(LambdaQueryWrapper<T> wrapper, SFunction<T, A> sFunction, Consumer<T>... peeks);
// 查询表内记录，封装返回为Map<属性,List<实体>>，考虑了并行流的情况
Map<K, List<T>> group(LambdaQueryWrapper<T> wrapper, SFunction<T, K> sFunction, boolean isParallel, Consumer<T>... peeks);
// 查询表内记录，封装返回为Map<属性,分组后对集合进行的下游收集器>
M group(LambdaQueryWrapper<T> wrapper, SFunction<T, K> sFunction, Collector<? super T, A, D> downstream, Consumer<T>... peeks);
// 查询表内记录，封装返回为Map<属性,分组后对集合进行的下游收集器>，考虑了并行流的情况
M group(LambdaQueryWrapper<T> wrapper, SFunction<T, K> sFunction, Collector<? super T, A, D> downstream, boolean isParallel, Consumer<T>... peeks);
```

##### 参数说明

| 类型                  | 参数名     | 描述                                    |
| --------------------- | ---------- | --------------------------------------- |
| T                     | entity     | 实体对象                                |
| K                     | attribute  | 实体属性类型,也是map中key的类型         |
| D                     | -          | 下游收集器返回类型,也是map中value的类型 |
| A                     | -          | 下游操作中间类型                        |
| M                     | -          | 最终结束返回的Map<K, D>                 |
| LambdaQueryWrapper<E> | wrapper    | 支持lambda的条件构造器                  |
| SFunction<E, A>       | sFunction  | 分组依据，封装后map中作为key的条件      |
| Collector<T, A, D>    | downstream | 下游收集器                              |
| boolean               | isParallel | 为true时底层使用并行流执行              |
| Consumer<T>...        | peeks      | 可叠加的后续操作                        |

### list

```
// 查询表内记录，封装返回为List<属性>
List<A> list(LambdaQueryWrapper<E> wrapper, SFunction<E, A> sFunction, Consumer<E>... peeks);
// 查询表内记录，封装返回为List<属性>，考虑了并行流的情况
List<A> list(LambdaQueryWrapper<E> wrapper, SFunction<E, A> sFunction, boolean isParallel, Consumer<E>... peeks);
```

##### 参数说明

| 类型                  | 参数名     | 描述                              |
| --------------------- | ---------- | --------------------------------- |
| E                     | entity     | 实体对象                          |
| A                     | attribute  | 实体属性类型,也是list中元素的类型 |
| LambdaQueryWrapper<E> | wrapper    | 支持lambda的条件构造器            |
| SFunction<E, A>       | sFunction  | 封装后list中的元素                |
| boolean               | isParallel | 为true时底层使用并行流执行        |
| Consumer<E>...        | peeks      | 可叠加的后续操作                  |