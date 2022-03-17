## Symbol 标记

> 标记,永远不相等，解决属性名冲突问题

### 值独一无二，永不相等

```javascript
const symbol1 = Symbol('my symbol');
const symbol2 = Symbol('my symbol');

symbol1 === symbol2; // false
console.log(symbol1); // 'Symbol(my symbol)'
```

### symbols 作为对象的属性

> 防止属性值被覆盖
>
> 更像对象私有属性，`Object.keys()`无法获取，`Reflect.ownKeys()`可获取Symbol属性

```javascript
const objName = Symbol('objName')
const obj ={
   [objName]:  'objValue',
   publicName: 'publicValue'
}
console.log( Reflect.ownKeys(obj) )  // ['publicName', Symbol(objName)]
console.log( objName in obj);        // true
console.log(obj[Reflect.ownKeys(obj)[1]]); // objValue
```

