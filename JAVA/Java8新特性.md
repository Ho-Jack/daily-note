# Java8新特性/函数式编程

## 新特性

- **Lambda 表达式** − Lambda 允许把函数作为一个方法的参数（函数作为参数传递到方法中）。
- **方法引用** − 可以直接引用已有Java类或对象（实例）的方法或构造器。与lambda联合使用，方法引用可以使语言的构造更紧凑简洁，减少冗余代码。
- **默认方法** − 默认方法就是一个在接口里面有了一个实现的方法。
- **新工具** − 新的编译工具，如：Nashorn引擎 jjs、 类依赖分析器jdeps。
- **Stream API** −新添加的Stream API（java.util.stream） 把真正的函数式编程风格引入到Java中。
- **Date Time API** − 加强对日期与时间的处理。
- **Optional 类** − Optional 类已经成为 Java 8 类库的一部分，用来解决空指针异常。
- **Nashorn, JavaScript 引擎** − Java 8提供了一个新的Nashorn javascript引擎，它允许我们在JVM上运行特定的javascript应用。

### 学习前必备知识点

#### 函数式接口

- 定义:一个有且仅有**一个抽象方法**，但是可以有多个非抽象方法的接口

- 函数式接口实例化的时:必须重写抽象方法

- 与lambda表达式关系:函数式接口作为参数传入方法中,当函数式接口作为参数被实例时,可以被lambda表达式简写

- 注解:`@FunctionalInterface`   

  > 声明这是一个函数式接口
  
  


##### 自定义函数式接口

```java
 @FunctionalInterface
 修饰符 interface 接口名称 {
    返回值类型 方法名称(可选参数信息);
    // 其他非抽象方法内容
 }
```

##### 函数式接口实例化

> 接口是不能被实例化的,但是作为函数的参数传入时,可以在方法调用时被实例化
>
> 匿名类的时候才能实现接口

```java
 类名/接口名 匿名内部类= new 类名/接口名(){
  //重写抽象方法
   @override  
}
public void 函数(接口名称 参数1){
    参数1.接口中的抽象方法()
}
```



##### JDK内置函数式接口:

###### 	 `Consumer<T>`

