## 面向对象有三个特征：封装、继承、多态

## 类和对象

### 面向对象和面向过程的思想对比

- 面向过程编程(Procedure Oriented Programming)：是一种以**过程**为中心的编程思想，实现功能的每一步，都是*自己实现*的

- 面向对象编程(Object Oriented Programming)：是一种以**对象**为中心的编程思想，通过*指挥对象实现*具体的功能

  对象：指客观存在的事物 *（万物皆对象）*

### 成员变量和局部变量的区别

- 成员变量：定义在类中
- 局部变量：定义在方法中

### static静态变量（类变量）相当于全局变量

- 用static修饰的变量叫静态变量也叫**类变量**

  用static修饰的方法叫静态方法也叫**类方法**

  

- 修饰代码块叫**静态代码块**（先于main之前调用，先块后main）

  **static 代码块会自动调用**，在JVM加载类时系统会执行 static 代码块

  （静态代码块：类成员变量的初始化工作）

  ```java
  public class My{
      static{
           //静态代码块
      }
  }
  ```

  

- 可以直接通过类名直接调用 也可以 用对象调用，但是推荐**类名调用**

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

#### this关键字：

> 可以调用本类的成员（变量，方法），解决局部变量和成员变量重名问题

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

  4. 构造方法包含**无参构造**和**有参构造**

     
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

> new对象后，初始化对象的属性

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

#### this

> **指向当前对象的引用**， this就是当前对象

##### `this.xx`的用法

- this.属性 ：在类中，获取当前实例对象下的属性
- this.方法() : 在类中，获取当前类中的方法

##### `this()`用于构造函数的调用

> 同一个类中可以同时有**多个构造函数(无参/有参/参数不一样)**，通过this()还可以在一个构造函数里调用另一个构造函数。

```java
class Cat {
    String name;
    int    age;
   //无参构造器
    public Cat() {
    }
    //有参构造器
    public Cat(String name, int age) {
        this.name = name;
        this.age = age;
        //this.Cat()
        this();  // 调用另一个不带参数的构造方法   
    }
}
```



## 接口

#### 接口的定义(interface)：

- 是一种强制性（完全）的规范。 接口不是一个类，
- 定义一系列的属性（` public static final`**静态常量**）和方法（` public abstract `**抽象方法**）

#### 接口的特征

- 不能被实例化，接口没有构造方法
- 接口只能被实现implements 或者继续定义为接口
- 属性默认是` public static fianl `修饰的静态常量,但可以省略不写
- 方法默认是` public abstract `修饰的抽象方法 ，但**可以省略不写**
- 只能有抽象方法
- **接口中的方法必须被子类重写**
- 一个类实现多个接口用逗号隔开`public class Man implements IPerson,Program`
- 如果一个类有继承又有实现，那么是先继承再实现
- 接口可以继承多个接口，用逗号隔开！



#### 定义语法：

```java
[可见度] interface 接口名称 [extends 其他的接口名] {
        // 声明变量
        public static final 数据类型 属性名 = 默认值;
        // public static final 可以省略不写
        数据类型 属性名 = 默认值; 
        // 抽象方法
        public abstract 方法返回类型 方法名();
        //public abstract 是可以省略的
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

#### 接口中定义默认方法

> 不需要对默认方法进行覆盖重写，就可以使用该方法

```java
//public可以省略
public default 方法返回类型 方法名(){
	//方法里面需要执行的内容
}
```

接口实现类如果没有重写接口中的默认方法，会去调用接口中的默认方法；如果实现类重写了接口的默认方法，便会调用重写的方法。

#### 类和接口的关系

- 类和接口的关系：一个类可以实现多个接口（实现关系）

- 接口和接口的关系： 可以继承多个接口（继承关系）

  

- **类只能继承一个父类**，但可以实现多个接口，一个类如果实现了一个接口，则必须 实现接口中的全部方法，否则必须将其定义为抽象类。

## 匿名内部类：

> 必须是一个抽象类或者是一个接口
>
> 一般可以作为方法的参数传递，也可以在方法中直接定义

- Java 中可以实现**一个类中包含另外一个类**，且不需要提供任何的类名直接实例化。



语法:

```java
 类名/接口名 匿名内部类= new 类名/接口名(){
  //重写抽象方法
   @override  
}
```

实例：

```java
//在下面作为匿名内部类
class Polygon {
   public void display() {
      System.out.println("在 Polygon 类内部");
   }
}

