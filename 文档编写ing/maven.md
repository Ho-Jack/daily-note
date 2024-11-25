# maven认识与安装配置



# MAVEN

> Maven的含义：**Maven 是由java开发的一个项目管理和整合工具**。Maven项目对象模型(POM)，可以通过一小段描述信息来管理项目的构建，报告和文档的软件项目管理工具。Maven 为开发者提供了一套完整的构建生命周期框架。开发团队几乎不用花多少时间就能够自动完成工程的基础构建配置，因为 Maven 使用了一个标准的目录结构和一个默认的构建生命周期。

Maven的优势:

- 自动构建（清理、编译、测试、报告、打包(jar,war)、项目部署...）
- jar包依赖管理（根据pom.xml中的配置，自动导包，本地仓库没有，找中央仓库）
- 契约编程（按照一定规范格式，代码更加规范）

------

## 自动构建

1. 清理代码:相当于我们运行clear的效果
2. 自动编译:可以为咱们自动完成编译(类似于执行javac生成class文件)
3. 完成测试:实现测试功能
4. 生成报告:可以较为方便的实现对项目的管理
5. 打包:普通项目打jar包，web项目打成war包
6. 项目部署:只需要一句命令mvn jetty:run即可实现项目的部署

**注意:** 使用jetty:run命令必需有相应的配置与插件 (Maven的命令很多，但不是你想用，想用就能用，有一些命令是需要有插件的)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9ca46ab947540d7abb2b026e6b311b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

------

## jar包依赖管理

当我们需要导入一个功能jar包，而它又依赖于其它的jar包。靠手动导包，耗时耗力，而Maven完美的解决了这个问题，我们只需要导入功能包，它会为我们**自动把对应的依赖包导入**。

**注意：** 使用maven导包需要我们进行相应的xml配置(pom.xml)

------

## 契约编程

约定好项目的基本结构。Maven项目的结构就必需是Maven要求的结构，这种契约编程让代码结构有统一的规范,让多人(多团队)开发变得更加的简单。

**同一个Maven结构的项目可以在各种不同的开发工具中运行。**

------

## maven安装

安装maven需要配置jdk及maven环境变量 **配置JAVA_HOME、MAVEN_HOME及对应path**

------

## 配置本地仓库

- 准备本地仓库
- 拷贝maven安装目录conf文件夹下settings.xml到C盘.m2目录下，并删除.m2下的默认仓库。
  - 对于初学者而言，初次安装配置好maven之后，**发现目录下不存在.m2文件夹**，其原因是没有执行任何maven相关的命令，执行之后maven才会自动去创建.m2文件夹。我们可以在maven的bin目录下打开cmd命令行，执行**mvn help:system**命令，执行完后就有.m2文件夹了。
- C:\Users\Administrator/.m2/settings.xml，xml文件里配置本地仓库路径，settings标签下

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43a669adeaa54233b76320640bc6ee62~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

------

## 配置阿里镜像

在maven的settings.xml文件里的mirrors节点，添加如下子节点：

```xml
xml复制代码<mirror>  
    <id>nexus-aliyun</id>  
    <mirrorOf>central</mirrorOf>    
    <name>Nexus aliyun</name>  
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>  
</mirror> 
```

------

# maven常用命令

打开cmd命令行，进入Hello项目根目录

1. 执行 **mvn compile** 编译
2. **mvn clean** 清理
3. **mvn clean compile** 先清理再编译
4. **mvn test** 测试（运行几个、失败几个、错误几个）
5. **mvn package** 打包
6. **mvn source:jar** 打源码包
7. mvn site 生成一个网站（文档）
8. **mvn install** 把jar打好放到本地仓库
9. mvn eclipse:eclipse 生成Eclipse的需要2个文件
10. mvn package -Dmaven.test.skip=true 打包时不执行测试用例的命令

------

# pom.xml的基本配置

```xml
xml复制代码<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<!-- 组id：包名 -->
	<groupId>cn.itsource.maven</groupId>
	<!-- 模块名：和工程名一致 -->
	<artifactId>Hello</artifactId>
	<!-- 版本号 
            SNAPSHOT快照，不稳定，随时都在修改bug
            RELEASE 释放，稳定版本
        -->
	<version>0.0.1-SNAPSHOT</version>
	<!-- 项目名 -->
	<name>hello</name>
	<!-- jar文件依赖 -->
	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.9</version>
			<!-- 只能在测试里面使用src/test/java -->
			<scope>test</scope>
		</dependency>
	</dependencies>
</project>
```

------

# 查找maven包

需要导入什么包，网上直接搜索拷贝到pom.xml

网址：[mvnrepository.com/](https://link.juejin.cn/?target=http%3A%2F%2Fmvnrepository.com%2F)