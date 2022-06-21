# Java8新特性

## 新特性

- **Lambda 表达式** − Lambda 允许把函数作为一个方法的参数（函数作为参数传递到方法中）。
- **方法引用** − 可以直接引用已有Java类或对象（实例）的方法或构造器。与lambda联合使用，方法引用可以使语言的构造更紧凑简洁，减少冗余代码。
- **默认方法** − 默认方法就是一个在接口里面有了一个实现的方法。
- **新工具** − 新的编译工具，如：Nashorn引擎 jjs、 类依赖分析器jdeps。
- **Stream API** −新添加的Stream API（java.util.stream） 把真正的函数式编程风格引入到Java中。
- **Date Time API** − 加强对日期与时间的处理。
- **Optional 类** − Optional 类已经成为 Java 8 类库的一部分，用来解决空指针异常。
- **Nashorn, JavaScript 引擎** − Java 8提供了一个新的Nashorn javascript引擎，它允许我们在JVM上运行特定的javascript应用。

### lambda表达式

> 闭包,允许把函数作为一个方法的参数（函数作为参数传递进方法中）。 回调函数

- Lambda表达式，从本质上讲是一个**匿名方法**、回调函数。可以使用这个匿名方法，**实现接口中的方法**。

  

#### 作用：

- **简化接口实现** （接口的实现方式：①设计接口的实现类、②使用匿名内部类）

#### 要求：

- 只能实现**函数式接口**（一个有且仅有**一个抽象方法**，但是可以有多个非抽象方法的接口）
- `@FunctionalInterface` 注解 （函数式接口）

#### 语法：

```java
(parameters) -> expression

(parameters) ->{ statements; }
```

#### 主要特征

- 可选类型声明：**不需要声明参数类型**，编译器可以统一识别参数值。
- 可选的参数圆括号：**一个参数无需定义圆括号**，但多个参数需要定义圆括号。
- 可选的大括号：如果主体包含了**一个语句，就不需要使用大括号**。
- 可选的返回关键字：如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定表达式返回了一个数值。



```java
//函数式接口
@FunctionalInterface
interface GreetingService {
   void sayMessage(String message);
} 
//匿名内部类：
GreetingService greetService1= new GreetingService(){
     @Override
     public void sayMessage(String message) {
       System.out.println(message);
    }   
}
//函数接口
// lambda表达式 返回值为GreetingService接口  
//也就是重写GreetingService接口里面的sayMessage方法
GreetingService greetService1 = message ->
System.out.println("Hello " + message);
//调用sayMessage方法     
greetService1.sayMessage("Runoob");
```



完整实例：

```java
public class Java8Tester {
   interface MathOperation {
      int operation(int a, int b);
   }
    
   interface GreetingService {
      void sayMessage(String message);
   }
   //函数式接口作为参数  
   private int operate(int a, int b, MathOperation mathOperation){
      return mathOperation.operation(a, b);
   }
    
    
   public static void main(String args[]){
      Java8Tester tester = new Java8Tester();
        
      // 类型声明
      MathOperation addition = (int a, int b) -> a + b;   
      // 不用类型声明
      MathOperation subtraction = (a, b) -> a - b;
        
      // 大括号中的返回语句
      MathOperation multiplication = (int a, int b) -> { return a * b; }; 
      // 没有大括号及返回语句
      MathOperation division = (int a, int b) -> a / b;
        
      System.out.println("10 + 5 = " + tester.operate(10, 5, addition));
      System.out.println("10 - 5 = " + tester.operate(10, 5, subtraction));
      System.out.println("10 x 5 = " + tester.operate(10, 5, multiplication));
      System.out.println("10 / 5 = " + tester.operate(10, 5, division));
        
      // 不用括号
      GreetingService greetService1 = message ->
      System.out.println("Hello " + message);
        
      // 用括号
      GreetingService greetService2 = (message) ->
      System.out.println("Hello " + message);
        
      greetService1.sayMessage("Runoob");
      greetService2.sayMessage("Google");
   }
}
```







#### 变量作用域

lambda 表达式只能引用标记了 final 的外层局部变量

```java
++++ final static String salutation = "Hello! ";


interface GreetingService {
   void sayMessage(String message);
}  
//函数接口
// lambda表达式 返回值为GreetingService接口  也就是重写GreetingService接口里面的sayMessage方法
GreetingService greetService1 = message ->
+++++   System.out.println(salutation + message);
//调用sayMessage方法     
greetService1.sayMessage("Runoob");
```

### 方法引用`::`

> 方法引用就是 Lambda 表达式，也就是**函数式接口的一个实例**，通过方法的名字来指向一个方法。

- 通过方法的名字来指向一个方法
- 使语言的构造更紧凑简洁，减少冗余代码

#### 使用场景

> 当要传递给 Lambda 体的操作，已经实现的方法了，可以使用方法引用！

#### 格式：

```java
类(或对象) :: 方法名
```

接口中的抽象方法的形参列表和返回值类型与方法引用的方法的形参列表和返回值类型相同

- 对象 `::` 非静态方法(实例方法)

- 类 `::` 静态方法

  ```
  //lambda表达式
  (参数1，参数2)-> 类名.方法名(参数1，参数2)
  
  //方法引用
  类名::方法名
  ```

  > 采用**擦除法**，去掉左右两边一致的参数表

  ```java
  class A {
    void a(String s) {
      System.out.println(s);
    }
  }
  
  interface B {
    void b(String s);
  }
  
  A a = new A();
  //lambda表达式实现了 B函数式接口中的b方法
  B b = s -> a.a(s); // 等价于 B b = a::a;
  ```

  

函数式接口方法的第一个参数是需要引用方法的调用者，并且第二个参数是需要引用方法的参数(或无参数)

- 类 `::` 非静态方法(实例方法)

  ```java
  //lambda表达式
  (参数1，参数2)-> 参数1.方法名(参数2)
  
  //方法引用
  类名::方法名
  ```

  实例：

  ```java
  package test;
  
  //函数式接口
  public interface Converter {
      int convert(String s);
  }
  
  public class Demo {
      //参数为 函数式接口
      private static void useConverter(Converter c) {
          int number = c.convert("666");
          System.out.println(number);
      }
      public static void main(String[] args) {
          //lambda表达式
          useConverter(s -> Integer.parseInt(s)); //666
          //引用类方法
          useConverter(Integer::parseInt); //666
      }
  }
  
  ```

  



- 类型::new（构造方法的引用）





| 类型         | 方法引用           | Lambda表达式                         |
| ------------ | ------------------ | ------------------------------------ |
| 静态方法引用 | 类名::staticMethod | (args) -> 类名.staticMethod(args)    |
| 实例方法引用 | inst::instMethod   | (args) -> inst.instMethod(args)      |
| 对象方法引用 | 类名::instMethod   | (inst,args) -> 类名.instMethod(args) |
| 构建方法引用 | 类名::new          | (args) -> new 类名(args)             |



LambdaQueryWrapper 条件构造器