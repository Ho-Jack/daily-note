# JavaBean 和POJO

- POJO(Plain Ordinary Java Object)即普通Java类

-  JavaBean  JAVA语言写成的可重用组件

  

## POJO

> POJO(Plain Ordinary Java Object)即普通Java类 (简单的实体类/JavaBean)

POJO的标准:

- 有一些private的参数作为对象的属性，然后针对每一个参数定义get和set方法访问的接口。
- 没有从任何类继承、也没有实现任何接口，更没有被其它框架侵入的java对象。

```java
public class BasicInfoVo {
	private String orderId;
	private Integer uid;
	
	public String getOrderId() {
    	return orderId;
	}
 
	public void setOrderId(String orderId) {
    	this.orderId = orderId;
	}
 
	public Integer getUid() {
    	return uid;
	}
 
	public void setUid(Integer uid) {
    	this.uid = uid;
	}
}
```

## JavaBean

> JavaBean是一种Java类，而且是一种特殊的、可重用的类。

JavaBean的标准:

- 类名修饰词: public
- 所有属性为private。
- 提供无参数的构造器。
- 类的属性使用getter和setter来访问，其他方法遵从标准命名规范。
- 类应是可序列化的。实现serializable接口。

```java
public class UserInfo implements java.io.Serializable{  
	//实现serializable接口。  
	private static final long serialVersionUID = 1L;  
 
	private String name;  
	private int age;  
 
	//无参构造器  
	public UserInfo() {  
	 
	}  
 
	public String getName() {  
	    return name;  
	}  
 
	public void setName(String name) {  
  		this.name = name;  
	}  
 
	public int getAge() {  
    	return age;  
	}  
 
	public void setAge(int age) {  
    	this.age = age;  
	}  
 
	//javabean当中可以有其它的方法  
	public void userInfoPrint(){  
    	System.out.println("Hello World");  
	}  
}

```

## 二者的区别

- POJO其实是比javabean更纯净的简单类或接口。POJO严格地遵守简单对象的概念，而一些JavaBean中往往会封装一些简单逻辑。
- POJO主要用于数据的临时传递，它只能装载数据， 作为数据存储的载体，而不具有业务逻辑处理的能力。
- Javabean虽然数据的获取与POJO一样，但是Javabean当中可以有其它的方法
  