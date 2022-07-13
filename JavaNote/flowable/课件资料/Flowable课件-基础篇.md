# 最新Flowable工作流教程

> lecture：邓澎波



# 一、Flowable介绍

&emsp;&emsp;Flowable是BPMN的一个基于java的软件实现，不过Flowable不仅仅包括BPMN，还有DMN决策表和CMMN Case管理引擎，并且有自己的用户管理、微服务API等一系列功能，是一个服务平台。



![image-20220317101115398](img\image-20220317101115398.png)





# 二、Flowable基础

官方手册：https://tkjohn.github.io/flowable-userguide/#_introduction

## 1.创建ProcessEngine

&emsp;&emsp;创建一个基本的maven工程，可以是Eclipse也可以是其他IDEA。然后添加两个依赖

* Flowable流程引擎。使我们可以创建一个ProcessEngine流程引擎对象，并访问Flowable API。
* 一个是MySQL的数据库驱动

在*pom.xml*文件中添加下列行：

```xml
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-engine</artifactId>
    <version>6.3.0</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.21</version>
</dependency>
```

&emsp;&emsp;然后创建一个普通的Java类，添加对应的main方法，首先要做的是初始化**ProcessEngine**流程引擎实例。这是一个线程安全的对象，因此通常只需要在一个应用中初始化一次。 *ProcessEngine*由**ProcessEngineConfiguration**实例创建。该实例可以配置与调整流程引擎的设置。 通常使用一个配置XML文件创建*ProcessEngineConfiguration*，但是（像在这里做的一样）也可以编程方式创建它。 *ProcessEngineConfiguration*所需的最小配置，是数据库JDBC连接：

```java
public static void main(String[] args) {
    ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
        .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn?serverTimezone=UTC")
        .setJdbcUsername("root")
        .setJdbcPassword("123456")
        .setJdbcDriver("com.mysql.cj.jdbc.Driver")
        .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
    ProcessEngine processEngine = cfg.buildProcessEngine();
}
```

&emsp;&emsp;注意在mysql8.0中执行可能出现如下的错误

![image-20220316093416477](img\image-20220316093416477.png)

&emsp;&emsp;出现这种情况只需要在mysql的连接字符串中添加上nullCatalogMeansCurrent=true，设置为只查当前连接的schema库即可。

```java
    public static void main(String[] args) {
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn1?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        ProcessEngine processEngine = cfg.buildProcessEngine();
    }
```

