# Associations - 关联

本节介绍 sequelize 中的各种关联类型. Sequelize 中有四种类型的关联

1. BelongsTo   一对一关联
2. HasOne      一对一关联
3. HasMany
4. BelongsToMany

## 基本概念

### 来源(Source) & 目标(Target)

让我们首先介绍一个基本概念,你将在大多数关联中使用,**来源(Source)** 和 **目标(Target)** 模型. 假设你正在尝试在两个模型之间添加关联. 这里我们在 `User` 和 `Project` 之间添加一个 `hasOne` 关联.

```js
class User extends Model {}
User.init({
  name: Sequelize.STRING,
  email: Sequelize.STRING
}, {
  sequelize,
  modelName: 'user'
});

class Project extends Model {}
Project.init({
  name: Sequelize.STRING
}, {
  sequelize,
  modelName: 'project'
});

User.hasOne(Project);
```

`User` 模型(调用函数的模型)是 __来源(Source)__. 
`Project` 模型(作为参数传递的模型)是 __目标(Target)__.

### 外键

当你在模型中创建关联时,会自动创建带约束的外键引用. 下面是设置:

```js
class Task extends Model {}
Task.init({ title: Sequelize.STRING }, { sequelize, modelName: 'task' });
class User extends Model {}
User.init({ username: Sequelize.STRING }, { sequelize, modelName: 'user' });

User.hasMany(Task); // 将userId添加到Task模型
Task.belongsTo(User); // 同样会将userId添加到Task模型中
```

将生成以下SQL:

```sql
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL,
  "username" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tasks" (
  "id" SERIAL,
  "title" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "userId" INTEGER REFERENCES "users" ("id") ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
```

`tasks` 和 `users` 模型之间的关系通过在 `tasks` 表上注入 `userId` 外键,并将其标记为对 `users` 表的引用. 默认情况下,如果引用的用户被删除,`userId` 将被设置为 `NULL`,如果更新了则更新 `userId`. 可以通过将 `onUpdate` 和 `onDelete` 参数传递给关联调用来覆盖这些参数 . 验证参数是 `RESTRICT, CASCADE, NO ACTION, SET DEFAULT, SET NULL`.

对于 1:1 和 1:m 关联,默认选项是 `SET NULL` 用于删除,`CASCADE` 用于更新. 对于 n:m,两者的默认值是 `CASCADE`. 这意味着,如果你从 n:m 关联的一侧删除或更新一行,则引用该行的连接表中的所有行也将被删除或更新.

#### underscored 选项

Sequelize 允许为 Model 设置 `underscored` 选项. 当 `true` 时,此选项会将所有属性的 `field` 参数设置为其名称的下划线版本. 这也适用于关联生成的外键.

让我们修改最后一个例子来使用 `underscored` 选项.

```js
class Task extends Model {}
Task.init({
  title: Sequelize.STRING
}, {
  underscored: true,
  sequelize,
  modelName: 'task'
});

class User extends Model {}
User.init({
  username: Sequelize.STRING
}, {
  underscored: true,
  sequelize,
  modelName: 'user'
});

// 将 userId 添加到 Task 模型,但字段将设置为 `user_id`
// 这意味着列名称将是 `user_id`
User.hasMany(Task);

// 同样会将 userId 添加到 Task 模型,但字段将设置为 `user_id`
// 这意味着列名称将是 `user_id`
Task.belongsTo(User);
```

将生成以下SQL:

```sql
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL,
  "username" VARCHAR(255),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tasks" (
  "id" SERIAL,
  "title" VARCHAR(255),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
  "user_id" INTEGER REFERENCES "users" ("id") ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
```

注入模型的命名属性仍然为驼峰,只是 `field` 参数将其设置为下划线版本.

#### 循环依赖关系 & 禁用约束

在表之间添加约束意味着在使用 `sequelize.sync` 时,必须以特定顺序在数据库中创建表. 如果`Task`引用了`User`,则必须在创建`tasks`表之前创建`users`表. 这有时会导致循环引用,其中 sequelize 无法找到要同步的顺序. 想象一下文档和版本的场景. 文档可以有多个版本,为方便起见,文档可以引用其当前版本.