> 消费型接口，接收一个参数进行消费，没有返回值

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
    ...
}
```

- 实例化函数式接口:

  ```java
  Consumer consumer = new Consumer() {
      @Override
      public void accept(Object x) {
          System.out.println(x);
      }
  };
  
  //lambda表达式 (先了解,大体上看就是 将方法匿名,然后抽离参数和方法体,参数类型也不用写)
  Consumer consumer = x -> System.out.println(x);
  
  consumer.accept("hello function");
  ```

- 使用函数式接口中的default方法

  **默认方法：** andThen(Consumer<? super T> after)，先消费然后在消费，先执行调用andThen接口的accept方法，然后在执行andThen方法参数after中的accept方法。

  **使用方式：**

  ```java
    Consumer<String> consumer1 = s -> System.out.print("车名："+s.split(",")[0]);
    Consumer<String> consumer2 = s -> System.out.println("-->颜色："+s.split(",")[1]);
  
    String[] strings = {"保时捷,白色", "法拉利,红色"};
    for (String string : strings) {
       consumer1.andThen(consumer2).accept(string);
    }
  ```

###### `Supplier<T>`

> 生产型接口，生产变量,返回T类型的对象
>
> 不传参数,返回(生产)一个T类型对象

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

- 实例匿名内部类:

  ```java
  Supplier<String> supplier = new Supplier<String>() {
          @Override
          public String get() {
              return "我要变的很有钱";
          }
      };
  
  Supplier<String> supplier = () -> "我要变的很有钱";
   System.out.println(supplier.get());
  ```

  

###### `Function<T, R>`

> 参数转换操作，传入类型T 的参数, 转换并返回类型为 R 的返回值：

```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);
    ...
}
```

- 实例匿名内部类:

  ```java
  Function<Integer, Integer> function1 = new Function<Integer, Integer>() {
      @Override
      public Integer apply(Integer e) {
          return e * 6;
      }
  };
  //lambda表达式 (先了解,大体上看就是 将方法匿名,然后抽离参数和方法体,参数类型也不用写)
  Function<Integer, Integer> function1 = e -> e * 6;
  System.out.println(function1.apply(2));
  ```

  

###### `Predicate<T>`

> 判断接口,传入一个类型T 的参数,返回一个布尔值

```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
    ...
}	
```

- 实例

  ```java
  Predicate<Integer> predicate = new Predicate<Integer>() {
      @Override
      public boolean test(Integer t) {
          return t > 0;
      }
  };
  //lambda表达式 (先了解,大体上看就是 将方法匿名,然后抽离参数和方法体,参数类型也不用写)
  Predicate<Integer> predicate = t -> t > 0;
  
  boolean test = predicate.test(1);
  System.out.println(test);
  ```

- `Predicate<T>`中的default方法:

  - 默认方法1：`and(Predicate<? super T> other)`

    > 相当于逻辑运算符中的**&&**
  >
    > 当两个Predicate函数的返回结果都为true时才返回true。

  - 使用方式：
  
  ```java
      default Predicate<T> and(Predicate<? super T> other) {
          Objects.requireNonNull(other);
          return (t) -> test(t) && other.test(t);
      }
  
  Predicate<String> predicate1 = s -> s.length() > 0;
   Predicate<String> predicate2 =obj -> Objects.nonNull(obj);
   boolean test = predicate1.and(predicate2).test("&&测试");
 System.out.println(test);
  ```
  
  - 默认方法2:    `or(Predicate<? super T> other) `
  
    > 相当于逻辑运算符中的**||**
    >
    > 当两个Predicate函数的返回结果有一个为true则返回true，否则返回false。



##### 其他内置接口

| 函数式接口          | 参数 | 返回值  | 描述                                                 |
| ------------------- | ---- | ------- | ---------------------------------------------------- |
| `BiConsumer<T,U>`   | T,U  | viod    | 代表了一个接受两个输入参数的操作，并且不返回任何结果 |
| `BiPredicate<T,U>`  | T,U  | boolean | 代表了一个两个参数的boolean值方法                    |
| `BiFunction<T,U,R>` | T,U  | R       | 代表了一个接受两个输入参数的方法，并且返回一个结果   |








  ##### 接口的statis和default:

- statis方法:

  > java8新增,定义一个或者多个静态方法。用法和普通的static方法一样
  >
  > 注意:实现接口的类或者子接口不会继承接口中的静态方法。

  ```java
  public interface Interface {
      /**
       * 静态方法
       */
      static void staticMethod() {
          System.out.println("static method");
      }
  }
  ```

- defualt方法

  > 实现类可以直接调用，并不需要**重写**这个方 法
  >
  > 注意：如果接口中的默认方法不能满足某个实现类需要，那么实现类可以覆盖默认方法。不用加default关键字

  ```java
  public interface Interface {
      /**
       * default方法
       */
      default void print() {
          System.out.println("hello default");
      }
  }
  //实现接口
  public class InterfaceImpl implements Interface {
      @Override
      public  void print() {
          System.out.println("hello default 2");
      }
  }
  ```

  

  

  



### lambda表达式

> 闭包,允许把函数作为一个方法的参数（函数作为参数传递进方法中）。 回调函数

- Lambda表达式，从本质上讲是一个**匿名方法**、(回调函数)。可以使用这个匿名方法，**实现接口中的方法**。

  

#### 作用：

- **简化接口实现** （接口的实现方式：①设计接口的实现类、②使用匿名内部类）

  也就是简化匿名内部类的写法（只**重写**匿名内部类的方法，并且方法是匿名方法）

#### 要求：

- 只能实现**函数式接口**（一个有且仅有**一个抽象方法**，但是可以有多个非抽象方法的接口）

  重写函数式接口里面的抽象方法，保持参数一致（抽象方法变成匿名函数）

- `@FunctionalInterface` 注解 （函数式接口）

#### 伪代码语法：

```java
(parameters) -> expression
(parameters) ->{ statements; }

