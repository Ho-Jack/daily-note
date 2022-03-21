#### `typeof`

> 判断类型 （有局限性，无法判断Array和Object、null）
>
> `typeof []  === 'Object'`
>
> `typeof {}  === 'Object'`
>
> `typeof null === 'Object'`

#### `instanceof  `

> 判断对象  `A  instanceof  B  ` （A是否B 的实例，B为对象）  

#### `obj.hasOwnProperty() `

> 判断当前的对象是否包含某一个属性  `obj.hasOwnProperty("name")`
>
> 会向原型链上找

#### in  

> 判断当前的对象是否包含某一个属性  "name" in  obj



`Object.prototype.toString.call()`

>所有原始数据类型都是能判断的，还有 **Error 对象，Date 对象**等
>
>`Object.prototype.toString.call({})`===  '[object object]'
>
>`Object.prototype.toString.call([])` ===  '[object Array]'
>
>`Object.prototype.toString.call(null)` ===  '[object Null]'



## 判断对象中是否有某属性

> 所有判断的条件，**前提是，被判断的变量是一个对象**。可以是空对象{}，但是如果是undefined或者null,都会报错

### 1、 点( . )或者方括号( [ ] )

```javascript
let obj ={name:'aaa'}
//获取已有的属性
obj.name       //  'aaa'
obj['name']    //  'aaa'

//获取不存在的属性
obj.age           //undefined
obj['age']        //undefined
```

因此判断对象是否有某属性可以：

```javascript
obj.age    !==undefined
obj['age'] !==undefined 
//  这种方法是有问题的，因为 age这个属性对应的值可以是undefined
//  let obj ={name:'aaa',age:undefined}
```



### 2、  in 运算符 

> 如果指定的属性在指定的`对象`或其`原型链`中，则**`in` 运算符**返回`true`。

```javascript
let obj ={
   name:'aaa',
   age:undefined
}
'name' in  obj   //true
'age'  in  obj   //true
'job'  in  obj   //false
'toString' in obj    //true    原型链上的属性
```

obj对象属性值为undefined的属性，也能正确判断

但是原型链上有的属性也是能被判断的！

### 3、 hasOwnProperty()

> 适用于只判断自身属性的场景

```javascript
let obj ={
   name:'aaa',
   age:undefined
}
 obj.hasOwnProperty('name')        //true
 obj.hasOwnProperty('age')         //true
 obj.hasOwnProperty('job')         //false
 obj.hasOwnProperty('toString')    //false    原型链上的属性
```



### 经常犯的错误

1、在非对象中使用 `运算符in`  和 `hasOwnProperty()`

```javascript
let obj=undefined
'name'  in obj   
//Uncaught TypeError: Cannot use 'in' operator to search for 'name' in undefined
obj.hasOwnProperty('name')
//Uncaught TypeError: Cannot read properties of undefined (reading 'hasOwnProperty')
```