```js
class Document extends Model {}
Document.init({
  author: Sequelize.STRING
}, { sequelize, modelName: 'document' });
class Version extends Model {}
Version.init({
  timestamp: Sequelize.DATE
}, { sequelize, modelName: 'version' });

Document.hasMany(Version); // 这会将 documentId 属性添加到 version 中
Document.belongsTo(Version, {
  as: 'Current',
  foreignKey: 'currentVersionId'
}); // 这会将 currentVersionId 属性添加到 document 中
```

但是,上面的代码将导致以下错误: `Cyclic dependency found. documents is dependent of itself. Dependency chain: documents -> versions => documents`.为了解决这一问题,我们向其中一个关联传递 `constraints: false`:

```js
Document.hasMany(Version);
Document.belongsTo(Version, {
  as: 'Current',
  foreignKey: 'currentVersionId',
  constraints: false
});
```

这将可以让我们正确地同步表:

```sql
CREATE TABLE IF NOT EXISTS "documents" (
  "id" SERIAL,
  "author" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "currentVersionId" INTEGER,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "versions" (
  "id" SERIAL,
  "timestamp" TIMESTAMP WITH TIME ZONE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "documentId" INTEGER REFERENCES "documents" ("id") ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
```

### 在没有约束的情况下强制执行外键引用

有时你可能想引用另一个表,而不添加任何约束或关联. 在这种情况下,你可以手动将参考属性添加到你的模式定义中,并标记它们之间的关系.

```js
class Trainer extends Model {}
Trainer.init({
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
}, { sequelize, modelName: 'trainer' });

// 在我们调用 Trainer.hasMany(series) 后,
// series 将有一个 trainerId = Trainer.id 外键
class Series extends Model {}
Series.init({
  title: Sequelize.STRING,
  subTitle: Sequelize.STRING,
  description: Sequelize.TEXT,
  // 用 `Trainer` 设置 FK 关系(hasMany)
  trainerId: {
    type: Sequelize.INTEGER,
    references: {
      model: Trainer,
      key: 'id'
    }
  }
}, { sequelize, modelName: 'series' });

// 在我们调用 Series.hasOne(Video) 之后
// video 将有 seriesId = Series.id 外键
class Video extends Model {}
Video.init({
  title: Sequelize.STRING,
  sequence: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  // 用 `Series` 设置关系(hasOne)
  seriesId: {
    type: Sequelize.INTEGER,
    references: {
      model: Series, // 既可以是表示表名的字符串,也可以是 Sequelize 模型
      key: 'id'
    }
  }
}, { sequelize, modelName: 'video' });

Series.hasOne(Video);
Trainer.hasMany(Series);
```

## 一对一关联

一对一关联是通过单个外键连接的两个模型之间的关联.

### BelongsTo

BelongsTo 关联是在 **source model** 上存在一对一关系的外键的关联.

一个简单的例子是 **Player** 通过 player 的外键作为 **Team** 的一部分.

```js
class Player extends Model {}
Player.init({/* attributes */}, { sequelize, modelName: 'player' });
class Team extends Model {}
Team.init({/* attributes */}, { sequelize, modelName: 'team' });

Player.belongsTo(Team); // 将向 Player 添加一个 teamId 属性以保存 Team 的主键值
```

#### 外键

默认情况下,将从目标模型名称和目标主键名称生成 belongsTo 关系的外键.

默认的样式是 `camelCase`,但是如果源模型配置为 `underscored: true` ,那么将使用字段 `snake_case` 创建 foreignKey.

```js
class User extends Model {}
User.init({/* attributes */}, { sequelize, modelName: 'user' })
class Company extends Model {}
Company.init({/* attributes */}, { sequelize, modelName: 'company' });

// 将 companyId 添加到 user
User.belongsTo(Company);

class User extends Model {}
User.init({/* attributes */}, { underscored: true, sequelize, modelName: 'user' })
class Company extends Model {}
Company.init({
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true
  }
}, { sequelize, modelName: 'company' });

// 将 companyUuid 以 company_uuid 名称添加到 user
User.belongsTo(Company);
```

在已定义 `as` 的情况下,将使用它代替目标模型名称.

```js
class User extends Model {}
User.init({/* attributes */}, { sequelize, modelName: 'user' })
class UserRole extends Model {}
UserRole.init({/* attributes */}, { sequelize, modelName: 'userRole' });

User.belongsTo(UserRole, {as: 'role'}); // 将 role 添加到 user 而不是 userRole
```

