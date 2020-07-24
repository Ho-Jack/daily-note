[Sequelize](https://sequelize.readthedocs.io/en/latest/) 是一个基于 Promise 的 Node.js ORM，目前支持 Postgres、MySQL、SQLite 和 Microsoft SQL Server。它具有强大的事务支持，关联关系、读取和复制等功能。

### 安装

1. npm

```shell
// Using NPM
$ npm install --save sequelize

# And one of the following:
$ npm install --save pg pg-hstore
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL
```

1. yarn

```shell
// Using Yarn
$ yarn add sequelize

# And one of the following:
$ yarn add pg pg-hstore
$ yarn add mysql2
$ yarn add sqlite3
$ yarn add tedious // MSSQL
```

本文所使用的第三方库的版本信息为：”sequelize”: “^4.39.0”、”mysql2”: “^1.6.1”。

### 建立数据库连接

```js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
```

### 测试连接

这里以 mysql 数据库为例：

```js
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'exe', // 数据库名称
    'root',  // 用户名
    '',  // 密码
{
    host: 'localhost',
    dialect: 'mysql', // 'mysql'|'sqlite'|'postgres'|'mssql'
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
```

需要注意的是，运行以上代码前需保证本机已安装并启动了 mysql。对于使用 MacOS 的小伙伴来说，可以通过 [Homebrew](http://brew.sh/) 来安装和启动 mysql：

```shell
$ brew doctor # 确认 brew 是否正常。
$ brew update # 更新包
$ brew install mysql # 安装 mysql
$ brew services start mysql #启动 mysql 
$ brew services restart mysql #重启 mysql 
$ brew services stop mysql #关闭 mysql
```

### 定义模型

```js
const Sequelize = require("sequelize");

module.exports = sequelize => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });

  User.sync({
    force: true
  }).then(() => {
    console.log("User Table has been created");
  });

  return User;
};
```

以上示例中 `User.sync({force: true})` ，将会先删掉表后再建表。当然，你也可以先定义好表结构，再来定义 `Sequelize`模型，这时就不需要使用 sync 方法。两者在定义阶段没有什么关系，只有我们开始操作模型时，才会触及表操作，但是我们需要尽量保证模型和表之间的同步。

当执行以上的代码，控制台将会输出相应的 SQL 语句：

1. 选择性删除 users 表

```sql
DROP TABLE IF EXISTS `users`;
```

1. 建立 users 表

```sql
CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `firstName` VARCHAR(255), `lastName` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`))
```

1. 显示 users 表索引

```sql
SHOW INDEX FROM `users`
```

之后在数据库将会新增一张 users 表，表结构如下：

| id   | firstName | lastName | createdAt | updatedAt |
| ---- | --------- | -------- | --------- | --------- |
|      |           |          |           |           |

细心的你，可能会发现，在定义 User 模型时，我们只定义了 firstName 和 lastName 属性，但生成对应的表结构时，增加了 id、createdAt 和 updatedAt 3 个属性。其中 id 是整型，会自动增加，而 createdAt 和 updatedAt 用于跟踪记录的变更时间。如果你不需要 Sequelize 自动生成 createdAt 和 updatedAt 属性，你可以在创建 Sequelize 实例时，配置 define.timestamps 属性。

```js
define: {
  timestamps: false
}
```

上面的方式是全局的方式进行设置，当然我们也可以在定义模型时，进行单独设置，比如：

```js
sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  }, { 'timestamps': false });
```

此外 Sequelize 除了支持 STRING 类型之外，还支持 INTEGER、TEXT、DECIMAL 或 DATE 等类型，若需要了解完整的类型，请参考 [Sequelize - DataTypes](https://sequelize.readthedocs.io/en/latest/api/datatypes/)。

### 单表增删改查

#### 新增

1. 方式一：调用 build 方法后对象只存在于内存中，需要进一步调用 save 方法才会保存到数据库中。

```js
let user = UserModel.build({
   firstName: "John",
   lastName: "Doe"
});
user = await user.save();
console.log(user.get({'plain': true}));
```

以上代码运行后，终端将会输出以下信息：

```sql
Executing (default): INSERT INTO `users` (`id`,`firstName`,`lastName`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'John','Doe','2018-10-08 08:21:26','2018-10-08 08:21:26');
{ id: 5,
  firstName: 'John',
  lastName: 'Doe',
  updatedAt: 2018-10-08T08:21:26.894Z,
  createdAt: 2018-10-08T08:21:26.894Z 
}
```

1. 方式二：调用 create 方法后，会直接保存到数据库中。

```js
const user = await UserModel.create({
   firstName: "Sue",
   lastName: "Smith"
});
console.log(user.get({'plain': true}));
```

以上代码运行后，终端将会输出以下信息：

```sql
Executing (default): INSERT INTO `users` (`id`,`firstName`,`lastName`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'Sue','Smith','2018-10-08 08:26:11','2018-10-08 08:26:11');
{ id: 6,
  firstName: 'Sue',
  lastName: 'Smith',
  updatedAt: 2018-10-08T08:26:11.384Z,
  createdAt: 2018-10-08T08:26:11.384Z 
}
```

#### 修改

1. 方式一：直接操作对象属性，但需要调用 save 方法后才会保存。

```js
user.firstName = "John";
user.lastName = "Hancock";
const updatedUser = await user.save();
console.log(updatedUser.get({'plain': true}));
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
UPDATE `users` SET `firstName`='John',`lastName`='Hancock',`updatedAt`='2018-10-08 08:32:06' WHERE `id` = 7
```

执行更新操作时，`Sequelize` 将自动更新 `updatedAt` 字段，非常方便。

1. 方式二：调用 update 方法，实现数据更新。

```js
const updatedUser = await user.update({
  firstName: "John",
  lastName: "Hancock"
});
console.log(updatedUser.get({'plain': true}));
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
UPDATE `users` SET `firstName`='John',`lastName`='Hancock',`updatedAt`='2018-10-08 08:37:23' WHERE `id` = 8
```

如果想限制更新的字段，可以通过以下方式：

```js
// 方式一
user.firstName = "John";
user.lastName = "Hancock";
const updatedUser = await user.save({ fields: ['firstName'] });