class AnonymousDemo {
   public void createClass() {

      // 创建的匿名类继承了 Polygon 类
      Polygon p1 = new Polygon() {
         @override
         public void display() {
            System.out.println("在匿名类内部。");
         }
      };
      p1.display();
   }
}

class Main {
   public static void main(String[] args) {
       AnonymousDemo an = new AnonymousDemo();
       an.createClass();
   }
}
```



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

>  **最终的 不可改变**

- 修饰变量、常量， 值不可改变，并在初始化时赋值
- 修饰方法， 不能被子类重写
- 修饰类， 不能被继承

##### 声明类：

```java
final class 类名 {
    //类体
}
```

注： final 定义的类，其中的属性、方法不是 final 的。

##### 声明方法：

```java
修饰符(public/private/default/protected) final 返回值类型 方法名(){
    //方法体
}
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
- 重写的特点：方法名、 参数列表、 返回值类型 必须和父类方法一致
- 访问权限不能比父类的更严格
- @Override //注解 规定它下面的方法必须是重写的方法

![img](img\重载和重写.jpg)

## 多态

> （接口）是为了弥补java单继承的缺陷，而应运而生，（方法的重载和覆盖（重写）） 

- 一个对象在不同的载体中呈现不同的形态。
- 同一个引用类型，调用同一个方法，得到不同的结果。

#### 多态的实现方式：

- 重写
- 接口
- 抽象类和抽象方法

#### 多态存在的必要条件：

> **继承**是多态的基础，没有继承就没有多态

1. 有类继承或者接口实现
2. 重写（实现类重写接口中的抽象方法，子类重写父类的方法）
3. 父类实例指向子类对象：**`Parent p = new Child();`**

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



## 抽象类abstract：

**意义**：抽象类是一种不完全规范，规定子类必须具备哪些方法
**特点**： 抽象类中可以有普通属性和普通方法

- 抽象类中不能实例化，只能被继承
- 抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类
- 抽象类中的抽象方法只是声明，不包含方法体，就是不给出方法的具体实现也就是方法的具体功能。
- 抽象方法只能被子类重写或者子类继续抽象

## 抽象类和接口的区别点

1、接口只能含有抽象的方法，抽象类中可以包含部分的实现方法。

2、接口只能定义静态常量，默认为public static final，并且需要显示初始化。抽象类中可以定义普通的成员变量。

3、接口不能含构造方法，抽象类可以有自己的构造方法（被继承使用）。

4、接口和抽象类都**无法被实例化**。

5、一个类可以实现多个接口，只能继承一个抽象类（只能继承一个类，单继承）

6、**一个类实现接口时需要实现所有的方法**。**继承一个抽象类的时候需要实现所有抽象方法**，否则同样需要声明为抽象类。（如果一个类含有抽象方法，则这个类必须被声明为抽象类）

7、如果向一个抽象类里加入一个新的具体方法时，它的所有子类都自动得到了这个新方法。如果向一个接口添加一个新的方法，则实现该接口的所有类就必须同步修改来实现这个方法，否则无法编译通过。

8、抽象类的实现只能由它的子类给出，而Java是单继承的，所以抽象类作为类型定义工具的效能大打折扣。任何实现一个接口的类都可以具有这个接口的类型，而一个类可以同时实现多个接口，从而这个类就有了多种类型。

```java
public abstract class Employee
{
   private String name;
   private String address;
   private int number;
   //含抽象方法的类一定是抽象类
   public abstract double computePay();
   
   //其余代码， 方法的实现....
}
```





## 异常

### 异常分为2种：

- 运行时异常（非受查异常）

  空指针异常 、算数异常、数组越界异常、