在所有情况下,默认外键可以用 `foreignKey` 选项覆盖.
当使用外键选项时,Sequelize 将按原样使用:

```js
class User extends Model {}
User.init({/* attributes */}, { sequelize, modelName: 'user' })
class Company extends Model {}
Company.init({/* attributes */}, { sequelize, modelName: 'company' });

User.belongsTo(Company, {foreignKey: 'fk_company'}); // 将 fk_company 添加到 User
```

#### 目标键

目标键是源模型上的外键列指向的目标模型上的列. 默认情况下,belongsTo 关系的目标键将是目标模型的主键. 要定义自定义列,请使用 `targetKey` 选项.

```js
class User extends Model {}
User.init({/* attributes */}, { sequelize, modelName: 'user' })
class Company extends Model {}
Company.init({/* attributes */}, { sequelize, modelName: 'company' });

User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // 添加 fk_companyname 到 User
```

### HasOne

HasOne 关联是在 **target model** 上存在一对一关系的外键的关联.

```js
class User extends Model {}
User.init({/* ... */}, { sequelize, modelName: 'user' })
class Project extends Model {}
Project.init({/* ... */}, { sequelize, modelName: 'project' })
 
// 单向关联
Project.hasOne(User)

/*
  在此示例中,hasOne 将向 User 模型添加一个 projectId 属性 ！ 
  此外,Project.prototype 将根据传递给定义的第一个参数获取 getUser 和 setUser 的方法. 
  如果启用了 underscore 样式,则添加的属性将是 project_id 而不是 projectId.

  外键将放在 users 表上.

  你也可以定义外键,例如 如果你已经有一个现有的数据库并且想要处理它:
*/
 
Project.hasOne(User, { foreignKey: 'initiator_id' })
 
/*
  因为Sequelize将使用模型的名称(define的第一个参数)作为访问器方法,
  还可以将特殊选项传递给hasOne:
*/
 
Project.hasOne(User, { as: 'Initiator' })
// 现在你可以获得 Project.getInitiator 和 Project.setInitiator
 
// 或者让我们来定义一些自己的参考
class Person extends Model {}
Person.init({ /* ... */}, { sequelize, modelName: 'person' })
 
Person.hasOne(Person, {as: 'Father'})
// 这会将属性 FatherId 添加到 Person
 
// also possible:
Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'})
// 这将把属性 DadId 添加到 Person
 
// 在这两种情况下,你都可以:
Person.setFather
Person.getFather
 
// 如果你需要联结表两次,你可以联结同一张表
Team.hasOne(Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
Team.hasOne(Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});

Game.belongsTo(Team);
```

即使它被称为 HasOne 关联,对于大多数1:1关系,你通常需要BelongsTo关联,因为 BelongsTo 将会在 hasOne 将添加到目标的源上添加 foreignKey.

#### 源键

源关键是源模型中的属性,它是指向目标模型的外键属性. 默认情况下,`hasOne`关系的源键将是源模型的主要属性. 要使用自定义属性,请使用`sourceKey`参数.

```js
class User extends Model {}
User.init({/* attributes */}, { sequelize, modelName: 'user' })
class Company extends Model {}
Company.init({/* attributes */}, { sequelize, modelName: 'company' });

// 将 companyName 属性添加到 User
// 使用 Company 的 name 属性作为 source 属性
Company.hasOne(User, {foreignKey: 'companyName', sourceKey: 'name'});
```

### HasOne 和 BelongsTo 之间的区别

在Sequelize 1:1关系中可以使用HasOne和BelongsTo进行设置. 它们适用于不同的场景. 让我们用一个例子来研究这个差异.

假设我们有两个表可以链接 **Player** 和 **Team** . 让我们定义他们的模型.

```js
class Player extends Model {}
Player.init({/* attributes */}, { sequelize, modelName: 'player' })
class Team extends Model {}
Team.init({/* attributes */}, { sequelize, modelName: 'team' });
```

当我们连接 Sequelize 中的两个模型时,我们可以将它们称为一对 **source** 和 **target** 模型.像这样

将 **Player** 作为 **source** 而 **Team** 作为 **target**

```js
Player.belongsTo(Team);
//或
Player.hasOne(Team);
```

将 **Team** 作为 **source** 而 **Player** 作为 **target**

