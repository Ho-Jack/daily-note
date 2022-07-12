## 1. 属性注入@Autowired    

```java
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

}
```

## 2.构造器注入

```java
@RestController
public class OrderController {

   private final OrderService orderService;

    //@Autowired Spring4.3+之后，constructor注入支持非显示注入方式。
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

}
```

## 3.setter方式

```java
@RestController
public class OrderController {

    private OrderService orderService;

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }
}
```

## 4.lombok提供的@RequiredArgsConstructor方式

```java
@RestController
@RequiredArgsConstructor
public class OrderController {

   private final OrderService orderService;

}
```

Spring4.x之后，注入方式应该按需选择setter或constructor注入方式。



```dart
官方为什么不推荐字段注入

1.单一职责侵入
添加依赖是很简单的，可能过于简单了。添加六个、十个甚至一堆依赖一点也没有困难，使得我们不易察觉违反单一职责原则的程序。
而使用构造器注入方法时，发现违反单一职责原则的程序则相对容易了。在使用构造器方式注入时，到了某个特定的点，构造器中的参数变得太多以至于很明显地发现something is wrong。拥有太多的依赖通常意味着你的类要承担更多的责任。明显违背了单一职责原则（SRP：Single responsibility principle）。

2.无法声明不变的字段。
字段注人无法注入final字段，只有构造器注入才能注入final字段

3.隐藏了依赖关系
使用依赖注入容器意味着类不再对依赖对象负责，获取依赖对象的职责从类中抽离出来，IoC容器会帮你装配。当类不再为依赖对象负责，它应该更明确的使用公有的接口方法或构造器，使用这种方式能很清晰的了解类需要什么，也能明确它是可选的(setter注入)还是强制的(构造器注入)。

4.依赖注入容器紧耦合
依赖注入框架的核心思想之一就是受容器管理的类不应该去依赖容器所使用的依赖对象。换句话说，这个类应该是一个简单的POJO(Plain Ordinary Java Object)能够被单独实例化并且你也能为它提供它所需的依赖。只有这样，你才能在单元测试中实例化这个类而不必去启动依赖注入容器，实现测试分离(启动容器更多是集成测试)。
然而，当使用变量直接注入时，没有一种方式能直接地实例化这个类并且满足其所有的依赖。这意味着需要手动new出来依赖对象或者只能在IoC Container范围使用。
```

循环依赖
 依赖注入稍不注意就会出现循环依赖：
 Bean之间的依赖顺序： BeanA -> BeanB -> BeanA
 解决方案:
 1.重新设计依赖关系
 2.改用setter按需注入
 3.@Lazy注解



作者：CyRax
链接：https://www.jianshu.com/p/53ef0fcf5672
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。