# [nodejs中的bcryptjs密码加密](https://segmentfault.com/a/1190000008841988)



## bcryptjs密码加密

bcryptjs是一个第三方密码加密库，是对原有bcrypt的优化，优点是不需要安装任何依赖

[npmjs地址](https://www.npmjs.com/package/bcryptjs)



### 引入bcryptjs库

```shell
npm install bcryptjs
```

```js
var bcrypt = require('bcryptjs');
```

### 同步用法(Sync)

生成hash密码

```js
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("123456", salt);
 .......// 将hash存入数据库
```

密码验证

```js
 ....//从数据库里读取密码的哈希值作为第二个参数，第一个参数为密码明文
bcrypt.compareSync("123456", hash); // true 
bcrypt.compareSync("111111", hash); // false 
```

快速生成hash值

```js
var hash = bcrypt.hashSync('bacon', 8);
```

### 异步用法(Async)

生成hash密码

```js
var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("123456", salt, function(err, hash) {
      // 将hash存入数据库 
    });
});
```

密码验证

```js
// 将密码与数据库的哈希密文比较
bcrypt.compare("123456", hash, function(err, res) {
    // res === true 
});
bcrypt.compare("not_bacon", hash, function(err, res) {
    // res === false 
});
 
//es6
bcrypt.compare("123456", hash).then((res) => {
    // res === true 
});
```

快速生成hash值

```
bcrypt.hash('bacon', 8, function(err, hash) {
});
```