```js
Team.belongsTo(Player);
//Or
Team.hasOne(Player);
```

HasOne 和 BelongsTo 将关联键插入到不同的模型中. HasOne 在 **target** 模型中插入关联键,而 BelongsTo 将关联键插入到 **source** 模型中.

下是一个示例,说明了 BelongsTo 和 HasOne 的用法.

```js
class Player extends Model {}
Player.init({/* attributes */}, { sequelize, modelName: 'player' })
class Coach extends Model {}
Coach.init({/* attributes */}, { sequelize, modelName: 'coach' })
class Team extends Model {}
Team.init({/* attributes */}, { sequelize, modelName: 'team' });
```

假设我们的 `Player` 模型有关于其团队的信息为 `teamId` 列. 关于每个团队的 `Coach` 的信息作为 `coachId` 列存储在 `Team` 模型中. 这两种情况都需要不同种类的1:1关系,因为外键关系每次出现在不同的模型上.

当关于关联的信息存在于 **source** 模型中时,我们可以使用 `belongsTo`. 在这种情况下,`Player` 适用于 `belongsTo`,因为它具有 `teamId` 列.

```js
Player.belongsTo(Team)  // `teamId` 将被添加到 Player / Source 模型中
```

当关于关联的信息存在于 **target** 模型中时,我们可以使用 `hasOne`. 在这种情况下, `Coach` 适用于 `hasOne` ,因为 `Team` 模型将其 `Coach` 的信息存储为 `coachId` 字段.

```js
Coach.hasOne(Team)  // `coachId` 将被添加到 Team / Target 模型中
```

## 一对多关联 (hasMany)

一对多关联将一个来源与多个目标连接起来. 而多个目标接到同一个特定的源.

```js
class User extends Model {}
User.init({/* ... */}, { sequelize, modelName: 'user' })
class Project extends Model {}
Project.init({/* ... */}, { sequelize, modelName: 'project' })
 
// 好. 现在,事情变得更加复杂(对用户来说并不真实可见).
// 首先我们来定义一个 hasMany 关联
Project.hasMany(User, {as: 'Workers'})
```

这会将根据你的设置添加 `projectId` 或 `project_id` 属性到 User.Project 的实例将获得访问器 `getWorkers` 和 `setWorkers`. 

有时你可能需要在不同的列上关联记录,你可以使用 `sourceKey` 选项:

```js
class City extends Model {}
City.init({ countryCode: Sequelize.STRING }, { sequelize, modelName: 'city' });
class Country extends Model {}
Country.init({ isoCode: Sequelize.STRING }, { sequelize, modelName: 'country' });

// 在这里,我们可以根据国家代码连接国家和城市
Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});
```

到目前为止,我们解决了单向关联. 但我们想要更多！ 让我们通过在下一节中创建一个多对多的关联来定义它.

## 多对多关联

多对多关联用于将源与多个目标相连接. 此外,目标也可以连接到多个源.

```js
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
```

这将创建一个名为 UserProject 的新模型,具有等效的外键`projectId`和`userId`. 属性是否为`camelcase`取决于由表(在这种情况下为`User`和`Project`)连接的两个模型.

定义 `through` 为 **required**. Sequelize 以前会尝试自动生成名称,但并不总是导致最合乎逻辑的设置.

这将添加方法 `getUsers`, `setUsers`, `addUser`,`addUsers` 到 `Project`, 还有 `getProjects`, `setProjects`, `addProject`, 和 `addProjects` 到 `User`.

有时,你可能需要在关联中使用它们时重命名模型. 让我们通过使用别名(`as`)选项将 users 定义为 workers 而 projects 定义为t asks. 我们还将手动定义要使用的外键:

```js
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })
```

`foreignKey` 将允许你在 **through** 关系中设置 **source model** 键.

`otherKey` 将允许你在 **through** 关系中设置 **target model** 键.

```js
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'})
```

当然你也可以使用 belongsToMany 定义自我引用:

```js
Person.belongsToMany(Person, { as: 'Children', through: 'PersonChildren' })
// 这将创建存储对象的 ID 的表 PersonChildren.

```

#### 来源(Source)键 和 目标(Target)键

