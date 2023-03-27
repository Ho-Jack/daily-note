# Scanner-键盘录入数据

我们可以通过 Scanner 类来获取用户的键盘录入的数据。

## 使用步骤

由于目前相关语法还没学习，所以先把步骤记住。后面学习了相关语法再来讲解。

1、导包。在定义类的上面写上下面的语句。

~~~java
import java.util.Scanner; 
~~~

2、创建对象

~~~java
Scanner sc = new Scanner(System.in);
~~~

3、接收用户录入的数据并存储

 ~~~java
int num = sc.nextInt(); // 表示将键盘录入的值作为int数返回。
 ~~~

演示：

~~~java
//导包
import java.util.Scanner;
public class ScannerDemo {
	public static void main(String[] args) {
		//创建对象
		Scanner sc = new Scanner(System.in);
		//接收数据
		int x = sc.nextInt();
		//输出数据
		System.out.println(x);
	}
}
~~~