@FunctionalInterface
public interface 函数式接口 {
   void 抽象方法(dataType 参数1);
} 
函数式接口 匿名类 = 参数1 -> {方法业务;}
匿名类.方法(参数)
    
//一般情况 函数式接口是传入方法作为参数
@FunctionalInterface
public interface 函数式接口 {
   int 抽象方法(dataType 参数1);
}  
//1.函数式接口传入目标方法作为参数 (目标方法的参数定义为接口)
public int 目标方法(函数式接口 函数式接口实例){
    //2.在目标方法中使用函数式接口的抽象方法
    //目标方法内可以写实参,真正调用方法
    //如果可以写一些业务逻辑
    return  函数式接口实例.抽象方法(参数1)
}
//3.直接调用目标方法,并重写抽象方法
int  demo = 目标方法( 参数1 -> 重写抽象方法)
//3.直接调用目标方法,并重写抽象方法,未使用lambda表达式的情况
int  demo = 目标方法(new 函数式接口(){
    //重写函数式接口内的抽象方法
    @override
    public int 抽象方法(){
        return 一个int类型的值
    }
})    
```

#### 一般使用情况

1. 函数式接口传入**目标方法**作为参数 (目标方法的参数定义为接口)

   > 好处:可以重写方法的实现

2. 在**目标方法体**中**使用函数式接口的抽象方法**

3. 使用时:直接调用目标方法,并在方法参数括号内实现函数式接口(重写函数式接口的抽象方法)

   `int  demo = 目标方法( 参数1 -> 重写抽象方法)`

   好处: 不需要再通过函数式接口的实现调用抽象方法,已经在目标方法返回了

   - 类似foreach实现

   ```java
   public class lambdaDemo{
       //1.函数式接口传入目标方法作为参数 (目标方法的参数定义为接口)
       public static viod foreachArr(IntConsumer consumer){
           //业务逻辑
           int[] arr ={1,2,3,4};
           for(int i : arr){
               //2.在目标方法中使用函数式接口的抽象方法
               consumer.accept(i)
           }
       }
       //3.直接调用目标方法,并重写抽象方法
       foreachArr((int value)->{
           System.out.printIn(value)
       })
       //没使用lambda表达的,在参数括号内实现匿名内部类
       foreachArr(new IntConsumer(){
           @override
           public viod accept(int value){
                  System.out.printIn(value)
           }
       })           
   }
   ```

   - 实例2

     ```java
     package 函数式编程;
     
     public class 匿名内部类 {
        public interface IntBinaryOperator {
             int applyAsInt(int a, int b);
         }
     
         //1.传入函数式接口并
         public static int calculateNum(IntBinaryOperator operator) {
             int a = 10;
             int b = 20;
             //2.使用抽象方法的
             return operator.applyAsInt(a, b);
         }
     
     
         public static void main(String[] args) {
     //        int i = calculateNum(new IntBinaryOperator() {
     //            @Override
     //            public int applyAsInt(int left, int right) {
     //                return left + right;
     //            }
     //        });
             
     //3.直接调用目标方法 并重写抽象方法
             int i = calculateNum((left, right) -> left + right);
             //  int i = calculateNum(Integer::sum);  
             //Integer.sum()求和
             System.out.println(i);
     
             //匿名内部类IntBinaryOperator
             //简写  IntBinaryOperator myOperator = (left, right) -> left + right;
             IntBinaryOperator myOperator = new IntBinaryOperator() {
                 @Override
                 public int applyAsInt(int left, int right) {
                     return left + right;
                 }
             };
             int ii= myOperator.applyAsInt(10,20);
             System.out.println(ii);
     
         }
     }
     ```

     

#### 省略规则

- 参数类型可以省略
- 只有一句代码,花括号和分号可以省略
- 只有一个参数,小括号可以省略

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



笨鸟教程完整实例：

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





### Stream流

#### 创建流:

##### 1.通过值创建

> 使用静态方法 `Stream.of()` 由指定的值进行创建：

```java
Stream<String> stream = Stream.of("a", "b ", "c", "d");
```

##### 2. 由集合或数组创建

- 集合:

  > `Collection` 接口的`stream()` 方法,一个默认方法

  ```java
  List<String> strings = Arrays.asList("a", "b ", "c", "d");
  Stream<String> stream = strings.stream();
  ```

  

- 数组:

  > 使用静态方法 `Arrays.stream()` 由指定的数组进行创建

  ```java
  String[] strings={"a", "b ", "c", "d"};
  Stream<String> stream = Arrays.stream(strings);
  ```

##### 3.由文件创建

```java
try (Stream<String> lines = Files.lines(Paths.get("pom.xml"), StandardCharsets.UTF_8)) {
    lines.forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}
