# 流程控制语句-switch

使用switch也可以根据判断不同的情况做不同的处理。

## 格式

~~~~java
		switch (表达式) {
			case 值1:
				语句体1;
				break;
			case 值2:
				语句体2;
				break;
			case 值3:
				语句体3;
				break;
			...
			default:
				语句体n+1;
				break; // 最后一个break语句可以省略，但是推荐不要省略
		}

~~~~

switch后面小括号当中只能是下列数据类型：
			**基本数据类型：byte/short/char/int**
			**引用数据类型：String字符串、enum枚举**

例如：

~~~~java
    public static void main(String[] args) {
        int num = 2;
        switch (num){
            case 1:
                System.out.println(1);
                break;
            case 2:
                System.out.println(2);
                //break;
            case 3:
                System.out.println(3);
                //break;
            default:
                System.out.println("default");
                break;
        }
        
    }
~~~~

## 执行流程

​      从上到下依次看表达式的结果和哪个case后面的值相同,相同就执行那个case后面的语句体,碰到break就结束switch.
​	  如果没有符合要求的case则执行default后面的语句体.

## 注意事项

​	①switch可以没有default,但是一般都会加上
​	②case语句后面可以不加break.但是如果不加break就可能会出现case穿透问题.匹配哪一个case就从哪一个位置向下执行，直到遇到了break或者整个switch结束为止;

## 小思考

switch和if都可以做多种情况的判断,那他们之间有什么区别呢?你觉得谁更灵活?

> tips:可以从他们小括号里能写的表达式的类型方面去考虑
> if的小括号中是布尔表达式，switch是byte,short...

答案：

if的表达式的布尔表达式，可以进行更复杂条件的判断(例如：值在某个范围内，多个条件同时符合等)而switch的表达式的数据类型只能适合做有限个数的等值判断。所以如果是有限个数的等值判断的话switch有的时候会更方便。其他情况下if会更适合。 

## 练习

1.键盘输入0-6之间的整数，分别代表每周的星期日、星期一、

…、星期六在控制台进行输出。如果用户输入了0-6之外的数提示：请输入0-6之间的整数。







2.一年有12个月，分属于春夏秋冬4个季节，键盘录入一个月份，请用程序实现判断该月份属于哪个季节，并输出。 

春：3、4、5
夏：6、7、8
秋：9、10、11
冬：1、2、12