&emsp;&emsp;然后应用运行没有问题，但也没有在控制台提供有用的信息，只有一条消息提示日志没有正确配置。Flowable使用[SLF4J](http://www.slf4j.org/)作为内部日志框架。在这个例子中，我们使用log4j作为SLF4J的实现。因此在pom.xml文件中添加下列依赖：

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.21</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.21</version>
</dependency>
```

&emsp;&emsp;Log4j需要一个配置文件。在*src/main/resources*文件夹下添加*log4j.properties*文件，并写入下列内容：

```properties
log4j.rootLogger=DEBUG, CA

log4j.appender.CA=org.apache.log4j.ConsoleAppender
log4j.appender.CA.layout=org.apache.log4j.PatternLayout
log4j.appender.CA.layout.ConversionPattern= %d{hh:mm:ss,SSS} [%t] %-5p %c %x - %m%n
```

&emsp;&emsp;重新运行应用。应该可以看到关于引擎启动与创建数据库表结构的提示日志：

![image-20220316093922199](img\image-20220316093922199.png)

&emsp;&emsp;同时可以看到创建了相关的表结构在数据库中

![image-20220316093957662](img\image-20220316093957662.png)

&emsp;&emsp;这样就得到了一个启动可用的流程引擎。接下来为它提供一个流程！



## 2.部署流程定义

&emsp;&emsp;接下来我们构建一个非常简单的请假流程，Flowable引擎需要流程定义为BPMN 2.0格式，这是一个业界广泛接受的XML标准。 在Flowable术语中，我们将其称为一个**流程定义(process definition)**。一个*流程定义*可以启动多个**流程实例(process instance)**。*流程定义*可以看做是重复执行流程的蓝图。 在这个例子中，*流程定义*定义了请假的各个步骤，而一个*流程实例*对应某个雇员提出的一个请假申请。

&emsp;&emsp;BPMN 2.0存储为XML，并包含可视化的部分：使用标准方式定义了每个步骤类型（人工任务，自动服务调用，等等）如何呈现，以及如何互相连接。这样BPMN 2.0标准使技术人员与业务人员能用双方都能理解的方式交流业务流程。

&emsp;&emsp;我们要使用的流程定义为：

![getting.started.bpmn.process](img\getting.started.bpmn.process.png)



&emsp;&emsp;流程定义说明：

* 我们假定启动流程需要提供一些信息，例如雇员名字、请假时长以及说明。当然，这些可以单独建模为流程中的第一步。 但是如果将它们作为流程的“输入信息”，就能保证只有在实际请求时才会建立一个流程实例。否则（将提交作为流程的第一步），用户可能在提交之前改变主意并取消，但流程实例已经创建了。 在某些场景中，就可能影响重要的指标（例如启动了多少申请，但还未完成），取决于业务目标。
* 左侧的圆圈叫做**启动事件(start event)**。这是一个流程实例的起点。
* 第一个矩形是一个**用户任务(user task)**。这是流程中用户操作的步骤。在这个例子中，经理需要批准或驳回申请
* 取决于经理的决定，**排他网关(exclusive gateway)** (带叉的菱形)会将流程实例路由至批准或驳回路径
* 如果批准，则需要将申请注册至某个外部系统，并跟着另一个用户任务，将经理的决定通知给申请人。当然也可以改为发送邮件。
* 如果驳回，则为雇员发送一封邮件通知他。



&emsp;&emsp;一般来说，这样的*流程定义*使用可视化建模工具建立，如Flowable Designer(Eclipse)或Flowable Web Modeler(Web应用)。但在这里我们直接撰写XML，以熟悉BPMN 2.0及其概念。

&emsp;&emsp;与上面展示的流程图对应的BPMN 2.0 XML在下面显示。请注意这只包含了“流程部分”。如果使用图形化建模工具，实际的XML文件还将包含“可视化部分”，用于描述图形信息，如流程定义中各个元素的坐标（所有的图形化信息包含在XML的*BPMNDiagram*标签中，作为*definitions*标签的子元素）。

&emsp;&emsp;将下面的XML保存在*src/main/resources*文件夹下名为*holiday-request.bpmn20.xml*的文件中。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:flowable="http://flowable.org/bpmn"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             expressionLanguage="http://www.w3.org/1999/XPath"
             targetNamespace="http://www.flowable.org/processdef">

    <process id="holidayRequest" name="Holiday Request" isExecutable="true">

        <startEvent id="startEvent"/>
        <sequenceFlow sourceRef="startEvent" targetRef="approveTask"/>

        <userTask id="approveTask" name="Approve or reject request"/>
        <sequenceFlow sourceRef="approveTask" targetRef="decision"/>

        <exclusiveGateway id="decision"/>
        <sequenceFlow sourceRef="decision" targetRef="externalSystemCall">
            <conditionExpression xsi:type="tFormalExpression">
                <![CDATA[
          ${approved}
        ]]>
            </conditionExpression>
        </sequenceFlow>
        <sequenceFlow  sourceRef="decision" targetRef="sendRejectionMail">
            <conditionExpression xsi:type="tFormalExpression">
                <![CDATA[
          ${!approved}
        ]]>
            </conditionExpression>
        </sequenceFlow>

        <serviceTask id="externalSystemCall" name="Enter holidays in external system"
                     flowable:class="org.flowable.CallExternalSystemDelegate"/>
        <sequenceFlow sourceRef="externalSystemCall" targetRef="holidayApprovedTask"/>

        <userTask id="holidayApprovedTask" name="Holiday approved"/>
        <sequenceFlow sourceRef="holidayApprovedTask" targetRef="approveEnd"/>

        <serviceTask id="sendRejectionMail" name="Send out rejection email"
                     flowable:class="org.flowable.SendRejectionMail"/>
        <sequenceFlow sourceRef="sendRejectionMail" targetRef="rejectEnd"/>

        <endEvent id="approveEnd"/>

        <endEvent id="rejectEnd"/>
    </process>

</definitions>
```

&emsp;&emsp;现在我们已经有了流程BPMN 2.0 XML文件，下来需要将它***部署(deploy)\***到引擎中。*部署*一个流程定义意味着：

* 流程引擎会将XML文件存储在数据库中，这样可以在需要的时候获取它
* 流程定义转换为内部的、可执行的对象模型，这样使用它就可以启动*流程实例*。



![image-20220317110902636](img\image-20220317110902636.png)



&emsp;&emsp;将流程定义*部署*至Flowable引擎，需要使用*RepositoryService*，其可以从*ProcessEngine*对象获取。使用*RepositoryService*，可以通过XML文件的路径创建一个新的*部署(Deployment)*，并调用*deploy()*方法实际执行：

```java
    /**
     * 部署流程
     */
    @Test
    public void testDeploy(){
        // 配置数据库相关信息 获取 ProcessEngineConfiguration
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        // 获取流程引擎对象
        ProcessEngine processEngine = cfg.buildProcessEngine();
        // 部署流程 获取RepositoryService对象
        RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deployment = repositoryService.createDeployment()// 创建Deployment对象
                .addClasspathResource("holiday-request.bpmn20.xml") // 添加流程部署文件
                .name("请求流程") // 设置部署流程的名称
                .deploy(); // 执行部署操作
        System.out.println("deployment.getId() = " + deployment.getId());
        System.out.println("deployment.getName() = " + deployment.getName());

    }
```

&emsp;&emsp;然后执行该方法日志操作成功：

![image-20220316100439048](img\image-20220316100439048.png)

&emsp;&emsp;在后台表结构也可以看到相关的信息

act_re_deployment: 流程定义部署表，每部署一次就增加一条记录

![image-20220316100532725](img\image-20220316100532725.png)



act_re_procdef ：流程定义表，部署每个新的流程定义都会在这张表中增加一条记录

![image-20220316100611004](img\image-20220316100611004.png)



act_ge_bytearray ：流程资源表，流程部署的 bpmn文件和png图片会保存在该表中

![image-20220316100648362](img\image-20220316100648362.png)





&emsp;&emsp;我们现在可以通过API查询验证流程定义已经部署在引擎中（并学习一些API）。通过*RepositoryService*创建的*ProcessDefinitionQuery*对象实现。

```java
/**
     * 查看流程定义
     */
    @Test
    public void testDeployQuery(){
        // 配置数据库相关信息 获取 ProcessEngineConfiguration
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        // 获取流程引擎对象
        ProcessEngine processEngine = cfg.buildProcessEngine();
        // 部署流程 获取RepositoryService对象
        RepositoryService repositoryService = processEngine.getRepositoryService();
        // 获取流程定义对象
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .deploymentId("2501")
                .singleResult();
        System.out.println("processDefinition.getId() = " + processDefinition.getId());
        System.out.println("processDefinition.getName() = " + processDefinition.getName());
        System.out.println("processDefinition.getDeploymentId() = " + processDefinition.getDeploymentId());
        System.out.println("processDefinition.getDescription() = " + processDefinition.getDescription());

    }
```

输出结果为：

```txt
processDefinition.getId() = holidayRequest:2:2503
processDefinition.getName() = Holiday Request
processDefinition.getDeploymentId() = 2501
processDefinition.getDescription() = null
```



## 3.启动流程实例

&emsp;&emsp;现在已经在流程引擎中*部署*了流程定义，因此可以使用这个*流程定义*作为“模板”启动*流程实例*。

![image-20220316102638015](img\image-20220316102638015.png)

&emsp;&emsp;要启动流程实例，需要提供一些初始化*流程变量*。一般来说，可以通过呈现给用户的表单，或者在流程由其他系统自动触发时通过REST API，来获取这些变量。在这个例子里，我们简化直接在代码中定义了，我们使用*RuntimeService*启动一个*流程实例*。

```java
    /**
     * 启动流程实例
     */
    @Test
    public void testRunProcess(){
        // 配置数据库相关信息 获取 ProcessEngineConfiguration
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        // 获取流程引擎对象
        ProcessEngine processEngine = cfg.buildProcessEngine();
        // 启动流程实例通过 RuntimeService 对象
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 构建流程变量
        Map<String,Object> variables = new HashMap<>();
        variables.put("employee","张三") ;// 谁申请请假
        variables.put("nrOfHolidays",3); // 请几天假
        variables.put("description","工作累了，想出去玩玩"); // 请假的原因
        // 启动流程实例，第一个参数是流程定义的id
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceByKey("holidayRequest", variables);// 启动流程实例
        // 输出相关的流程实例信息
        System.out.println("流程定义的ID：" + processInstance.getProcessDefinitionId());
        System.out.println("流程实例的ID：" + processInstance.getId());
        System.out.println("当前活动的ID：" + processInstance.getActivityId());
    }
```

启动成功，输出结果如下：

```txt
流程定义的ID：holidayRequest:2:2503
流程实例的ID：5001
当前活动的ID：null
```

对应的流程实例ID为：5001

启动流程实例涉及到的表结构：

* act_hi_actinst 流程实例执行历史
* act_hi_identitylink 流程的参与用户的历史信息
* act_hi_procinst 流程实例历史信息
* act_hi_taskinst 流程任务历史信息
* act_ru_execution 流程执行信息
* act_ru_identitylink 流程的参与用户信息
* act_ru_task 任务信息



## 4.查看任务

&emsp;&emsp;上面员工发起了一个请假流程，接下来就会流转到总经理这儿来处理，之前我们没有指定经理这的处理人，我们可以加一个

![image-20220316110406801](img\image-20220316110406801.png)



&emsp;&emsp;然后我们来查看下lisi的任务

```java
    /**
     * 查看任务
     */
    @Test
    public void testQueryTask(){
        // 配置数据库相关信息 获取 ProcessEngineConfiguration
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        // 获取流程引擎对象
        ProcessEngine processEngine = cfg.buildProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        List<Task> list = taskService.createTaskQuery()
                .processDefinitionKey("holidayRequestNew")
                .taskAssignee("lisi")
                .list();
        for (Task task : list) {
            System.out.println("task.getProcessDefinitionId() = " + task.getProcessDefinitionId());
            System.out.println("task.getId() = " + task.getId());
            System.out.println("task.getAssignee() = " + task.getAssignee());
            System.out.println("task.getName() = " + task.getName());
        }
    }
```

输出结果为：

```txt
task.getProcessDefinitionId() = holidayRequestNew:1:10003
task.getId() = 12508
task.getAssignee() = lisi
task.getName() = Approve or reject request
```



## 5.完成任务

&emsp;&emsp;现在李四这个角色可以来完成当前的任务了

![image-20220316111124019](img\image-20220316111124019.png)



&emsp;&emsp;在此处我们直接解决掉这个请假，然后会走发送拒绝邮件的流程，这块我们需要用到JavaDelegate来触发。

![image-20220316111253702](img\image-20220316111253702.png)



我们定义这样一个Java类

```java
public class SendRejectionMail implements JavaDelegate {
    /**
     * 触发发送邮件的操作
     * @param delegateExecution
     */
    @Override
    public void execute(DelegateExecution delegateExecution) {
        System.out.println("请假被拒绝,,,安心工作吧");
    }
}
```

然后来完成任务

```java
    /**
     * 完成任务
     */
    @Test
    public void testCompleteTask(){
        // 配置数据库相关信息 获取 ProcessEngineConfiguration
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        // 获取流程引擎对象
        ProcessEngine processEngine = cfg.buildProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionKey("holidayRequestNew")
                .taskAssignee("lisi")
                .singleResult();
        // 添加流程变量
        Map<String,Object> variables = new HashMap<>();
        variables.put("approved",false); // 拒绝请假
        // 完成任务
        taskService.complete(task.getId(),variables);
    }
```

然后可以看到JavaDelegate触发了

![image-20220316111913933](img\image-20220316111913933.png)





## 6.流程的删除

&emsp;&emsp;有些流程已经没有用了，我们需要删除掉，其实也非常简单

```java
    /**
     * 删除流程
     */
    @Test
    public void testDeleteProcess(){
        // 配置数据库相关信息 获取 ProcessEngineConfiguration
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        // 获取流程引擎对象
        ProcessEngine processEngine = cfg.buildProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();
        // 删除流程定义，如果该流程定义已经有了流程实例启动则删除时报错
        // repositoryService.deleteDeployment("1");
        // 设置为TRUE 级联删除流程定义，及时流程有实例启动，也可以删除，设置为false 非级联删除操作。
        repositoryService.deleteDeployment("2501",true);

    }
```

## 7.查看历史信息

&emsp;&emsp;选择使用Flowable这样的流程引擎的原因之一，是它可以自动存储所有流程实例的**审计数据**或**历史数据**。这些数据可以用于创建报告，深入展现组织运行的情况，瓶颈在哪里，等等。

&emsp;&emsp;例如，如果希望显示流程实例已经执行的时间，就可以从*ProcessEngine*获取*HistoryService*，并创建*历史活动(historical activities)*的查询。在下面的代码片段中，可以看到我们添加了一些额外的过滤条件：

- 只选择一个特定流程实例的活动
- 只选择已完成的活动

&emsp;&emsp;结果按照结束时间排序，代表其执行顺序。

```java
/**
     * 查看历史
     */
    @Test
    public void testQueryHistory(){
        // 配置数据库相关信息 获取 ProcessEngineConfiguration
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.cj.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        // 获取流程引擎对象
        ProcessEngine processEngine = cfg.buildProcessEngine();
        HistoryService historyService = processEngine.getHistoryService();
        List<HistoricActivityInstance> list = historyService.createHistoricActivityInstanceQuery()
                .processDefinitionId("holidayRequestNew:1:10003")
                .finished()
                .orderByHistoricActivityInstanceEndTime().asc()
                .list();
        for (HistoricActivityInstance historicActivityInstance : list) {
            System.out.println(historicActivityInstance.getActivityId() + " took "
                    + historicActivityInstance.getDurationInMillis() + " milliseconds");
        }

    }
```

输出结果

```txt
startEvent took 1 milliseconds
approveTask took 837735 milliseconds
decision took 13 milliseconds
sendRejectionMail took 2 milliseconds
rejectEnd took 1 milliseconds
```

好了~flowable的基本应用我们就先介绍到这里了。





# 三、Flowable流程设计器

## 1.Eclipse Designer

&emsp;&emsp;Flowable提供了名为Flowable Eclipse Designer的Eclipse插件，可以用于图形化地建模、测试与部署BPMN 2.0流程。

### 1.1 下载安装Eclipse

&emsp;&emsp;去Eclipse官网下载即可：https://www.eclipse.org/downloads/packages/release 注意2020-09后的版本不再支持jdk8

![image-20220316202904261](img\image-20220316202904261.png)

&emsp;解压缩就可以了，然后进入解压缩的目录

![image-20220316203036602](img\image-20220316203036602.png)

&emsp;&emsp;直接启动即可

![image-20220316203111301](img\image-20220316203111301.png)





![image-20220316203237316](img\image-20220316203237316.png)



### 1.2 安装Flowable插件

&emsp;&emsp;然后我们再安装下Flowable的插件，选择**Help → Install New Software**。在下图面板中，点击*Add*按钮，并填写下列字段

- **Name:** Flowable BPMN 2.0 designer
- **Location:** http://www.flowable.org/designer/update/



![image-20220316203454281](img\image-20220316203454281.png)



&emsp;&emsp;这种在线更新的方式已经被官网移除了，操作不了

![image-20220316211319931](img\image-20220316211319931.png)



&emsp;&emsp;这时我们就只能通过离线安装的方式来实现了，下载对应的离线文件

![image-20220316211405001](img\image-20220316211405001.png)

&emsp;&emsp;安装步骤来操作，

![image-20220316211518520](img\image-20220316211518520.png)



然后继续：选择**Help → Install New Software**

![image-20220316211622115](img\image-20220316211622115.png)



![image-20220316211651195](img\image-20220316211651195.png)

下一步

![image-20220316211729581](img\image-20220316211729581.png)



再下一步

![image-20220316211802548](img\image-20220316211802548.png)

然后finish。弹出如下窗口

![image-20220316212008477](img\image-20220316212008477.png)

重启即可



### 1.3 创建项目

&emsp;&emsp;然后我们就可以创建一个Flowable Project了

![image-20220316212418899](img\image-20220316212418899.png)

&emsp;&emsp;然后我们可以在src/mian/resources/ 的目录下创建对应的流程图了

![image-20220316212605146](img\image-20220316212605146.png)



&emsp;&emsp;看到如下的界面说明插件安装成功了

![image-20220316212720767](img\image-20220316212720767.png)





### 1.4 创建流程图

使用滑板来绘制流程，通过从右侧把图标拖拽到左侧的面板，最终的效果

![image-20220316214339678](img\image-20220316214339678.png)

指定流程的主键

![image-20220316214430644](img\image-20220316214430644.png)



指定任务的负责人

在Properties视图中指定每个任务节点的负责人

![image-20220316214700887](img\image-20220316214700887.png)

创建请假单：zhangsan

审批请假单：lisi

当我们设置完成后保存文件，会同时生成png图片

![image-20220316214808400](img\image-20220316214808400.png)

注意：生成图片需要如下配置

![image-20220316214256235](img\image-20220316214256235.png)



### 1.5 部署流程

&emsp;&emsp;首先在Eclipse中生成bar文件，选中项目然后鼠标右击

![image-20220316215805503](img\image-20220316215805503.png)

然后会发现在项目的根目录下多了一个deployment文件夹，里面多了一个MyProcess.bar文件

![image-20220316215900052](img\image-20220316215900052.png)

然后我们就可以把这个bar文件拷贝到IDEA中，继续部署的流程

![image-20220316215945236](img\image-20220316215945236.png)



而部署的代码和前面没啥区别

```java
    @Test
    public void testDeploy(){
        // 1.获取 ProcessEngine 对象
        ProcessEngine processEngine = configuration.buildProcessEngine();
        // 2.获取RepositoryService
        RepositoryService repositoryService = processEngine.getRepositoryService();
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("MyHoliday.bar");
        ZipInputStream zipInputStream = new ZipInputStream(in);
        // 3.完成流程的部署操作 ZIP 或者 Bar文件
        Deployment deploy = repositoryService.createDeployment()
               // .addClasspathResource("MyHoliday.bar")// 关联要部署的流程文件
                .addZipInputStream(zipInputStream)
                .name("XXX公司请求流程")
                .deploy() ;// 部署流程
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
    }
```

执行后查看表结构，相关的信息就进去了

![image-20220316220121734](img\image-20220316220121734.png)







完整的案例代码：

```java
package com.bobo.flowable.test;

import org.flowable.engine.*;
import org.flowable.engine.history.HistoricActivityInstance;
import org.flowable.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.flowable.engine.repository.Deployment;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.task.api.Task;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipInputStream;

public class Test02 {

    ProcessEngineConfiguration configuration = null;
    @Before
    public void before(){
        // 获取  ProcessEngineConfiguration 对象
        configuration = new StandaloneProcessEngineConfiguration();
        // 配置 相关的数据库的连接信息
        configuration.setJdbcDriver("com.mysql.cj.jdbc.Driver");
        configuration.setJdbcUsername("root");
        configuration.setJdbcPassword("123456");
        configuration.setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn?serverTimezone=UTC&nullCatalogMeansCurrent=true");
        // 如果数据库中的表结构不存在就新建
        configuration.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
    }

    /**
     * 部署流程
     *
     */
    @Test
    public void testDeploy(){
        // 1.获取 ProcessEngine 对象
        ProcessEngine processEngine = configuration.buildProcessEngine();
        // 2.获取RepositoryService
        RepositoryService repositoryService = processEngine.getRepositoryService();
        InputStream in = this.getClass().getClassLoader().getResourceAsStream("MyHoliday.bar");
        ZipInputStream zipInputStream = new ZipInputStream(in);
        // 3.完成流程的部署操作 ZIP 或者 Bar文件
        Deployment deploy = repositoryService.createDeployment()
               // .addClasspathResource("MyHoliday.bar")// 关联要部署的流程文件
                .addZipInputStream(zipInputStream)
                .name("XXX公司请求流程")
                .deploy() ;// 部署流程
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
    }

    /**
     * 启动流程实例
     */
    @Test
    public void testRunProcess(){
        ProcessEngine processEngine = configuration.buildProcessEngine();

        // 我们需要通过RuntimeService来启动流程实例
        RuntimeService runtimeService = processEngine.getRuntimeService();

        // 启动流程实例
        ProcessInstance holidayRequest = runtimeService.startProcessInstanceById("myProcess:1:25004");
        System.out.println("holidayRequest.getProcessDefinitionId() = " + holidayRequest.getProcessDefinitionId());
        System.out.println("holidayRequest.getActivityId() = " + holidayRequest.getActivityId());
        System.out.println("holidayRequest.getId() = " + holidayRequest.getId());
    }

    /**
     * 测试任务查询
     */
    @Test
    public void testQueryTask(){
        ProcessEngine processEngine = configuration.buildProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        List<Task> list = taskService.createTaskQuery()
                .processDefinitionKey("myProcess") // 指定查询的流程编程
                .taskAssignee("zhangsan") // 查询这个任务的处理人
                .list();
        for (Task task : list) {
            System.out.println("task.getProcessDefinitionId() = " + task.getProcessDefinitionId());
            System.out.println("task.getName() = " + task.getName());
            System.out.println("task.getAssignee() = " + task.getAssignee());
            System.out.println("task.getDescription() = " + task.getDescription());
            System.out.println("task.getId() = " + task.getId());
        }
    }

    /**
     * 完成当前任务
     */
    @Test
    public void testCompleteTask(){
        ProcessEngine processEngine = configuration.buildProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionKey("myProcess")
                .taskAssignee("lisi")
                .singleResult();
        // 创建流程变量

        if(task != null){
            // 完成任务
            taskService.complete(task.getId());
        }


    }

    /**
     * 获取流程任务的历史数据
     */
    @Test
    public void testHistory(){
        ProcessEngine processEngine = configuration.buildProcessEngine();
        HistoryService historyService = processEngine.getHistoryService();
        List<HistoricActivityInstance> list = historyService.createHistoricActivityInstanceQuery()
                .processDefinitionId("myProcess:1:25004")
                .finished() // 查询的历史记录的状态是已经完成
                .orderByHistoricActivityInstanceEndTime().asc() // 指定排序的字段和顺序
                .list();
        for (HistoricActivityInstance history : list) {
            System.out.println(history.getActivityName()+":"+history.getAssignee()+"--"
                    +history.getActivityId()+":" + history.getDurationInMillis()+"毫秒");
        }

    }
}

```



## 2.Flowable UI应用

&emsp;&emsp;Flowable提供了几个web应用，用于演示及介绍Flowable项目提供的功能：

- Flowable IDM: 身份管理应用。为所有Flowable UI应用提供单点登录认证功能，并且为拥有IDM管理员权限的用户提供了管理用户、组与权限的功能。
- Flowable Modeler: 让具有建模权限的用户可以创建流程模型、表单、选择表与应用定义。
- Flowable Task: 运行时任务应用。提供了启动流程实例、编辑任务表单、完成任务，以及查询流程实例与任务的功能。
- Flowable Admin: 管理应用。让具有管理员权限的用户可以查询BPMN、DMN、Form及Content引擎，并提供了许多选项用于修改流程实例、任务、作业等。管理应用通过REST API连接至引擎，并与Flowable Task应用及Flowable REST应用一同部署。

&emsp;&emsp;所有其他的应用都需要Flowable IDM提供认证。每个应用的WAR文件可以部署在相同的servlet容器（如Apache Tomcat）中，也可以部署在不同的容器中。由于每个应用使用相同的cookie进行认证，因此应用需要运行在相同的域名下。



### 2.1 安装部署

下载Tomcat：https://tomcat.apache.org/download-80.cgi 官网下载后解压缩到非中文目录即可，然后是下载FlowableUI的文件，在Flowable6.6之后把FlowableUI中提供的四个功能合并到了一起。

![image-20220318102128672](img\image-20220318102128672.png)

然后把解压缩后的两个war包拷贝到Tomcat的解压缩的webapps目录下

![image-20220318102224330](img\image-20220318102224330.png)

Tomcat目录：

![image-20220318102255188](img\image-20220318102255188.png)



### 2.2 启动服务

&emsp;&emsp;启动Tomcat服务，执行startup.bat文件

![image-20220318102325924](img\image-20220318102325924.png)

如果启动中出现乱码修改Tomcat的conf目录下的 logging.properties 文件中的编码

![image-20220318102446699](img\image-20220318102446699.png)



如果一闪而过则检查jdk的环境变量配置。启动成功后，在浏览器中访问 http://localhost:8080/flowable-ui, 默认的账号密码是 admin/test

![image-20220318102609807](img\image-20220318102609807.png)



### 2.3 用户管理

&emsp;&emsp;我们先在 `身份管理应用程序` 中创建用户并授权

![image-20220318102707368](img\image-20220318102707368.png)

创建用户

![image-20220318102734238](img\image-20220318102734238.png)





填写详细信息

![image-20220318102817782](img\image-20220318102817782.png)



授权管理

![image-20220318102859814](img\image-20220318102859814.png)





### 2.4 绘制流程



创建新的流程

![image-20220318101239742](img\image-20220318101239742.png)

流程图界面

![image-20220318101346692](img\image-20220318101346692.png)





创建流程，分配处理人

![image-20220318101639424](img\image-20220318101639424.png)





![image-20220318101611564](img\image-20220318101611564.png)

继续完成流程图的创建

![image-20220318101810272](img\image-20220318101810272.png)





### 2.5 部署流程

&emsp;&emsp;绘制好的流程图，我们只需要一键导出即可

![image-20220318103413285](img\image-20220318103413285.png)

下载下来后拷贝到项目的resource目录下即可

![image-20220318103518807](img\image-20220318103518807.png)





然后就是正常的操作流程了





### 2.6 FlowableUI 演示

#### 2.6.1 部署流程

&emsp;&emsp;在FlowableUI中提供了演示程序

![image-20220318104517967](img\image-20220318104517967.png)

创建一个新的应用程序，并指定相关的信息

![image-20220318104614784](img\image-20220318104614784.png)

创建应用后需要指定对应的流程图

![image-20220318104703306](img\image-20220318104703306.png)



![image-20220318104735714](img\image-20220318104735714.png)





![image-20220318104811812](img\image-20220318104811812.png)



发布应用程序

![image-20220318105045345](img\image-20220318105045345.png)







#### 2.6.2 启动流程

&emsp;&emsp;发布了应用程序后我们就可以来启动流程了

![image-20220318105258331](img\image-20220318105258331.png)



![image-20220318105315908](img\image-20220318105315908.png)





![image-20220318105336107](img\image-20220318105336107.png)



![image-20220318105420011](img\image-20220318105420011.png)

点击显示图：

![image-20220318105444672](img\image-20220318105444672.png)

也就是可以看到当前是user1来处理，user1登录后可以看到要处理的流程，user2登录是看不到的。

![image-20220318105646273](img\image-20220318105646273.png)



点击完成后流程就向下一步流转了

![image-20220318105727192](img\image-20220318105727192.png)



这时再通过user2登录，就可以看到对应的代办的信息

![image-20220318105808830](img\image-20220318105808830.png)



![image-20220318105848185](img\image-20220318105848185.png)

然后点击完成，那么整个流程就介绍了







# 四、Flowable基础表结构

## 1.表结构讲解

&emsp;&emsp;工作流程的相关操作都是操作存储在对应的表结构中，为了能更好的弄清楚Flowable的实现原理和细节，我们有必要先弄清楚Flowable的相关表结构及其作用。在Flowable中的表结构在初始化的时候会创建五类表结构，具体如下：

* **ACT_RE** ：'RE'表示 repository。 这个前缀的表包含了流程定义和流程静态资源 （图片，规则，等等）。
* **ACT_RU**：'RU'表示 runtime。 这些运行时的表，包含流程实例，任务，变量，异步任务，等运行中的数据。 Flowable只在流程实例执行过程中保存这些数据， 在流程结束时就会删除这些记录。 这样运行时表可以一直很小速度很快。
* **ACT_HI**：'HI'表示 history。 这些表包含历史数据，比如历史流程实例， 变量，任务等等。
* **ACT_GE**： GE 表示 general。 通用数据， 用于不同场景下 
* **ACT_ID:**   ’ID’表示identity(组织机构)。这些表包含标识的信息，如用户，用户组，等等。



具体的表结构的含义:

| **表分类**   | **表名**              | **解释**                                           |
| ------------ | --------------------- | -------------------------------------------------- |
| 一般数据     |                       |                                                    |
|              | [ACT_GE_BYTEARRAY]    | 通用的流程定义和流程资源                           |
|              | [ACT_GE_PROPERTY]     | 系统相关属性                                       |
| 流程历史记录 |                       |                                                    |
|              | [ACT_HI_ACTINST]      | 历史的流程实例                                     |
|              | [ACT_HI_ATTACHMENT]   | 历史的流程附件                                     |
|              | [ACT_HI_COMMENT]      | 历史的说明性信息                                   |
|              | [ACT_HI_DETAIL]       | 历史的流程运行中的细节信息                         |
|              | [ACT_HI_IDENTITYLINK] | 历史的流程运行过程中用户关系                       |
|              | [ACT_HI_PROCINST]     | 历史的流程实例                                     |
|              | [ACT_HI_TASKINST]     | 历史的任务实例                                     |
|              | [ACT_HI_VARINST]      | 历史的流程运行中的变量信息                         |
| 流程定义表   |                       |                                                    |
|              | [ACT_RE_DEPLOYMENT]   | 部署单元信息                                       |
|              | [ACT_RE_MODEL]        | 模型信息                                           |
|              | [ACT_RE_PROCDEF]      | 已部署的流程定义                                   |
| 运行实例表   |                       |                                                    |
|              | [ACT_RU_EVENT_SUBSCR] | 运行时事件                                         |
|              | [ACT_RU_EXECUTION]    | 运行时流程执行实例                                 |
|              | [ACT_RU_IDENTITYLINK] | 运行时用户关系信息，存储任务节点与参与者的相关信息 |
|              | [ACT_RU_JOB]          | 运行时作业                                         |
|              | [ACT_RU_TASK]         | 运行时任务                                         |
|              | [ACT_RU_VARIABLE]     | 运行时变量表                                       |
| 用户用户组表 |                       |                                                    |
|              | [ACT_ID_BYTEARRAY]    | 二进制数据表                                       |
|              | [ACT_ID_GROUP]        | 用户组信息表                                       |
|              | [ACT_ID_INFO]         | 用户信息详情表                                     |
|              | [ACT_ID_MEMBERSHIP]   | 人与组关系表                                       |
|              | [ACT_ID_PRIV]         | 权限表                                             |
|              | [ACT_ID_PRIV_MAPPING] | 用户或组权限关系表                                 |
|              | [ACT_ID_PROPERTY]     | 属性表                                             |
|              | [ACT_ID_TOKEN]        | 记录用户的token信息                                |
|              | [ACT_ID_USER]         | 用户表                                             |

 



## 2.ProcessEngine讲解

### 2.1 硬编码的方式

&emsp;&emsp;我们前面讲解案例的时候是通过ProcessEngineConfiguration这个配置类来加载的。

```java
// 配置数据库相关信息 获取 ProcessEngineConfiguration
ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
    .setJdbcUrl("jdbc:mysql://localhost:3306/flowable-learn2?serverTimezone=UTC&nullCatalogMeansCurrent=true")
    .setJdbcUsername("root")
    .setJdbcPassword("123456")
    .setJdbcDriver("com.mysql.cj.jdbc.Driver")
    .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
// 获取流程引擎对象
ProcessEngine processEngine = cfg.buildProcessEngine();
```

&emsp;&emsp;这种方式会调用buildProcessEngine()方法，里面的核心代码为：

![image-20220319113106848](img\image-20220319113106848.png)



![image-20220319113139646](img\image-20220319113139646.png)





### 2.2 配置文件

&emsp;&emsp;除了上面的硬编码的方式外，我们还可以在resources目录下创建一个`flowable.cfg.xml`文件，注意这个名称是固定的哦。内容如下：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="processEngineConfiguration"
          class="org.flowable.engine.impl.cfg.StandaloneProcessEngineConfiguration">
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/flow1?allowMultiQueries=true&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;useSSL=false&amp;serverTimezone=UTC&amp;nullCatalogMeansCurrent=true" /><property name="jdbcDriver" value="com.mysql.cj.jdbc.Driver" />
        <property name="jdbcUsername" value="root" />
        <property name="jdbcPassword" value="123456" />
        <property name="databaseSchemaUpdate" value="true" />
        <property name="asyncExecutorActivate" value="false" />
    </bean>
</beans>
```

&emsp;&emsp;在上面的配置文件中配置相关的信息。我们在Java代码中就可以简化为：

```java
    @Test
    public void test01(){
        // 获取流程引擎对象
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        System.out.println("processEngine = " + processEngine);
    }
```

&emsp;&emsp;可以看下getDefaultProcessEngine的源码，在里面最终还是执行了和硬编码一样的代码

```java
    public static ProcessEngine getProcessEngine(String processEngineName) {
        if (!isInitialized()) {
            init(); // 完成初始化操作
        }
        return processEngines.get(processEngineName);
    }
```

&emsp;&emsp;进入init方法

```java
    public static synchronized void init() {
        if (!isInitialized()) {
            if (processEngines == null) {
                // Create new map to store process-engines if current map is null
                processEngines = new HashMap<>();
            }
            ClassLoader classLoader = ReflectUtil.getClassLoader();
            Enumeration<URL> resources = null;
            try {
                resources = classLoader.getResources("flowable.cfg.xml"); // 加载flowable.cfg.xml配置文件
            } catch (IOException e) {
                throw new FlowableIllegalArgumentException("problem retrieving flowable.cfg.xml resources on the classpath: " + System.getProperty("java.class.path"), e);
            }

            // Remove duplicated configuration URL's using set. Some
            // classloaders may return identical URL's twice, causing duplicate
            // startups
            Set<URL> configUrls = new HashSet<>();
            while (resources.hasMoreElements()) {
                configUrls.add(resources.nextElement());
            }
            for (Iterator<URL> iterator = configUrls.iterator(); iterator.hasNext();) {
                URL resource = iterator.next();
                LOGGER.info("Initializing process engine using configuration '{}'", resource.toString());
                initProcessEngineFromResource(resource); // 初始化ProcessEngine
            }

            try {
                resources = classLoader.getResources("flowable-context.xml"); // 在整合Spring的情况下加载该文件
            } catch (IOException e) {
                throw new FlowableIllegalArgumentException("problem retrieving flowable-context.xml resources on the classpath: " + System.getProperty("java.class.path"), e);
            }
            while (resources.hasMoreElements()) {
                URL resource = resources.nextElement();
                LOGGER.info("Initializing process engine using Spring configuration '{}'", resource.toString());
                initProcessEngineFromSpringResource(resource); // 从Spring的资源文件中完成ProcessEngine的初始化
            }

            setInitialized(true);
        } else {
            LOGGER.info("Process engines already initialized");
        }
    }
```

&emsp;&emsp;在源码中提供了单独使用好整合Spring的配置加载方式。再进入到initProcessEngineFromResource(resource)方法中：

![image-20220319114011806](img\image-20220319114011806.png)



![image-20220319114053252](img\image-20220319114053252.png)



![image-20220319114210012](img\image-20220319114210012.png)



而且我们也可以看到ProcessEngine最终的实现是 ProcessEngineImpl对象。



### 2.3 自定义配置文件

&emsp;&emsp;最后我们如果要加载自定义名称的配置文件可以通过ProcessEngineConfiguration中的对应构造方法来实现

```java
    @Test
    public void test2() throws Exception{
        ProcessEngineConfiguration configuration = ProcessEngineConfiguration
                .createProcessEngineConfigurationFromResource("flowable.cfg.xml");
        ProcessEngine processEngine = configuration.buildProcessEngine();
        System.out.println("processEngine = " + processEngine);
    }
```





## 3. Servcie服务接口

Service是工作流引擎提供用于进行工作流部署、执行、管理的服务接口，我们使用这些接口可以就是操作服务对应的数据表



![image-20220319223019186](img\image-20220319223019186.png)



### 3.1 Service创建方式

通过ProcessEngine创建Service

方式如下：

 ```java
RuntimeService runtimeService = processEngine.getRuntimeService();
RepositoryService repositoryService = processEngine.getRepositoryService();
TaskService taskService = processEngine.getTaskService();
// ...
 ```

### 3.2 Service总览

| service名称       | service作用              |
| ----------------- | ------------------------ |
| RepositoryService | Flowable的资源管理类     |
| RuntimeService    | Flowable的流程运行管理类 |
| TaskService       | Flowable的任务管理类     |
| HistoryService    | Flowable的历史管理类     |
| ManagerService    | Flowable的引擎管理类     |

 简单介绍：

**RepositoryService**

是activiti的资源管理类，提供了管理和控制流程发布包和流程定义的操作。使用工作流建模工具设计的业务流程图需要使用此service将流程定义文件的内容部署到计算机。

除了部署流程定义以外还可以：查询引擎中的发布包和流程定义。

暂停或激活发布包，对应全部和特定流程定义。 暂停意味着它们不能再执行任何操作了，激活是对应的反向操作。获得多种资源，像是包含在发布包里的文件， 或引擎自动生成的流程图。

获得流程定义的pojo版本， 可以用来通过java解析流程，而不必通过xml。

**RuntimeService**

Activiti的流程运行管理类。可以从这个服务类中获取很多关于流程执行相关的信息

**TaskService**

Activiti的任务管理类。可以从这个类中获取任务的信息。

**HistoryService**

Flowable的历史管理类，可以查询历史信息，执行流程时，引擎会保存很多数据（根据配置），比如流程实例启动时间，任务的参与者， 完成任务的时间，每个流程实例的执行路径，等等。 这个服务主要通过查询功能来获得这些数据。

**ManagementService**

Activiti的引擎管理类，提供了对Flowable 流程引擎的管理和维护功能，这些功能不在工作流驱动的应用程序中使用，主要用于 Flowable 系统的日常维护。





## 4.图标介绍

&emsp;&emsp;BPMN 2.0是业务流程建模符号2.0的缩写。它由Business Process Management Initiative这个非营利协会创建并不断发展。作为一种标识，BPMN 2.0是使用一些**符号**来明确业务流程设计流程图的一整套符号规范，它能增进业务建模时的沟通效率。目前BPMN2.0是最新的版本，它用于在BPM上下文中进行布局和可视化的沟通。接下来我们先来了解在流程设计中常见的 符号。

BPMN2.0的**基本符合**主要包含：

### 4.1 事件图标

&emsp;&emsp;在Flowable中的事件图标启动事件，边界事件,中间事件和结束事件.

![image-20220320103803308](img\image-20220320103803308.png)



### 4.2 活动(任务)图标

&emsp;&emsp;活动是工作或任务的一个通用术语。一个活动可以是一个任务，还可以是一个当前流程的子处理流程； 其次，你还可以为活动指定不同的类型。常见活动如下:

![image-20220320103929543](img\image-20220320103929543.png)

### 4.3 结构图标

&emsp;&emsp;结构图标可以看做是整个流程活动的结构，一个流程中可以包括子流程。常见的结构有：

![image-20220320104025737]( \img\image-20220320104025737.png)



### 4.4 网关图标

&emsp;&emsp;网关用来处理决策，有几种常用网关需要了解：

![image-20220320104157816](img\image-20220320104157816.png)









## 5.流程部署详解

### 5.1 部署实现

&emsp;&emsp;我们先来看下流程部署的具体过程。代码实现

```java
/**
     * 部署流程
     */
    @Test
    public void test3(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("holiday-request-new.bpmn20.xml")
                .name("请假流程...")
                .category("请假") // 分类
                .tenantId("dpb") // 租户id
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("deploy.getCategory() = " + deploy.getCategory());
    }
```

### 5.2 部署涉及表结构

涉及到的三张表：

部署资源表：act_ge_bytearray

| 字段           | 名称               | 备注                                                         |
| -------------- | ------------------ | ------------------------------------------------------------ |
| ID_            | 主键               |                                                              |
| REV_           | 版本号             |                                                              |
| NAME_          | 名称               | 部署的文件名称，如：holiday-request-new.bpmn20.xml、holiday-request-new.bpmn20.png |
| DEPLOYMENT_ID_ | 部署ID             |                                                              |
| BYTES_         | 字节（二进制数据） |                                                              |
| GENERATED_     | 是否系统生成       | 0为用户上传，<br/>1为系统自动生成， 比如系统会 自动根据xml生 成png |



部署ID表：act_re_deployment



| 字段               | 名称           | 备注 |
| ------------------ | -------------- | ---- |
| ID_                | 主键           |      |
| NAME_              | 名称           |      |
| CATEGORY_          | 分类           |      |
| TENANT_ID_         | 租户ID         |      |
| DEPLOY_TIME_       | 部署时间       |      |
| DERIVED_FROM_      | 来源于         |      |
| DERIVED_FROM_ROOT_ | 来源于         |      |
| ENGINE_VERSION_    | 流程引擎的版本 |      |

流程表：act_re_procdef

| 字段                    | 名称             | 备注                              |
| ----------------------- | ---------------- | --------------------------------- |
| ID_                     | 主键             |                                   |
| REV_                    | 版本号           |                                   |
| CATEGORY_               | 分类             | 流程定义的Namespace就是类别       |
| NAME_                   | 名称             |                                   |
| KEY_                    | 标识             |                                   |
| VERSION_                | 版本             |                                   |
| DEPLOYMENT_ID_          | 部署ID           |                                   |
| RESOURCE_NAME_          | 资源名称         | 流程bpmn文件名称                  |
| DGRM_RESOURCE_NAME_     | 图片资源名称     |                                   |
| DESCRIPTION_            | 描述             |                                   |
| HAS_START_FORM_KEY_     | 拥有开始表单标识 | start节点是否存在formKey  0否 1是 |
| HAS_GRAPHICAL_NOTATION_ | 拥有图形信息     |                                   |
| SUSPENSION_STATE_       | 挂起状态         | 暂停状态 1激活 2暂停              |
| TENANT_ID_              | 租户ID           |                                   |
|                         |                  |                                   |

注意：

业务流程定义数据表。此表和ACT_RE_DEPLOYMENT是多对一的关系，即，一个部署的bar包里可能包含多个流程定义文件，每个流程定义文件都会有一条记录在ACT_REPROCDEF表内，每个流程定义的数据，都会对于ACT_GE_BYTEARRAY表内的一个资源文件和PNG图片文件。和ACT_GE_BYTEARRAY的关联是通过程序用ACT_GE_BYTEARRAY.NAME与ACT_RE_PROCDEF.NAME_完成的



### 5.3 挂起和激活

&emsp;&emsp;部署的流程默认的状态为激活，如果我们暂时不想使用该定义的流程，那么可以挂起该流程。当然该流程定义下边所有的流程实例全部暂停。

流程定义为挂起状态，该流程定义将不允许启动新的流程实例，同时该流程定义下的所有的流程实例都将全部挂起暂停执行。

```java
/**
     * 挂起流程
     */
    @Test
    public void test05(){
        // 获取流程引擎对象
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .processDefinitionId("holiday:1:4")
                .singleResult();
        // 获取流程定义的状态
        boolean suspended = processDefinition.isSuspended();
        System.out.println("suspended = " + suspended);
        if(suspended){
            // 表示被挂起
            System.out.println("激活流程定义");
            repositoryService.activateProcessDefinitionById("holiday:1:4",true,null);
        }else{
            // 表示激活状态
            System.out.println("挂起流程");
            repositoryService.suspendProcessDefinitionById("holiday:1:4",true,null);
        }
    }
```

具体的实现其实就是更新了流程定义表中的字段

![image-20220321210010518](img\image-20220321210010518.png)

而且通过REV_字段来控制数据安全，也是一种乐观锁的体现了，如果要启动一个已经挂起的流程就会出现如下的错误

![image-20220321211858122](img\image-20220321211858122.png)





## 6.启动流程实例

&emsp;&emsp;然后我们来看看启动流程实例的过程。实现代码如下：

```java
/**
     * 启动流程实例
     */
    @Test
    public void testRunProcess(){
        // 获取流程引擎对象
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        // 启动流程实例通过 RuntimeService 对象
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 构建流程变量
        Map<String,Object> variables = new HashMap<>();
        variables.put("employee","张三") ;// 谁申请请假
        variables.put("nrOfHolidays",3); // 请几天假
        variables.put("description","工作累了，想出去玩玩"); // 请假的原因
        // 启动流程实例，第一个参数是流程定义的id
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceById("holiday:1:4", variables);// 启动流程实例
        // 输出相关的流程实例信息
        System.out.println("流程定义的ID：" + processInstance.getProcessDefinitionId());
        System.out.println("流程实例的ID：" + processInstance.getId());
        System.out.println("当前活动的ID：" + processInstance.getActivityId());
    }
```

&emsp;&emsp;当我们启动了一个流程实例后，会在ACT_RU_*对应的表结构中操作,运行时实例涉及的表结构共10张：

* ACT_RU_DEADLETTER_JOB  正在运行的任务表 
* ACT_RU_EVENT_SUBSCR 运行时事件 
* ACT_RU_EXECUTION 运行时流程执行实例 
* ACT_RU_HISTORY_JOB  历史作业表 
* ACT_RU_IDENTITYLINK 运行时用户关系信息 
* ACT_RU_JOB 运行时作业表 
* ACT_RU_SUSPENDED_JOB 暂停作业表 
* ACT_RU_TASK  运行时任务表 
* ACT_RU_TIMER_JOB 定时作业表 
* ACT_RU_VARIABLE  运行时变量表



&emsp;&emsp;启动一个流程实例的时候涉及到的表有

* ACT_RU_EXECUTION 运行时流程执行实例 
* ACT_RU_IDENTITYLINK 运行时用户关系信息 
* ACT_RU_TASK  运行时任务表 
* ACT_RU_VARIABLE  运行时变量表



ACT_RU_EXECUTION表结构

| 字段                  | 名称                 | 备注 |
| --------------------- | -------------------- | ---- |
| ID_                   | 主键                 |      |
| REV_                  | 版本号               |      |
| PROC_INST_ID_         | 流程实例ID           |      |
| BUSINESS_KEY_         | 业务主键ID           |      |
| PARENT_ID_            | 父执行流的ID         |      |
| PROC_DEF_ID_          | 流程定义的数据ID     |      |
| SUPER_EXEC_           |                      |      |
| ROOT_PROC_INST_ID_    | 流程实例的root流程id |      |
| ACT_ID_               | 节点实例ID           |      |
| IS_ACTIVE_            | 是否存活             |      |
| IS_CONCURRENT_        | 执行流是否正在并行   |      |
| IS_SCOPE_             |                      |      |
| IS_EVENT_SCOPE_       |                      |      |
| IS_MI_ROOT_           |                      |      |
| SUSPENSION_STATE_     | 流程终端状态         |      |
| CACHED_ENT_STATE_     |                      |      |
| TENANT_ID_            | 租户编号             |      |
| NAME_                 |                      |      |
| START_TIME_           | 开始时间             |      |
| START_USER_ID_        | 开始的用户编号       |      |
| LOCK_TIME_            | 锁定时间             |      |
| IS_COUNT_ENABLED_     |                      |      |
| EVT_SUBSCR_COUNT_     |                      |      |
| TASK_COUNT_           |                      |      |
| JOB_COUNT_            |                      |      |
| TIMER_JOB_COUNT_      |                      |      |
| SUSP_JOB_COUNT_       |                      |      |
| DEADLETTER_JOB_COUNT_ |                      |      |
| VAR_COUNT_            |                      |      |
| ID_LINK_COUNT_        |                      |      |

创建流程实例后对应的表结构的数据

![image-20220322133108405](img\image-20220322133108405.png)

![image-20220322133219534](img\image-20220322133219534.png)



ACT_RU_TASK  运行时任务表

| 字段              | 名称                 | 备注                |
| ----------------- | -------------------- | ------------------- |
| ID_               | 主键                 |                     |
| REV_              | 版本号               |                     |
| EXECUTION_ID_     | 任务所在的执行流ID   |                     |
| PROC_INST_ID_     | 流程实例ID           |                     |
| PROC_DEF_ID_      | 流程定义数据ID       |                     |
| NAME_             | 任务名称             |                     |
| PARENT_TASK_ID_   | 父任务ID             |                     |
| DESCRIPTION_      | 说明                 |                     |
| TASK_DEF_KEY_     | 任务定义的ID值       |                     |
| OWNER_            | 任务拥有人           |                     |
| ASSIGNEE_         | 被指派执行该任务的人 |                     |
| DELEGATION_       | 委托人               |                     |
| PRIORITY_         | 优先级               |                     |
| CREATE_TIME_      | 创建时间             |                     |
| DUE_DATE_         | 耗时                 |                     |
| CATEGORY_         | 类别                 |                     |
| SUSPENSION_STATE_ | 是否挂起             | 1代表激活 2代表挂起 |
| TENANT_ID_        | 租户编号             |                     |
| FORM_KEY_         |                      |                     |
| CLAIM_TIME_       | 拾取时间             |                     |

创建流程实例后对应的表结构的数据

![image-20220322133307195](img\image-20220322133307195.png)

![image-20220322133335326](img\image-20220322133335326.png)



ACT_RU_VARIABLE  运行时变量表

| 字段          | 名称                           | 备注                                 |
| ------------- | ------------------------------ | ------------------------------------ |
| ID_           | 主键                           |                                      |
| REV_          | 版本号                         |                                      |
| TYPE_         | 参数类型                       | 可以是基本的类型，也可以用户自行扩展 |
| NAME_         | 参数名称                       |                                      |
| EXECUTION_ID_ | 参数执行ID                     |                                      |
| PROC_INST_ID_ | 流程实例ID                     |                                      |
| TASK_ID_      | 任务ID                         |                                      |
| BYTEARRAY_ID_ | 资源ID                         |                                      |
| DOUBLE_       | 参数为double，则保存在该字段中 |                                      |
| LONG_         | 参数为long，则保存在该字段中   |                                      |
| TEXT_         | 用户保存文本类型的参数值       |                                      |
| TEXT2_        | 用户保存文本类型的参数值       |                                      |

创建流程实例后对应的表结构的数据

![image-20220322133406398](img\image-20220322133406398.png)

![image-20220322133439827](img\image-20220322133439827.png)



ACT_RU_IDENTITYLINK 运行时用户关系信息 

| 字段          | 名称         | 备注                                                         |
| ------------- | ------------ | ------------------------------------------------------------ |
| ID_           | 主键         |                                                              |
| REV_          | 版本号       |                                                              |
| GROUP_ID_     | 用户组ID     |                                                              |
| TYPE_         | 关系数据类型 | assignee支配人(组)、candidate候选人(组)、owner拥有人,participant参与者 |
| USER_ID_      | 用户ID       |                                                              |
| TASK_ID_      | 任务ID       |                                                              |
| PROC_INST_ID_ | 流程定义ID   |                                                              |
| PROC_DEF_ID_  | 属性ID       |                                                              |

创建流程实例后对应的表结构的数据:

![image-20220322133501720](img\image-20220322133501720.png)





## 7.处理流程

&emsp;&emsp;上面的流程已经流转到了zhangsan这个用户这里，然后可以开始审批了

```java
// 获取流程引擎对象
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionId("holiday:1:4")
                .taskAssignee("zhangsan")
                .singleResult();
        // 添加流程变量
        Map<String,Object> variables = new HashMap<>();
        variables.put("approved",false); // 拒绝请假
        // 完成任务
        taskService.complete(task.getId(),variables);
```

&emsp;&emsp;在正常处理流程中涉及到的表结构

* ACT_RU_EXECUTION 运行时流程执行实例 
* ACT_RU_IDENTITYLINK 运行时用户关系信息 
* ACT_RU_TASK  运行时任务表 
* ACT_RU_VARIABLE  运行时变量表

ACT_RU_TASK  运行时任务表 :会新生成一条记录

![image-20220322135040119](img\image-20220322135040119.png)

![image-20220322135125703](img\image-20220322135125703.png)

ACT_RU_VARIABLE  运行时变量表:会记录新的流程变量

![image-20220322135204021](img\image-20220322135204021.png)



当然流程实例也可以挂起

```java
// 1.获取ProcessEngine对象
ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
// 2.获取RuntimeService
RuntimeService runtimeService = engine.getRuntimeService();
// 3.获取流程实例对象
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
    .processInstanceId("25001")
    .singleResult();
// 4.获取相关的状态操作
boolean suspended = processInstance.isSuspended();
String id = processInstance.getId();
if(suspended){
    // 挂起--》激活
    runtimeService.activateProcessInstanceById(id);
    System.out.println("流程定义：" + id + "，已激活");
}else{
    // 激活--》挂起
    runtimeService.suspendProcessInstanceById(id);
    System.out.println("流程定义：" + id + "，已挂起");
}
```



启动第二个流程实例后再查看相关的表结构时，对他们的关系理解会更加的清楚一些

启动一个新的流程实例对应的就会产生两条记录

![image-20220322135605252](img\image-20220322135605252.png)



IDENTITYLINK中会记录每次流程操作的信息

![image-20220322135636841](img\image-20220322135636841.png)



![image-20220322135659671](img\image-20220322135659671.png)



流程变量数据，及时key 相同，但是属于不同的流程实例相互间也是隔离的

![image-20220322135719104](img\image-20220322135719104.png)

## 8.完成一个流程

&emsp;&emsp;然后我们把第一个流程处理完成

```java
ProcessEngine processEngine = cfg.buildProcessEngine();
TaskService taskService = processEngine.getTaskService();
Task task = taskService.createTaskQuery()
    .processDefinitionId("holiday:1:4")
    .taskAssignee("lisi")
    .singleResult();
// 添加流程变量
Map<String,Object> variables = new HashMap<>();
variables.put("approved",false); // 拒绝请假
// 完成任务
taskService.complete(task.getId(),variables);
```

处理完了一个工作流程后，我们来看看相关的表结构信息

首先我们会发现

* ACT_RU_EXECUTION 运行时流程执行实例 
* ACT_RU_IDENTITYLINK 运行时用户关系信息 
* ACT_RU_TASK  运行时任务表 
* ACT_RU_VARIABLE  运行时变量表

这四张表中对应的数据都没有了，也就是这个流程已经不是运行中的流程了。然后在对应的历史表中我们可以看到相关的信息

* ACT_HI_ACTINST  历史的流程实例

* ACT_HI_ATTACHMENT 历史的流程附件
* ACT_HI_COMMENT  历史的说明性信息
* ACT_HI_DETAIL 历史的流程运行中的细节信息
* ACT_HI_IDENTITYLINK 历史的流程运行过程中用户关系
* ACT_HI_PROCINST  历史的流程实例
* ACT_HI_TASKINST  历史的任务实例
* ACT_HI_VARINST  历史的流程运行中的变量信息

在我们上面的处理流程的过程中设计到的历史表有

ACT_HI_ACTINST  历史的流程实例

| 字段               | 名称                 | 备注 |
| ------------------ | -------------------- | ---- |
| ID_                | 主键                 |      |
| PROC_DEF_ID_       | 流程定义ID           |      |
| PROC_INST_ID_      | 流程实例ID           |      |
| EXECUTION_ID_      | 执行ID               |      |
| ACT_ID_            | 节点实例ID           |      |
| TASK_ID_           | 任务ID               |      |
| CALL_PROC_INST_ID_ | 调用外部的流程实例ID |      |
| ACT_NAME_          | 节点名称             |      |
| ACT_TYPE_          | 节点类型             |      |
| ASSIGNEE_          | 处理人               |      |
| START_TIME_        | 开始时间             |      |
| END_TIME_          | 结束时间             |      |
| DURATION_          | 耗时                 |      |
| DELETE_REASON_     | 删除原因             |      |
| TENANT_ID_         | 租户编号             |      |

![image-20220322141800554](img\image-20220322141800554.png)

![image-20220322141825065](img\image-20220322141825065.png)



ACT_HI_IDENTITYLINK 历史的流程运行过程中用户关系

| 字段                 | 名称         | 备注 |
| -------------------- | ------------ | ---- |
| ID_                  | 主键         |      |
| GROUP_ID_            | 组编号       |      |
| TYPE_                | 类型         |      |
| USER_ID_             | 用户编号     |      |
| TASK_ID_             | 任务编号     |      |
| CREATE_TIME_         | 创建时间     |      |
| PROC_INST_ID_        | 流程实例编号 |      |
| SCOPE_ID_            |              |      |
| SCOPE_TYPE_          |              |      |
| SCOPE_DEFINITION_ID_ |              |      |
|                      |              |      |



![image-20220322141717826](img\image-20220322141717826.png)

ACT_HI_PROCINST  历史的流程实例

| 字段                       | 名称         | 备注 |
| -------------------------- | ------------ | ---- |
| ID_                        | 主键         |      |
| PROC_INST_ID_              | 流程实例ID   |      |
| BUSINESS_KEY_              | 业务主键     |      |
| PROC_DEF_ID_               | 属性ID       |      |
| START_TIME_                | 开始时间     |      |
| END_TIME_                  | 结束时间     |      |
| DURATION_                  | 耗时         |      |
| START_USER_ID_             | 起始人       |      |
| START_ACT_ID_              | 起始节点     |      |
| END_ACT_ID_                | 结束节点     |      |
| SUPER_PROCESS_INSTANCE_ID_ | 父流程实例ID |      |
| DELETE_REASON_             | 删除原因     |      |
| TENANT_ID_                 | 租户编号     |      |
| NAME_                      | 名称         |      |



![image-20220322141855401](img\image-20220322141855401.png)



![image-20220322141912602](img\image-20220322141912602.png)



ACT_HI_TASKINST  历史的任务实例

| 字段            | 名称                    | 备注                                   |
| --------------- | ----------------------- | -------------------------------------- |
| ID_             | 主键                    |                                        |
| PROC_DEF_ID_    | 流程定义ID              |                                        |
| TASK_DEF_KEY_   | 任务定义的ID值          |                                        |
| PROC_INST_ID_   | 流程实例ID              |                                        |
| EXECUTION_ID_   | 执行ID                  |                                        |
| PARENT_TASK_ID_ | 父任务ID                |                                        |
| NAME_           | 名称                    |                                        |
| DESCRIPTION_    | 说明                    |                                        |
| OWNER_          | 实际签收人 任务的拥有者 | 签收人（默认为空，只有在委托时才有值） |
| ASSIGNEE_       | 被指派执行该任务的人    |                                        |
| START_TIME_     | 开始时间                |                                        |
| CLAIM_TIME_     | 任务拾取时间            |                                        |
| END_TIME_       | 结束时间                |                                        |
| DURATION_       | 耗时                    |                                        |
| DELETE_REASON_  | 删除原因                |                                        |
| PRIORITY_       | 优先级别                |                                        |
| DUE_DATE_       | 过期时间                |                                        |
| FORM_KEY_       | 节点定义的formkey       |                                        |
| CATEGORY_       | 类别                    |                                        |
| TENANT_ID_      | 租户                    |                                        |

![image-20220322142609163](img\image-20220322142609163.png)

![image-20220322142650699](img\image-20220322142650699.png)



ACT_HI_VARINST  历史的流程运行中的变量信息：流程变量虽然在任务完成后在流程实例表中会删除，但是在历史表中还是会记录的

| 字段          | 名称               | 备注 |
| ------------- | ------------------ | ---- |
| ID_           | 主键               |      |
| PROC_INST_ID_ | 流程实例ID         |      |
| EXECUTION_ID_ | 指定ID             |      |
| TASK_ID_      | 任务ID             |      |
| NAME_         | 名称               |      |
| VAR_TYPE_     | 参数类型           |      |
| REV_          | 数据版本           |      |
| BYTEARRAY_ID_ | 字节表ID           |      |
| DOUBLE_       | 存储double类型数据 |      |
| LONG_         | 存储long类型数据   |      |
| .....         |                    |      |



![image-20220322142756867](img\image-20220322142756867.png)

好了一个相对简单的流程处理涉及到的相关表结构内容就介绍完了













