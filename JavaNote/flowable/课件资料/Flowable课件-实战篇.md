# Flowable实战篇

> lecture：波波老师



# 一、Flowable整合SpringBoot

## 1.添加相关依赖

```xml
<dependency>
            <groupId>org.flowable</groupId>
            <artifactId>flowable-spring-boot-starter</artifactId>
            <version>6.6.0</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.14</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.21</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
```



## 2.添加对应的配置

```yml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/flowable1?serverTimezone=UTC&nullCatalogMeansCurrent=true
    username: root
    password: 123456
    hikari:
      minimum-idle: 5
      idle-timeout: 600000
      maximum-pool-size: 10
      auto-commit: true
      pool-name: MyHikariCP
      max-lifetime: 1800000
      connection-timeout: 30000
      connection-test-query: SELECT 1
flowable:
  async-executor-activate: false #关闭定时任务JOB
  #  将databaseSchemaUpdate设置为true。当Flowable发现库与数据库表结构不一致时，会自动将数据库表结构升级至新版本。
  database-schema-update: true
server:
  port: 8082
```

系统启动的时候检查如果数据库对应的表结构没有创建，会帮助我们先创建对应的表结构



## 3.案例应用

### 3.1 流程部署

- *processes*目录下的任何BPMN 2.0流程定义都会被自动部署。创建*processes*目录，并在其中创建示例流程定义（命名为*one-task-process.bpmn20.xml*）。
- *cases*目录下的任何CMMN 1.1事例都会被自动部署。
- *forms*目录下的任何Form定义都会被自动部署。

![image-20220328110737387](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220328110737387.png)



通过手动方式来部署

```java

@SpringBootTest
class FlowableSpringBoot28ApplicationTests {

    @Autowired
    private ProcessEngine processEngine;

    @Autowired
    private RepositoryService repositoryService;


    @Autowired
    private TaskService taskService;


    @Autowired
    private RuntimeService runtimeService;


    /**
     * Deploy
     */
    @Test
    void testDeploy() {
        //RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("请假流程.bpmn20.xml")
                .name("holiday")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
    }

}

```





### 3.2 启动流程

&emsp;&emsp;启动流程和前面介绍的就没什么差异了，通过RuntimeService来实现

```java
    /**
     * start process
     */
    @Test
    void startFlow(){
        Map<String,Object> map = new HashMap();
        map.put("assignee0","zhangsan");
        map.put("assignee1","zhangsan");
        runtimeService.startProcessInstanceById("holiday28:2:3653a34e-ae45-11ec-969d-c03c59ad2248",map);
    }
```



### 3.3 处理流程

&emsp;&emsp;处理流程和前面介绍的也一样，通过TaskService来处理

```java
    /**
     * complete Task
     */
    @Test
    void completeTask(){
        Task task = taskService.createTaskQuery()
                .processInstanceId("fb166cd8-ae45-11ec-92c4-c03c59ad2248")
                .taskAssignee("zhangsan")
                .singleResult();
        if(task != null){
            taskService.complete(task.getId());
            System.out.println("complete ....");
        }
    }
```