- 编译时异常（受查异常）

   在编译前就划红线了就是编译时异常

### 异常处理格式：

```java
try{}catch(异常类型 异常对象){}
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

  #



## 枚举

>特殊的类
>
>表示一组常量
>
>可以使用构造器(`必须私有`),定义成员变量和方法
>
>实现一个或多个接口,但枚举类不能继承其他类

### 语法：

```java
修饰符 enum 枚举名 {
        枚举成员1,
        枚举成员2
}
```

实例：

```java
// 1. 定义
public enum Color {
    BLACK,
    WHITE
}

// 2. 使用
class Test {
    public static void main(String[] args) {
        System.out.println(Color.BLACK);  // BLACK
    }
}
```

### 常用方法

| 方法名称    | 描述                                 |
| ----------- | ------------------------------------ |
| values()    | 以**数组**形式返回枚举类型的所有成员 |
| valueOf()   | 将普通字符串转换为**枚举实例**       |
| compareTo() | 比较两个枚举成员在定义时的顺序       |
| ordinal()   | 获取枚举成员的索引位置               |

1. `values()` 循环输出成员变量,并使用 `ordinal()` 输出索引值

```java
public static void main(String[] args) {
        Color[] colorArr = Color.values();
        //打印枚举数组
        System.out.println(Arrays.toString(colorArr));
  
    
        for (Color value : Color.values()) {
            System.out.println("当前索引值为:"+value.ordinal()+",数据为:"+value);
        }
    }

// 结果: 
当前索引值为:0,数据为:BLACK
当前索引值为:1,数据为:WHITE
```

2. 通过 `valueof()` 获取枚举实例,并使用 `compareTo()` 比较定义顺序

```java
public enum Color {
    BLACK,
    WHITE,
    YELLOW;
}

class Test {
    public static void main(String[] args) {
        Color color = Color.valueOf("WHITE");
        compare(color);
    }

    public static void compare(Color color){
        for (Color value : Color.values()) {
            //compareTo()
            System.out.println(color+"与"+value+"的比较结果是"+color.compareTo(value));
        }
    }
}

结果:  

WHITE与BLACK的比较结果是1
WHITE与WHITE的比较结果是0
WHITE与YELLOW的比较结果是-1
```

- String name() :返回此枚举实例的名称
- String toString():返回枚举常量的名称
- toString()方法更常用

```java
public class  TestDemo{
	public static void main(String[] args) {
		System.out.println(Season.SPRING.name());
		System.out.println(Season.SPRING.toString());
		//实质就是调用toString()方法
		System.out.println(Season.SPRING);
	}
}
```



### 枚举的成员变量与方法

 >特殊的类
 >
 >表示一组常量
 >
 >可以使用构造器(`必须私有`),定义成员变量和方法
 >
 >实现一个或多个接口,但枚举类不能继承其他类

枚举常量外, enum是一个完整的类,它也可以定义`成员变量`编写自己的`构造方法`以及`成员方法`,甚至`实现接口`.

```java
// 实现Runnable接口,在这个类中没有意义,只是为了举例
public enum Color implements Runnable {
    WHITE("黑色",1),
    BLACK("白色",2),
    YELLOW("黄色",3);
   
    //定义成员变量 
    private final String value; 
    private final Integer index;

    // 自定义构造,虽然没有写private,但是默认就是private
    Color(String value,Integer index) {
        this.value = value;
        this.index = index;
    }

    // 自定义方法
    public void draw() {
        System.out.println("绘制 " + value);
    }

    // 重写方法
    @Override
    public String toString() {
        return "hello I'm "+value+", my index is "+index;
    }

    // 实现接口方法
    @Override
    public void run() {
        // todo ...
    }
}

class Test {
    public static void main(String[] args) {
        for (Color value : Color.values()) {
            System.out.println(value);
        }
    }
}

结果: 
hello I'm 黑色, my index is 1
hello I'm 白色, my index is 2
hello I'm 黄色, my index is 3

