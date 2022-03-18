

## Vue3.0数据(响应式)劫持原理

> Vue3.0使用Proxy替换`Object.defineProperty` 来实现数据响应式。
>  Proxy 是 ES6 中新增的功能，在我们访问对象前添加了一层拦截，来对对象进行操作



### Proxy的作用

对于代理模式`Proxy`的作用主要体现在三个方面:

- 拦截和监视外部对对象的访问

- 降低函数或类的复杂度

- 在复杂操作前对操作进行校验或对所需资源进行管理

### 语法：

```javascript
Object.defineProperty(obj, prop, descriptor)
```

```js
let p = new Proxy(target, handler)
```

- **p 是代理对象**，如果有p对象，则 `let p = new Proxy(target, handler)`

- traget:需要添加被代理(拦截)的对象

- handler：操作被拦截对象，可以用来自定义 `set` （修改对象的时候触发）或者 `get`(读取对象的时候触发) 函数。

  handler`本身就是ES6所新设计的一个对象.它的作用就是用来**自定义代理对象的各种可代理操作**。它本身一共有13中方法,每种方法都可以代理一种操作.其13种方法如下:

  ```javascript
  handler.get(target, key, value)
  // 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。
  
  handler.set(target, key, value)
  // 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。
  
  handler.getPrototypeOf()
  // 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。
  
  handler.setPrototypeOf()
  // 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。
  
  handler.isExtensible()
  // 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。
  
  handler.preventExtensions()
  // 在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时。
  
  handler.getOwnPropertyDescriptor()
  // 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。
  
  handler.defineProperty()
  // 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。
  
  handler.has()
  // 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。
  
  handler.deleteProperty()
  // 在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。
  
  handler.ownKeys()
  // 在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。
  
  handler.apply()
  // 在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时。
  
  handler.construct()
  // 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时。
  ```


### 示例：

```js
const p = new Proxy(obj, {
  get(target, key, value) {
      console.log("读取对象的时候触发");
    if (key === 'c') {
      return '我是自定义的一个结果';
    } else {
      return target[key];
    }
  },

  set(target, key, value) {
    console.log("修改对象的时候触发");
    if (value === 4) {
      target[key] = '我是自定义的一个结果';
    } else {
      target[key] = value;
    }
  }
})
console.log(obj.a) // 1
console.log(p.a) // 1      读取对象的时候触发
console.log(p.c) //  读取对象的时候触发  我是自定义的一个结果
obj.name = '李白';
p.name = '李白';        //修改对象的时候触发
```



### 数据响应实例:

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2

```

