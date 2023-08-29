

## Vue3.0数据(响应式)劫持原理

> Vue3.0使用Proxy替换`Object.defineProperty` 来实现数据响应式。
>  Proxy 是 ES6 中新增的功能，在我们访问对象前添加了一层拦截，来对对象进行操作

## 数据劫持

- getter  读取的时候，**返回**当前读取的属性值
- setter 修改的时候，将要新值**值赋**到当前修改属性值



## Vue2响应式原理

语法:

```javascript
Object.defineProperty(obj, prop, descriptor)
```

  - obj             要定义属性的对象。

  - prop           要定义或修改的属性的名称或 Symbol 。

  - descriptor 要定义或修改的属性描述符。

    - `get`

      属性 的 getter 函数，如果没有 getter，则为 `undefined`。（读取的时候obj.xx）**当访问该属性时，会调用此函数**。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的**返回值会被用作属性的值**。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

    - `set`

      属性的 setter 函数，如果没有 setter，则为 `undefined`。**当属性值被修改时，会调用此函数。**该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

```javascript
let Person ={}
let temp=null
Object.defineProperty(Person,'name',{
 get:function(){
     return '我是'+temp
 },
 set: function(val){
     temp=val
    }
})
Person.name="AA"
console.log(Person.naem) //我是AA
```

`Object.definePorperty` 只能对 **对象的已知属性** 进行操作，所有才会导致 没有在 data 中进行声明的对象属性直接赋值时无法触发视图更新，需要通过魔法（`$set`）来处理。而数组也应为是通过重新数组方法和遍历数组元素进行的响应式处理，也会导致按照数组下标进行赋值或者更改元素时无法触发视图更新。







### Proxy的作用

与 `Object,defineProperty` 比起来，有非常明显的优势：

- 拦截操作更加多样
- 拦截定义更加直接
- 性能更加高效

### 语法：

```js
let p = new Proxy(target, handler)
```

- **p 是代理对象**

- traget:需要添加被代理(拦截)的**引用数据类型(对象)**

  > vue3中`ref`进行声明的基本数据类型,都会在内部new一个新的对象来保存数据(封装成一个带有value属性的对象)

- handler：

  `Proxy` 支持的拦截方法包含一下内容：

  - `get(target, propKey, receiver)`：拦截对象属性的读取操作；
  - `set(target, propKey, value, receiver)`：拦截对象属性的赋值操作；
  - `apply(target, thisArg, argArray)`：拦截函数的调用操作；
  - `construct(target, argArray, newTarget)`：拦截对象的实例化操作；
  - `has(target, propKey)`：拦截 `in` 操作符；
  - `deleteProperty(target, propKey)`：拦截 `delete` 操作符；
  - `defineProperty(target, propKey, propDesc)`：拦截 `Object.defineProperty` 方法；
  - `getOwnPropertyDescriptor(target, propKey)`：拦截 `Object.getOwnPropertyDescriptor` 方法；
  - `getPrototypeOf(target)`：拦截 `Object.getPrototypeOf` 方法；
  - `setPrototypeOf(target, proto)`：拦截 `Object.setPrototypeOf` 方法；
  - `isExtensible(target)`：拦截 `Object.isExtensible` 方法；
  - `preventExtensions(target)`：拦截 `Object.preventExtensions` 方法；
  - `enumerate(target)`：拦截 `for...in` 循环；
  - `ownKeys(target)`：拦截 `Object.getOwnPropertyNames`、`Object.getOwnPropertySymbols`、`Object.keys`、`JSON.stringify` 方法。
  
  


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
console.log(obj.a) // 1   (读取原对象不触发监听)
console.log(p.a) // 1      读取对象的时候触发
console.log(p.c) //  读取对象的时候触发  我是自定义的一个结果
obj.name = '李白'; // (修改原对象不触发监听)
p.name = '李白';        //修改对象的时候触发
```

注意:  **操作原对象**无论读取还是修改都**不会触发拦截器**







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