如果要创建不使用默认主键的 belongsToMany 关系,则需要进行一些设置工作.
你必须为 belongsToMany 的两端设置恰当的 `sourceKey` (`targetKey` 可选).此外,你还必须确保在关系中创建适合的索引.例如:

```js
const User = this.sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'user_id'
  },
  userSecondId: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    field: 'user_second_id'
  }
}, {
  tableName: 'tbl_user',
  indexes: [
    {
      unique: true,
      fields: ['user_second_id']
    }
  ]
});

const Group = this.sequelize.define('Group', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'group_id'
  },
  groupSecondId: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    field: 'group_second_id'
  }
}, {
  tableName: 'tbl_group',
  indexes: [
    {
      unique: true,
      fields: ['group_second_id']
    }
  ]
});

User.belongsToMany(Group, {
  through: 'usergroups',
  sourceKey: 'userSecondId'
});
Group.belongsToMany(User, {
  through: 'usergroups',
  sourceKey: 'groupSecondId'
});
```

如果你想要连接表中的其他属性,则可以在定义关联之前为连接表定义一个模型,然后再说明它应该使用该模型进行连接,而不是创建一个新的关联:

```js
class User extends Model {}
User.init({}, { sequelize, modelName: 'user' })
class Project extends Model {}
Project.init({}, { sequelize, modelName: 'project' })
class UserProjects extends Model {}
UserProjects.init({
  status: DataTypes.STRING
}, { sequelize, modelName: 'userProjects' })
 
User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })
```

要向 user 添加一个新 project 并设置其状态,你可以将额外的 `options.through` 传递给 setter,其中包含连接表的属性

```js
user.addProject(project, { through: { status: 'started' }})
```

默认情况下,上面的代码会将 projectId 和 userId 添加到 UserProjects 表中, _删除任何先前定义的主键属性_ - 表将由两个表的键的组合唯一标识,并且没有其他主键列. 要在 `UserProjects` 模型上强添加一个主键,你可以手动添加它.

```js
class UserProjects extends Model {}
UserProjects.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: DataTypes.STRING
}, { sequelize, modelName: 'userProjects' })
```

使用多对多你可以基于 **through** 关系查询并选择特定属性. 例如通过 **through** 使用`findAll`

```js
User.findAll({
  include: [{
    model: Project,
    through: {
      attributes: ['createdAt', 'startedAt', 'finishedAt'],
      where: {completed: true}
    }
  }]
});
```

当通过模型不存在主键时,Belongs-To-Many会创建唯一键. 可以使用 **uniqueKey** 选项覆盖此唯一键名.

```js
Project.belongsToMany(User, { through: UserProjects, uniqueKey: 'my_custom_unique' })
```

## 命名策略

默认情况下,Sequelize将使用模型名称(传递给`sequelize.define`的名称),以便在关联时使用模型名称. 例如,一个名为`user`的模型会将关联模型的实例中的`get / set / add User`函数和加入一个名为`.user`的属性,而一个名为`User`的模型会添加相同的功能,和一个名为`.User`的属性(注意大写U).

正如我们已经看到的,你可以使用`as`来关联模型. 在单个关联(has one 和 belongs to),别名应该是单数,而对于许多关联(has many)它应该是复数. Sequelize然后使用 [inflection][0] 库将别名转换为其单数形式. 但是,这可能并不总是适用于不规则或非英语单词. 在这种情况下,你可以提供复数和单数形式的别名:

```js
User.belongsToMany(Project, { as: { singular: 'task', plural: 'tasks' }})
// Notice that inflection has no problem singularizing tasks, this is just for illustrative purposes.
```

如果你知道模型将始终在关联中使用相同的别名,则可以在创建模型时提供它

```js
class Project extends Model {}
Project.init(attributes, {
  name: {
    singular: 'task',
    plural: 'tasks',
  },
  sequelize,
  modelName: 'project'
})

User.belongsToMany(Project);
```

这将为用户实例添加 `add/set/get Tasks` 方法.

记住,使用`as`来更改关联的名称也会改变外键的名称. 当使用`as`时,也可以指定外键是最安全的.


```js
Invoice.belongsTo(Subscription)
Subscription.hasMany(Invoice)
```

不使用 `as`,这会按预期添加 `subscriptionId`. 但是,如果你要发送`Invoice.belongsTo(Subscription, { as: 'TheSubscription' })`,那么你将同时拥有 `subscriptionId` 和 `theSubscriptionId`,因为 sequelize 不够聪明,无法确定调用是相同关系的两面. `foreignKey` 修正了这个问题;

