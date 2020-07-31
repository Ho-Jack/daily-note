### ES5例子：

```js
function Person(obj) {
	this.name = obj.name
	this.age= obj.age
    //方法
     this.toString = function () {
       return '(' + this.name + ', ' + this.age + ')';
 };
}
// 原型方法
Person.prototype.say = function() {
  console.log('你好,', this.name )
}
// p为实例化对象，new Person()这个操作称为构造函数的实例化
let p = new Person({name: '番茄', age: '27'})
console.log(p.name, p.age)
p.say()
```

### ES6例子：

```js
class Person{
	constructor(obj) {
  	     this.name = obj.name
	     this.age= obj.age
  }
  say() {
  	console.log(this.name)
  }
}

let p = new Person({name: 'ES6-番茄', age: '27'})
console.log(p.name, p.age)
p.say()
```



### ·寄生组合继承

```js
function Person(obj) {
    this.name = obj.name
    this.age = obj.age
}
Person.prototype.add = function(value){
    console.log(value)
}
var p1 = new Person({name:"番茄", age: 18})

function Person1(obj) {
    Person.call(this, obj)
    this.sex = obj.sex
}
// 这一步是继承的关键
Person1.prototype = Object.create(Person.prototype)
Person1.prototype.play = function(value){
    console.log(value)
}
var p2 = new Person1({name:"鸡蛋", age: 118, sex: "男"})
```

> **`Object.create()`**方法创建一个新对象，使用现有的对象来提供新创建的对象的  `__proto__` 。
>
> (用 `Object.create`实现类式继承)

### ·组合继承（组合构造和原型方式实现继承）

使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。

```js
// 老版本
function User(name, pass) {
    this.name = name;
    this.pass = pass;
}
User.prototype.showName = function () {
    console.log(this.name);
};
User.prototype.showPass = function () {
    console.log(this.pass);
};
var u1 = new User('able', '1233');
u1.showName();
u1.showPass();
// 老版本继承
function VipUser(name, pass, level) {
//继承属性    
 User.call(this, name, pass);
//新属性    
this.level = level;
}
//继承方法
//console.log(person.__proto__ === Person.prototype); // true
//console.log(Person.prototype.constructor == Person) // true
VipUser.prototype = new User()  
VipUser.prototype.constructor = VipUser;

VipUser.prototype.showLevel = function () {
    console.log(this.level);
};
var v1 = new VipUser('blue', '1234', 3)
v1.showName();
v1.showLevel();
```



ES6 引入了Class（类）这个概念，通过class关键字可以定义类。
新版面向对象

-  有了 class 关键字、构造器constructor
-  class 里面直接加方法
-  继承extends
-  super 超(子)类==父类  (调用父类的属性或方法,代表父类的构造函数)

```js
//定义类
class User {
    constructor(name, pass) {//constructor是一个构造方法，用来接收参数
        this.name = name;    //this代表的是实例对象
        this.pass = pass;
    }
//这是一个类的方法，注意千万不要加上function
    showName() {
        console.log(this.name);
    }
    showPass() {
        console.log(this.pass);
    }
}
var u1 = new User('able2', '111')
u1.showName()
u1.showPass()
// 新版本继承
class VipUser extends User {
    constructor(name, pass, level) {
        super(name, pass) //调用父类的 constructor(name,pass)
        this.level = level
    }
    showLevel(){
        console.log(this.level)
    }
}

v1 = new VipUser('blue', '123', 3)
v1.showLevel()
```







**构造函数特点：**

1.构造函数有原型对象prototype。

2.构造函数原型对象prototype里面有constructor，指向构造函数本身。

3.构造函数可以通过原型对象添加方法。

4.构造函数创建的实例对象有__proto__原型，指向构造函数的原型对象。

**类：**

1.class本质还是function

2.类的所有方法都定义在类的prototype属性上

3.类创建的实例，里面也有__proto__指向类的prototype原型对象

4.新的class写法，只是让对象原型的写法更加清晰，更像面向对象编程的语法而已。

5.ES6的类其实就是语法糖。