```

### **枚举类和普通类的区别**

1. 枚举类可以实现一个或多个接口，使用eunm定义的类默认继承了java.lang.Enum类，而不是默认
继承Object类，因此枚举类不能显示继承其他父类。其中java.lang.Enum类实现了
java.lang.Serializable和java.lang.Comparable接口
2. 非抽象的枚举类默认会使用final修饰，因此枚举类**不能派生子类**。
3. 枚举类的**构造器只能使用private修饰**，如果省略，系统默认使用private修饰。
4. 枚举类的每一个实例必须显示声明，每个实例使用逗号隔开。





## 泛型

泛型类在java中有着很重要的地位，其中我们用的最多的就是ArrayList,HashMap,HashSet.

> 泛型就是把**类型明确的工作推迟**到**创建对象**或**调用方法**的时候才去明确的特殊的类型。

- 泛型的本质是**参数化类型**，也就是说所操作的数据类型被指定为一个参数。

- 泛型---->广泛的类型

###  泛型的好处：

- 在编译的时候能够检查类型安全
- 所有的强制转换都是自动和隐式的

在没有泛型的情况的下，通过对类型 Object 的引用来实现**参数的“任意化”**，“任意化”带来的缺点是要做**显式的强制类型转换**，而这种转换是要求开发者对实际参数类型可以预知的情况下进行的。对于强制类型转换错误的情况，编译器可能不提示错误，在运行的时候才出现异常，这是本身就是一个安全隐患。

``` java
public class GlmapperGeneric<T> {
    private T t;
    public void set(T t) { this.t = t; }
    public T get() { return t; }
  
    public static void main(String[] args) {
        // do nothing
    }

  /**
    * 不指定类型
    */
  public void noSpecifyType(){
    GlmapperGeneric glmapperGeneric = new GlmapperGeneric();
    glmapperGeneric.set("test");
    // 需要强制类型转换
    String test = (String) glmapperGeneric.get();
    System.out.println(test);
  }

  /**
    * 指定类型
    */
  public void specifyType(){
    GlmapperGeneric<String> glmapperGeneric = new GlmapperGeneric();
    glmapperGeneric.set("test");
    // 不需要强制类型转换
    String test = glmapperGeneric.get();
    System.out.println(test);
  }
}
```

### 泛型只能用引用数据类型

#### 基本数据类型：

- 整型【byte、short、int、long】
- 浮点【float、double】
- 字符【char】
- 逻辑【boolean】

**Java中每一种基本数据类型都有对应的引用类型**

#### 引用数据类型：

- 类、
- 接口
- 数组

#### 包装类：

Boolean、Character、Byte、Short、Integer、Long、Float、Double

#### 常见类：

String、StringBuffer、Date、Math、

```java
Object<Integer>  //true
Object<int> //false
```

### 泛型的标记符：

- ？ 表示不确定的 java 类型
- T (type) 表示具体的一个java类型
- K V (key value) 分别代表java键值中的Key Value
- E (element) 代表Element

### 泛型有三种实用方式

- 类泛型：`public class Test<T>}{}` T表示未知类型

- 接口泛型：`public interface Test<T>{}` 和定义类一样

- 方法泛型：`public <T> void Test(T name){}`

### 类泛型 

> 语法：` 类名 <泛型类型> `
>
> 实例：`类名<实际类型> 实例类名 = new 类名<实际类型>();`

```java
public class 类名 <泛型类型1,...> {
    
}
//实例类
类名<实际类型> 实例类名 = new 类名<实际类型>();
```

实例：

```java
public class Box<T> {
   
  private T t;
 
  public void add(T t) {
    this.t = t;
  }
 
  public T get() {
    return t;
  }
 
  public static void main(String[] args) {
    Box<Integer> integerBox = new Box<Integer>();
    Box<String> stringBox = new Box<String>();
 
    integerBox.add(new Integer(10));
    stringBox.add(new String("菜鸟教程"));
  }
}
```





### 接口泛型

> 语法： `接口名 <泛型类型> `
>
> 泛型使用：  
>
> - **接口名 <实际泛型类型>**  变量名 = 方法() 
>
> - **接口名 <实际泛型类型>**  变量名 = new 接口的实例化类**<实际泛型类型>** () 
>
> 总结： 类的实例，变量声明的类型是：**接口名 <实际泛型类型>**

```java
//修饰符  interface 接口名<数据类型> {}
  public interface 接口名<泛型类型> {
    
 }