```js
Invoice.belongsTo(Subscription, { as: 'TheSubscription', foreignKey: 'subscription_id' })
Subscription.hasMany(Invoice, { foreignKey: 'subscription_id' })
```

## 关联对象

因为 Sequelize 做了很多神奇的事,所以你必须在设置关联后调用 `Sequelize.sync`. 这样做将允许你进行以下操作:

```js
Project.hasMany(Task)
Task.belongsTo(Project)
 
Project.create()...
Task.create()...
Task.create()...
 
// 保存它们.. 然后:
project.setTasks([task1, task2]).then(() => {
  // 已保存!
})
 
// 好的,现在它们已经保存了...我怎么才能得到他们？
project.getTasks().then(associatedTasks => {
  // associatedTasks 是一个 tasks 的数组
})
 
// 你还可以将过滤器传递给getter方法.
// 它们与你能传递给常规查找器方法的选项相同.
project.getTasks({ where: 'id > 10' }).then(tasks => {
  // id大于10的任务
})
 
// 你也可以仅检索关联对象的某些字段.
project.getTasks({attributes: ['title']}).then(tasks => {
  // 使用属性“title”和“id”检索任务
})
```

要删除创建的关联,你可以调用set方法而不使用特定的ID:

```js
// 删除与 task1 的关联
project.setTasks([task2]).then(associatedTasks => {
  // 你将只得到 task2
})
 
// 删除全部
project.setTasks([]).then(associatedTasks => {
  // 你将得到空数组
})
 
// 或更直接地删除
project.removeTask(task1).then(() => {
  // 什么都没有
})
 
// 然后再次添加它们
project.addTask(task1).then(() => {
  // 它们又回来了
})
```

反之亦然你当然也可以这样做:

```js
// project与task1和task2相关联
task2.setProject(null).then(() => {
  // 什么都没有
})
```

对于 hasOne/belongsTo 与其基本相同:

```js
Task.hasOne(User, {as: "Author"})
Task.setAuthor(anAuthor)
```

可以通过两种方式添加与自定义连接表的关系的关联(继续前一章中定义的关联):

```js
// 在创建关联之前,通过向对象添加具有连接表模型名称的属性
project.UserProjects = {
  status: 'active'
}
u.addProject(project)
 
// 或者在添加关联时提供第二个options.through参数,其中包含应该在连接表中的数据
u.addProject(project, { through: { status: 'active' }})
 
 
// 关联多个对象时,可以组合上述两个选项. 在这种情况下第二个参数
// 如果没有提供使用的数据将被视为默认对象
project1.UserProjects = {
    status: 'inactive'
}
 
u.setProjects([project1, project2], { through: { status: 'active' }})
// 上述代码将对项目1记录无效,并且在连接表中对项目2进行active
```

当获取具有自定义连接表的关联的数据时,连接表中的数据将作为DAO实例返回:

```js
u.getProjects().then(projects => {
  const project = projects[0]
 
  if (project.UserProjects.status === 'active') {
    // .. 做点什么
 
    // 由于这是一个真正的DAO实例,你可以在完成操作之后直接保存它
    return project.UserProjects.save()
  }
})
```

如果你仅需要连接表中的某些属性,则可以提供具有所需属性的数组:

```js
// 这将仅从 Projects 表中选择 name,仅从 UserProjects 表中选择status
user.getProjects({ attributes: ['name'], joinTableAttributes: ['status']})
```

## 检查关联

你还可以检查对象是否已经与另一个对象相关联(仅 n:m). 这是你怎么做的

```js
// 检查对象是否是关联对象之一:
Project.create({ /* */ }).then(project => {
  return User.create({ /* */ }).then(user => {
    return project.hasUser(user).then(result => {
      // 结果是 false
      return project.addUser(user).then(() => {
        return project.hasUser(user).then(result => {
          // 结果是 true
        })
      })
    })
  })
})
 
// 检查所有关联的对象是否如预期的那样:
// 我们假设我们已经有一个项目和两个用户
project.setUsers([user1, user2]).then(() => {
  return project.hasUsers([user1]);
}).then(result => {
  // 结果是 true
  return project.hasUsers([user1, user2]);
}).then(result => {
  // 结果是 true
})
```

