### es6中class类的全方面理解

> JavaScript语言的传统方法是通过构造函数，定义并生成新对象。

传统的javascript中只有对象，没有类的概念。它是基于原型的面向对象语言。原型对象特点就是将自身的属性共享给新对象。



如果要生成一个对象实例，需要先定义一个构造函数，然后通过new操作符来完成。

构造函数示例：

```js
//函数名和实例化构造名相同且大写（非强制，但这么写有助于区分构造函数和普通函数）
function Person(name,age) {
    this.name = name;
    this.age=age;
}
Person.prototype.say = function(){
    return "我的名字叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new Person("AA",66);//通过构造函数创建对象，必须使用new 运算符
console.log(obj.say());//我的名字叫 AA 今年66岁了
```

> - 类和构造函数一样
>
> - 属性和方法分开写的

构造函数生成实例的执行过程：

```text
1.当使用了构造函数，并且new 构造函数(),后台会隐式执行new Object()创建对象;
2.将构造函数的作用域给新对象，（即new Object()创建出的对象），而函数体内的this就代表new Object()出来的对象。
3.执行构造函数的代码。
4.返回新对象（后台直接返回）;
```



##### ES6 引入了Class（类）这个概念，通过class关键字可以定义类。

> 新版面向对象
>
> 有了 class 关键字、构造器constructor
>
> class 里面直接加方法
>
> 继承extends，super 超类==父类

```js
class Person{//定义了一个名字为Person的类
    constructor(name,age){//constructor是一个构造方法，用来接收参数
        this.name = name;//this代表的是实例对象
        this.age=age;
    }
    say(){//这是一个类的方法，注意千万不要加上function
        return "我的名字叫" + this.name+"今年"+this.age+"岁了";
    }
}
var obj=new Person("AA",88);
console.log(obj.say());//我的名字叫AA今年88岁了
```



类实质上就是一个函数。类自身指向的就是构造函数。(ES6中的类其实就是构造函数的另外一种写法！)

> 类的数据类型就是函数，类本身就指向构造函数

```js
console.log(typeof Person);//function
console.log(Person===Person.prototype.constructor);//true
```



实际上类的所有方法都定义在类的prototype属性上。

```jsx
Person.prototype.say=function(){//定义与类中相同名字的方法。成功实现了覆盖！
    return "我是来证明的，你叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new Person("AA",88);
console.log(obj.say());//我是来证明的，你叫AA今年88岁了
```



当然也可以通过prototype属性对类添加方法

```jsx
Person.prototype.addFn=function(){
    return "我是通过prototype新增加的方法,名字叫addFn";
}
var obj=new Person("AA",88);
console.log(obj.addFn());//我是通过prototype新增加的方法,名字叫addFn
```



通过Object.assign方法来为对象动态增加方法

```jsx
Object.assign(Person.prototype,{
    getName:function(){
        return this.name;
    },
    getAge:function(){
        return this.age;
    }
})
var obj=new Person("laotie",88);
console.log(obj.getName());//laotie
console.log(obj.getAge());//88
```



constructor方法是类的构造函数的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

```jsx
class Box{
    constructor(){
        console.log("当Box实例化，将自动执行");//当实例化对象时该行代码会执行。
    }
}
var obj=new Box();
```

在类的实例上面调用方法，其实就是调用原型上的方法。

```js
class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
```

### 类的实例对象  

 必须通过new关键字来实例

与ES5一样，实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。

```js
 //定义类
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }

    var point = new Point(2, 3);

    point.toString() // (2, 3)
    point.hasOwnProperty('x') // true
    point.hasOwnProperty('y') // true
    point.hasOwnProperty('toString') // false
    Point.hasOwnProperty('toString')   // false 
    point.__proto__.hasOwnProperty('toString') // true
    point.prototype.hasOwnProperty('toString') // true
    Point.__proto__.hasOwnProperty('toString') // true
    Point.prototype.hasOwnProperty('toString') // true
```

上面代码中，`x`和`y`都是实例对象`point`自身的属性（因为定义在`this`变量上），所以`hasOwnProperty`方法返回`true`，而`toString`是原型对象的属性（因为定义在`Point`类上），所以`hasOwnProperty`方法返回`false`。这些都与ES5的行为保持一致。



与ES5一样，类的所有实例共享一个原型对象。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__     //true
```

上面代码中，`p1`和`p2`都是Point的实例，它们的原型都是Point.prototype，所以`__proto__`属性是相等的。

这也意味着，可以通过实例的`__proto__`属性为Class添加方法。

```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

上面代码在`p1`的原型上添加了一个`printName`方法，由于`p1`的原型就是`p2`的原型，因此`p2`也可以调用这个方法。而且，此后新建的实例`p3`也可以调用这个方法。这意味着，使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变Class的原始定义，影响到所有实例。