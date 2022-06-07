# JavaBean

## JavaBean定义：

> JavaBean是一种Java类，而且是一种特殊的、可重用的类。

- public 修饰的类 ,public 无参构造

- 所有属性(如果有) 都是private，并且提供set/get (如果boolean 则get 可以替换成is)



## JavaBean实现形式：

### 封装数据的JavaBean(实体类)

>封装数据的JavaBean(实体类),一般来说对应的是数据库中的一张表

```java
public class UserDemo {
	private int id;
	private String uname;
	private String upwd;
	 //无参构造器
	public Login() {
	}
	
	public Login( String uname, String upwd) {
		this.uname = uname;
		this.upwd = upwd;
	}
	
	
	public Login(int id, String uname, String upwd) {
		this.id = id;
		this.uname = uname;
		this.upwd = upwd;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUpwd() {
		return upwd;
	}
	public void setUpwd(String upwd) {
		this.upwd = upwd;
	}
}
```

### 封装逻辑的JavaBean

>作用：实现业务逻辑。
>
>目的：提高代码的复用和解耦