## 高级概念

### 作用域

本节涉及关联作用域. 有关关联作用域与关联模型作用域的定义, 请参阅 [作用域](scopes.md).

关联作用域允许你在关联上放置作用域(`get` 和 `create`的一组默认属性). 作用域可以放在关联模型(关联的目标)上,也可以放在n:m关系的中间表上.

#### 1:n

假设我们有模型 Comment,Post 和 Image. Comment可以通过 `commentableId` 和 `commentable` 与Image或Post相关联 - 我们称 Post 和 Image 为 `Commentable'

```js
class Post extends Model {}
Post.init({
  title: Sequelize.STRING,
  text: Sequelize.STRING
}, { sequelize, modelName: 'post' });

class Image extends Model {}
Image.init({
  title: Sequelize.STRING,
  link: Sequelize.STRING
}, { sequelize, modelName: 'image' });

class Comment extends Model {
  getItem(options) {
    return this[
      'get' +
        this.get('commentable')
          [0]
          .toUpperCase() +
        this.get('commentable').substr(1)
    ](options);
  }
}

Comment.init({
  title: Sequelize.STRING,
  commentable: Sequelize.STRING,
  commentableId: Sequelize.INTEGER
}, { sequelize, modelName: 'comment' });

Post.hasMany(Comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentable: 'post'
  }
});

Comment.belongsTo(Post, {
  foreignKey: 'commentableId',
  constraints: false,
  as: 'post'
});

Image.hasMany(Comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentable: 'image'
  }
});

Comment.belongsTo(Image, {
  foreignKey: 'commentableId',
  constraints: false,
  as: 'image'
});
```

`constraints: false,` 禁用引用约束 - 因为 `commentableId` 列引用了几个表,我们不能为它添加`REFERENCES` 约束. 请注意,Image -> Comment和Post -> Comment关系定义了一个作用域,分别是 `commentable: 'image'`和`commentable: 'post'`. 使用关联函数时,将自动应用此作用域:

```js
image.getComments()
// SELECT "id", "title", "commentable", "commentableId", "createdAt", "updatedAt" FROM "comments" AS
// "comment" WHERE "comment"."commentable" = 'image' AND "comment"."commentableId" = 1;

image.createComment({
  title: 'Awesome!'
})
// INSERT INTO "comments" ("id","title","commentable","commentableId","createdAt","updatedAt") VALUES
// (DEFAULT,'Awesome!','image',1,'2018-04-17 05:36:40.454 +00:00','2018-04-17 05:36:40.454 +00:00')
// RETURNING *;

image.addComment(comment);
// UPDATE "comments" SET "commentableId"=1,"commentable"='image',"updatedAt"='2018-04-17 05:38:43.948
// +00:00' WHERE "id" IN (1)
```

`Comment` 上的 `getItem` 实用函数完成了图片 - 它只是将`commentable`字符串转换为对`getImage`或`getPost`的调用,提供了 comment 是属于post还是image的抽象. 你可以将普通选项对象作为参数传递给`getItem(options)` 以指定 where 条件或包含的任何位置.

#### n:m

继续使用多态模型的概念,考虑一个标签表 - 一个项目可以有多个标签,标签可以与多个项目相关联.

为简洁起见,该示例仅显示Post模型,但实际上Tag将与其他几个模型相关.

```js
class ItemTag extends Model {}
ItemTag.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tagId: {
    type: Sequelize.INTEGER,
    unique: 'item_tag_taggable'
  },
  taggable: {
    type: Sequelize.STRING,
    unique: 'item_tag_taggable'
  },
  taggableId: {
    type: Sequelize.INTEGER,
    unique: 'item_tag_taggable',
    references: null
  }
}, { sequelize, modelName: 'item_tag' });

class Tag extends Model {}
Tag.init({
  name: Sequelize.STRING,
  status: Sequelize.STRING
}, { sequelize, modelName: 'tag' });

