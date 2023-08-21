 interface 只是定义结构契约，定义具有相似的名称和类型的对象，还可以定义函数，接口，类
 type （alias）类型别名 interface只能定义对象类型，而type可以定义基础类型，联合类型，交叉类型

//定义两个不同的接口类型

```typescript
interface Dog {
  name: string
}
interface Cat {
  age: number
}
```



1、联合类型

```typescript
type animal = Dog | Cat
```



// 元组

```typescript
 type animal = [Dog,Cat]
```



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
————————————————
版权声明：本文为CSDN博主「wy勇敢的心」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wangyun_gogo/article/details/120081395







## 该用 type 还是 interface ？

> interface使用优先级更高:能用 interface 的地方就用 interface，否则用 type;

- interface: 对象
- type:函数