```



##### 4.由函数创建

除了以上方法外，还可以通过 `Stream.iterate()` 和 `Stream.generate()` 方法来来创建无限流：

- `Stream.iterate()` 接受两个参数：第一个是初始值；第二个参数是一个输入值和输出值相同的函数型接口，主要用于迭代式地产生新的元素，示例如下：

  ```
  // 依次输出0到9
  Stream.iterate(0, x -> x + 1).limit(10).forEach(System.out::print);
  ```

- `Stream.generate()`  接收一个供应型函数作为参数，用于按照该函数产生新的元素：

  ```
  // 依次输出随机数
  Stream.generate(Math::random).limit(10).forEach(System.out::print);
  ```

#### 操作流

##### 中间操作:

> 对**Stream**进行操作，对Stream操作返回完返回的还是Stream

##### 终结操作:

> 最终操作返回的不再是Stream对象，**调用了最终操作的方法，Stream才会执行**

当流创建后，便可以利用 Stream 类上的各种方法对流中的数据进行处理，常用的方法如下：

| 操作      | 作用                               | 返回类型    | 使用的类型/函数式接口 |
| --------- | ---------------------------------- | ----------- | --------------------- |
| filter    | 过滤符合条件的元素                 | Stream<T>   | Predicate<T>          |
| distinct  | 过滤重复元素                       | Stream<T>   |                       |
| skip      | 跳过指定数量的元素                 | Stream<T>   | long                  |
| limit     | 限制元素的数量                     | Stream<T>   | long                  |
| map       | 对元素执行特定转换操作             | Stream<T>   | Function<T,R>         |
| flatMap   | 将元素扁平化后执行特定转换操作     | Stream<T>   | Function<T,Stream<R>> |
| sorted    | 对元素进行排序                     | Stream<T>   | Comparator<T>         |
| anyMatch  | 是否存在任意一个元素能满足指定条件 | boolean     | Predicate<T>          |
| noneMatch | 是否所有元素都不满足指定条件       | boolean     | Predicate<T>          |
| allMatch  | 是否所有元素都满足指定条件         | boolean     | Predicate<T>          |
| findAny   | 返回任意一个满足指定条件的元素     | Optional<T> |                       |
| findFirst | 返回第一个满足指定条件的元素       | Optional<T> |                       |
| forEach   | 对所有元素执行特定的操作           | void        | Cosumer<T>            |
| collect   | 使用收集器                         | R           | Collector<T, A, R>    |
| reduce    | 执行归约操作                       | Optional<T> | BinaryOperator<T>     |
| count     | 计算流中元素的数量                 | long        |                       |

> 注：上表中返回类型为 Stream<T> 的操作都是中间操作，代表还可以继续调用其它方法对流进行处理。返回类型为其它的操作都是终止操作，代表处理过程到此为止



### Optional

> Optional 类是一个可以为null的容器对象。如果值存在则isPresent()方法会返回true，调用get()方法会返回该对象。

#### 作用:

- Optional 是个**容器**：它可以保存类型T的值，或者仅仅保存null。

- 通过Optional提供的方法可以**隐式判空**。简化`if-else`或者判空操作

- 解决程序中常见的`NullPointerException`（空指针异常）异常问题

#### 创建Optional对象

> `Optional`类提供类三个方法用于实例化一个`Optional`对象，它们分别为`empty()`、`of()`、`ofNullable()`
>
> 这三个方法都是静态方法，可以直接调用。

| 方法                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `static <T> Optional<T> empty()`                             | 返回空的 Optional 实例。                                     |
| `static <T> Optional<T> of(T value)`                         | 返回一个指定非null值的Optional。                             |
| `static <T> Optional<T> ofNullable(T value)`                 | 如果为非空，返回 Optional 描述的指定值，否则返回空的 Optional。 |
| `<U>Optional<U> map(Function<? super T,? extends U> mapper)` | 如果有值，则对其执行调用映射函数得到返回值。如果返回值不为 null，则创建包含映射返回值的Optional作为map方法返回值，否则返回空Optional。 |
| `Optional<T> filter(Predicate<? super <T> predicate)`        | 如果值存在，并且这个值匹配给定的 predicate，返回一个Optional用以描述这个值，否则返回一个空的Optional。 |
| **`T get()`**                                                | Optional对象中存在不为空的值，返回值，否则抛出异常：`NoSuchElementException`(`Optional.empty() 上调也报异常`) |
| `int hashCode()`                                             | 返回存在值的哈希码，如果值不存在 返回 0。                    |
| `boolean equals(Object obj)`                                 | 判断其他对象是否等于 Optional。                              |
| **`void ifPresent(Consumer<? super T> consumer)`**           | 如果值存在则使用该值调用 consumer , 否则不做任何事情。       |
| `boolean isPresent()`                                        | 如果值存在则方法会返回true，否则返回 false。                 |
| `T orElse(T other)`                                          | 如果存在该值，返回值， 否则返回 other。                      |
| `T orElseGet(Supplier<? extends T> other)`                   | 不为空时，返回该值；为空时，设置默认值（根据参入的参数来创建对象的默认值） |
| `<X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier)` | 不为空时，返回该值； 为空时，通过Supplier函数接口自定义异常抛出 |

##### `empty()` 

> 创建一个没有值的Optional对象

```java
 Optional<String> optionalITest=Optional.empty();
