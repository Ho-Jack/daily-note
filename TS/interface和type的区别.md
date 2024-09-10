```

 
//定义两个不同的接口类型
interface Dog {
  name: string
}
interface Cat {
  age: number
}
 
// 1、联合类型
 type animal = Dog | Cat
 
// 元组
 type animal = [Dog,Cat]
 
// 2、扩展性
// 接口可以extends implements，从而可以扩展多个接口或者类，类型没有扩展功能只能交叉合并
interface Person {
    name:string
}
interface User extends Person{
    age:number
}
 
// 3、type类型 & type类型
 type Person = {name:string}
 type User = Person & {age:number}
 
// 4、interface类型 & type类型
 interface Person{
     name:string
 }
 type User = {age:number}& Person
 
// 5、合并申明
// 定义相同名称的interface，或者相同名称的type合并的情况
 interface Person{
     name:string
 }
 interface Person{
     age:number
 }
 
//type定义相同报错
 type User = {name:string}
 type User = {age:number}
// 标识符“User”重复
 
// 6、:type 可以获取typeof返回的类型作为值
 let div = document.getElementById('add')
 type addDom = typeof div
```



# Type和Interface

- interface 只是定义结构契约，定义具有相似的名称和类型的对象，还可以定义函数，接口，类

- type （alias）**类型别名** 





### type 类型的别名

```ts
type userName = string; // 基本类型
type userId = string | number; // 联合类型
type arr = number[]; 
type Tuple =  [number,string] //元组

// 对象类型
type Person = {
    id: userId; // 可以使用定义类型
    name: userName;
    age: number;
    gender: string;
    isWebDev: boolean;
};
// 泛型
type Tree<T> = { value: T };

const user: Person = {
    id: "901",
    name: "椿",
    age: 22,
    gender: "女",
    isWebDev: false,
};

const numbers: arr = [1, 8, 9];

```

### type高级用法

##### 字面量类型

```ts
type Name = "TS";
const name1: Name = "test"; // error 不能将类型"test"分配给类型"TS"
const name2: Name = "TS";

```





## 区别


  interface只能定义对象类型，

  type可以定义基础类型，联合类型，交叉类型

### 1.type定义基本类型别名

`type`可以定义**基本类型别名**, 但是`interface`无法定义,如：

```
type userName = string
type stuNo = number
...

```



### 2. type声明联合类型

`type`可以声明**联合类型**, 例如：

```
type Student = {stuNo: number} | {classId: number}
```

### 3.  type声明元组

type可以声明 **元组类型**：

```
type Data = [number, string];
```

### 4.interface 声明合并

多次声明一个同名的接口，TypeScript 会将它们合并到一个声明中

```ts
interface Person { name: string }
interface Person { age: number }

let user: Person = {
    name: "Tolu",
    age: 0,
};

```

如果是`type`的话，重复使用`Person`是会报错的：

```ts
type Person { name: string }; 

// Error: 标识符“Person”重复。ts(2300)
type Person { age: number }

```









## 该用 type 还是 interface ？

> interface使用优先级更高:能用 interface 的地方就用 interface，否则用 type;

- interface: 对象
- type:函数