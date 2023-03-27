# JVM、JRE、JDK

JVM（Java Virtual Machine），Java虚拟机，java程序需要在jvm上运行

JRE（Java Runtime Environment），Java运行环境，包含了JVM和Java的核心类库（可供我们直接使用的代码）

JDK（Java Development Kit）称为Java开发工具，包含了JRE和开发工具

![image-20200811220157647](img\image-20200811220157647.png)



作为一个Java开发者我们需要安装什么呢？JDK

## JDK的安装和配置


### JDK安装

傻瓜式安装，下一步即可。但默认的安装路径是在C:\Program Files下，建议修改到其他盘符，例如：D:\Program Files\Java\jdk1.8.0_162\  

**注意**：安装路径不要包含中文或者空格等特殊字符（使用纯英文目录）。

### 验证

进入jdk安装目录的bin目录下，在该目录下打开控制台，输入java -version目录进行测试

如果出现类似如图效果即算安装成功

![image-20200810222448576](D:/工作/个人脑图/课程/课程资料/讲义/JavaSE/img/image-20200810222448576.png)

### 环境变量配置

为了让我们在任意目录下都可以使用jdk提供的开发工具。我们需要把这些工具所在的目录配置到环境变量中。

配置JAVA_HOME系统变量

![image-20200812070406801](img\image-20200812070406801.png)

配置Path环境变量再最前面加上：  %JAVA_HOME%\bin

![image-20200812070531763](img\image-22220812070531763.png)

配置完成后我们在任意目前下打开控制台都可以去使用jdk中自带的一些开发工具了。



## 作业

安装配置好JDK8后，尝试再安装一个JDK12。思考怎么做可以去修改我们在控制台中所使用的JDK的版本。

**具体答案可以加入到学习探讨QQ群中获取。**



