MyBatis是一个优秀的持久层框架，它对jdbc的操作如MySQL等数据库的过程进行封装，使开发者只需要关注 SQL 本身，而不需要花费精力去处理例如注册驱动、创建connection、创建statement、手动设置参数、结果集检索等jdbc繁杂的过程代码。

详细阐述
1. Mybatis是一款半自动的ORM持久层框架：半自动体现在需要coder自己手写CRUD的SQL，这就意味着灵活度较高，ORM指 object-Relation Mapping，对象关系映射。对象指的是Java对象，关系指的是数据库中的关系模型，对象关系映射，指的就是在Java对象和数据库的关系模型之间建立一种对应关系。比如订单对象包含主订单和订单明细属性，在底层对应着多张订单相关的表结构。

2. MySQL 是一款跨平台的关系型数据库管理系统，Oracle公司的。

3. JDBC（Java DataBase Connectivity）

JDBC是什么？JDBC英文名为：Java Data Base Connectivity(Java数据库连接)，官方解释它是Java编程语言和广泛的数据库之间独立于数据库的连接标准的Java API，根本上说JDBC是一种规范，它提供的接口，一套完整的，允许便捷式访问底层数据库。可以用JAVA来写不同类型的可执行文件：JAVA应用程序、JAVA Applets、Java Servlet、JSP等，不同的可执行文件都能通过JDBC访问数据库，又兼备存储的优势。简单说它就是JAVA与数据库的连接的桥梁或者插件，用JAVA代码就能操作数据库的增删改查、存储过程、事务等。
————————————————
版权声明：本文为CSDN博主「anmilky」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/anmilky/article/details/123163069