Post.belongsToMany(Tag, {
  through: {
    model: ItemTag,
    unique: false,
    scope: {
      taggable: 'post'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});

Tag.belongsToMany(Post, {
  through: {
    model: ItemTag,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});
```

请注意,作用域列(`taggable`)现在位于中间模型(`ItemTag`)上.

我们还可以定义一个更具限制性的关联,例如,通过应用中间模型(`ItemTag`)和目标模型(`Tag`)的作用域来获取post的所有待定tag:

```js
Post.belongsToMany(Tag, {
  through: {
    model: ItemTag,
    unique: false,
    scope: {
      taggable: 'post'
    }
  },
  scope: {
    status: 'pending'
  },
  as: 'pendingTags',
  foreignKey: 'taggableId',
  constraints: false
});

post.getPendingTags();
```

```sql
SELECT
  "tag"."id",
  "tag"."name",
  "tag"."status",
  "tag"."createdAt",
  "tag"."updatedAt",
  "item_tag"."id" AS "item_tag.id",
  "item_tag"."tagId" AS "item_tag.tagId",
  "item_tag"."taggable" AS "item_tag.taggable",
  "item_tag"."taggableId" AS "item_tag.taggableId",
  "item_tag"."createdAt" AS "item_tag.createdAt",
  "item_tag"."updatedAt" AS "item_tag.updatedAt"
FROM
  "tags" AS "tag"
  INNER JOIN "item_tags" AS "item_tag" ON "tag"."id" = "item_tag"."tagId"
  AND "item_tag"."taggableId" = 1
  AND "item_tag"."taggable" = 'post'
WHERE
  ("tag"."status" = 'pending');
```

`constraints: false` 禁用 `taggableId` 列的引用约束. 因为列是多态的,所以我们不能说它 `REFERENCES` 了一个特定的表.


### 用关联创建

如果所有元素都是新的,则可以在一个步骤中创建具有嵌套关联的实例.

#### BelongsTo / HasMany / HasOne 关联

考虑以下模型:

```js
class Product extends Model {}
Product.init({
  title: Sequelize.STRING
}, { sequelize, modelName: 'product' });
class User extends Model {}
User.init({
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
}, { sequelize, modelName: 'user' });
class Address extends Model {}
Address.init({
  type: Sequelize.STRING,
  line1: Sequelize.STRING,
  line2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
}, { sequelize, modelName: 'address' });

Product.User = Product.belongsTo(User);
User.Addresses = User.hasMany(Address);
// 也能用于 `hasOne`
```

可以通过以下方式在一个步骤中创建一个新的`Product`, `User`和一个或多个`Address`: 

```js
return Product.create({
  title: 'Chair',
  user: {
    firstName: 'Mick',
    lastName: 'Broadstone',
    addresses: [{
      type: 'home',
      line1: '100 Main St.',
      city: 'Austin',
      state: 'TX',
      zip: '78704'
    }]
  }
}, {
  include: [{
    association: Product.User,
    include: [ User.Addresses ]
  }]
});
```

这里,我们的用户模型称为`user`,带小写u - 这意味着对象中的属性也应该是`user`. 如果给`sequelize.define`指定的名称为`User`,对象中的键也应为`User`. 对于`addresses`也是同样的,除了它是一个 `hasMany` 关联的复数.

#### 用别名创建 BelongsTo 关联

可以将前面的示例扩展为支持关联别名.

```js
const Creator = Product.belongsTo(User, { as: 'creator' });

return Product.create({
  title: 'Chair',
  creator: {
    firstName: 'Matt',
    lastName: 'Hansen'
  }
}, {
  include: [ Creator ]
});
```

#### HasMany / BelongsToMany 关联

我们来介绍将产品与许多标签相关联的功能. 设置模型可能如下所示:

```js
class Tag extends Model {}
Tag.init({
  name: Sequelize.STRING
}, { sequelize, modelName: 'tag' });

Product.hasMany(Tag);
// 也能用于 `belongsToMany`.
```

现在,我们可以通过以下方式创建具有多个标签的产品:

```js
Product.create({
  id: 1,
  title: 'Chair',
  tags: [
    { name: 'Alpha'},
    { name: 'Beta'}
  ]
}, {
  include: [ Tag ]
})
```

然后,我们可以修改此示例以支持别名:

```js
const Categories = Product.hasMany(Tag, { as: 'categories' });

Product.create({
  id: 1,
  title: 'Chair',
  categories: [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' }
  ]
}, {
  include: [{
    association: Categories,
    as: 'categories'
  }]
})
```

***

[0]: https://www.npmjs.org/package/inflection