```

##### `of()`

> 使用一个非空的值创建Optional对象
>
> (null的数据传入,在编译阶段就报空指针异常)

```java
String str = "Hello World";
Optional<String> notNullOpt = Optional.of(str);
```

##### `ofNullable()` (推荐)

> 接收一个可以为null的值：

```java
Optional<String> nullableOpt = Optional.ofNullable(str);
```

如果str的值为`null`，得到的`nullableOpt`是一个没有值的`Optional`对象。

总结：一般使用`Optional.ofNullable(obj) `来构造optional实例对象

#### 其他方法： 

##### `orElse(T other)` 

> 不为空时，返回该值
>
> 为空时，返回指定值other  

```java
Optional<String> optionalITest=Optional.ofNullable(null);
String s = optionalITest.orElse("");
```

实例:

```java
return str != null ? str : "Hello World"
//简化代码    
return strOpt.orElse("Hello World")
```

原本:

```java
return str != null ? str : "Hello World"
```

改进后：

```java
return strOpt.orElse("Hello World")
```



#### 安全消费值

##### `ifPresent(Consumer<? super T>)`

> 该方法，接收`Consumer<? super T>`一般用于消费参数(将参数打印到后台)
>
> 如果为空值，则不做任何事情（不消费该值）。
>
> - 区别boolean  isPresent()方法不传参
>
>   不为空返回true，为空返回 false。

避免空指针异常：

```java
//getAuthor()获得一个 List<author>集合
Optional<Author> authorOptional1 = Optional1.ofNullable(getAuthor());
authorOptional1.ifPresent(author -> System.out.prinLn(author.getName()));
```

#### 获取值

##### T get()

> **`T get()`**方法，
>
> 不为空时，返回该值；
>
> 为空时，抛出异常；
>
> `NoSuchElementException`(`Optional.empty() 上调也报异常`)
>
> 所以不推荐使用

#### 安全获取值

##### `orElseGet`

> `T orElseGet(Supplier<? extends T> other)`
>
> 不为空时，返回该值；
>
> 为空时，设置默认值（根据参入的参数来创建对象的默认值）

```java
Optional<List<String>> optionalITest=Optional.ofNullable(null);
optionalITest.orElseGet(()->new ArrayList<>());
//为空，orElseGet返回new ArrayList<>()集合
```



##### `orElseThrow` 

> `<X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier)`
>
> 不为空时，返回该值
>
> 为空时，通过Supplier函数接口自定义异常抛出

```java
        Optional<List<String>> optionalITest=Optional.ofNullable(null);
        optionalITest.orElseThrow(() -> new IllegalArgumentException("自己设定的异常"));
