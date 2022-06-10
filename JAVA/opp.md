## 类和对象

### 面向对象和面向过程的思想对比

- 面向过程编程(Procedure Oriented Programming)：是一种以**过程**为中心的编程思想，实现功能的每一步，都是*自己实现*的

- 面向对象编程(Object Oriented Programming)：是一种以**对象**为中心的编程思想，通过*指挥对象实现*具体的功能

  对象：指客观存在的事物 *（万物皆对象）*

### 成员变量和局部变量的区别

- 成员变量：定义在类中，有初始值
- 局部变量：定义在方法中，无初始值

### 静态变量（类变量）相当于全局变量

- 用static修饰的变量叫静态变量也叫**类变量**

  用static修饰的方法叫静态方法也叫**类方法**

- 修饰代码块叫静态块（先于main之前调用，先块后main）

  可以直接通过类名直接调用 也可以 用对象调用，但是推荐类名调用

- 静态方法中只能调用静态变量

  非静态方法中不能定义静态变量

![img](https://pic4.zhimg.com/80/v2-ab0d866545a9ede5d7e94de1da5901ff_720w.jpg)

### 类和对象

- 类是对现实生活中一类具有**共同属性**和**行为**的事物的抽象

  【类】是对事物，也就是对象的一种*描述*，可以将类理解为一张设计图，根据设计图，可以创建出具体存在的事物

- 类的组成

  - 属性：该事物的各种特征
  - 行为：该事物存在的功能（能够做的事情）

- 对象：是能够看得到摸得着的真实存在的实体

> 类是对对象的描述
>
> 对象是类的实体
>
> 一个类可以创建出多个对象

#### 类的定义

##### 类的组成：**属性**和**行为**

- 属性：在代码中通过**成员变量**来体现（类中方法外的变量）
- 行为：在代码中通过**成员方法**来体现（和前面的方法相比去掉static关键字即可）

##### 类的定义步骤:

1. 定义类

2. 编写类的成员变量

3. 编写类的成员方法

```java
public class 类名{
    // 成员变量
    变量1的数据类型 变量1;
    String name;		// 未赋值默认null
    变量2的数据类型 变量2;
    int age;			// 未赋值默认0
    ......
    // 成员方法
    方法1;
    public void study(){
        System.out.println("学习");
    }
    方法2;
    ......
}

```

#### 对象的创建和使用

- 创建对象

  格式：`类名 对象名 = new 类名();`

- 使用对象

  使用成员变量：`对象名.变量名`

  使用成员方法：`对象名.方法名();`

- 案例

```java
// 需求：定义一个类，然后定义一个手机测试类，在手机测试类中通过对象完成成员变量和成员方法的使用
public class Phone{
  // 成员变量：品牌、价格、....
  String brand;
  int price;
  // 成员方法：打电话、发短信、....
  public void call(String name){
      System.out.println("给" + name + "打电话");
  }
  public void sendMessage(){
      System.out.println("群发短信");
  }
}

```

------

## 对象内存图

- 单个对象内存图

![单个对象内存图.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a547966cff94f6cb833ee6cfa8bc103~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

- 两个对象内存图

![两个对象内存图.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d61e8f76ccfc41a29cd9492c65daa322~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

- 两个引用指向同一对象内存图

  - 垃圾回收

    注意：当堆内存中，**对象**或**数组**产生的地址，通过任何方式都*不能被找到*后，就会被判定为内存中的 *“垃圾”*

    垃圾会被*Java垃圾回收器*，空闲的时候自动进行清理

- 成员变量和局部变量

  - 成员变量：类中方法外的变量；存放于堆内存；随着对象的存亡而存亡；有默认的初始化值
  - 局部变量：方法中的变量；存放于栈内存；随着方法调用存在，方法调用完毕结束；无默认初始化值，必须先定义、赋值再使用

------

## 封装

>  所谓封装就是指**对外部不可见**。封装后的属性无法直接访问
>
>  可见度：**private**
>
>  访问封装属性要使用**`setter`**和**`getter`**方法，在各个程序中，反射机制都会利用这两个设置和取得属性内容。

### 封装格式：

#### 属性封装：

```java
private 属性类型  类型名称;
```

#### 方法封装：

````java
private 方法返回值  方法名称（参数列表）{ }
````



#### private关键字：

> 权限修饰符，可以用来修饰成员，来提高数据的安全性

特点：只能在**本类**当中进行访问，外界需要访问可以定义方法来进行**setter设置值**和**getter获取值**

针对private修饰的成员变量，如果需要被其他类引用，提供相应的操作

- 提供**`get变量名();`**方法，用于获取成员变量的值，方法用**public**修饰
- 提供**`set变量名();`**方法，用于设置成员变量的值，方法用**public**修饰

```java
// 新建Student类
public class Student{
  private String name;
  private int age;

  public void setName(String n){
      name = n;
  }
  public String getName(){
      return name;
  }
  public void setAge(int a){
      age = a;
  }
  public int getAge(){
      return age;
  }
  public void show(){
      System.out.println(name + age);
  }
}

```

- **this**关键字：可以调用本类的成员（变量，方法），解决局部变量和成员变量重名问题

  局部变量和成员变量如果重名，Java使用的是就近原则

  `this`代表所在类的对象引用，方法被哪个对象调用，this就代表哪个对象

```java
public class Student{
  private int age;
  public void method(int age){
      this.age = age;			// 添加this关键字，使前一个age成为成员变量，再将局部变量age赋值过去
  }
}
```

- this内存原理





### 封装总结

  - 面向对象三大特征之一（**封装**、**继承**、**多态**）
  - 隐藏实现细节，仅对外暴露公共的访问方式（类似于插线板）
  - 常见体现：
    1. 将**代码**抽取到**方法**中，是对**代码**的一种封装；将**属性**抽取到**类**中，是对**数据**的一种封装

    2. 私有的成员变量，提供setXxx和getXxx方法
#### 好处
- 提高了代码的安全性
- 提高了代码的复用性

------



## 构造方法

> 方法名和类名相同，没有返回值类型

- 构建、创造对象的时候，所调用的方法
- 格式：`[可见度] 类名 () { }`

#### 构造方法的注意事项：

> - 如果没有定义构造方法，系统将给出一个**默认的无参数的构造方法**
> - 如果定义了构造方法，系统将不再提供默认的构造方法

  1. 方法名与类名相同，大小写也要一致

  2. 没有返回值类型，连void也没有

  3. 没有具体的返回值（不能由return带回结果数据）

  4. 构造方法包含无参构造和有参构造

     
#### 语法：	` [可见度]  类名(){}`

```java
public class Myclass{
    //构造方法，不能被主动调用，在类实例的时候自动调用
    public Myclss(){
              System.out.println("这是Myclss类的构造方法");
    }
}
```
#### 执行时机：

1. 创建对象的时候调用，每创建一次对象，就会执行一次构造方法
2. **不能手动调用**构造方法

#### 作用：对象的属性初始化

1. 实例化对象
2. 给成员变量赋值

```java
class Student{
  private int age;
  public Student(int age){
      this.age = age;
  }
}
```

#### 标准类的代码编写和使用

```java
/*
    JavaBean类：封装数据的类
*/
public class Student{
  // 私有变量
  private String name;
  private int age;

  // 无参数构造方法
  public Student(){}
  //有参数构造方法
  public Student(String name, int age){
      this.name = name;
      this.age = age;
  }

  //set/get方法
  public void setName(String name){
      this.name = name;
  }

  public String getName(){
      return name;
  }

  public void setAge(int age){
      this.age = age;
  }

  public String getAge(){
      return age;
  }
}
```

## 接口

#### 接口的定义(interface)：

- 是一种强制性（完全）的规范。 接口不是一个类，
- 定义一系列的属性（静态常量）和方法（抽象方法）

#### 定义语法：

```java
[可见度] interface 接口名称 [extends 其他的接口名] {
        // 声明变量
        // 抽象方法
        public abstract 方法返回类型 方法名();
        //public和abstract是可以省略的
        方法返回类型 方法名();  
}
```

#### 实现语法：

```java
...implements 接口名称[, 其他接口名称, 其他接口名称..., ...] ...
    
public class 类名 implements 需要实现的接口名{
  //重写所有抽象方法
}
```



#### 接口的特征

- 不能被实例化，接口没有构造方法
- 接口只能被实现implements 或者继续定义为接口
- 属性默认是` public、 static、 fianl `修饰的静态常量
- 方法默认是` public、 abstract `修饰的抽象方法 ，但**可以省略不写**
- 只能有抽象方法
- **接口中的方法必须被子类重写**
- 一个类实现多个接口用逗号隔开`public class Man implements IPerson,Program`
- 如果一个类有继承又有实现，那么是先继承再实现
- 接口可以继承多个接口，用逗号隔开！



#### 类和接口的关系

- 类和接口的关系：一个类可以实现多个接口（实现关系）

- 接口和接口的关系： 可以继承多个接口（继承关系）

  

- **类只能继承一个父类**，但可以实现多个接口，一个类如果实现了一个接口，则必须 实现接口中的全部方法，否则必须将其定义为抽象类。



## 继承

> 继承是子类对父类的拓展，延伸

继承是java面向对象编程技术的一块基石，因为它允许创建分等级层次的类。

继承就是子类继承父类的特征和行为，使得子类对象（实例）具有父类的实例域和方法，或子类从父类继承方法，使得子类具有父类相同的行为。

### 继承语法：

>  extends 和 implements 是继承的2个关键字

#### extends关键字

> 一个子类只能拥有一个父类，所以 extends 只能继承一个类

```java
class 父类 {
}
 
class 子类 extends 父类 {
}
```

#### implements 关键字

> **继承接口**，可以同时继承多个接口（接口跟接口之间采用逗号分隔）

```java
class 父类 {
}
public interface  My接口{
    
} 
class 子类 implements  My接口 {
    
}
```

#### super 关键字

> 访问父类成员
>
> 使用地方：子类的方法和构造方法中

- **super(参数)**：表示调用了**父类的的有参构造方法**。

  调用父类的构造方法，必须写在构造方法中的第一行

  系统会自动调用父类的无参构造器。

-  **super.父类方法()** ： 表示调用父类的方法

  

  ```java
  class Animal {
    void eat() {
      System.out.println("animal : eat");
    }
  }
   
  class Dog extends Animal {
    void eat() {
      System.out.println("dog : eat");
    }
    void eatTest() {
      this.eat();   // this 调用自己的方法
      super.eat();  // super 调用父类方法
    }
  }
  ```

  

  

#### final：关键字

>  最终的

- 修饰变量、常量， 值不可改变，并在初始化时赋值
- 修饰方法， 不能被子类重写
- 修饰类， 不能被继承

##### 声明类：

```java
final class 类名 {//类体}
```

注： final 定义的类，其中的属性、方法不是 final 的。

##### 声明方法：

```java
修饰符(public/private/default/protected) final 返回值类型 方法名(){//方法体}
```

### 继承的特点：

- 关键字 extends

- java类没有多继承，只有单继承，但是可以多重继承

- 不能继承父类的三种情况 private成员、构造方法、子类与父类不在同包，使用默认访问权限的成员

- java中所有的类的祖先都是Object类

- 不同的叫法 

  父类：基类，超类 

  子类：派生类

![img](https://pic2.zhimg.com/80/v2-7252ac56fb9c96ca3f8313d083d17331_720w.jpg)



### 方法的重载：

- 位置：同类

- 在同一个类中，同一个方法名
- 参数列表不同（个数不同，顺序不同，类型不同）

### 方法的重写

- 位置： 子类

重写的特点：方法名、 参数列表、 返回值类型 必须和父类方法一致
访问权限不能比父类的更严格
@Override //注解 规定它下面的方法必须是重写的方法

![img](https://pic3.zhimg.com/80/v2-b642b54a9d6e478a42b7af2b74cc1f8a_720w.jpg)

## 多态性

> （接口）是为了弥补java单继承的缺陷，而应运而生，（方法的重载和覆盖（重写）） 

多态是允许程序中出现重名现象。
一个是方法多态：在一个类中，允许多个方法使用一个名字，但方法的参数不同，完成的功能也不同。
另一个是对象多态：子类对象可以与父类对象进行互相的转换，而根据其使用的子类的不同完成的功能也不同。







# 面向对象的总结：

## 对象和封装



- 

## 封装和继承

### 封装的概念

将类的某些信息隐藏在类内部，不允许外部程序直接访问，
而是通过该类提供的方法来实现对隐藏信息的操作和访问。

### 封装的好处：

- 隐藏类的实现细节
- 方便加入控制语句
- 方便修改实现
- 只能通过规定方法访问数据



## 抽象和多态

### **抽象（abstract）**

**意义**：抽象类是一种不完全规范，规定子类必须具备哪些方法
**特点**： 抽象类中可以有普通属性和普通方法

- 抽象类中有构造方法，但是不能实例化

- 抽象类只能被继承

- 抽象方法只能被子类重写或者子类继续抽象

- 有抽象方法的类必须是抽象类

  抽象类中不一定有抽象方法

### 多态

- 一个对象在不同的载体中呈现不同的形态。
- 同一个引用类型，调用同一个方法，得到不同的结果。

#### 实现多态的形式：

> **继承**是多态的基础，没有继承就没有多态
>
> 1.要有继承，2. 要有重写，3.父类对象实例指向子类对象`Parent p = new Child()`。

- 重写
- 接口
- 抽象类和抽象方法

```java
public class Polymorphic {
    public static void main(String[] args) {
        Person p = new Student();
        p.run(); // 对象p是person类型，但是初始化的是student,所以在运行时动态绑定为student
    }
}

class Person {
    public void run() {
        System.out.println("Person.run");
    }
}

class Student extends Person {
    @Override
    public void run() {
        System.out.println("Student.run");
    }
}
```



伪代码实现：

```java
public interface ProductService{
  List <Product> listProducts()
}
//实现类1
public class ProductServiceImpl1 implements ProductService{
   public List <Product> listProducts(){
          //查询热销商品
      }
}
//实现类2
public class ProductServiceImpl2 implements ProductService{
    public List <Product> listProducts(){
          //查询好评商品
      }
}

//控制层
public class ProductListServlet extends HttpServlet{
//多态
  //在servlet中使用new关键字创建ProductServiceImpl1对象，增加了servlet和service的耦合度  
private ProductService productService =new ProductServiceImpl1()
productService.listProducts()    //查询热销商品
private ProductService productService =new ProductServiceImpl2()    
productService.listProducts()    //查询好评商品     
}
```



#### 好处：

- 减少类中的代码量
- 提高代码的可拓展性和可维护性

#### 转型

- 向上转型：把子类转换为父类，属于自动类型转换。
- 向下转型：把父类转换为子类，必须结合`instanceof`运算符进行强制类型转换。







## 异常

### 格式：

```java
try{}catch(){}
try{}finally{}
try{}catch(){}finally{}
```

catch()块可以有多个，但是catch块捕捉有顺序 先子类后父类

- catch:代码中 捕捉到异常之后的处理。

- finally:不管有没有异常都会执行的代码块;

  finally块中语句不被执行的唯一情况：在异常处理代码中执行System.exit(1)

### throw和throws的区别
#### 作用不同：

- throw用于在程序中抛出异常。
- throws用于声明在该方法内抛出了异常


#### 使用的位置不同：

- throw位于方法体内部，可以作为单独语句使用。
- throws必须跟在方法参数列表的后面，不能单独使用。

#### 内容不同：

- throw抛出一个异常对象，而且只能是一个。

- throws后面跟异常类，而且可以跟多个异常类。

  

作者：HelloCode：
链接：https://juejin.cn/post/7082686505243639839
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。