// 方式二
const updatedUser = await user.update({
  firstName: "John",
  lastName: "Hancock"
}, {
   fields: ['firstName'] 
});
console.log(updatedUser.get({'plain': true}));
```

#### 删除

```js
const user = await UserModel.create({ // 创建新的用户
  firstName: "Sue", 
  lastName: "Smith"
});
console.log(user.get({'plain': true}));
await user.destroy(); // 删除刚创建的用户
```

以上代码运行后，终端将会输出以下信息：

```sql
Executing (default): INSERT INTO `users` (`id`,`firstName`,`lastName`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'Sue','Smith','2018-10-08 08:46:13','2018-10-08 08:46:13');
{ id: 9,
  firstName: 'Sue',
  lastName: 'Smith',
  updatedAt: 2018-10-08T08:46:13.966Z,
  createdAt: 2018-10-08T08:46:13.966Z 
}
Executing (default): DELETE FROM `users` WHERE `id` = 9 LIMIT 1
```

其实如果我们启用了 `paranoid`（偏执）模式，`destroy` 的时候不会执行 `DELETE` 语句，而是执行一个 `UPDATE` 语句将 `deletedAt` 字段设置为当前时间（一开始此字段值为`NULL`）。不过需要注意的是，仅当 `timestamps=true` 为 true 时，paranoid 模式才能生效。

当然我们也可以使用 `user.destroy({force: true})` 来强制删除，从而执行 `DELETE` 语句进行物理删除。

#### 查询

1. 查询全部

```
const users = yield User.findAll();
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```
SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `users` AS `user`;
```

1. 限制字段

