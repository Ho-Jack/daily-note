# Serializable接口

> Serializable是Java提供的通用数据保存、读取和传输的序列化和反序列化接口
>
> 除了Serializable 之外，java中还提供了另一个序列化接口`Externalizable`

Java中创建的对象，存在于JVM的堆内存中，只有JVM处于运行状态时才是读取和复用该对象；

**对象序列化机制**（object serialization）是Java语言内建的一种对象持久化方式，通过对象序列化，可以把对象的状态保存为**字节数组**，并且可以在有需要的时候将这个字节数组通过反序列化的方式再转换成对象。对象序列化可以很容易的在JVM中的活动对象和字节数组（流）之间进行转换。

在Java中，对象的序列化与反序列化被广泛应用到RMI(远程方法调用)及网络传输中。

## Java中对象序列化的相关接口及类

- java.io.Serializable
- java.io.Externalizable
- ObjectOutput
- ObjectInput
- ObjectOutputStream
- ObjectInputStream

## 1、`Serializable作用`

> 作用：Java对象的持久化

- 序列化：通过实现Serializable接口的类，该类所实例化的对象(实例变量)的状态信息在[内存](https://so.csdn.net/so/search?q=内存&spm=1001.2101.3001.7020)中可以持久化保存、传输

  ![Serializablex序列化](\img\Serializablex序列化.png)

- 反序列化： 将序列化的结果变成对象的过程

  ![Serializablex反序列化](\img\Serializablex反序列化.png)

  

## 2、序列化实现的是深拷贝

> 一个聚合对象里的其他任何非基本数据类型和对象包装类，都必须要实现serializable接口





## 3、 serialVersionUID

虚拟机是否允许反序列化， 不仅取决于类路径和功能代码是否⼀致， ⼀个⾮常重要的⼀点是两个类的序列化 ID 是否⼀致， 即`serialVersionUID`要求⼀致。

在进⾏反序列化时， JVM会把传来的字节流中的`serialVersionUID`与本地相应实体类的`serialVersionUID`进⾏⽐较， 如果相同就认为是⼀致的， 可以进⾏反序列化， 否则就会出现序列化版本不⼀致的异常， 即是`InvalidCastException`。

作用：保证安全， 因为⽂件存储中的内容可能被篡改

基于以上原理， 如果我们⼀个类实现了Serializable接口， 但是没有定义`serialVersionUID`， 然后序列化。 在序列化之后， 由于某些原因， 我们对该类做了变更， 重新启动应⽤后， 我们相对之前序列化过的对象进⾏反序列化的话就会报错

### 3.1. 明确定义一个serialVersionUID

> 不明确定义一个serialVersionUID，系统自己添加了一个`serialVersionUID`。

如果一个类实现了`Serializable`接口，就必须手动添加一个`private static final long serialVersionUID`变量，并且设置初始值。。不然在修改类的时候，就会发生异常。

```java
private static final long serialVersionUID = 1L;
```

### 3.2. 总结

`serialVersionUID`是用来验证版本一致性的。所以在做兼容性升级的时候，不要改变类中`serialVersionUID`的值。

如果一个类实现了Serializable接口，一定要记得定义`serialVersionUID`，否则会发生异常。可以在IDE中通过设置，让他帮忙提示，并且可以一键快速生成一个`serialVersionUID`。