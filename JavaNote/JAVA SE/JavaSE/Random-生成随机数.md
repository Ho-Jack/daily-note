# Random-生成随机数

我们可以通过 Random 类来生成随机数。

## 使用步骤

由于目前相关语法还没学习，所以先把步骤记住。后面学习了相关语法再来讲解。

1、导包。在定义类的上面写上下面的语句。

~~~java
import java.util.Random；
~~~

2、创建对象

~~~java
Random r = new Random();
~~~

3、生成随机数

 ~~~java
int num = r.nextInt(10);//[0,9]
 ~~~

演示：

~~~java
//导包
import java.util.Random;
public class RandomDemo {
    public static void main(String[] args) {
        Random r = new Random();
        int num = r.nextInt(10)+ 1;//[1,10]
        System.out.println(num);
    }
}
~~~



