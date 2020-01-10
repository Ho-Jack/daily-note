# egg-validate

基于 [parameter](https://github.com/node-modules/parameter) 提供数据校验方法。

## 安装

```
$ npm i egg-validate --save
```

## 配置

```
// config/plugin.js
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
```

egg-validate 支持 parameter 的所有配置项，查看 [parameter 文档](https://github.com/node-modules/parameter) 获取配置项的更多信息。

```
// config/config.default.js
exports.validate = {
  // convert: false,
  // validateRoot: false,
};
```

## 使用方法

- `ctx.validate(rule[, data])`

### 默认验证请求 Body

```
const createRule = {
  name: 'string',
  age: 'int',
  gender: ['male', 'female', 'unknow'],
};

exports.create = function* () {
  // 校验失败自动返回 422 响应
  this.validate(createRule);
  // 可以传递自己处理过的数据，默认使用 this.request.body
  // this.validate(createRule[, your_data]);
  // 校验通过
  this.body = this.request.body;
};
```

如果验证失败，会返回：

```
HTTP/1.1 422 Unprocessable Entity

{
  "message": "Validation Failed",
  "errors": [
    {
      "field": "username",
      "code": "missing_field",
      "message": "username required"
    }
  ]
}
```

### addRule

- `app.validator.addRule(rule, checker)`

validate 除了在 `context` 上增加了 validate 方法外，还在 `application` 上增加了一个 `validator` 对象， 可以通过 `app.validator.addRule(rule, checker)` 增加自定义的检查类型。

- `app.js`

```
module.exports = app => {
  app.validator.addRule('json', (rule, value) => {
    try {
      JSON.parse(value);
    } catch (err) {
      return 'must be json string';
    }
  });
};
```

- 然后在 controller 中使用

```
const createRule = {
  username: {
    type: 'email',
  },
  password: {
    type: 'password',
    compare: 're-password'
  },
  addition: {
    required: false,
    type: 'json' // 自定义的 json 类型
  },
};

exports.create = function* () {
  this.validate(createRule);
  this.body = this.request.body;
};
```



以下是paramer的文档



#### int

If type is `int`, there has tow addition rules:

- `max` - The maximum of the value, `value` must <= `max`.
- `min` - The minimum of the value, `value` must >= `min`.

Default `convertType` is `int`.

**Note: default convertType will only work when options.convert set to true in parameter's constructor.**

#### integer

Alias to `int`.

#### number

If type is `number`, there has tow addition rules:

- `max` - The maximum of the value, `value` must <= `max`.
- `min` - The minimum of the value, `value` must >= `min`.

Default `convertType` is `number`.

#### date

The `date` type want to match `YYYY-MM-DD` type date string.

Default `convertType` is `string`.

#### dateTime

The `dateTime` type want to match `YYYY-MM-DD HH:mm:ss` type date string.

Default `convertType` is `string`.

#### datetime

Alias to `dateTime`.

#### id

The `id` type want to match `/^\d+$/` type date string.

Default `convertType` is `string`.

#### boolean

Match `boolean` type value.

Default `convertType` is `boolean`.

#### bool

Alias to `boolean`

#### string

If type is `string`, there has four addition rules:

- `allowEmpty`(alias to `empty`) - allow empty string, default to false. If `rule.required` set to false, `allowEmpty` will be set to `true` by default.
- `format` - A `RegExp` to check string's format.
- `max` - The maximum length of the string.
- `min` - The minimum length of the string.
- `trim` - Trim the string before check, default is `false`.

Default `convertType` is `string`.

#### email

The `email` type want to match [RFC 5322](http://tools.ietf.org/html/rfc5322#section-3.4) email address.

- `allowEmpty` - allow empty string, default is false.

Default `convertType` is `string`.

#### password

The `password` type want to match `/^$/` type string.

- `compare` - Compare field to check equal, default null, not check.
- `max` - The maximum length of the password.
- `min` - The minimum length of the password, default is 6.

Default `convertType` is `string`.

#### url

The `url` type want to match [web url](https://gist.github.com/dperini/729294).

Default `convertType` is `string`.

#### enum

If type is `enum`, it requires an addition rule:

- `values` - An array of data, `value` must be one on them. ***this rule is required.***

#### object

If type is `object`, there has one addition rule:

- `rule` - An object that validate the properties ot the object.

#### array

If type is `array`, there has four addition rule:

- `itemType` - The type of every item in this array.
- `rule` - An object that validate the items of the array. Only work with `itemType`.
- `max` - The maximun length of the array.
- `min` - The minimun lenght of the array.

#### abbr

- `'int'` => `{type: 'int', required: true}`
- `'int?'` => `{type: 'int', required: false }`
- `'integer'` => `{type: 'integer', required: true}`
- `'number'` => `{type: 'number', required: true}`
- `'date'` => `{type: 'date', required: true}`
- `'dateTime'` => `{type: 'dateTime', required: true}`
- `'id'` => `{type: 'id', required: true}`
- `'boolean'` => `{type: 'boolean', required: true}`
- `'bool'` => `{type: 'bool', required: true}`
- `'string'` => `{type: 'string', required: true, allowEmpty: false}`
- `'string?'` => `{type: 'string', required: false, allowEmpty: true}`
- `'email'` => `{type: 'email', required: true, allowEmpty: false, format: EMAIL_RE}`
- `'password'` => `{type: 'password', required: true, allowEmpty: false, format: PASSWORD_RE, min: 6}`
- `'object'` => `{type: 'object', required: true}`
- `'array'` => `{type: 'array', required: true}`
- `[1, 2]` => `{type: 'enum', values: [1, 2]}`
- `/\d+/` => `{type: 'string', required: true, allowEmpty: false, format: /\d+/}`