```
const users = await UserModel.findAll({
  attributes: ['id', 'firstName', 'lastName']
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```
SELECT `id`, `firstName`, `lastName` FROM `users` AS `user`;
```

1. 字段重命名

```
const users = await UserModel.findAll({
  attributes: ['id', 'firstName', ['lastName', 'lsName']]
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```
SELECT `id`, `firstName`, `lastName` AS `lsName` FROM `users` AS `user`;
```

### 条件查询

`Sequelize` 的 `where` 配置项完美支持了 `SQL` 的 `where` 子句的功能，功能非常强大。下面我们来简单介绍一下：

#### 基本条件

```js
const users = await UserModel.findAll({
  attributes: ['id', 'firstName'],
  where: {
    id: [1, 2],
    firstName: 'John'
  }
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName` FROM `users` AS `user` WHERE `user`.`id` IN (1, 2) AND `user`.`firstName` = 'John';
```

可以看到，键值对被转换成了 `key = value` 的形式，若一个对象包含多个键值对会被转换成了 `AND` 条件，即：`k1: v1, k2: v2` 转换为 `k1 = v1 AND k2 = v2`。如果 value 的类型是数组类型，那么会转换成 IN 条件。

#### AND 条件

```js
const Op = Sequelize.Op;
const users = await UserModel.findAll({
  attributes: ['id', 'firstName'],
  where: {
    [Op.and]: [
      { id: [1, 2] },
      { firstName: 'John' }
    ]
  }
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName` FROM `users` AS `user` WHERE (`user`.`id` IN (1, 2) AND `user`.`firstName` = 'John');
```

#### OR 条件

```js
const Op = Sequelize.Op;
const users = await UserModel.findAll({
  attributes: ['id', 'firstName'],
  where: {
    [Op.or]: [
      { id: [1, 2] },
      { firstName: 'John' }
    ]
  }
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName` FROM `users` AS `user` WHERE (`user`.`id` IN (1, 2) OR `user`.`firstName` = 'John');
```

#### NOT 条件

```js
const Op = Sequelize.Op;
const users = await UserModel.findAll({
  attributes: ['id', 'firstName'],
  where: {
    [Op.not]: [
      { id: [1, 2] }
    ]
  }
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName` FROM `users` AS `user` WHERE NOT (`user`.`id` IN (1, 2));
```

除了 and、or 和 not 操作符之外，Sequelize 还支持 notIn、like、notLike 和 between 等操作符，若想了解更多的操作符，你可以访问 [Sequelize - querying](http://docs.sequelizejs.com/manual/tutorial/querying.html)。

### 其它查询方法

#### 查询单条记录

1. 方式一：调用 findById 方法：

```js
const user = await UserModel.findById(1);
console.log(user.get({'plain': true}));
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 1;
```

1. 方式二：调用 findOne 方法：

```js
const user = await UserModel.findOne({
  where: { firstName: 'Sue' }
});
console.log(user.get({'plain': true}));
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`firstName` = 'Sue' LIMIT 1;
```

#### 查询并获取数量

```js
const result = await UserModel.findAndCountAll({
  limit: 10,
  offset: 0
});
console.log(result);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT count(*) AS `count` FROM `users` AS `user`;
SELECT `id`, `firstName`, `lastName`, `createdAt`, `updatedAt` FROM `users` AS `user` LIMIT 0, 10;
```

### 排序与分页

#### 排序

```js
const users = await UserModel.findAll({
  attributes: ['id', 'firstName'],
  order: [
    ['id', 'DESC']
  ]
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName` FROM `users` AS `user` ORDER BY `user`.`id` DESC;
```

#### 分页

```js
let countPerPage = 2, currentPage = 1;

const users = await UserModel.findAll({
  attributes: ['id', 'firstName'],
  limit: countPerPage, // 每页多少条
  offset: countPerPage * (currentPage - 1) // 跳过多少条
});
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```sql
SELECT `id`, `firstName` FROM `users` AS `user` LIMIT 0, 2;
```

### 批量操作

#### 插入

```js
const users = await UserModel.bulkCreate([
  { firstName: "John", lastName: "Doe"},
  { firstName: "Sue", lastName: "Smith"},
  { firstName: "John", lastName: "Hancock"}
]);
console.log(users);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```
INSERT INTO `users` (`id`,`firstName`,`lastName`,`createdAt`,`updatedAt`) VALUES (NULL,'John','Doe','2018-10-08 10:06:23','2018-10-08 10:06:23'),(NULL,'Sue','Smith','2018-10-08 10:06:23','2018-10-08 10
:06:23'),(NULL,'John','Hancock','2018-10-08 10:06:23','2018-10-08 10:06:23');
```

#### 更新

```js
const Op = Sequelize.Op;
const affectedRows = await UserModel.update(
  { firstName: "King" },
  { 
      where: {
        [Op.not]: { firstName: null }
      } 
  }
);
console.log(affectedRows);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```
UPDATE `users` SET `firstName`='King',`updatedAt`='2018-10-08 10:11:15' WHERE NOT (`firstName` IS NULL)
```

上面返回的 `affectedRows` 其实是一个数组，里面只有一个元素，表示更新的数据条数。

#### 删除

```js
const affectedRows = await UserModel.destroy({
  where: { firstName: 'King' }
});
console.log(affectedRows);
```

以上代码运行后，终端将会输出相应的 SQL 语句：

```
DELETE FROM `users` WHERE `firstName` = 'King'
```

### 总结

本文只是简单介绍了 sequelize 相关的基础知识，还未涉及表关系（一对一、一对多或多对多）、聚合函数及查询（`having`、`group by`）、模型的验证（`validate`）、定义钩子（`hooks`）、索引等知识。感兴趣的同学，请自行阅读官方文档或其它相关文档。