```

#### 过滤

##### filter

> `Optional<T> filter(Predicate<? super <T> predicate)`
>
> 不为空时，触发过滤条件，符合过滤条件的被过滤掉，则返回空的optional对象
>
> 为空时，直接返回空optional对象
>
> - 与stream区别：
>
>   stream返回一个过滤后的stream对象，
>
>   optional返回一个过滤后的optional对象

```java
Optional<String> optionalITest=Optional.ofNullable("add");
        Optional<String> a = optionalITest.filter(s -> s.startsWith("a"));
       //上面被过滤掉了，下面消费跳过消费
        a.ifPresent(System.out::println);
```



#### 判断

##### isPresent

>`boolean isPresent()`
>
>不为空返回true；
>
>为空返回false；
>
>isPresent与ifPresent区别：
>
>- isPresent不能体系Optional的好处，所以不推荐
>- ifPresent，不为空时能触发消费逻辑，处理optional对象

```java
Optional<Author> authorOptional2 = Optional1.ofNullable(getAuthor());
//authorOptional2.isPresent(author -> System.out.prinLn(author.getName()));
if(authorOptional2.isPresent){
     System.out.prinLn(authorOptional2.get().getName())
}
```



#### 数据转换

##### map(T -> R)

>`<U>Optional<U> map(Function<? super T,? extends U> mapper)`
>
>+ 不为空时，通过映射对数据进行转换处理，返回Optional对象
>+ 为空时，直接返回空Optional对象

```java
Optional<Author> authorOptional = Optional1.ofNullable(getAuthor());
Optional<List<Book>> books = authorOptional.map( author -> author.getBooks());
//books这个是个Optional对象，还能进行一些optional的操作
```





### 方法引用`::`

> 方法引用就是 Lambda 表达式，也就是**函数式接口的一个实例**，通过方法的名字来指向一个方法。

- 通过方法的名字来指向一个方法
- 使语言的构造更紧凑简洁，减少冗余代码

#### 使用场景

> 当要传递给 Lambda 体的操作，已经实现的方法了，可以使用方法引用！

####   格式：

```java
类名(或对象名) :: 方法名
```

接口中的抽象方法的形参列表和返回值类型与方法引用的方法的形参列表和返回值类型相同

##### 引用类的静态方法

> 采用**擦除法**，去掉左右两边一致的参数表

###### 格式: `类名::静态方法名`

###### 条件:

- 方法体只有一行代码
- 该代码调用了某个类的静态方法
- 重写的抽象方法的所有参数都按顺序传入静态方法中(**参数左右两边一致**)

- 类名 `::` 静态方法名

  ```
  //lambda表达式
  (参数1，参数2)-> 类名.静态方法名(参数1，参数2)
  
  //方法引用(去掉左右两边一致的参数表)
  类名::静态方法名
  ```

  实例:

  ```java
  List<Author>  authors = getAuthors();
  Stream<Author> authorStream = authors.stream();
  authorStream.map(author -> author.getAge())
             // .map(age -> String.valueOf(age));
                .map( String::valueOf );
  /**         1.方法体只有一行代码
  *           2.该代码调用了 String类里面的静态方法valueOf
  *           3.参数左右2边一致
  */
  ```

##### 引用对象的实例方法

###### 格式:      实例对象 `::` 实例方法

> 实例方法(非静态方法)

###### 条件:

- 方法体只有一行代码
- 该代码调用了某个**对象的成员方法**(非静态方法 ~~statis~~)
- **重写的抽象方法**的所有参数都按顺序传入**成员方法**中(**参数左右两边一致**)

实例:

```java
//函数式接口Supplier中的T get()    不传参数,返回一个T类型对象
//Employee中的String getName()
@Test
public void test2() {
    Employee emp = new Employee(1001,"Tom",23,5600);
    Supplier<String> sup1 = () -> emp.getName();
    System.out.println(sup1.get());
    System.out.println("*******************");

    Supplier<String> sup2 = emp::getName;
    System.out.println(sup2.get());
}


