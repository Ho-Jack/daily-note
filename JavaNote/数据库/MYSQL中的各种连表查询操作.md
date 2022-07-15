# MYSQL中的各种连表查询操作![MySql连表](D:\notes\daily-note\JavaNote\数据库\img\MySql连表.png)

学校表：

![school表](img\school表.png)

学生表

> 学生表里存放学校表里的`sch_id`字段

![student表](img\student表.png)

## MySql三种连表方式

- 外连接 outer join（left join 、right left）
- 内连接 inner join
- 交叉连接 cross join 

### 1. 外连接outer join

三种外连接方式：

- 左外连接 left join
- 右外连接 right join
- 完全外连接



#### 1.1. 左外连接left join

> 以左表为中心，**查出左表的全部数据**，关联字段值不相等则右表查出的数据显示为空；

```mysql
select * from school a left join student b on a.sch_id=b.sch_id;
```

![image-20220715151815623](D:\notes\daily-note\JavaNote\数据库\img\左连接left join.png)

![左外连接](img\左外连接.png)

#### 1.2. 右外连接 right join

> 以右表为中心，**查出右表的全部数据**，关联字段值不相等则左表查出的数据显示为空；

```mysql
select * from school a right join student b on a.sch_id=b.sch_id;
```

![右外连接right join](img\右外连接right join.png)

![左外连接](img\右外连接.png)

#### 1.3. 完全外连接full join

> mysql并不支持full join
>

```mysql
select * from user full join article on user.id=article.user_id;
```

报错！！！

![左外连接](img\完全外连接.png)

### 2. 内连接` inner join`

> 内连接相对于外链接，就是内连接只要左右表都匹配的数据，也就是交集
>

```mysql
select * from school a inner join student b on a.sch_id=b.sch_id;
```

![内连接inner join](img\内连接inner join.png)![内连接交集](img\内连接交集.png)



### 3. 拓展:

#### 外连接的左差集

> 查询仅存在于左表的数据

```mysql
select * from school a 
left join student b on a.sch_id=b.sch_id 
where b.st_id is null; #右表中st_id字段为空
```

![image-20220715160201689](D:\notes\daily-note\JavaNote\数据库\img\外连接差集.png)

![差集](img\差集.png)

#### 外连接的右差集

> 查询仅存在于右表的数据

```mysql
select * from school a 
right join student b on a.sch_id=b.sch_id 
where a.sch_id is null;  #左表中字段为空
```

![外连接右差集](img\外连接右差集.png)

![右差集](img\右差集.png)

#### 并集/（完全外连接） 左外连接+右外连接

> 查询左右表的全部数据

```mysql
select * from school a left join student b on a.sch_id=b.sch_id
union 
select * from school a right join student b on a.sch_id=b.sch_id;
```

![image-20220715163819114](D:\notes\daily-note\JavaNote\数据库\img\并集.png)![并集2](img\并集2.png)

#### 互斥 = 左差集+右差集

> 左右表毫无关系的数据

```mysql
select * from school a 
left join student b on a.sch_id=b.sch_id 
where b.st_id is null 
union 
select * from school a 
right join student b on a.sch_id=b.sch_id 
where a.sch_id is null;
```

![image-20220715164728960](img\互斥1.png)![互斥](img\互斥.png)