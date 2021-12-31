## 可选链 操作符（?. 与 ??）

###  ?.

> `?.`允许读取位于连接对象链深处的属性值,而不必明确验证链中的每个引用是否有效。

```javascript
let nestedProp = obj.first && obj.first.second;
// 等价于
let nestedProp = obj.first?.second;
```

总结：js会在尝试访问`obj.first.second`之前隐式的检查并确定`obj.first`既不是`null`也不是`undefined`。如果`obj.first`是`null`或者`undefined`,表达式将会短路计算直接返回`undefined`

```javascript
const obj={}
  if(obj){   console.log('非空') } //if 是不能够判断对象是否为空的
  Object.keys(obj).length>0       //ES6这个方法可以判断对象为空
  JSON.stringify(obj)==='{}'      //JS这个方法可以判断对象为空
  const name = obj && obj.name;   //undefined
  const name = obj?.name          //空对象时会报错
```

疑问： && 左边的对象是否有判空的功能

 应该并不能，为空对象时，还是会走后面的逻辑，需要注意一下

### 总结： `obj?.name`  必须保证obj这个对象已定义！要不js将报错 

### ??

>空值合并操作符,可以在使用可选链时设置一个默认值
>
>只有当左侧为null和undefined时，才会返回右侧的数

```javascript
let user = {name:'aaa'};
let userAge = user?.age ?? "18";
console.log(userAge); // 18
```

示例： 输入框非空判断

```javascript
if(value !== null && value !== undefined && value !== ''){
    //...
}
```



```javascript
if(value??'' !== ''){    // value??''    !== ''
  //...
}
```