class A {
  void aa(String s) {
    System.out.println(s);
  }
}

interface B {
  void b(String s);
}

A a = new A();
//lambda表达式实现了 B函数式接口中的b方法
//  B b = s -> a.aa(s); 
   B b = a::aa;
/**         1.方法体只有一行代码
*           2.该代码调用了 A对象的成员方法aa
*           3.参数左右两边一致
*/
```

##### 引用类的实例方法(复杂)

###### 格式:    类名 `::` 实例方法

> 实例方法(非静态方法 ~~static~~)

###### 条件:

- 方法体只有一行代码
- 该代码**第一个参数的调用了成员方法**
- 重写的抽象方法的**剩余参数**都按顺序传入**成员方法**中 (箭头右边:`参数.成员方法(剩余参数)`)

函数式接口方法的第一个参数是需要引用方法的调用者，并且第二个参数是需要引用方法的参数(或无参数)

```java
//lambda表达式
(参数1，参数2)-> 参数1.成员方法名(参数2)

//方法引用
类名::实例方法名
```

实例：

```java
public class MethodDemo {
    interface UseString{
        String use(String str,int start,int length);
    }
    public static String subAuthorName(String str, UseString useString){
        int start = 0;
        int length = 1;
        return useString.use(str,start,length);
    }
    public static void main(String[] args) {
//      subAuthorName("三更草堂", (s, beginIndex, endIndex) -> s.substring(beginIndex, endIndex));
        subAuthorName("三更草堂", String::substring);
    }
}
```

##### 构造器方法引用

###### 格式:      类名 `::` new

> 一行代码是构造器

###### 条件:

- 方法体只有一行代码
- 该代码调用了某个**类的构造方法**
- **重写的抽象方法**,所有参数都按顺序传入**构造方法**中(参数左右两边一致)

```java
        List<Author> authors = getAuthors();
        authors.stream()
              // 引用类的实例方法 类名::实例方法
              //.map(author -> author.getName())  
                .map(Author::getName) 
             //构造一个初始化为指定字符串内容的字符串构建器。字符串生成器的初始容量是16加上字符串参数的长度
             // .map(str -> new StringBuilder(str))
                .map(StringBuilder::new)
                .map(sb->sb.append("-三更").toString())
            //  引用类的静态方法 类名::静态方法
            //  .forEach(x -> System.out.println(x));
                .forEach(System.out::println);
```

| 类型         | 方法引用           | Lambda表达式                         |
| ------------ | ------------------ | ------------------------------------ |
| 静态方法引用 | 类名::staticMethod | (args) -> 类名.staticMethod(args)    |
| 实例方法引用 | inst::instMethod   | (args) -> inst.instMethod(args)      |
| 对象方法引用 | 类名::instMethod   | (inst,args) -> 类名.instMethod(args) |
| 构建方法引用 | 类名::new          | (args) -> new 类名(args)             |



### 基本数据类型优化

- mapToInt
- mapToLong
- mapToDouble
- flatMapToInt
- flatMapToDouble

```java
     List<Author> authors = getAuthors();
        authors.parallelStream()
                .map(author -> author.getAge())
                .map(age -> age + 10)
                .filter(age->age>18)
                .map(age->age+2)
                .forEach(System.out::println);

        authors.stream()
                .mapToInt(author -> author.getAge())
                .map(age -> age + 10)
                .filter(age->age>18)
                .map(age->age+2)
                .forEach(System.out::println);
```