```

#### 接口泛型一般被类实现：

- 实现接口的时候**不传入数据类型**，需要将泛型声明也要写到类中，要不然会报错
- 实现接口的时候**传入数据类型**，就不用把泛型声明也写到类中了

```java
public interface Test<T>{
    T getName(T name);
}

//如果实现接口的时候不传入数据类型的话，需要将泛型声明也要写到类中要不然会报错
class Test1<T> implements Test<T>{
    @Override
    public T getName(T name) {
        return null;
    }
}

//实现接口的时候传入数据类型的话，就不用把泛型声明也写到类中了
class Test2 implements  Test<String>{
    @Override
    public String getName(String name) {
        return name;
    }
}
```

实例：

- **接口名 <实际泛型类型>**  变量名 = 方法() 

- **接口名 <实际泛型类型>**  变量名 = new 接口的实例化类**<实际泛型类型>** () 

```java
Test<String>  demo  = new Test1<String>()
```



###  方法泛型

> 调用方法时，**传入的参数类型决定泛型的类型**
>
> 语法：`修饰词 <泛型类型> `

```java
public <泛型类型> 返回类型 方法名 (泛型类型 变量名) {
    
}
```

#### 方法泛型的使用：

> 参数需要多少泛型，返回值前面就得定义几个泛型

```java
public <T> void getName(T name){} 
public <T,K> void getNameAndValue(T name, K value){}
public <T,K,V> void getNameAndValueAndV(T name, K value, V v){}
```

实例：

```java
class Demo{  
  public <T> T fun(T t){   // 可以接收任意类型的数据  
   return t ;     // 直接把参数返回  
  }  
};  
public class GenericsDemo26{  
  public static void main(String args[]){  
     Demo d = new Demo() ;         // 实例化Demo对象  
   
     String str = d.fun("汤姆") ; // 传递字符串  
     int i = d.fun(30) ;          // 传递数字，自动装箱  
   
    System.out.println(str) ; // 输出内容  
    System.out.println(i) ;   // 输出内容  
  }  
};
```



### 类派生子类

```java
public class A extends Parent<Integer, String> {}
```

### 类型通配符

> **?** 代替具体的类型参数

例如**` List<?> `**在逻辑上是` List<String>`,`List<Integer> `等所有 `List<具体类型实参>`的**父类**。

```java
import java.util.*;
 
public class GenericTest {
     
    public static void main(String[] args) {
        List<String> name = new ArrayList<String>();
        List<Integer> age = new ArrayList<Integer>();
        List<Number> number = new ArrayList<Number>();
        
        name.add("icon");
        age.add(18);
        number.add(314);
 
        getData(name);
        getData(age);
        getData(number);
       
   }
 
   public static void getData(List<?> data) {
      System.out.println("data :" + data.get(0));
   }
}
```

注意：上述正常

```java
 public static void getData1(List<?> data) {
        data.add("string");//报错
        data.add(18);      //报错
        data.add(null);    //添加成功

    }

//以下才正确
public static void getData1(List<String> data) {
        data.add("string");
    }
  public static void getData2(List<Number> data) {
        data.add(18);
    }
```

注意：方法的参数泛型`List<?>` ，在方法内使用`data.add()`接受类型只能是null，其他类型都报错；需要通过`List<String>`，指明？的类型

```java
getData(name);
getData(age);    //报错
getData(number); //报错
public static void getData(List<? extends String> data) {
        System.out.println("data :" + data.get(0));
        data.add("string"); //报错
    }
```

注意：方法的参数泛型`List<? extends String>`  限制调用方法时传入的参数







上边界通配符号：可以接收E以及E的子类型的泛型，这里面的E不止是类哦，也可以是接口

下边界通配符号： 就是传入的类型必须得是E以及E的父类