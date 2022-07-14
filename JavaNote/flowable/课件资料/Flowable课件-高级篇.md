最新Flowable工作流教程

> lecture：邓澎波



# 一、任务分配和流程变量

## 1.任务分配

### 1.1 固定分配

&emsp;&emsp;固定分配就是我们前面介绍的，在绘制流程图或者直接在流程文件中通过Assignee来指定的方式

![image-20220322205919319](img\image-20220322205919319.png)

![image-20220322210018615](img\image-20220322210018615.png)



### 1.2 表达式分配

&emsp;&emsp;Flowable使用UEL进行表达式解析。UEL代表*Unified Expression Language*，是EE6规范的一部分.Flowable支持两种UEL表达式： UEL-value 和UEL-method

#### 1.2.1 值表达式

&emsp;&emsp;**值表达式 Value expression**: 解析为一个值。默认情况下，所有流程变量都可以使用。（若使用Spring）所有的Spring bean也可以用在表达式里。例如

```txt
${myVar}
${myBean.myProperty}
```

案例讲解：

![image-20220322212342245](img\image-20220322212342245.png)



可以看到通过表达式处理的效果

![image-20220322212431304](img\image-20220322212431304.png)



先部署流程，然后在启动流程实例的时候绑定表达式对应的值

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
        // 设置 assignee 的取值
        Map<String,Object> variables = new HashMap<>();
        variables.put("assignee0","张三") ;
        variables.put("assignee1","李四"); 
        // 启动流程实例，第一个参数是流程定义的id
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceById("MyHolidayUI:1:4", variables);// 启动流程实例
        // 输出相关的流程实例信息
        System.out.println("流程定义的ID：" + processInstance.getProcessDefinitionId());
        System.out.println("流程实例的ID：" + processInstance.getId());
        System.out.println("当前活动的ID：" + processInstance.getActivityId());
    }
```

在流程变量表中我们可以看到对应的流程变量信息

![image-20220322213558754](img\image-20220322213558754.png)

同时在Task表中，可以看到流程当前的分配人是`张三`，说明UEL表达式被解析了

![image-20220322213655020](img\image-20220322213655020.png)







#### 1.2.2 方法表达式

&emsp;&emsp;**方法表达式 Method expression**: 调用一个方法，可以带或不带参数。**当调用不带参数的方法时，要确保在方法名后添加空括号（以避免与值表达式混淆）。**传递的参数可以是字面值(literal value)，也可以是表达式，它们会被自动解析。例如：

```txt
${printer.print()}
${myBean.addNewOrder('orderName')}
${myBean.doSomething(myVar, execution)}
```

&emsp;&emsp;myBean是Spring容器中的个Bean对象，表示调用的是bean的addNewOrder方法





### 1.3 监听器分配

可以使用监听器来完成很多Flowable的流程业务。

我们在此处使用监听器来完成负责人的指定，那么我们在流程设计的时候就不需要指定assignee

创建自定义监听器：

```java
/**
 * 自定义的监听器
 */
public class MyTaskListener implements TaskListener {
    @Override
    public void notify(DelegateTask delegateTask) {
        System.out.println("监听器触发了：" + delegateTask.getName());
        if("提交请假流程".equals(delegateTask.getName()) &&
                "create".equals(delegateTask.getEventName())){
            // 指定任务的负责人
            delegateTask.setAssignee("小明");
        }else {
            delegateTask.setAssignee("小张");
        }
    }
}
```



然后在FlowableUI中关联对应的监听器

```txt
create:任务创建后触发
assignment:任务分配后触发
Delete:任务完成后触发
All：所有事件都触发
```



![image-20220322214807416](img\image-20220322214807416.png)

然后我们先部署流程，然后执行查看效果：

![image-20220322215711211](img\image-20220322215711211.png)

然后在Task表中我们可以看到对应的分配人为`小明`说明通过监听也完成了任务分配的工作了

![image-20220322215805734](img\image-20220322215805734.png)







## 2.流程变量

&emsp;&emsp;流程实例按步骤执行时，需要使用一些数据。在Flowable中，这些数据称作*变量(variable)*，并会存储在数据库中。变量可以用在表达式中（例如在排他网关中用于选择正确的出口路径），也可以在Java服务任务(service task)中用于调用外部服务（例如为服务调用提供输入或结果存储），等等。

&emsp;&emsp;流程实例可以持有变量（称作*流程变量 process variables*）；用户任务以及*执行(executions)*——流程当前活动节点的指针——也可以持有变量。流程实例可以持有任意数量的变量，每个变量存储为*ACT_RU_VARIABLE*数据库表的一行。

&emsp;&emsp;所有的*startProcessInstanceXXX*方法都有一个可选参数，用于在流程实例创建及启动时设置变量。例如，在*RuntimeService*中：

```java
ProcessInstance startProcessInstanceByKey(String processDefinitionKey, Map<String, Object> variables);
```

&emsp;&emsp;也可以在流程执行中加入变量。例如，(*RuntimeService*):

```java
void setVariable(String executionId, String variableName, Object value);
void setVariables(String executionId, Map<String, ? extends Object> variables);
void setVariableLocal(String executionId, String variableName, Object value);
void setVariablesLocal(String executionId, Map<String, ? extends Object> variables);
```



![image-20220324095243595](img\image-20220324095243595.png)



### 2.1 全局变量/流程变量

- 作用域: 流程实例。

- 流程变量中变量名不允许重复，设置相同名称的变量，后设置的值会覆盖前设置的变量值。

注意：如：    Global变量：userId（变量名）、zhangsan（变量值）



### 2.2 局部变量

- 作用域: 任务和执行实例(针对一个任务和一个执行实例范围，范围没有流程实例大)
- Local 变量由于在不同的任务或不同的执行实例中，作用域互不影响，变量名可以相同没有影响。Local 变量名也可以和 global 变量名相同，没有影响。 





### 2.3 案例讲解

 需求：员工创建出差申请单，由部门经理审核，部门经理申请通过后3天以下由财务直接申批，3天以上先由总经理审批，总经理审批通过后再由财务审批。



![image-20220324093855618](img\image-20220324093855618.png)



连接先设置条件

![image-20220324093806442](img\image-20220324093806442.png)



![image-20220324093700631](img\image-20220324093700631.png)





部署流程

```java
@Test
public void deploy(){
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RepositoryService repositoryService = processEngine.getRepositoryService();
    Deployment deploy = repositoryService.createDeployment()
        .addClasspathResource("出差申请单.bpmn20.xml")
        .name("请假流程...")
        .category("请假") // 分类
        .tenantId("dpb") // 租户id
        .deploy();
    System.out.println("deploy.getId() = " + deploy.getId());
    System.out.println("deploy.getName() = " + deploy.getName());
    System.out.println("deploy.getCategory() = " + deploy.getCategory());
}
```



启动流程实例：并且指定全局流程变量

```java
/**
     * 在启动流程实例的时候设置流程变量
     */
    @Test
    public void runProcess(){
        // 获取流程引擎对象
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        // 启动流程实例通过 RuntimeService 对象
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 设置流程变量
        Map<String,Object> variables = new HashMap<>();
        // 设置assignee的取值
        variables.put("assignee0","张三");
        variables.put("assignee1","李四");
        variables.put("assignee2","王五");
        variables.put("assignee3","赵财务");
        // 启动流程实例，第一个参数是流程定义的id
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceById("evection:1:4",variables);// 启动流程实例
        // 输出相关的流程实例信息
        System.out.println("流程定义的ID：" + processInstance.getProcessDefinitionId());
        System.out.println("流程实例的ID：" + processInstance.getId());
        System.out.println("当前活动的ID：" + processInstance.getActivityId());

    }
```

完成Task任务，同时也可以指定流程变量

```java
/**
     * 完成任务时指定流程变量
     */
    @Test
    public void completeTask(){

        // 获取流程引擎对象
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionId("evection:1:4")
                .taskAssignee("李四")
                .singleResult();
        // 添加流程变量
        Map<String, Object> map = task.getProcessVariables();
        map.put("num",4);

        // 完成任务
        taskService.complete(task.getId(),map);
    }
```

当然我们也可以在处理流程之外通过Task编号来修改流程变量

```java
/**
     * 通过当前任务设置
     */
    @Test
    public void currentTask(){
        //   当前待办任务id
        //  获取processEngine
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionId("evection:1:4")
                .taskAssignee("王五")
                .singleResult();
        // 添加流程变量
        Map<String, Object> map = task.getProcessVariables();
        map.put("num",1);
        //  一次设置多个值 设置局部变量
        taskService.setVariables(task.getId(), map);
    }
```





# 二、candidate候选人和候选人组

&emsp;&emsp;在流程定义中在任务结点的 assignee 固定设置任务负责人，在流程定义时将参与者固定设置在.bpmn 文件中，如果临时任务负责人变更则需要修改流程定义，系统可扩展性差。针对这种情况可以给任务设置多个候选人或者候选人组，可以从候选人中选择参与者来完成任务。

## 1.候选人

### 1.1 定义流程图

&emsp;&emsp;定义流程图，同时指定候选人，多个候选人会通过`,`连接

![image-20220325095959489](img\image-20220325095959489.png)

![image-20220325100835461](img\image-20220325100835461.png)





### 1.2 部署和启动流程实例

&emsp;&emsp;部署流程，并且在启动流程实例的时候对UEL表达式赋值

```java
    /**
     * 部署流程
     */
    @Test
    public void deploy(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();

        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("请假流程-候选人.bpmn20.xml")
                .name("请求流程-候选人")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println(deploy.getName());
    }

    /**
     * 启动流程实例
     */
    @Test
    public void runProcess(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 给流程定义中的UEL表达式赋值
        Map<String,Object> variables = new HashMap<>();
        variables.put("candidate1","张三");
        variables.put("candidate2","李四");
        variables.put("candidate3","王五");
        runtimeService.startProcessInstanceById("holiday-candidate:1:4",variables);
    }
```

&emsp;&emsp;在对应的表结构中我们可以看到流程变量已经有了，但是对于的Task的Assignee还是为空。

![image-20220325101054787](img\image-20220325101054787.png)





![image-20220325102600573](img\image-20220325102600573.png)





### 1.3 任务的查询

&emsp;&emsp;根据当前登录的用户，查询对应的候选任务

```java
   /**
     * 根据登录的用户查询对应的可以拾取的任务
     *
     */
    @Test
    public void queryTaskCandidate(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        List<Task> list = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-candidate:1:4")
                .taskCandidateUser("李四") # 注意
                .list();
        for (Task task : list) {
            System.out.println("task.getId() = " + task.getId());
            System.out.println("task.getName() = " + task.getName());
        }
    }
```



### 1.4 任务的拾取

&emsp;&emsp;知道了我有可拾取的任务后，拾取任务。

```java
/**
     * 拾取任务
     *    一个候选人拾取了这个任务之后其他的用户就没有办法拾取这个任务了
     *    所以如果一个用户拾取了任务之后又不想处理了，那么可以退还
     */
    @Test
    public void claimTaskCandidate(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-candidate:1:4")
                .taskCandidateUser("李四")
                .singleResult();
        if(task != null){
            // 拾取对应的任务
            taskService.claim(task.getId(),"李四");
            System.out.println("任务拾取成功");
        }
    }
```



![image-20220325103624344](img\image-20220325103624344.png)



### 1.5 任务的归还

&emsp;&emsp;拾取任务后不想操作那么就归还任务

```java
    /**
     * 退还任务
     *    一个候选人拾取了这个任务之后其他的用户就没有办法拾取这个任务了
     *    所以如果一个用户拾取了任务之后又不想处理了，那么可以退还
     */
    @Test
    public void unclaimTaskCandidate(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-candidate:1:4")
                .taskAssignee("张三")
                .singleResult();
        if(task != null){
            // 拾取对应的任务
            taskService.unclaim(task.getId());
            System.out.println("归还拾取成功");
        }
    }
```





### 1.6 任务的交接

&emsp;&emsp;拾取任务后如果不想操作也不想归还可以直接交接给另外一个人来处理

```java
   /**
     * 任务的交接
     *    如果我获取了任务，但是不想执行，那么我可以把这个任务交接给其他的用户
     */
    @Test
    public void taskCandidate(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-candidate:1:4")
                .taskAssignee("李四")
                .singleResult();
        if(task != null){
            // 任务的交接
            taskService.setAssignee(task.getId(),"王五");
            System.out.println("任务交接给了王五");
        }
    }
```





### 1.7 任务的完成

&emsp;&emsp;正常的任务处理

```java
   /**
     * 完成任务
     */
    @Test
    public void completeTask(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-candidate:1:4")
                .taskAssignee("王五")
                .singleResult();
        if(task != null){
            // 完成任务
            taskService.complete(task.getId());
            System.out.println("完成Task");
        }
    }

```







## 2.候选人组

&emsp;&emsp;当候选人很多的情况下，我们可以分组来处理。先创建组，然后把用户分配到这个组中。

### 2.1 管理用户和组

#### 2.1.1 用户管理

&emsp;&emsp;我们需要先单独维护用户信息。后台对应的表结构是`ACT_ID_USER`.

```java
   /**
     * 维护用户
     */
    @Test
    public void createUser(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        // 通过 IdentityService 完成相关的用户和组的管理
        IdentityService identityService = processEngine.getIdentityService();
        User user = identityService.newUser("田佳");
        user.setFirstName("田");
        user.setLastName("jia");
        user.setEmail("tianjia@qq.com");
        identityService.saveUser(user);
    }
```



![image-20220325110324815](img\image-20220325110324815.png)



#### 2.1.2 Group管理

&emsp;&emsp;维护对应的Group信息，后台对应的表结构是`ACT_ID_GROUP`

```java
    /**
     * 创建用户组
     */
    @Test
    public void createGroup(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        IdentityService identityService = processEngine.getIdentityService();
        // 创建Group对象并指定相关的信息
        Group group = identityService.newGroup("group2");
        group.setName("开发部");
        group.setType("type1");
        // 创建Group对应的表结构数据
        identityService.saveGroup(group);

    }
```

![image-20220325110408435](img\image-20220325110408435.png)



#### 2.1.3 用户分配组

&emsp;&emsp;用户和组是一个多对多的关联关联，我们需要做相关的分配，后台对应的表结构是`ACT_ID_MEMBERSHIP`

```java
    /**
     * 将用户分配给对应的Group
     */
    @Test
    public void userGroup(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        IdentityService identityService = processEngine.getIdentityService();
        // 根据组的编号找到对应的Group对象
        Group group = identityService.createGroupQuery().groupId("group1").singleResult();
        List<User> list = identityService.createUserQuery().list();
        for (User user : list) {
            // 将用户分配给对应的组
            identityService.createMembership(user.getId(),group.getId());
        }
    }
```



![image-20220325110511848](img\image-20220325110511848.png)





### 2.2 候选人组应用

&emsp;&emsp;搞清楚了用户和用户组的关系后我们就可以来使用候选人组的应用了

#### 2.2.1 创建流程图

![image-20220325111013641](img\image-20220325111013641.png)



![image-20220325110952527](img\image-20220325110952527.png)







#### 2.2.2 流程的部署运行

&emsp;&emsp;然后我们把流程部署和运行，注意对UEL表达式赋值，关联上Group

```java
/**
     * 部署流程
     */
    @Test
    public void deploy(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();

        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("请假流程-候选人组.bpmn20.xml")
                .name("请求流程-候选人")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println(deploy.getName());
    }

    /**
     * 启动流程实例
     */
    @Test
    public void runProcess(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        IdentityService identityService = processEngine.getIdentityService();
        Group group = identityService.createGroupQuery().groupId("group1").singleResult();
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 给流程定义中的UEL表达式赋值
        Map<String,Object> variables = new HashMap<>();
        // variables.put("g1","group1");
        variables.put("g1",group.getId()); // 给流程定义中的UEL表达式赋值
        runtimeService.startProcessInstanceById("holiday-group:1:17504",variables);
    }
```

对应表结构中就有对应的体现

![image-20220325112545719](img\image-20220325112545719.png)





#### 2.2.3 任务的拾取和完成

&emsp;&emsp;然后完成任务的查询拾取和处理操作

```java
/**
     * 根据登录的用户查询对应的可以拾取的任务
     *
     */
    @Test
    public void queryTaskCandidateGroup(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        // 根据当前登录的用户找到对应的组
        IdentityService identityService = processEngine.getIdentityService();
        // 当前用户所在的组
        Group group = identityService.createGroupQuery().groupMember("邓彪").singleResult();

        TaskService taskService = processEngine.getTaskService();
        List<Task> list = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-group:1:17504")
                .taskCandidateGroup(group.getId())
                .list();
        for (Task task : list) {
            System.out.println("task.getId() = " + task.getId());
            System.out.println("task.getName() = " + task.getName());
        }
    }

    /**
     * 拾取任务
     *    一个候选人拾取了这个任务之后其他的用户就没有办法拾取这个任务了
     *    所以如果一个用户拾取了任务之后又不想处理了，那么可以退还
     */
    @Test
    public void claimTaskCandidate(){
        String userId = "田佳";
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        // 根据当前登录的用户找到对应的组
        IdentityService identityService = processEngine.getIdentityService();
        // 当前用户所在的组
        Group group = identityService.createGroupQuery().groupMember(userId).singleResult();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-group:1:17504")
                .taskCandidateGroup(group.getId())
                .singleResult();
        if(task != null) {
            // 任务拾取
            taskService.claim(task.getId(),userId);
            System.out.println("任务拾取成功");
        }
    }  
   /**
     * 完成任务
     */
    @Test
    public void completeTask(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-group:1:17504")
                .taskAssignee("邓彪")
                .singleResult();
        if(task != null){
            // 完成任务
            taskService.complete(task.getId());
            System.out.println("完成Task");
        }
    }
```





# 三、网关

网关用来控制流程的流向

## 1.排他网关

&emsp;&emsp;排他网关（exclusive gateway）（也叫*异或网关 XOR gateway*，或者更专业的，*基于数据的排他网关 exclusive data-based gateway*），用于对流程中的**决策**建模。当执行到达这个网关时，会按照所有出口顺序流定义的顺序对它们进行计算。选择第一个条件计算为true的顺序流（当没有设置条件时，认为顺序流为*true*）继续流程。

&emsp;&emsp;**请注意这里出口顺序流的含义与BPMN 2.0中的一般情况不一样。一般情况下，会选择所有条件计算为true的顺序流，并行执行。而使用排他网关时，只会选择一条顺序流。当多条顺序流的条件都计算为true时，会且仅会选择在XML中最先定义的顺序流继续流程。如果没有可选的顺序流，会抛出异常。**

图示

&emsp;&emsp;排他网关用内部带有’X’图标的标准网关（菱形）表示，'X’图标代表*异或*的含义。请注意内部没有图标的网关默认为排他网关。BPMN 2.0规范不允许在同一个流程中混合使用有及没有X的菱形标志。

![image-20220326100630908](img\image-20220326100630908.png)



案例：

![image-20220326103951903](img\image-20220326103951903.png)



```java
   /**
     * 部署流程
     */
    @Test
    public void deploy(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();

        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("请假流程-排他网关.bpmn20.xml")
                .name("请求流程-排他网关")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println(deploy.getName());
    }

    /**
     * 启动流程实例
     */
    @Test
    public void runProcess(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 给流程定义中的UEL表达式赋值
        Map<String,Object> variables = new HashMap<>();
        // variables.put("g1","group1");
        variables.put("num",3); // 给流程定义中的UEL表达式赋值
        runtimeService.startProcessInstanceById("holiday-exclusive:1:4",variables);
    }


    /**
     * 启动流程实例
     */
    @Test
    public void setVariables(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 给流程定义中的UEL表达式赋值
        Map<String,Object> variables = new HashMap<>();
        // variables.put("g1","group1");
        variables.put("num",4); // 给流程定义中的UEL表达式赋值
        runtimeService.setVariables("12503",variables);
    }



    /**
     * 完成任务
     */
    @Test
    public void completeTask(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                //.processInstanceId("2501")
                .processDefinitionId("holiday-exclusive:1:4")
                .taskAssignee("zhangsan")
                .singleResult();
        if(task != null){
            // 完成任务
            taskService.complete(task.getId());
            System.out.println("完成Task");
        }
    }
```





如果从网关出去的线所有条件都不满足的情况下会抛出系统异常，

![image-20220326104744181](img\image-20220326104744181.png)



但是要注意任务没有介绍，还是原来的任务，我们可以重置流程变量

```java
    @Test
    public void setVariables(){
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RuntimeService runtimeService = processEngine.getRuntimeService();
        // 给流程定义中的UEL表达式赋值
        Map<String,Object> variables = new HashMap<>();
        // variables.put("g1","group1");
        variables.put("num",4); // 给流程定义中的UEL表达式赋值
        runtimeService.setVariables("12503",variables);
    }
```





前面我们可以直接在连接线上定义条件，那为什么还要有排他网关呢？直接在线上的情况，如果条件都不满足，流程就结束了，是异常结束!!

## 2.并行网关AND

> 所有路径会被同时选择

&emsp;&emsp;并行网关允许将流程分成多条分支，也可以把多条分支汇聚到一起，并行网关的功能是基于进入和外出顺序流的：

* fork分支：并行后的所有外出顺序流，为每个顺序流都创建一个并发分支。

* join汇聚： 所有到达并行网关，在此等待的进入分支， 直到**所有**进入顺序流的分支都到达以后， 流程就会通过汇聚网关。

&emsp;&emsp;注意，如果同一个并行网关有多个进入和多个外出顺序流， 它就同时具有分支和汇聚功能。 这时，网关会先汇聚所有进入的顺序流，然后再切分成多个并行分支。

**与其他网关的主要区别是，并行网关不会解析条件。** **即使顺序流中定义了条件，也会被忽略。**



案例：

![image-20220326110341232](img\image-20220326110341232.png)

当我们执行了创建请假单后，到并行网关的位置的时候，在ACT_RU_TASK表中就有两条记录

![image-20220326111359504](img\image-20220326111359504.png)

然后同时在ACT_RU_EXECUTION中有三条记录，一个任务对应的有两个执行实例

![image-20220326111453630](img\image-20220326111453630.png)







## 3.包含网关OR

> 可以同时执行多条线路，也可以在外出顺序流上定义条件

&emsp;包含网关可以看做是排他网关和并行网关的结合体。 和排他网关一样，你可以在外出顺序流上定义条件，包含网关会解析它们。 但是主要的区别是包含网关可以选择多于一条顺序流，这和并行网关一样。

包含网关的功能是基于进入和外出顺序流的：

* 分支： 所有外出顺序流的条件都会被解析，结果为true的顺序流会以并行方式继续执行， 会为每个顺序流创建一个分支。

* 汇聚：所有并行分支到达包含网关，会进入等待状态， 直到每个包含流程token的进入顺序流的分支都到达。 这是与并行网关的最大不同。换句话说，包含网关只会等待被选中执行了的进入顺序流。 在汇聚之后，流程会穿过包含网关继续执行。(任意一条到达汇聚点则继续执行,不用等待其他节点到汇聚点)



![image-20220326112720089](img\image-20220326112720089.png)





## 4.事件网关

&emsp;&emsp;事件网关允许根据事件判断流向。网关的每个外出顺序流都要连接到一个中间捕获事件。 当流程到达一个基于事件网关，网关会进入等待状态：会暂停执行。与此同时，会为每个外出顺序流创建相对的事件订阅。

&emsp;&emsp;事件网关的外出顺序流和普通顺序流不同，这些顺序流不会真的"执行"， 相反它们让流程引擎去决定执行到事件网关的流程需要订阅哪些事件。 要考虑以下条件：

1. 事件网关必须有两条或以上外出顺序流；
2. 事件网关后，只能使用intermediateCatchEvent类型（activiti不支持基于事件网关后连接ReceiveTask）
3. 连接到事件网关的中间捕获事件必须只有一个入口顺序流。 





# 四、事件

&emsp;&emsp;事件（event）通常用于为流程生命周期中发生的事情建模。事件总是图形化为圆圈。在BPMN 2.0中，有两种主要的事件分类：*捕获（catching）*与*抛出（throwing）*事件。

- **捕获:** 当流程执行到达这个事件时，会等待直到触发器动作。触发器的类型由其中的图标，或者说XML中的类型声明而定义。捕获事件与抛出事件显示上的区别，是其内部的图标没有填充（即是白色的）。
- **抛出:** 当流程执行到达这个事件时，会触发一个触发器。触发器的类型，由其中的图标，或者说XML中的类型声明而定义。抛出事件与捕获事件显示上的区别，是其内部的图标填充为黑色。



## 1.定时事件

&emsp;&emsp;定时触发的相关事件，包括定时器启动事件，定时器捕获中间件事件，定时器边界事件

### 1.1 定时器启动事件

&emsp;&emsp;定时器启动事件（timer start event）在指定时间创建流程实例。在流程只需要启动一次，或者流程需要在特定的时间间隔重复启动时，都可以使用。

***请注意**：*子流程不能有定时器启动事件。

***请注意**：*定时器启动事件，在流程部署的同时就开始计时。不需要调用startProcessInstanceByXXX就会在时间启动。调用startProcessInstanceByXXX时会在定时启动之外额外启动一个流程。

***请注意**：*当部署带有定时器启动事件的流程的更新版本时，上一版本的定时器作业会被移除。这是因为通常并不希望旧版本的流程仍然自动启动新的流程实例。

定时器启动事件，用其中有一个钟表图标的圆圈来表示。

![image-20220327223547656](img\image-20220327223547656.png)

案例：

![image-20220327231015715](img\image-20220327231015715.png)

在定时启动的节点设置时间：

![image-20220327231055237](img\image-20220327231055237.png)

可以通过FlowableUI中的部署来演示，通过FlowableUI我们可以看到，没有启动流程实例的情况下，到里23:14:14秒的时候自动帮助我们创建了一个流程实例。

![image-20220327231551538](img\image-20220327231551538.png)







### 1.2 定时器捕获中间事件

当第一个人工处理完成后，第二个人工处理的任务需要在2022-03-27T23:25:14之后执行

案例：

![image-20220327232259428](img\image-20220327232259428.png)

通过FlowableUI的案例演示我们可以看到后一个任务是在定时时间之后执行的

![image-20220327232624091](img\image-20220327232624091.png)





### 1.3 定时器边界事件

人工任务1如果在定义的`2022-03-27T23:36:14`这个时间之前还没有处理，那么就会触发定时边界事件，从而从人工任务3.

案例

![image-20220327233132259](img\image-20220327233132259.png)





发布启动流程

![image-20220327233410596](img\image-20220327233410596.png)



然后在张三这个位置我们不完成，等到定时到来，达到定时的时间，任务进入到了人工审批三



### 1.4 timeDuration

​       &emsp;&emsp;在定时事件中我们一定要放开如下的配置：

![image-20220329082431920](img\image-20220329082431920.png)

&emsp;&emsp;指定计时器在启动前应等待多长的时间，首先一定时器启动事件为例：

#### 开始事件

![image-20220328200755160](img\image-20220328200755160.png)

&emsp;&emsp;可以通过FlowableUI的应用来验证

![image-20220328202242555](img\image-20220328202242555.png)

发布任务后然后我们等待两分钟就可以看到任务到了`zhangsan`的位置。或者我们也可以在SpringBoot整合Flowable的项目中添加对应的Controller来处理

```java
    @Autowired
    private ProcessEngine processEngine;


    @GetMapping("/deploy")
    public String deploy(){
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("test003.bpmn20.xml")
                .name("等待定时器启动事件")
                .deploy();
        return "部署任务成功....";
    }
```

提交请求完成部署操作

![image-20220328202918399](img\image-20220328202918399.png)



生成了对应的Task记录

![image-20220328203621023](img\image-20220328203621023.png)



**注意**：在事件中一定要开启异步任务，不然相关的事件是不会触发的！

![image-20220328203656000](img\image-20220328203656000.png)



#### 中间事件

然后来看看中间事件的等待定时器事件案例：

![image-20220328204205453](img\image-20220328204205453.png)

案例由两个自动任务和一个定时器中间事件组成，在定时任务中绑定了两个JavaDelegate的Java类来处理

```java
public class SignalStartOnedelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("-------触发了-111-------->"+ LocalDateTime.now().toString());
    }
}

public class SignalStartTwodelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("-------触发了222--------->"+ LocalDateTime.now().toString());
    }
}
```



然后流程图中的关联为

![image-20220328204349358](img\image-20220328204349358.png)

另一个类似，然后定时器中间事件的等待时间设置是2分钟。我们部署后通过Java代码来演示看看

```java
    @Test
    public void test01() throws Exception{
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("等待定时器中间事件.bpmn20.xml")
                .name("等待定时中间事件...")
                .deploy();
        System.out.println("-----");
    }
```

然后我们需要启动流程实例，之后等待两分钟看效果

```java
    /**
     * 启动流程实例
     *
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{

        processEngine.getRuntimeService()
                .startProcessInstanceById("Test04:1:325edb10-ae95-11ec-a77f-c03c59ad2248");
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```



![image-20220328205718521](img\image-20220328205718521.png)



#### 边界事件

最后我们来看看边界事件中的等待定时器的处理，案例为：

![image-20220328210150212](img\image-20220328210150212.png)

该案例由一个人工审核+两个自动任务+定时器边界事件组成，自动任务一绑定的JavaDelegate是

```java
public class SignalStartOnedelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("-------触发了-111-------->"+ LocalDateTime.now().toString());
    }
}
```

自动任务二绑定的JavaDelegate是

```java
public class SignalStartTwodelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("-------触发了222--------->"+ LocalDateTime.now().toString());
    }
}
```

定时器边界事件设置的是30S，也就是如果人工审核在30S还没处理就会触发边界事件：通过代码来演示，部署流程后需要启动流程，然后等待30S看控制台输出

```java
    @Test
    public void test01() throws Exception{
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("等待定时器边界事件.bpmn20.xml")
                .name("等待定时器边界事件...")
                .deploy();
        System.out.println("-----");
    }
```

```java
    /**
     * 启动流程实例
     *
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{

        processEngine.getRuntimeService()
                .startProcessInstanceById("test05:1:c46f83bf-ae97-11ec-b055-c03c59ad2248");
        System.out.println("开始启动的时间：" + LocalDateTime.now().toString());
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```

等待控制台输出：

![image-20220328210905204](img\image-20220328210905204.png)



小结：timeDuration在三种定时器的事件中

* 定时器启动事件：等待指定时间后启动流程实例
* 定时器中间事件：AB任务中间有个定时器中间事件，A任务处理后需要等待对应的时间才能流转到B处
* 定时器边界事件：任务A绑定了定时器边界事件后，如果在等待时间以内A没有处理任务，那么就会触发对应的边界事件





### 1.5 timeCycle

&emsp;&emsp;指定重复周期，可用于周期性启动流程，或者为超期用户任务多次发送提醒,这个元素可以使用两种格式

* 第一种是按照[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals)标准定义的循环时间周期。例如（三次重复间隔，每次间隔为10小时）：R3/PT10H
* 也可以使用*timeCycle*的可选属性*endDate*，或者像这样直接写在时间表达式的结尾：`R3/PT10H/${EndDate}`。 当到达endDate时，应用会停止，并为该任务创建其他作业
* 也可以通过cron表达式来处理



#### 开始事件

&emsp;&emsp;编写案例来演示：

![image-20220328213218525](img\image-20220328213218525.png)

重复时间设置为 R3PT30S 重复3次，间隔30描述，自动任务绑定的是JavaDelegate

```java
public class SignalStartOnedelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("-------触发了-111-------->"+ LocalDateTime.now().toString());
    }
}
```

![image-20220328213330813](img\image-20220328213330813.png)

然后我们部署看效果

```java
    @Test
    public void test01() throws Exception{
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("重复启动事件.bpmn20.xml")
                .name("等待定时器边界事件...")
                .deploy();
        System.out.println("-----");
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```

![image-20220328213955271](img\image-20220328213955271.png)



然后我们再指定下endDate来看看案例，直接可以在xml中来处理

```xml
      <timerEventDefinition>
        <timeCycle>R3/PT30S/2022-03-28T21:46:11+00:00</timeCycle>
      </timerEventDefinition>
```

![image-20220328214459137](img\image-20220328214459137.png)



此外还可以通过cron表达式来处理：

```corn
0 0/5 * * * ?
```

![image-20220328215255141](img\image-20220328215255141.png)

![image-20220328215340678](img\image-20220328215340678.png)



#### 中间事件

&emsp;timeCycle作为中间事件的话，只会执行一次，案例如下

![image-20220328225250878](img\image-20220328225250878.png)

案例中的自动任务一二对应绑定如下的JavaDelegate.

```java
public class SignalStartOnedelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("-------触发了-111-------->"+ LocalDateTime.now().toString());
    }
}

public class SignalStartTwodelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("-------触发了222--------->"+ LocalDateTime.now().toString());
    }
}
```

中间事件的设置为`R3/PT30S` 循环3次，间隔30秒执行，但是这是中间事件，其实只会执行一次，我来看效果

部署后启动

```java
@Autowired
    private ProcessEngine processEngine;

    @Test
    public void test01() throws Exception{
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("循环中间事件.bpmn20.xml")
                .name("循环中间事件...")
                .deploy();
        System.out.println("-----");
    }

    /**
     * 启动流程实例
     *
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{

        processEngine.getRuntimeService()
                .startProcessInstanceById("cycle-middle-event:1:3456ade8-aea7-11ec-9064-c03c59ad2248");
        System.out.println("开始启动的时间：" + LocalDateTime.now().toString());
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```



![image-20220328225931465](img\image-20220328225931465.png)





#### 边界事件

&emsp;&emsp;在边界事件中，定义了循环条件`R3/PT30S`理论上要循环3次，间隔30S，单其实也只会执行一次，来看案例

![image-20220328231838967](img\image-20220328231838967.png)



案例上面的等待时间的是一样的，只是边界事件是30S

![image-20220328231955441](img\image-20220328231955441.png)



然后我们部署启动流程看效果

![image-20220329094741327](img\image-20220329094741327.png)



总结：循环设定

* 启动事件：根据设置循环启动流程实例
* 中间事件：即使设置了循环时间也只会触发异常
* 边界事件：即使设置了循环时间也只会触发异常







## 2.消息事件

&emsp;&emsp;消息事件（message event），是指引用具名消息的事件。消息具有名字与载荷。与信号不同，消息事件只有一个接收者

### 2.1 启动事件

&emsp;&emsp;消息启动事件，也就是我们通过接收到某些消息后来启动流程实例，比如接收到了一封邮件，一条短信等，具体通过案例来讲解

![image-20220329103837021](img\image-20220329103837021.png)

我们需要先定义一个消息

![image-20220329105849732](img\image-20220329105849732.png)

然后在消息开始节点出引用

![image-20220329105922977](img\image-20220329105922977.png)

然后通过代码来处理，部署和启动

```java
    /**
     * Deploy
     */
    @Test
    void testDeploy() throws Exception {
        //RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("消息启动事件.bpmn20.xml")
                .name("消息启动事件")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }
```

部署后不会自动启动，我们需要接收相关的信息后来触发。

```java
   /**
     * 通过消息来启动一个流程实例
     */
    @Test
    void startFlow() throws Exception{

       // runtimeService.startProcessInstanceById("event006:1:0532e730-af02-11ec-8cf3-c03c59ad2248");
       // 注意：发送消息发送的应该是消息的名称而不是消息的ID
        runtimeService.startProcessInstanceByMessage("第一个消息");
        System.out.println("启动时间：" + new Date());
        // 我们得保证容器的运行，所以需要阻塞
        TimeUnit.MINUTES.sleep(1);
    }
```





**注意**：发送消息发送的应该是消息的名称而不是消息的ID，报错如下：

![image-20220329104823537](img\image-20220329104823537.png)





### 2.2 中间事件

&emsp;&emsp;消息中间事件就是在流程运作中需要消息来触发的场景，案例演示，`自动流程1`处理完成后，需要接收特定的消息之后才能进入到`自动流程2`

![image-20220329111412619](img\image-20220329111412619.png)

消息中间事件绑定的消息为

![image-20220329111446959](img\image-20220329111446959.png)







然后通过代码来演示

```java
   /**
     * Deploy
     */
    @Test
    void testDeploy() throws Exception {
        //RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("消息中间事件.bpmn20.xml")
                .name("消息中间事件")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }

    /**
     * 通过消息来启动一个流程实例
     */
    @Test
    void startFlow() throws Exception{

        runtimeService.startProcessInstanceById("event008:1:9217aa5e-af0e-11ec-b11f-c03c59ad2248");
       // 注意：发送消息发送的应该是消息的名称而不是消息的ID
        //runtimeService.startProcessInstanceByMessage("第一个消息");
        System.out.println("启动时间：" + new Date());
        // 我们得保证容器的运行，所以需要阻塞
        //TimeUnit.MINUTES.sleep(1);
    }

    /**
     * 中间事件-发布消息
     */
    @Test
    void recevedMsg(){
        // 需要查询到executionId
        String processExecutionId = "b5349e22-af0e-11ec-93e6-c03c59ad2248";
        // 我们需要根据流程实例编号找到对应的执行编号
       /* Execution execution = runtimeService.createExecutionQuery()
                .processInstanceId("event008:1:9217aa5e-af0e-11ec-b11f-c03c59ad2248")
                .singleResult();
        System.out.println("----------->"+execution.getId());*/
        runtimeService.messageEventReceived("第二个消息",processExecutionId);
    }
```

可以看到的输出效果

![image-20220329112435376](img\image-20220329112435376.png)



### 2.3 边界事件

&emsp;&emsp;消息边界事件，如果在消息触发前还没有，案例演示：

![image-20220329113848978](img\image-20220329113848978.png)

部署流程

```java
    /**
     * Deploy
     */
    @Test
    void testDeploy() throws Exception {
        //RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("消息边界事件.bpmn20.xml")
                .name("消息边界事件")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }
    /**
     * 通过消息来启动一个流程实例
     */
    @Test
    void startFlow() throws Exception{

        runtimeService.startProcessInstanceById("event009:1:f2096787-af11-11ec-b290-c03c59ad2248");
       // 注意：发送消息发送的应该是消息的名称而不是消息的ID
        //runtimeService.startProcessInstanceByMessage("第一个消息");
        System.out.println("启动时间：" + new Date());
        // 我们得保证容器的运行，所以需要阻塞
        //TimeUnit.MINUTES.sleep(1);
    }
```

部署流程后启动流程实例会运转到

![image-20220329114038773](img\image-20220329114038773.png)



如果人工处理在消息订阅前没有处理就会触发边界事件

```java
    /**
     * 边界事件-发布消息
     */
    @Test
    void recevedMsg(){
        // 需要查询到executionId
        String processExecutionId = "1d503361-af12-11ec-89a4-c03c59ad2248";
        // 我们需要根据流程实例编号找到对应的执行编号
       /* Execution execution = runtimeService.createExecutionQuery()
                .processInstanceId("event008:1:9217aa5e-af0e-11ec-b11f-c03c59ad2248")
                .singleResult();
        System.out.println("----------->"+execution.getId());*/
        runtimeService.messageEventReceived("第三个消息",processExecutionId);
    }
```



![image-20220329114505074](img\image-20220329114505074.png)







## 3.错误事件

&emsp;&emsp;错误事件可以用做一个流程的开始事件或者作为一个任务或者子流程的边界事件，错误事件没有提供作用中间事件的功能，这一点和前面介绍的定时器事件和消息事件还有区别的。

### 3.1 开始事件

&emsp;&emsp;错误启动事件（error start event），可用于触发事件子流程（Event Sub-Process）。**错误启动事件不能用于启动流程实例**。

错误启动事件总是中断。我们通过案例来介绍。此处我们用Eclipse来绘制流程图，熟悉下Eclipse工具

![image-20220329235608917](img\image-20220329235608917.png)

注意：绘制的是子流程事件：

![image-20220330004724798](img\image-20220330004724798.png)

然后我们再定义一个错误，内容为：

```xml
<error id="error01" errorCode="abcd">
```

在FlowableUI中没找到错误定义的选项，我们就在流程文件中自己添加即可。



![image-20220329235702382](img\image-20220329235702382.png)



![image-20220329214507352](img\image-20220329214507352.png)

完整的流程文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
  <error id="error01" errorCode="abcd"></error>
  <process id="myProcess" name="My process" isExecutable="true">
    <startEvent id="startevent1" name="Start"></startEvent>
    <serviceTask id="servicetask1" name="自动任务一" activiti:class="com.bobo.delegate.MyOneDelegate"></serviceTask>
    <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="servicetask1"></sequenceFlow>
    <endEvent id="endevent1" name="End"></endEvent>
    <sequenceFlow id="flow2" sourceRef="servicetask1" targetRef="endevent1"></sequenceFlow>
    <subProcess id="eventsubprocess1" name="Event sub Process" triggeredByEvent="true">
      <startEvent id="errorstartevent1" name="Error start">
        <errorEventDefinition errorRef="error01"></errorEventDefinition>
      </startEvent>
      <serviceTask id="servicetask2" name="自动任务二" activiti:class="com.bobo.delegate.MyTwoDelegate"></serviceTask>
      <endEvent id="endevent2" name="End"></endEvent>
      <sequenceFlow id="flow3" sourceRef="servicetask2" targetRef="endevent2"></sequenceFlow>
      <sequenceFlow id="flow4" sourceRef="errorstartevent1" targetRef="servicetask2"></sequenceFlow>
    </subProcess>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
    <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
      <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="480.0" y="260.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="servicetask1" id="BPMNShape_servicetask1">
        <omgdc:Bounds height="55.0" width="105.0" x="710.0" y="250.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="930.0" y="260.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="eventsubprocess1" id="BPMNShape_eventsubprocess1">
        <omgdc:Bounds height="211.0" width="401.0" x="530.0" y="420.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="errorstartevent1" id="BPMNShape_errorstartevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="600.0" y="520.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="servicetask2" id="BPMNShape_servicetask2">
        <omgdc:Bounds height="55.0" width="105.0" x="700.0" y="510.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent2" id="BPMNShape_endevent2">
        <omgdc:Bounds height="35.0" width="35.0" x="850.0" y="520.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
        <omgdi:waypoint x="515.0" y="277.0"></omgdi:waypoint>
        <omgdi:waypoint x="710.0" y="277.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
        <omgdi:waypoint x="815.0" y="277.0"></omgdi:waypoint>
        <omgdi:waypoint x="930.0" y="277.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
        <omgdi:waypoint x="805.0" y="537.0"></omgdi:waypoint>
        <omgdi:waypoint x="850.0" y="537.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
        <omgdi:waypoint x="635.0" y="537.0"></omgdi:waypoint>
        <omgdi:waypoint x="700.0" y="537.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

然后我们在主流程中的`自动任务一`中我们抛出异常

```java
public class MyOneDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {

        System.out.println("完成自动审批任务-----》MyOneDelegate" + LocalDateTime.now().toString());
        // 业务执行发现有问题 此处的errorCode需要和定义的error标签中的errorCode保持一致
        throw new BpmnError("abcd");
    }
}
```

然后我们在`自定义任务二`中简单定义一个输出即可。然后我们部署任务

```java
    @Test
    public void test01() throws Exception{
        ZipInputStream in = new ZipInputStream(SpringBootFlowableApplicationTests.class.getClassLoader().getResourceAsStream("错误启动事件.bar"));
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addZipInputStream(in)
                .name("错误启动事件")
                .deploy();
        System.out.println("-----");
    }
```



然后我们再启动流程实例，那么自动任务一就会抛出异常，然后对应的子流程就会开始

```java
    /**
     * 启动流程实例
     *
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{

        processEngine.getRuntimeService()
                .startProcessInstanceById("myProcess:1:c0462994-af79-11ec-8cae-c03c59ad2248");
        System.out.println("开始启动的时间：" + LocalDateTime.now().toString());
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```



输出结果获取到了我们期望的结果

![image-20220330000557061](img\image-20220330000557061.png)





通过输出结果也可以看到执行的自动任务一后，抛出错误事件`abcd`,子流程触发并执行了。

![image-20220330000741836](img\image-20220330000741836.png)





### 3.2 边界事件

定义如下的流程图：

![image-20220330004335187](img\image-20220330004335187.png)

注意绘制的时候

![image-20220330004644673](img\image-20220330004644673.png)

xml文件内容为：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
    <error id="error02" errorCode="a123" ></error>
    <process id="myProcess" name="My process" isExecutable="true">
        <startEvent id="startevent1" name="Start"></startEvent>
        <serviceTask id="servicetask2" name="自动任务二" activiti:class="com.bobo.delegate.MyTwoDelegate"></serviceTask>
        <serviceTask id="servicetask3" name="自动任务三" activiti:class="com.bobo.delegate.MyThreeDelegate"></serviceTask>
        <endEvent id="endevent2" name="End"></endEvent>
        <sequenceFlow id="flow5" sourceRef="servicetask2" targetRef="endevent2"></sequenceFlow>
        <endEvent id="endevent3" name="End"></endEvent>
        <sequenceFlow id="flow6" sourceRef="servicetask3" targetRef="endevent3"></sequenceFlow>
        <subProcess id="subprocess1" name="Sub Process">
            <startEvent id="startevent2" name="Start"></startEvent>
            <serviceTask id="servicetask4" name="Service Task" activiti:class="com.bobo.delegate.MyOneDelegate"></serviceTask>
            <endEvent id="endevent4" name="End"></endEvent>
            <sequenceFlow id="flow10" sourceRef="servicetask4" targetRef="endevent4"></sequenceFlow>
            <sequenceFlow id="flow11" sourceRef="startevent2" targetRef="servicetask4"></sequenceFlow>
        </subProcess>
        <sequenceFlow id="flow8" sourceRef="startevent1" targetRef="subprocess1"></sequenceFlow>
        <sequenceFlow id="flow9" sourceRef="subprocess1" targetRef="servicetask2"></sequenceFlow>
        <boundaryEvent id="boundaryerror1" name="Error" attachedToRef="subprocess1">
            <errorEventDefinition errorRef="error02"></errorEventDefinition>
        </boundaryEvent>
        <sequenceFlow id="flow12" sourceRef="boundaryerror1" targetRef="servicetask3"></sequenceFlow>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
        <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
            <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="402.0" y="388.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="servicetask2" id="BPMNShape_servicetask2">
                <omgdc:Bounds height="55.0" width="105.0" x="1285.0" y="368.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="servicetask3" id="BPMNShape_servicetask3">
                <omgdc:Bounds height="55.0" width="105.0" x="1099.0" y="590.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent2" id="BPMNShape_endevent2">
                <omgdc:Bounds height="35.0" width="35.0" x="1440.0" y="378.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent3" id="BPMNShape_endevent3">
                <omgdc:Bounds height="35.0" width="35.0" x="1320.0" y="600.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="subprocess1" id="BPMNShape_subprocess1">
                <omgdc:Bounds height="271.0" width="451.0" x="660.0" y="270.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="startevent2" id="BPMNShape_startevent2">
                <omgdc:Bounds height="35.0" width="35.0" x="720.0" y="390.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="servicetask4" id="BPMNShape_servicetask4">
                <omgdc:Bounds height="55.0" width="105.0" x="850.0" y="381.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent4" id="BPMNShape_endevent4">
                <omgdc:Bounds height="35.0" width="35.0" x="1030.0" y="391.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="boundaryerror1" id="BPMNShape_boundaryerror1">
                <omgdc:Bounds height="30.0" width="30.0" x="950.0" y="520.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
                <omgdi:waypoint x="1390.0" y="395.0"></omgdi:waypoint>
                <omgdi:waypoint x="1440.0" y="395.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow6" id="BPMNEdge_flow6">
                <omgdi:waypoint x="1204.0" y="617.0"></omgdi:waypoint>
                <omgdi:waypoint x="1320.0" y="617.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow10" id="BPMNEdge_flow10">
                <omgdi:waypoint x="955.0" y="408.0"></omgdi:waypoint>
                <omgdi:waypoint x="1030.0" y="408.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow11" id="BPMNEdge_flow11">
                <omgdi:waypoint x="755.0" y="407.0"></omgdi:waypoint>
                <omgdi:waypoint x="850.0" y="408.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow8" id="BPMNEdge_flow8">
                <omgdi:waypoint x="437.0" y="405.0"></omgdi:waypoint>
                <omgdi:waypoint x="660.0" y="405.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow9" id="BPMNEdge_flow9">
                <omgdi:waypoint x="1111.0" y="405.0"></omgdi:waypoint>
                <omgdi:waypoint x="1285.0" y="395.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow12" id="BPMNEdge_flow12">
                <omgdi:waypoint x="965.0" y="550.0"></omgdi:waypoint>
                <omgdi:waypoint x="964.0" y="617.0"></omgdi:waypoint>
                <omgdi:waypoint x="1099.0" y="617.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>
```

对应的三个自定义任务绑定的JavaDelegate为：

```java
public class MyOneDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {

        System.out.println("完成自动审批任务-----》MyOneDelegate" + LocalDateTime.now().toString());
        // 业务执行发现有问题 此处的errorCode需要和定义的error标签中的errorCode保持一致
        throw new BpmnError("a123");
    }
}

public class MyTwoDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("MyTwoDelegate---->执行了" + LocalDateTime.now().toString());
    }
}

public class MyThreeDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("MyThreeDelegate---->执行了" + LocalDateTime.now().toString());
    }
}
```

然后我们部署文件

```java
    @Test
    public void test01() throws Exception{
        ZipInputStream in = new ZipInputStream(SpringBootFlowableApplicationTests.class
                .getClassLoader()
                .getResourceAsStream("错误边界事件.bar"));
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addZipInputStream(in)
                .name("错误边界事件")
                .deploy();
        System.out.println("-----");
    }
```

部署成功后我们再启动一个流程实例，进入到自定义任务一处会抛出异常，触发边界异常处理

![image-20220330003624235](img\image-20220330003624235.png)

输出的结果和我们预期的是一样的





## 4.信号事件

### 4.1 开始事件



![image-20220330095103789](img\image-20220330095103789.png)

然后设置相关的属性，并定义一个信号

![image-20220330095157518](img\image-20220330095157518.png)

然后在我们声明的信号开始引用我们上面创建的信号

![image-20220330095725130](img\image-20220330095725130.png)

完整的xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.7.2">
  <signal id="signal01" name="firstSignal" flowable:scope="global"></signal>
  <process id="event2001" name="信号启动事件" isExecutable="true">
    <startEvent id="start01" name="信号开始" isInterrupting="true">
      <signalEventDefinition signalRef="signal01"></signalEventDefinition>
    </startEvent>
    <serviceTask id="task1" name="自动任务" flowable:class="com.bobo.flow.delegate.MyTwoJavaDelegate"></serviceTask>
    <endEvent id="end01" name="结束"></endEvent>
    <sequenceFlow id="sid-0FF05CCE-85CB-416C-8D36-A935AF9586C2" sourceRef="task1" targetRef="end01"></sequenceFlow>
    <sequenceFlow id="sid-C8AD1AEE-5FCB-4419-8596-74532DD71ABC" sourceRef="start01" targetRef="task1"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_event2001">
    <bpmndi:BPMNPlane bpmnElement="event2001" id="BPMNPlane_event2001">
      <bpmndi:BPMNShape bpmnElement="start01" id="BPMNShape_start01">
        <omgdc:Bounds height="30.0" width="30.0" x="285.0" y="172.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task1" id="BPMNShape_task1">
        <omgdc:Bounds height="80.0" width="100.0" x="467.5" y="147.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="end01" id="BPMNShape_end01">
        <omgdc:Bounds height="28.0" width="28.0" x="612.5" y="173.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-C8AD1AEE-5FCB-4419-8596-74532DD71ABC" id="BPMNEdge_sid-C8AD1AEE-5FCB-4419-8596-74532DD71ABC" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="314.94999961358405" y="187.0"></omgdi:waypoint>
        <omgdi:waypoint x="467.4999999999399" y="187.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-0FF05CCE-85CB-416C-8D36-A935AF9586C2" id="BPMNEdge_sid-0FF05CCE-85CB-416C-8D36-A935AF9586C2" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="567.449999999996" y="187.0"></omgdi:waypoint>
        <omgdi:waypoint x="612.5" y="187.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

部署流程：

```java
   /**
     * Deploy
     */
    @Test
    void testDeploy() throws Exception {
        //RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("信号启动事件.bpmn20.xml")
                .name("信号启动事件")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }
```

流程是一个信息启动事件，所以我们需要释放对应的信号来触发流程的启动

```java
    /**
     * 通过信号发送来触发信号启动事件的执行
     * 全局的信息
     */
    @Test
    void signalReceived() throws Exception {
        runtimeService.signalEventReceived("firstSignal");
        // 我们得保证容器的运行，所以需要阻塞
        TimeUnit.MINUTES.sleep(1);
    }
```

通过输出语句可以看到自定义任务触发了

![image-20220330100203036](img\image-20220330100203036.png)



我们可以把信息的作用域由原来的golbal全局的调整为processInstance，测试后发现还是执行了，说明在启动事件信息的作用域其实是不起作用的。

```java
  <signal id="signal01" name="firstSignal" flowable:scope="processInstance"></signal>
```



### 4.2 中间捕获事件

案例如下：当我们启动事件后，会阻塞在这个消息获取中间事件处，等待相关信号后才会继续流转。

![image-20220330101820083](img\image-20220330101820083.png)

对应的信号绑定

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.7.2">
  <signal id="singnal02" name="secondSingal" flowable:scope="global"></signal>
  <process id="event2002" name="信号中间捕获事件" isExecutable="true">
    <startEvent id="start01" name="开始" flowable:formFieldValidation="true"></startEvent>
    <intermediateCatchEvent id="signal01" name="信号捕获中间事件">
      <signalEventDefinition signalRef="singnal02"></signalEventDefinition>
    </intermediateCatchEvent>
    <sequenceFlow id="sid-FBD95BC3-BA38-4863-95E6-E7D484FE80CB" sourceRef="start01" targetRef="signal01"></sequenceFlow>
    <serviceTask id="task01" name="自动任务" flowable:class="com.bobo.flow.delegate.MyTwoJavaDelegate"></serviceTask>
    <sequenceFlow id="sid-BF5FB671-5895-4FAC-8F92-E4BC4DEE821A" sourceRef="signal01" targetRef="task01"></sequenceFlow>
    <endEvent id="end01" name="结束任务"></endEvent>
    <sequenceFlow id="sid-4F4853C5-0FE6-48AB-BD80-A37CF807D90D" sourceRef="task01" targetRef="end01"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_event2002">
    <bpmndi:BPMNPlane bpmnElement="event2002" id="BPMNPlane_event2002">
      <bpmndi:BPMNShape bpmnElement="start01" id="BPMNShape_start01">
        <omgdc:Bounds height="30.0" width="30.0" x="120.0" y="150.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="signal01" id="BPMNShape_signal01">
        <omgdc:Bounds height="30.0" width="30.0" x="318.5" y="150.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task01" id="BPMNShape_task01">
        <omgdc:Bounds height="80.0" width="100.0" x="495.5" y="122.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="end01" id="BPMNShape_end01">
        <omgdc:Bounds height="28.0" width="28.0" x="690.0" y="151.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-BF5FB671-5895-4FAC-8F92-E4BC4DEE821A" id="BPMNEdge_sid-BF5FB671-5895-4FAC-8F92-E4BC4DEE821A" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="348.44853390329115" y="164.78775666509335"></omgdi:waypoint>
        <omgdi:waypoint x="495.49999999999903" y="162.7068396226415"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-4F4853C5-0FE6-48AB-BD80-A37CF807D90D" id="BPMNEdge_sid-4F4853C5-0FE6-48AB-BD80-A37CF807D90D" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="595.4499999999996" y="162.94542586750788"></omgdi:waypoint>
        <omgdi:waypoint x="690.0016973189436" y="164.73506227304313"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-FBD95BC3-BA38-4863-95E6-E7D484FE80CB" id="BPMNEdge_sid-FBD95BC3-BA38-4863-95E6-E7D484FE80CB" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="15.0" flowable:targetDockerY="15.0">
        <omgdi:waypoint x="149.94999953609073" y="165.0"></omgdi:waypoint>
        <omgdi:waypoint x="318.5" y="165.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

先部署：

```java
    /**
     * Deploy
     */
    @Test
    void testDeploy() throws Exception {
        //RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("信号中间捕获事件.bpmn20.xml")
                .name("信号中间捕获事件")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }
```

然后我们需要启动流程：

```java
    @Test
    void startFlow() throws Exception{
        runtimeService.startProcessInstanceById("event2002:1:adc5b8f8-afcf-11ec-959a-c03c59ad2248");
        System.out.println("启动时间：" + new Date());
    }
```

发送信号信息

```java
    /**
     * 通过信号发送来触发信号启动事件的执行
     * 全局的信息
     */
    @Test
    void signalGolbal() throws Exception {
        runtimeService.signalEventReceived("secondSingal");
        // 我们得保证容器的运行，所以需要阻塞
        TimeUnit.MINUTES.sleep(1);
    }
```

然后被我们的信号捕获中间事件捕获

![image-20220330102256367](img\image-20220330102256367.png)

信号作用域为processInstance的情况

![image-20220330102524238](img\image-20220330102524238.png)



首先针对processInstance的信号，我们发送global信号是不会被捕获的

![image-20220330102808127](img\image-20220330102808127.png)



然后processInstance的信息我们需要在流程实例内部抛出信号

![image-20220330112205035](img\image-20220330112205035.png)



### 4.3 中间抛出事件

&emsp;&emsp;信号中间抛出事件也就是在流程执行中的某个节点抛出了对应的信号，然后对应的信号中间捕获事件就会触发，我们通过具体的案例来演示如：

![image-20220330235847392](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330235847392.png)



定义信息信息：

![image-20220330193530718](img\image-20220330193530718.png)







![image-20220331000011215](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220331000011215.png)

完整的xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.7.2">
  <signal id="signal01" name="signal01" flowable:scope="global"></signal>
  <process id="event2003" name="信号中间抛出事件" isExecutable="true">
    <startEvent id="startId01" flowable:formFieldValidation="true"></startEvent>
    <parallelGateway id="pid01" name="并行网关"></parallelGateway>
    <sequenceFlow id="sid-296CDB16-A9D3-4255-9E44-D7C6F5DA5058" sourceRef="startId01" targetRef="pid01"></sequenceFlow>
    <serviceTask id="task01" name="自动任务一" flowable:class="com.bobo.delegate.MyOneDelegate"></serviceTask>
    <serviceTask id="task02" name="自动任务二" flowable:class="com.bobo.delegate.MyTwoDelegate"></serviceTask>
    <serviceTask id="task03" name="自动任务三" flowable:class="com.bobo.delegate.MyThreeDelegate"></serviceTask>
    <sequenceFlow id="sid-2325ED54-C769-4161-A00F-001F006B72B5" sourceRef="pid01" targetRef="task01"></sequenceFlow>
    <intermediateThrowEvent id="sid-262D1C04-299C-4DE6-BAD9-B8AA0FC4EBAB">
      <signalEventDefinition signalRef="signal01"></signalEventDefinition>
    </intermediateThrowEvent>
    <intermediateCatchEvent id="sid-51D70059-8D15-4BF7-9151-48CCD99544F1">
      <signalEventDefinition signalRef="signal01"></signalEventDefinition>
    </intermediateCatchEvent>
    <sequenceFlow id="sid-4A038E06-A731-4A5F-A929-840FB8A92AA5" sourceRef="task01" targetRef="sid-262D1C04-299C-4DE6-BAD9-B8AA0FC4EBAB"></sequenceFlow>
    <sequenceFlow id="sid-1C87EF67-D60F-47A3-A5B4-06FBC6F2390D" sourceRef="sid-262D1C04-299C-4DE6-BAD9-B8AA0FC4EBAB" targetRef="task02"></sequenceFlow>
    <sequenceFlow id="sid-DAC2B128-B6A7-48A2-8010-8AC6A806C04D" sourceRef="pid01" targetRef="sid-51D70059-8D15-4BF7-9151-48CCD99544F1"></sequenceFlow>
    <sequenceFlow id="sid-0ABE23AE-344C-49D8-B574-010DECD093BE" sourceRef="sid-51D70059-8D15-4BF7-9151-48CCD99544F1" targetRef="task03"></sequenceFlow>
    <parallelGateway id="pid02" name="并行网关"></parallelGateway>
    <sequenceFlow id="sid-584ADF4E-9140-4E5A-A396-1257E1436704" sourceRef="task02" targetRef="pid02"></sequenceFlow>
    <sequenceFlow id="sid-857F5F7F-7EA9-4986-9270-FFBF13E0B8CD" sourceRef="task03" targetRef="pid02"></sequenceFlow>
    <endEvent id="end01" name="结束"></endEvent>
    <sequenceFlow id="sid-02646A89-FCEC-4E7F-95B8-61F2065DE8D4" sourceRef="pid02" targetRef="end01"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_event2003">
    <bpmndi:BPMNPlane bpmnElement="event2003" id="BPMNPlane_event2003">
      <bpmndi:BPMNShape bpmnElement="startId01" id="BPMNShape_startId01">
        <omgdc:Bounds height="30.0" width="30.0" x="100.0" y="163.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="pid01" id="BPMNShape_pid01">
        <omgdc:Bounds height="40.0" width="40.0" x="270.0" y="158.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task01" id="BPMNShape_task01">
        <omgdc:Bounds height="80.0" width="100.0" x="419.5" y="71.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task02" id="BPMNShape_task02">
        <omgdc:Bounds height="80.0" width="100.0" x="780.0" y="71.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task03" id="BPMNShape_task03">
        <omgdc:Bounds height="80.0" width="100.0" x="795.0" y="255.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-262D1C04-299C-4DE6-BAD9-B8AA0FC4EBAB" id="BPMNShape_sid-262D1C04-299C-4DE6-BAD9-B8AA0FC4EBAB">
        <omgdc:Bounds height="30.0" width="30.0" x="633.5" y="96.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-51D70059-8D15-4BF7-9151-48CCD99544F1" id="BPMNShape_sid-51D70059-8D15-4BF7-9151-48CCD99544F1">
        <omgdc:Bounds height="30.0" width="30.0" x="465.0" y="278.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="pid02" id="BPMNShape_pid02">
        <omgdc:Bounds height="40.0" width="40.0" x="994.5" y="158.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="end01" id="BPMNShape_end01">
        <omgdc:Bounds height="28.0" width="28.0" x="1079.5" y="164.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-4A038E06-A731-4A5F-A929-840FB8A92AA5" id="BPMNEdge_sid-4A038E06-A731-4A5F-A929-840FB8A92AA5" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="15.0" flowable:targetDockerY="15.0">
        <omgdi:waypoint x="519.45" y="111.0"></omgdi:waypoint>
        <omgdi:waypoint x="633.5" y="111.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-02646A89-FCEC-4E7F-95B8-61F2065DE8D4" id="BPMNEdge_sid-02646A89-FCEC-4E7F-95B8-61F2065DE8D4" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="1034.0591869398208" y="178.3782051282051"></omgdi:waypoint>
        <omgdi:waypoint x="1079.5002755524838" y="178.08885188426407"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-857F5F7F-7EA9-4986-9270-FFBF13E0B8CD" id="BPMNEdge_sid-857F5F7F-7EA9-4986-9270-FFBF13E0B8CD" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="894.9499999999999" y="260.4867256637168"></omgdi:waypoint>
        <omgdi:waypoint x="1002.6675392670157" y="186.14712041884815"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-1C87EF67-D60F-47A3-A5B4-06FBC6F2390D" id="BPMNEdge_sid-1C87EF67-D60F-47A3-A5B4-06FBC6F2390D" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="663.4499994451444" y="111.0"></omgdi:waypoint>
        <omgdi:waypoint x="779.9999999999972" y="111.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-0ABE23AE-344C-49D8-B574-010DECD093BE" id="BPMNEdge_sid-0ABE23AE-344C-49D8-B574-010DECD093BE" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="494.9497692355611" y="293.0819166248564"></omgdi:waypoint>
        <omgdi:waypoint x="794.9999999999911" y="294.7260273972602"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-584ADF4E-9140-4E5A-A396-1257E1436704" id="BPMNEdge_sid-584ADF4E-9140-4E5A-A396-1257E1436704" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="879.9499999999999" y="129.1390243902439"></omgdi:waypoint>
        <omgdi:waypoint x="999.8065381558029" y="172.67196819085487"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-2325ED54-C769-4161-A00F-001F006B72B5" id="BPMNEdge_sid-2325ED54-C769-4161-A00F-001F006B72B5" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="304.9870182555781" y="173.0233265720081"></omgdi:waypoint>
        <omgdi:waypoint x="419.49999999999994" y="129.8358938547486"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-DAC2B128-B6A7-48A2-8010-8AC6A806C04D" id="BPMNEdge_sid-DAC2B128-B6A7-48A2-8010-8AC6A806C04D" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="15.0" flowable:targetDockerY="15.0">
        <omgdi:waypoint x="302.31181354817494" y="185.6374177631579"></omgdi:waypoint>
        <omgdi:waypoint x="467.15151373509184" y="285.24160328636844"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-296CDB16-A9D3-4255-9E44-D7C6F5DA5058" id="BPMNEdge_sid-296CDB16-A9D3-4255-9E44-D7C6F5DA5058" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="129.94999940317362" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="270.0" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

三个自定义任务绑定了三个javaDelegate分别给出打印语句来记录



然后部署任务

```java
    @Test
    public void test02() throws Exception{

        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("信号中间抛出事件.bpmn20.xml")
                .name("信号中间抛出事件")
                .deploy();
        System.out.println("-----");
    }
```

然后在启动任务即可

```java
 /**
     * 启动流程实例
     *
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{

        processEngine.getRuntimeService()
                .startProcessInstanceById("event2003:1:665b1533-b020-11ec-877d-c03c59ad2248");
        System.out.println("开始启动的时间：" + LocalDateTime.now().toString());
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```

看控制台的输出

![image-20220330200124232](img\image-20220330200124232.png)



效果：

![image-20220330200235193](img\image-20220330200235193.png)

### 4.4 边界事件

&emsp;&emsp;最后来看看信号边界事件，案例如下：

![image-20220330202443905](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330202443905.png)

完整的xml定义为

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.7.2">
  <signal id="signal2" name="signal2" flowable:scope="global"></signal>
  <process id="event2004" name="信号边界事件" isExecutable="true">
    <startEvent id="startEvent1" flowable:formFieldValidation="true"></startEvent>
    <userTask id="sid-F11058BE-828A-45FF-A830-8BF099D71FBD" name="人工任务" flowable:assignee="zhangsan" flowable:formFieldValidation="true">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-D2EE279A-24A2-4B6C-8021-ADC0A1A645EC" sourceRef="startEvent1" targetRef="sid-F11058BE-828A-45FF-A830-8BF099D71FBD"></sequenceFlow>
    <serviceTask id="sid-FAB46591-3247-4776-B3B5-79826133F5AF" name="自动任务一" flowable:class="com.bobo.delegate.MyOneDelegate"></serviceTask>
    <serviceTask id="sid-7CD0FBBA-4FE6-4646-B0D6-1D8A4D8D5515" name="自动任务二" flowable:class="com.bobo.delegate.MyTwoDelegate"></serviceTask>
    <sequenceFlow id="sid-74B48035-4CED-4963-AA87-55D1FB95EEA8" sourceRef="sid-F11058BE-828A-45FF-A830-8BF099D71FBD" targetRef="sid-FAB46591-3247-4776-B3B5-79826133F5AF"></sequenceFlow>
    <endEvent id="sid-55682CDC-FEBD-44A1-B38C-A3F816AC91F4"></endEvent>
    <sequenceFlow id="sid-AC84425B-8D8C-4A0F-BDCC-BC1DCF909752" sourceRef="sid-FAB46591-3247-4776-B3B5-79826133F5AF" targetRef="sid-55682CDC-FEBD-44A1-B38C-A3F816AC91F4"></sequenceFlow>
    <endEvent id="sid-11CA784C-69DE-45B2-AE58-78E64CF2EE8E"></endEvent>
    <sequenceFlow id="sid-A2E3E7C7-9AD0-46B8-8105-272496599E0D" sourceRef="sid-7CD0FBBA-4FE6-4646-B0D6-1D8A4D8D5515" targetRef="sid-11CA784C-69DE-45B2-AE58-78E64CF2EE8E"></sequenceFlow>
    <boundaryEvent id="sid-8E473D8E-70D6-4AB3-B1D9-D3E7EFCDB39D" attachedToRef="sid-F11058BE-828A-45FF-A830-8BF099D71FBD" cancelActivity="true">
      <signalEventDefinition signalRef="signal2"></signalEventDefinition>
    </boundaryEvent>
    <sequenceFlow id="sid-C3770DF2-1747-45A7-85B5-2838AB7ECF9C" sourceRef="sid-8E473D8E-70D6-4AB3-B1D9-D3E7EFCDB39D" targetRef="sid-7CD0FBBA-4FE6-4646-B0D6-1D8A4D8D5515"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_event2004">
    <bpmndi:BPMNPlane bpmnElement="event2004" id="BPMNPlane_event2004">
      <bpmndi:BPMNShape bpmnElement="startEvent1" id="BPMNShape_startEvent1">
        <omgdc:Bounds height="30.0" width="30.0" x="100.0" y="163.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-F11058BE-828A-45FF-A830-8BF099D71FBD" id="BPMNShape_sid-F11058BE-828A-45FF-A830-8BF099D71FBD">
        <omgdc:Bounds height="80.0" width="100.0" x="255.0" y="138.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-FAB46591-3247-4776-B3B5-79826133F5AF" id="BPMNShape_sid-FAB46591-3247-4776-B3B5-79826133F5AF">
        <omgdc:Bounds height="80.0" width="100.0" x="521.5" y="135.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-7CD0FBBA-4FE6-4646-B0D6-1D8A4D8D5515" id="BPMNShape_sid-7CD0FBBA-4FE6-4646-B0D6-1D8A4D8D5515">
        <omgdc:Bounds height="80.0" width="100.0" x="521.5" y="315.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-55682CDC-FEBD-44A1-B38C-A3F816AC91F4" id="BPMNShape_sid-55682CDC-FEBD-44A1-B38C-A3F816AC91F4">
        <omgdc:Bounds height="28.0" width="28.0" x="690.0" y="161.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-11CA784C-69DE-45B2-AE58-78E64CF2EE8E" id="BPMNShape_sid-11CA784C-69DE-45B2-AE58-78E64CF2EE8E">
        <omgdc:Bounds height="28.0" width="28.0" x="690.0" y="341.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-8E473D8E-70D6-4AB3-B1D9-D3E7EFCDB39D" id="BPMNShape_sid-8E473D8E-70D6-4AB3-B1D9-D3E7EFCDB39D">
        <omgdc:Bounds height="30.0" width="30.0" x="308.4527694396093" y="203.7233532460343"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-C3770DF2-1747-45A7-85B5-2838AB7ECF9C" id="BPMNEdge_sid-C3770DF2-1747-45A7-85B5-2838AB7ECF9C" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="336.557461183174" y="225.9233207922021"></omgdi:waypoint>
        <omgdi:waypoint x="521.4999999999999" y="327.5301011331414"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-74B48035-4CED-4963-AA87-55D1FB95EEA8" id="BPMNEdge_sid-74B48035-4CED-4963-AA87-55D1FB95EEA8" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="354.95000000000005" y="177.43714821763604"></omgdi:waypoint>
        <omgdi:waypoint x="521.5" y="175.56228893058162"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-D2EE279A-24A2-4B6C-8021-ADC0A1A645EC" id="BPMNEdge_sid-D2EE279A-24A2-4B6C-8021-ADC0A1A645EC" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="129.94999949366624" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="254.99999999993574" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-A2E3E7C7-9AD0-46B8-8105-272496599E0D" id="BPMNEdge_sid-A2E3E7C7-9AD0-46B8-8105-272496599E0D" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="621.4499999999999" y="355.0"></omgdi:waypoint>
        <omgdi:waypoint x="690.0" y="355.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-AC84425B-8D8C-4A0F-BDCC-BC1DCF909752" id="BPMNEdge_sid-AC84425B-8D8C-4A0F-BDCC-BC1DCF909752" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="621.4499999999999" y="175.0"></omgdi:waypoint>
        <omgdi:waypoint x="690.0" y="175.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```



定义的信号为：

```xml
<signal id="signal2" name="signal2" flowable:scope="global"></signal>
```

自动任务的内容

```java
public class MyOneDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {

        System.out.println("完成自动审批任务-----》MyOneDelegate" + LocalDateTime.now().toString());
    }
}

public class MyTwoDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("MyTwoDelegate---->执行了" + LocalDateTime.now().toString());
    }
}
```



部署项目然后启动流程

```java
    @Test
    public void test02() throws Exception{

        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("信号边界事件.bpmn20.xml")
                .name("信号边界事件")
                .deploy();
        System.out.println("-----");
    }

    @Test
    public void startProcessInstanceByKey()  throws Exception{

        processEngine.getRuntimeService()
                .startProcessInstanceById("event2004:1:e8b5c39f-b024-11ec-bdac-c03c59ad2248");
        System.out.println("开始启动的时间：" + LocalDateTime.now().toString());
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```



![image-20220330203056055](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330203056055.png)



```java
    @Test
    public void signalGlobal()  throws Exception{
        String signal = "signal2";
        Map<String, Object> variables = new HashMap();
        processEngine.getRuntimeService().signalEventReceived(signal,variables);
    }
```

![image-20220330203233862](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330203233862.png)



通过输出看到了我们期望的结果了，这样就给大家介绍完了信号相关的各种事件了





## 5.结束事件

&emsp;&emsp;结束事件顾名思义就是流程结束的事件，除了前面遇到的空结束事件外，结束事件还包括如下几种：

* 错误结束事件
* 中断结束事件
* 取消结束事件

### 5.1 错误结束事件

&emsp;&emsp;当流程执行到达**错误结束事件（error end event）**时，结束执行的当前分支，并抛出错误。这个错误可以由匹配的错误边界中间事件捕获。如果找不到匹配的错误边界事件，将会抛出异常。通过具体案例来详细讲解：

![image-20220331100340069](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220331100340069.png)

完整的xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.7.2">
  <error id="error03" errorCode="error03" ></error>
  <process id="event5001" name="错误结束事件" isExecutable="true">
    <startEvent id="start01" name="开始任务" flowable:formFieldValidation="true"></startEvent>
    <subProcess id="sid-794CA748-4381-417F-8350-360E89907E84" name="subProcess">
      <startEvent id="startc01" name="开始子流程" flowable:formFieldValidation="true"></startEvent>
      <serviceTask id="task01" name="自动任务一" flowable:class="com.bobo.flow.delegate.MyOneJavaDelegate"></serviceTask>
      <exclusiveGateway id="p001" name="排他网关"></exclusiveGateway>
      <endEvent id="endc01" name="子流程结束"></endEvent>
      <endEvent id="errorend01" name="错误结束事件">
        <errorEventDefinition errorRef="error03" flowable:errorVariableLocalScope="true" flowable:errorVariableTransient="true"></errorEventDefinition>
      </endEvent>
      <sequenceFlow id="sid-1B2782FA-5216-4817-B964-A77EDEBB7547" sourceRef="startc01" targetRef="task01"></sequenceFlow>
      <sequenceFlow id="sid-D2196400-20DC-4D6B-AAD2-AA9308CE8DEA" sourceRef="task01" targetRef="p001"></sequenceFlow>
      <sequenceFlow id="sid-DEC53745-1E74-4D08-B472-95F9A6B92D98" sourceRef="p001" targetRef="errorend01">
        <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag<=0}]]></conditionExpression>
      </sequenceFlow>
    </subProcess>
    <sequenceFlow id="sid-934F4EDF-16A9-4D4E-8D7A-4F8E1EEB0F9E" sourceRef="start01" targetRef="sid-794CA748-4381-417F-8350-360E89907E84"></sequenceFlow>
    <serviceTask id="task2" name="自动任务二" flowable:class="com.bobo.flow.delegate.MyTwoJavaDelegate"></serviceTask>
    <sequenceFlow id="sid-E8166885-00F6-49A1-BE26-3AB98FE95455" sourceRef="sid-794CA748-4381-417F-8350-360E89907E84" targetRef="task2"></sequenceFlow>
    <endEvent id="end02" name="主流程结束"></endEvent>
    <sequenceFlow id="sid-496A30AE-44AC-4298-83E0-3183F3FF935B" sourceRef="task2" targetRef="end02"></sequenceFlow>
    <boundaryEvent id="perror01" name="边界错误事件" attachedToRef="sid-794CA748-4381-417F-8350-360E89907E84">
      <errorEventDefinition errorRef="error03" flowable:errorVariableLocalScope="true" flowable:errorVariableTransient="true"></errorEventDefinition>
    </boundaryEvent>
    <sequenceFlow id="sid-9562301E-B400-4D1F-89B8-23E69ADEAE68" sourceRef="perror01" targetRef="task3"></sequenceFlow>
    <serviceTask id="task3" name="自动任务三" flowable:class="com.bobo.flow.delegate.MyThreeJavaDelegate"></serviceTask>
    <endEvent id="end003" name="主流程结束"></endEvent>
    <sequenceFlow id="sid-436E29BF-7F5E-4A4B-8F62-C0AEA010F4D2" sourceRef="task3" targetRef="end003"></sequenceFlow>
    <sequenceFlow id="sid-C17C73A1-5853-496B-B686-E7911105D459" sourceRef="sid-794CA748-4381-417F-8350-360E89907E84" targetRef="endc01">
      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag>0}]]></conditionExpression>
    </sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_event5001">
    <bpmndi:BPMNPlane bpmnElement="event5001" id="BPMNPlane_event5001">
      <bpmndi:BPMNShape bpmnElement="start01" id="BPMNShape_start01">
        <omgdc:Bounds height="30.0" width="30.0" x="75.0" y="205.5"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-794CA748-4381-417F-8350-360E89907E84" id="BPMNShape_sid-794CA748-4381-417F-8350-360E89907E84">
        <omgdc:Bounds height="261.0" width="593.0" x="240.0" y="90.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="startc01" id="BPMNShape_startc01">
        <omgdc:Bounds height="30.0" width="30.0" x="285.0" y="199.5"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task01" id="BPMNShape_task01">
        <omgdc:Bounds height="80.0" width="100.0" x="418.5" y="174.5"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="p001" id="BPMNShape_p001">
        <omgdc:Bounds height="40.0" width="40.0" x="563.5" y="194.5"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endc01" id="BPMNShape_endc01">
        <omgdc:Bounds height="28.0" width="28.0" x="675.0" y="150.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="errorend01" id="BPMNShape_errorend01">
        <omgdc:Bounds height="28.0" width="28.0" x="675.0" y="255.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task2" id="BPMNShape_task2">
        <omgdc:Bounds height="80.0" width="100.0" x="942.5" y="176.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="end02" id="BPMNShape_end02">
        <omgdc:Bounds height="28.0" width="28.0" x="1087.5" y="202.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="perror01" id="BPMNShape_perror01">
        <omgdc:Bounds height="30.0" width="30.0" x="478.02252392098524" y="336.450017237985"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task3" id="BPMNShape_task3">
        <omgdc:Bounds height="80.0" width="100.0" x="665.5" y="406.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="end003" id="BPMNShape_end003">
        <omgdc:Bounds height="28.0" width="28.0" x="810.5" y="432.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-934F4EDF-16A9-4D4E-8D7A-4F8E1EEB0F9E" id="BPMNEdge_sid-934F4EDF-16A9-4D4E-8D7A-4F8E1EEB0F9E" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="296.5" flowable:targetDockerY="130.5">
        <omgdi:waypoint x="104.9499999082861" y="220.5"></omgdi:waypoint>
        <omgdi:waypoint x="240.0" y="220.5"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-9562301E-B400-4D1F-89B8-23E69ADEAE68" id="BPMNEdge_sid-9562301E-B400-4D1F-89B8-23E69ADEAE68" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="1.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="493.02252392098524" y="366.40001519452954"></omgdi:waypoint>
        <omgdi:waypoint x="493.02252392098524" y="446.0"></omgdi:waypoint>
        <omgdi:waypoint x="665.4999999999623" y="446.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-E8166885-00F6-49A1-BE26-3AB98FE95455" id="BPMNEdge_sid-E8166885-00F6-49A1-BE26-3AB98FE95455" flowable:sourceDockerX="296.5" flowable:sourceDockerY="130.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="832.9499999999987" y="217.57401315789474"></omgdi:waypoint>
        <omgdi:waypoint x="942.499999999999" y="216.49292763157894"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-436E29BF-7F5E-4A4B-8F62-C0AEA010F4D2" id="BPMNEdge_sid-436E29BF-7F5E-4A4B-8F62-C0AEA010F4D2" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="765.4499999999999" y="446.0"></omgdi:waypoint>
        <omgdi:waypoint x="810.5" y="446.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-D2196400-20DC-4D6B-AAD2-AA9308CE8DEA" id="BPMNEdge_sid-D2196400-20DC-4D6B-AAD2-AA9308CE8DEA" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.5" flowable:targetDockerY="20.5">
        <omgdi:waypoint x="518.4499999999978" y="214.71623376623376"></omgdi:waypoint>
        <omgdi:waypoint x="563.9130434782609" y="214.91304347826087"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-496A30AE-44AC-4298-83E0-3183F3FF935B" id="BPMNEdge_sid-496A30AE-44AC-4298-83E0-3183F3FF935B" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="1042.449999999996" y="216.0"></omgdi:waypoint>
        <omgdi:waypoint x="1087.5" y="216.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-C17C73A1-5853-496B-B686-E7911105D459" id="BPMNEdge_sid-C17C73A1-5853-496B-B686-E7911105D459" flowable:sourceDockerX="343.3984375" flowable:sourceDockerY="106.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="583.3984375" y="196.0"></omgdi:waypoint>
        <omgdi:waypoint x="583.3984375" y="164.0"></omgdi:waypoint>
        <omgdi:waypoint x="675.0" y="164.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-1B2782FA-5216-4817-B964-A77EDEBB7547" id="BPMNEdge_sid-1B2782FA-5216-4817-B964-A77EDEBB7547" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="314.949999356254" y="214.5"></omgdi:waypoint>
        <omgdi:waypoint x="418.5" y="214.5"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-DEC53745-1E74-4D08-B472-95F9A6B92D98" id="BPMNEdge_sid-DEC53745-1E74-4D08-B472-95F9A6B92D98" flowable:sourceDockerX="20.8984375" flowable:sourceDockerY="36.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="584.3984375" y="233.54821399278214"></omgdi:waypoint>
        <omgdi:waypoint x="584.3984375" y="269.0"></omgdi:waypoint>
        <omgdi:waypoint x="675.0" y="269.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

定义的error

```xml
<error id="error01" errorCode="error01"></error>
```

在子流程中，当flag的数据为0的时候，就会触发错误结束事件

```xml
      <sequenceFlow id="1111" sourceRef="12222" targetRef="xxxxx44">
        <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag==0}]]></conditionExpression>
      </sequenceFlow>
```

然后我们在子流程上绑定了一个错误边界事件，绑定的也是error01,也就是当子流程触发错误结束事件，就会触发这个边界事件，进而完成自动任务三。

流程中关联的三个自动任务都只是输出一个打印语句~

然后我们需要做的操作有，部署，启动流程绑定流程变量flag的值为0，然后就可以看输出结果了

```java
    /**
    * 部署
    */
    @Test
    public void test02() throws Exception{

        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("错误结束事件.bpmn20.xml")
                .name("错误结束事件")
                .deploy();
        System.out.println("-----");
    }
```

然后启动流程

```java
    /**
     * 启动流程实例,设置流程变量中的flag=0触发错误结束事件
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{
        // 设置对应的流程变量的值
        Map<String,Object> map = new HashMap<>();
        map.put("flag",0);// 设置flag为0触发流程结束事件
        processEngine.getRuntimeService()
                .startProcessInstanceById("event2005:1:ebec87e2-b028-11ec-b93f-c03c59ad2248",map);
        System.out.println("开始启动的时间：" + LocalDateTime.now().toString());
        // 需要在此阻塞比等待长的时间
        TimeUnit.MINUTES.sleep(3);
    }
```

看控制台输出

![image-20220330210538338](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330210538338.png)

控制台输出的结果和我们预期的是一样的

![image-20220330210708334](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330210708334.png)

说明错误结束事件的作用就是在执行到错误结束的节点位置会抛出对应的错误，供需要获取的事件来处理。



### 5.2 中断结束事件

&emsp;&emsp;中断结束事件也称为终止结束事件，主要是对流程进行终止的事件，可以在一个复杂的流程中，如果某方想要提前中断这个流程，可以采用这个事件来处理，可以在并行处理任务中。如果你是在流程实例层处理，整个流程都会被中断，如果是在子流程中使用，那么当前作用和作用域内的所有的内部流程都会被终止。具体还是通过两个案例来给大家介绍：

#### 5.2.1 案例一

&emsp;&emsp;案例一我们介绍没有子流程的情况下终止的场景，具体案例如下

![image-20220331102808059](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220331102808059.png)

完整的xml文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.7.2">
  <process id="event5002" name="终止结束事件01" isExecutable="true">
    <startEvent id="start01" name="开始事件" flowable:formFieldValidation="true"></startEvent>
    <parallelGateway id="p001" name="并行网关"></parallelGateway>
    <parallelGateway id="p004" name="并行网关"></parallelGateway>
    <userTask id="task2" name="用户任务二" flowable:assignee="lisi" flowable:formFieldValidation="true">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-E3A5580F-4CE3-4556-894E-46C3D2134071" sourceRef="p001" targetRef="task2"></sequenceFlow>
    <userTask id="task1" name="用户任务一" flowable:assignee="zhangsan" flowable:formFieldValidation="true">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-FF8C06ED-AE40-46A1-A898-9FA4B0D4665A" sourceRef="p001" targetRef="task1"></sequenceFlow>
    <userTask id="task3" name="用户任务三" flowable:assignee="wangwu" flowable:formFieldValidation="true">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-226E06CD-07E8-4E38-A3FC-12CD417F54FC" sourceRef="p001" targetRef="task3"></sequenceFlow>
    <sequenceFlow id="sid-C1280677-F8B9-4C9C-B010-CEEA4DE17176" sourceRef="start01" targetRef="p001"></sequenceFlow>
    <sequenceFlow id="sid-F5ABC1D7-091F-4966-990F-44CE1A927869" sourceRef="task1" targetRef="p004"></sequenceFlow>
    <sequenceFlow id="sid-E1E26394-8B33-4766-9B3B-722958B91972" sourceRef="task2" targetRef="p004"></sequenceFlow>
    <endEvent id="end003" name="结束事件"></endEvent>
    <sequenceFlow id="sid-074345F1-5C34-435D-AECE-912DDBBBE105" sourceRef="p004" targetRef="end003"></sequenceFlow>
    <exclusiveGateway id="p003" name="排他网关"></exclusiveGateway>
    <endEvent id="sid-E9A4380A-AAF8-464C-B14B-15A2C1F1C2D2" name="终止结束事件">
      <terminateEventDefinition></terminateEventDefinition>
    </endEvent>
    <sequenceFlow id="sid-D00B6EDC-F2F4-4D8F-89BD-91272363CD49" sourceRef="task3" targetRef="p003"></sequenceFlow>
    <sequenceFlow id="sid-325962BF-7168-48C0-9107-B232A4627C10" sourceRef="p003" targetRef="sid-E9A4380A-AAF8-464C-B14B-15A2C1F1C2D2">
      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag<=0}]]></conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="sid-413A98AF-8CAF-470C-B751-E32229801310" sourceRef="p003" targetRef="p004">
      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag>0}]]></conditionExpression>
    </sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_event5002">
    <bpmndi:BPMNPlane bpmnElement="event5002" id="BPMNPlane_event5002">
      <bpmndi:BPMNShape bpmnElement="start01" id="BPMNShape_start01">
        <omgdc:Bounds height="30.0" width="30.0" x="102.5" y="253.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="p001" id="BPMNShape_p001">
        <omgdc:Bounds height="40.0" width="40.0" x="287.5" y="248.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="p004" id="BPMNShape_p004">
        <omgdc:Bounds height="40.0" width="40.0" x="720.0" y="248.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task2" id="BPMNShape_task2">
        <omgdc:Bounds height="80.0" width="100.0" x="372.5" y="228.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task1" id="BPMNShape_task1">
        <omgdc:Bounds height="80.0" width="100.0" x="372.5" y="105.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task3" id="BPMNShape_task3">
        <omgdc:Bounds height="80.0" width="100.0" x="377.5" y="390.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="end003" id="BPMNShape_end003">
        <omgdc:Bounds height="28.0" width="28.0" x="805.0" y="254.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="p003" id="BPMNShape_p003">
        <omgdc:Bounds height="40.0" width="40.0" x="570.0" y="410.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-E9A4380A-AAF8-464C-B14B-15A2C1F1C2D2" id="BPMNShape_sid-E9A4380A-AAF8-464C-B14B-15A2C1F1C2D2">
        <omgdc:Bounds height="28.0" width="28.0" x="576.0" y="495.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-E1E26394-8B33-4766-9B3B-722958B91972" id="BPMNEdge_sid-E1E26394-8B33-4766-9B3B-722958B91972" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="7.5" flowable:targetDockerY="19.0">
        <omgdi:waypoint x="472.4499999999732" y="268.0"></omgdi:waypoint>
        <omgdi:waypoint x="596.25" y="268.0"></omgdi:waypoint>
        <omgdi:waypoint x="596.25" y="267.0"></omgdi:waypoint>
        <omgdi:waypoint x="720.9525123715264" y="267.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-226E06CD-07E8-4E38-A3FC-12CD417F54FC" id="BPMNEdge_sid-226E06CD-07E8-4E38-A3FC-12CD417F54FC" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="308.0" y="287.4441367574257"></omgdi:waypoint>
        <omgdi:waypoint x="308.0" y="430.0"></omgdi:waypoint>
        <omgdi:waypoint x="377.5" y="430.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-325962BF-7168-48C0-9107-B232A4627C10" id="BPMNEdge_sid-325962BF-7168-48C0-9107-B232A4627C10" flowable:sourceDockerX="19.53125" flowable:sourceDockerY="34.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="589.5677159590043" y="449.51771595900436"></omgdi:waypoint>
        <omgdi:waypoint x="589.8981518165715" y="495.0001397608249"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-F5ABC1D7-091F-4966-990F-44CE1A927869" id="BPMNEdge_sid-F5ABC1D7-091F-4966-990F-44CE1A927869" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="1.0">
        <omgdi:waypoint x="472.44999999982196" y="145.0"></omgdi:waypoint>
        <omgdi:waypoint x="740.0" y="145.0"></omgdi:waypoint>
        <omgdi:waypoint x="740.0" y="248.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-D00B6EDC-F2F4-4D8F-89BD-91272363CD49" id="BPMNEdge_sid-D00B6EDC-F2F4-4D8F-89BD-91272363CD49" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="7.0" flowable:targetDockerY="22.0">
        <omgdi:waypoint x="477.449999999998" y="430.66822742474915"></omgdi:waypoint>
        <omgdi:waypoint x="571.9322033898305" y="431.93220338983053"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-E3A5580F-4CE3-4556-894E-46C3D2134071" id="BPMNEdge_sid-E3A5580F-4CE3-4556-894E-46C3D2134071" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="327.0247370727432" y="268.4166666666667"></omgdi:waypoint>
        <omgdi:waypoint x="372.49999999998806" y="268.2181222707423"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-074345F1-5C34-435D-AECE-912DDBBBE105" id="BPMNEdge_sid-074345F1-5C34-435D-AECE-912DDBBBE105" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="759.5591869398207" y="268.37820512820514"></omgdi:waypoint>
        <omgdi:waypoint x="805.0002755524882" y="268.08885188426405"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-C1280677-F8B9-4C9C-B010-CEEA4DE17176" id="BPMNEdge_sid-C1280677-F8B9-4C9C-B010-CEEA4DE17176" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="132.44999949366624" y="268.0"></omgdi:waypoint>
        <omgdi:waypoint x="287.5" y="268.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-413A98AF-8CAF-470C-B751-E32229801310" id="BPMNEdge_sid-413A98AF-8CAF-470C-B751-E32229801310" flowable:sourceDockerX="37.5" flowable:sourceDockerY="20.4375" flowable:targetDockerX="22.5" flowable:targetDockerY="31.0">
        <omgdi:waypoint x="609.5117551813031" y="430.4375"></omgdi:waypoint>
        <omgdi:waypoint x="742.5" y="430.4375"></omgdi:waypoint>
        <omgdi:waypoint x="742.5" y="285.402097959858"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-FF8C06ED-AE40-46A1-A898-9FA4B0D4665A" id="BPMNEdge_sid-FF8C06ED-AE40-46A1-A898-9FA4B0D4665A" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="308.0" y="248.5"></omgdi:waypoint>
        <omgdi:waypoint x="308.0" y="145.0"></omgdi:waypoint>
        <omgdi:waypoint x="372.5" y="145.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

流程定义说明：并行网关中3个人工审核任务，分别分配的用户为zhangsan lisi wangwu ，然后在wangwu审核后会进入一个排他网关，如果flag是小于等于0就会触发终止结束事件。

```xml
<sequenceFlow id="sid-89945688-1D51-4391-A713-3E77ADB2FA06" sourceRef="p001" targetRef="stop001">
      <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag<=0}]]></conditionExpression>
    </sequenceFlow>
```

具体操作：部署流程-->启动流程实例-->wanwu 处理任务【流程实例 flag <= 0】 触发任务

```java
    @Test
    public void test02() throws Exception{

        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("终止流程1.bpmn20.xml")
                .name("终止流程1")
                .deploy();
        System.out.println("-----");
    }
```

启动流程实例

```java
    @Test
    public void startProcessInstanceByKey()  throws Exception{
        // 设置对应的流程变量的值
        Map<String,Object> map = new HashMap<>();
        map.put("flag",0);// 设置flag为0触发流程结束事件
        processEngine.getRuntimeService()
                .startProcessInstanceById("event3001:1:8b1663fa-b02d-11ec-b480-c03c59ad2248",map);
    }
```

这时可以看到三个并行的Task任务：

![image-20220330213147240](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330213147240.png)

这时我们只需王五来处理即可，在上一步中我们已经对流程变量赋值了

```java
    @Test
    public void completeTask(){
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionId("event3001:1:8b1663fa-b02d-11ec-b480-c03c59ad2248")
                .taskAssignee("wangwu")
                .singleResult();
        taskService.complete(task.getId());
    }
```

然后再去看Task表中已经没有另外两条记录了哦

![image-20220330213516673](img\image-20220330213516673.png)

通过案例可以看到在没有子流程的情况下，终止结束事件会把整个流程都进程都结束了，而且在历史记录中也可以看到信息

![image-20220330215127129](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330215127129.png)



#### 5.2.2 案例二

&emsp;&emsp;然后我们来看看在子流程中触发终止结束事件的案例：

![image-20220330220208085](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330220208085.png)

完整的xml内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.7.2">
  <process id="event3002" name="终止流程2" isExecutable="true">
    <startEvent id="start01" name="任务开始" flowable:formFieldValidation="true"></startEvent>
    <userTask id="task2" name="用户任务二" flowable:assignee="lisi" flowable:formFieldValidation="true">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-03E93AD6-F173-454F-B29F-B61FE45BE1E0" sourceRef="b001" targetRef="task2"></sequenceFlow>
    <userTask id="task1" name="用户任务一" flowable:assignee="zhangsan" flowable:formFieldValidation="true">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-A4455D52-7DAF-4193-9E4F-D75E133A6EDD" sourceRef="b001" targetRef="task1"></sequenceFlow>
    <subProcess id="sid-7A5C1ACB-D07C-407D-83BB-C55D04425AC7" name="subProcess">
      <startEvent id="cstart01" name="子流程开始" flowable:formFieldValidation="true"></startEvent>
      <userTask id="taskc01" name="子人工任务一" flowable:assignee="user1" flowable:formFieldValidation="true">
        <extensionElements>
          <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
        </extensionElements>
      </userTask>
      <exclusiveGateway id="p001" name="排他网关"></exclusiveGateway>
      <userTask id="taskc02" name="子人工任务二" flowable:assignee="user2" flowable:formFieldValidation="true">
        <extensionElements>
          <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
        </extensionElements>
      </userTask>
      <endEvent id="endc01" name="子流程结束"></endEvent>
      <endEvent id="sid-BD67523C-DDDA-46B8-A788-C54769B081B1">
        <terminateEventDefinition></terminateEventDefinition>
      </endEvent>
      <sequenceFlow id="sid-2E0A3425-3C34-4771-85C0-C8C7B7D7BFF5" sourceRef="cstart01" targetRef="taskc01"></sequenceFlow>
      <sequenceFlow id="sid-B0777673-C3BE-488B-87B2-34A71CEE2C73" sourceRef="taskc01" targetRef="p001"></sequenceFlow>
      <sequenceFlow id="sid-3C938AB5-2FDF-4C0B-AED8-15853AB07FE8" sourceRef="taskc02" targetRef="endc01"></sequenceFlow>
      <sequenceFlow id="sid-AAC6E950-F7BD-454A-9105-F43E5D4530A1" sourceRef="p001" targetRef="sid-BD67523C-DDDA-46B8-A788-C54769B081B1">
        <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag<=0}]]></conditionExpression>
      </sequenceFlow>
      <sequenceFlow id="sid-EFCAE414-03A4-4313-B97A-4BF962888C37" sourceRef="p001" targetRef="taskc02">
        <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag>0}]]></conditionExpression>
      </sequenceFlow>
    </subProcess>
    <parallelGateway id="b001" name="并行网关"></parallelGateway>
    <sequenceFlow id="sid-D87CB0F6-EF35-479A-80A7-5FDACF1022E1" sourceRef="start01" targetRef="b001"></sequenceFlow>
    <parallelGateway id="b002" name="并行网关"></parallelGateway>
    <sequenceFlow id="sid-200E2768-DCA0-4FAD-A3C0-2D69938379A2" sourceRef="task2" targetRef="b002"></sequenceFlow>
    <sequenceFlow id="sid-A554CEA8-FD95-4EA4-BED3-EA748273D775" sourceRef="sid-7A5C1ACB-D07C-407D-83BB-C55D04425AC7" targetRef="b002"></sequenceFlow>
    <sequenceFlow id="sid-C5FB6E94-3563-49C8-9BA2-C0C80670E9FD" sourceRef="task1" targetRef="b002"></sequenceFlow>
    <endEvent id="end003" name="结束事件"></endEvent>
    <sequenceFlow id="sid-679D7677-4828-4BCF-9F2E-CBC426D4B72B" sourceRef="b002" targetRef="end003"></sequenceFlow>
    <sequenceFlow id="sid-0264CAD1-386A-4A4F-ADDA-DCF62EE90594" sourceRef="b001" targetRef="sid-7A5C1ACB-D07C-407D-83BB-C55D04425AC7"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_event3002">
    <bpmndi:BPMNPlane bpmnElement="event3002" id="BPMNPlane_event3002">
      <bpmndi:BPMNShape bpmnElement="start01" id="BPMNShape_start01">
        <omgdc:Bounds height="30.0" width="30.0" x="75.0" y="200.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task2" id="BPMNShape_task2">
        <omgdc:Bounds height="80.0" width="100.0" x="420.0" y="175.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="task1" id="BPMNShape_task1">
        <omgdc:Bounds height="80.0" width="100.0" x="420.0" y="15.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-7A5C1ACB-D07C-407D-83BB-C55D04425AC7" id="BPMNShape_sid-7A5C1ACB-D07C-407D-83BB-C55D04425AC7">
        <omgdc:Bounds height="187.0" width="531.0" x="285.0" y="330.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="cstart01" id="BPMNShape_cstart01">
        <omgdc:Bounds height="30.0" width="30.0" x="322.5" y="410.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="taskc01" id="BPMNShape_taskc01">
        <omgdc:Bounds height="80.0" width="100.0" x="390.0" y="385.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="p001" id="BPMNShape_p001">
        <omgdc:Bounds height="40.0" width="40.0" x="542.5" y="405.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="taskc02" id="BPMNShape_taskc02">
        <omgdc:Bounds height="80.0" width="100.0" x="627.5" y="385.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endc01" id="BPMNShape_endc01">
        <omgdc:Bounds height="28.0" width="28.0" x="765.0" y="411.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-BD67523C-DDDA-46B8-A788-C54769B081B1" id="BPMNShape_sid-BD67523C-DDDA-46B8-A788-C54769B081B1">
        <omgdc:Bounds height="28.0" width="28.0" x="548.5" y="480.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="b001" id="BPMNShape_b001">
        <omgdc:Bounds height="40.0" width="40.0" x="165.0" y="195.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="b002" id="BPMNShape_b002">
        <omgdc:Bounds height="40.0" width="40.0" x="867.5" y="195.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="end003" id="BPMNShape_end003">
        <omgdc:Bounds height="28.0" width="28.0" x="960.0" y="207.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-EFCAE414-03A4-4313-B97A-4BF962888C37" id="BPMNEdge_sid-EFCAE414-03A4-4313-B97A-4BF962888C37" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="582.0247370727355" y="425.41666666666663"></omgdi:waypoint>
        <omgdi:waypoint x="627.4999999999881" y="425.2181222707423"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-3C938AB5-2FDF-4C0B-AED8-15853AB07FE8" id="BPMNEdge_sid-3C938AB5-2FDF-4C0B-AED8-15853AB07FE8" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="727.4499999997752" y="425.0"></omgdi:waypoint>
        <omgdi:waypoint x="765.0" y="425.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-2E0A3425-3C34-4771-85C0-C8C7B7D7BFF5" id="BPMNEdge_sid-2E0A3425-3C34-4771-85C0-C8C7B7D7BFF5" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="352.449998261009" y="425.0"></omgdi:waypoint>
        <omgdi:waypoint x="390.0" y="425.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-A554CEA8-FD95-4EA4-BED3-EA748273D775" id="BPMNEdge_sid-A554CEA8-FD95-4EA4-BED3-EA748273D775" flowable:sourceDockerX="265.5" flowable:sourceDockerY="93.5" flowable:targetDockerX="20.5" flowable:targetDockerY="20.5">
        <omgdi:waypoint x="815.95" y="423.5"></omgdi:waypoint>
        <omgdi:waypoint x="888.0" y="423.5"></omgdi:waypoint>
        <omgdi:waypoint x="888.0" y="234.40453342953353"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-AAC6E950-F7BD-454A-9105-F43E5D4530A1" id="BPMNEdge_sid-AAC6E950-F7BD-454A-9105-F43E5D4530A1" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="562.8602941176471" y="444.5752202643172"></omgdi:waypoint>
        <omgdi:waypoint x="562.6018221538329" y="480.0003662069823"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-200E2768-DCA0-4FAD-A3C0-2D69938379A2" id="BPMNEdge_sid-200E2768-DCA0-4FAD-A3C0-2D69938379A2" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.5" flowable:targetDockerY="20.5">
        <omgdi:waypoint x="519.949999999999" y="215.05974880382777"></omgdi:waypoint>
        <omgdi:waypoint x="867.97604790418" y="215.4760479041916"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-B0777673-C3BE-488B-87B2-34A71CEE2C73" id="BPMNEdge_sid-B0777673-C3BE-488B-87B2-34A71CEE2C73" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.5" flowable:targetDockerY="20.5">
        <omgdi:waypoint x="489.9499999999965" y="425.2030487804878"></omgdi:waypoint>
        <omgdi:waypoint x="542.9183673469388" y="425.4183673469388"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-679D7677-4828-4BCF-9F2E-CBC426D4B72B" id="BPMNEdge_sid-679D7677-4828-4BCF-9F2E-CBC426D4B72B" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="906.92933478735" y="215.5"></omgdi:waypoint>
        <omgdi:waypoint x="933.75" y="215.5"></omgdi:waypoint>
        <omgdi:waypoint x="933.75" y="221.0"></omgdi:waypoint>
        <omgdi:waypoint x="960.0" y="221.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-D87CB0F6-EF35-479A-80A7-5FDACF1022E1" id="BPMNEdge_sid-D87CB0F6-EF35-479A-80A7-5FDACF1022E1" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="104.94999797575196" y="215.0"></omgdi:waypoint>
        <omgdi:waypoint x="165.0" y="215.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-0264CAD1-386A-4A4F-ADDA-DCF62EE90594" id="BPMNEdge_sid-0264CAD1-386A-4A4F-ADDA-DCF62EE90594" flowable:sourceDockerX="22.5" flowable:sourceDockerY="32.015625" flowable:targetDockerX="1.1773835920177385" flowable:targetDockerY="93.5">
        <omgdi:waypoint x="187.5" y="232.44861780088067"></omgdi:waypoint>
        <omgdi:waypoint x="187.5" y="423.5"></omgdi:waypoint>
        <omgdi:waypoint x="285.0" y="423.5"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-03E93AD6-F173-454F-B29F-B61FE45BE1E0" id="BPMNEdge_sid-03E93AD6-F173-454F-B29F-B61FE45BE1E0" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="204.4800158394907" y="215.46654929577466"></omgdi:waypoint>
        <omgdi:waypoint x="419.99999999998107" y="215.08778558875218"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-A4455D52-7DAF-4193-9E4F-D75E133A6EDD" id="BPMNEdge_sid-A4455D52-7DAF-4193-9E4F-D75E133A6EDD" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="185.5" y="195.5"></omgdi:waypoint>
        <omgdi:waypoint x="185.5" y="55.0"></omgdi:waypoint>
        <omgdi:waypoint x="420.0" y="55.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-C5FB6E94-3563-49C8-9BA2-C0C80670E9FD" id="BPMNEdge_sid-C5FB6E94-3563-49C8-9BA2-C0C80670E9FD" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="13.7109375">
        <omgdi:waypoint x="519.95" y="55.0"></omgdi:waypoint>
        <omgdi:waypoint x="887.5" y="55.0"></omgdi:waypoint>
        <omgdi:waypoint x="887.5" y="195.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

流程说明：人工任务一 -->zhangsan  人工任务二 -->lisi  子人工任务一 ： user1 子人工任务二 ： user2

子任务完成任务如果flag<=0,那么子流程中断结束，子人工任务二不会触发

部署流程

```java
    @Test
    public void test02() throws Exception{

        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("终止流程2.bpmn20.xml")
                .name("终止流程2")
                .deploy();
        System.out.println("-----");
    }
```

然后启动流程

```java
    @Test
    public void startProcessInstanceByKey()  throws Exception{
        // 设置对应的流程变量的值
        Map<String,Object> map = new HashMap<>();
        map.put("flag",0);// 设置flag为0触发流程结束事件
        processEngine.getRuntimeService()
                .startProcessInstanceById("event3002:1:92679bec-b03d-11ec-901e-c03c59ad2248",map);
    }
```

这时在ACT_RU_TASK中就应该有三条对应的TASK记录了

![image-20220330232643286](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330232643286.png)

然后我们执行`user1`的子任务，因为现在流程变量`flag=0`所以会触发终止结束事件

![image-20220330232801450](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330232801450.png)

执行任务：

```java
    @Test
    public void completeTask(){
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionId("event3002:1:92679bec-b03d-11ec-901e-c03c59ad2248")
                .taskAssignee("user1")
                .singleResult();
        taskService.complete(task.getId());
    }
```

执行成功后我们可以发现子人工任务一没有了，但是也没有子人工任务二，但是主流程中的两个任务都还在

![image-20220330232959807](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330232959807.png)

而且进入到历史数据中也可以看到

![image-20220330233448096](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220330233448096.png)





### 5.3 取消结束事件

&emsp;&emsp;取消结束事件（cancel end event）只能与BPMN事务子流程（BPMN transaction subprocess）一起使用。当到达取消结束事件时，会抛出取消事件，且必须由取消边界事件（cancel boundary event）捕获。取消边界事件将取消事务，并触发补偿（compensation）。

具体通过案例来讲解：

![image-20220401110131810](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401110131810.png)



结束取消事件我们只能在事务子流程中使用，在FlowableUI中暂时没有找到这个组件，所以在Eclipse中来绘制

![image-20220401110621048](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401110621048.png)



完整的xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
  <process id="myProcess" name="My process" isExecutable="true">
    <startEvent id="startevent1" name="Start"></startEvent>
    <transaction id="transaction1" name="Transaction">
      <startEvent id="startevent2" name="事务子流程开始"></startEvent>
      <userTask id="usertask1" name="人工任务一" activiti:assignee="zhangsan"></userTask>
      <sequenceFlow id="flow2" sourceRef="startevent2" targetRef="usertask1"></sequenceFlow>
      <exclusiveGateway id="exclusivegateway1" name="排他网关"></exclusiveGateway>
      <sequenceFlow id="flow3" sourceRef="usertask1" targetRef="exclusivegateway1"></sequenceFlow>
      <userTask id="usertask2" name="人工任务二" activiti:assignee="lisi"></userTask>
      <sequenceFlow id="flow4" sourceRef="exclusivegateway1" targetRef="usertask2">
        <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag>0}]]></conditionExpression>
      </sequenceFlow>
      <endEvent id="endevent1" name="事务子流程结束"></endEvent>
      <sequenceFlow id="flow5" sourceRef="usertask2" targetRef="endevent1"></sequenceFlow>
      <endEvent id="cancelendevent1" name="取消结束事件">
        <cancelEventDefinition></cancelEventDefinition>
      </endEvent>
      <sequenceFlow id="flow6" sourceRef="exclusivegateway1" targetRef="cancelendevent1">
        <conditionExpression xsi:type="tFormalExpression"><![CDATA[${flag<=0}]]></conditionExpression>
      </sequenceFlow>
      <boundaryEvent id="boundarycompensation1" name="Compensate" attachedToRef="usertask1" cancelActivity="true">
        <compensateEventDefinition></compensateEventDefinition>
      </boundaryEvent>
      <serviceTask id="servicetask5" name="补偿自动任务" isForCompensation="true" activiti:class="com.bobo.delegate.MyOneDelegate"></serviceTask>
      <association id="association1" sourceRef="boundarycompensation1" targetRef="servicetask5" associationDirection="None"></association>
    </transaction>
    <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="transaction1"></sequenceFlow>
    <boundaryEvent id="boundarycancel1" name="取消边界事件" attachedToRef="transaction1" cancelActivity="true">
      <cancelEventDefinition></cancelEventDefinition>
    </boundaryEvent>
    <serviceTask id="servicetask3" name="取消事件结束" activiti:class="com.bobo.delegate.MyThreeDelegate"></serviceTask>
    <sequenceFlow id="flow8" sourceRef="boundarycancel1" targetRef="servicetask3"></sequenceFlow>
    <endEvent id="endevent2" name="取消事件结束"></endEvent>
    <sequenceFlow id="flow9" sourceRef="servicetask3" targetRef="endevent2"></sequenceFlow>
    <serviceTask id="servicetask4" name="正常结束任务" activiti:class="com.bobo.delegate.MyTwoDelegate"></serviceTask>
    <sequenceFlow id="flow10" sourceRef="transaction1" targetRef="servicetask4"></sequenceFlow>
    <endEvent id="endevent3" name="End"></endEvent>
    <sequenceFlow id="flow11" sourceRef="servicetask4" targetRef="endevent3"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
    <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
      <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="248.0" y="390.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="transaction1" id="BPMNShape_transaction1">
        <omgdc:Bounds height="291.0" width="761.0" x="371.0" y="262.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="startevent2" id="BPMNShape_startevent2">
        <omgdc:Bounds height="35.0" width="35.0" x="431.0" y="382.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
        <omgdc:Bounds height="55.0" width="105.0" x="511.0" y="372.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="boundarycompensation1" id="BPMNShape_boundarycompensation1">
        <omgdc:Bounds height="30.0" width="30.0" x="581.0" y="412.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="exclusivegateway1" id="BPMNShape_exclusivegateway1">
        <omgdc:Bounds height="40.0" width="40.0" x="661.0" y="380.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask2" id="BPMNShape_usertask2">
        <omgdc:Bounds height="55.0" width="105.0" x="746.0" y="373.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="896.0" y="383.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="cancelendevent1" id="BPMNShape_cancelendevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="664.0" y="472.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="servicetask5" id="BPMNShape_servicetask5">
        <omgdc:Bounds height="55.0" width="105.0" x="511.0" y="472.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="boundarycancel1" id="BPMNShape_boundarycancel1">
        <omgdc:Bounds height="30.0" width="30.0" x="871.0" y="542.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="servicetask3" id="BPMNShape_servicetask3">
        <omgdc:Bounds height="55.0" width="105.0" x="980.0" y="640.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent2" id="BPMNShape_endevent2">
        <omgdc:Bounds height="35.0" width="35.0" x="1130.0" y="650.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="servicetask4" id="BPMNShape_servicetask4">
        <omgdc:Bounds height="55.0" width="105.0" x="1291.0" y="391.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent3" id="BPMNShape_endevent3">
        <omgdc:Bounds height="35.0" width="35.0" x="1450.0" y="401.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
        <omgdi:waypoint x="466.0" y="399.0"></omgdi:waypoint>
        <omgdi:waypoint x="511.0" y="399.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
        <omgdi:waypoint x="616.0" y="399.0"></omgdi:waypoint>
        <omgdi:waypoint x="661.0" y="400.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
        <omgdi:waypoint x="701.0" y="400.0"></omgdi:waypoint>
        <omgdi:waypoint x="746.0" y="400.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
        <omgdi:waypoint x="851.0" y="400.0"></omgdi:waypoint>
        <omgdi:waypoint x="896.0" y="400.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow6" id="BPMNEdge_flow6">
        <omgdi:waypoint x="681.0" y="420.0"></omgdi:waypoint>
        <omgdi:waypoint x="681.0" y="472.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="association1" id="BPMNEdge_association1">
        <omgdi:waypoint x="596.0" y="442.0"></omgdi:waypoint>
        <omgdi:waypoint x="563.0" y="472.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
        <omgdi:waypoint x="283.0" y="407.0"></omgdi:waypoint>
        <omgdi:waypoint x="371.0" y="407.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow8" id="BPMNEdge_flow8">
        <omgdi:waypoint x="886.0" y="572.0"></omgdi:waypoint>
        <omgdi:waypoint x="1032.0" y="640.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow9" id="BPMNEdge_flow9">
        <omgdi:waypoint x="1085.0" y="667.0"></omgdi:waypoint>
        <omgdi:waypoint x="1130.0" y="667.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow10" id="BPMNEdge_flow10">
        <omgdi:waypoint x="1132.0" y="407.0"></omgdi:waypoint>
        <omgdi:waypoint x="1291.0" y="418.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow11" id="BPMNEdge_flow11">
        <omgdi:waypoint x="1396.0" y="418.0"></omgdi:waypoint>
        <omgdi:waypoint x="1450.0" y="418.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```



流程说明：流程中定义了一个事务子流程和两个自动任务

![image-20220401111036816](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401111036816.png)





然后在事务子流程中定义了两个人工任务用一个排他网关连接，flag<=0 的情况下会触发 取消结束事件

![image-20220401111201815](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401111201815.png)



触发取消结束事件后同时会被取消边界事件捕获而走 取消事件结束的自动任务

![image-20220401111316353](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401111316353.png)



同时自动补偿任务也会触发，关联的自动任务也会触发

![image-20220401111351513](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401111351513.png)

注意在设置的时候需要设置补偿自动任务为可补偿的

![image-20220401111438577](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401111438577.png)

补偿自动任务绑定的JavaDelegate：

```java
public class MyOneDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {

        System.out.println("完成自动审批任务-----》MyOneDelegate" + LocalDateTime.now().toString());
    }
}
```

正常结束任务绑定的JavaDelegate:

```java
public class MyTwoDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("MyTwoDelegate---->执行了" + LocalDateTime.now().toString());
    }
}
```

取消事件结束绑定的JavaDelegate

```java
public class MyThreeDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("MyThreeDelegate---->执行了" + LocalDateTime.now().toString());
    }
}
```

然后我们部署，启动，和执行流程，看输出情况

```java
    /**
     * 部署流程
     * @throws Exception
     */
    @Test
    public void deploy() throws Exception{
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("取消结束事件.bpmn20.xml")
                .name("取消结束事件")
                .deploy();
        System.out.println("-----");
    }

    /**
     * 启动流程实例,设置流程变量中的flag=0触发取消结束事件
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{
        // 设置对应的流程变量的值
        Map<String,Object> map = new HashMap<>();
        map.put("flag",0);// 设置flag为0触发流程结束事件
        processEngine.getRuntimeService()
                .startProcessInstanceById("myProcess:3:effb46cf-b168-11ec-926f-c03c59ad2248",map);
    }

    /**
     * 完成任务
     */
    @Test
    public void completeTask(){
        TaskService taskService = processEngine.getTaskService();
        Task task = taskService.createTaskQuery()
                .processDefinitionId("myProcess:3:effb46cf-b168-11ec-926f-c03c59ad2248")
                .taskAssignee("zhangsan")
                .singleResult();
        taskService.complete(task.getId());
    }
```



输出结果：

![image-20220401111758140](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401111758140.png)



输出结果是满足我们的期望的。



### 5.4 补偿事件

&emsp;&emsp;通过补偿达到控制业务流程的目的就是补偿事件，比如我们正常的买机票的流程下订单购买，然后同时弹出支付流程页面。支付成功后就可以等待出票了，但是如果我们支付失败的话，这时要么重新支付，更换支付方式或者取消预订，这时取消预订我们就可以通过补偿事件来实现，具体的案例如下：

![image-20220401202116847](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401202116847.png)

完整的xml文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
    <error id="payFail" errorCode="payFail" ></error>
    <process id="myProcess" name="My process" isExecutable="true">
        <startEvent id="startevent1" name="开始事件"></startEvent>
        <parallelGateway id="parallelgateway1" name="并行网关"></parallelGateway>
        <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="parallelgateway1"></sequenceFlow>
        <serviceTask id="servicetask1" name="预订机票" activiti:class="com.bobo.delegate.MyTwoDelegate"></serviceTask>
        <serviceTask id="servicetask2" name="微信支付" activiti:class="com.bobo.delegate.MyOneDelegate"></serviceTask>
        <userTask id="usertask1" name="人工出票" activiti:assignee="zhangsan"></userTask>
        <sequenceFlow id="flow2" sourceRef="servicetask1" targetRef="usertask1"></sequenceFlow>
        <parallelGateway id="parallelgateway2" name="Parallel Gateway"></parallelGateway>
        <sequenceFlow id="flow3" sourceRef="usertask1" targetRef="parallelgateway2"></sequenceFlow>
        <sequenceFlow id="flow4" sourceRef="parallelgateway1" targetRef="servicetask1"></sequenceFlow>
        <sequenceFlow id="flow5" sourceRef="parallelgateway1" targetRef="servicetask2"></sequenceFlow>
        <sequenceFlow id="flow6" sourceRef="servicetask2" targetRef="parallelgateway2"></sequenceFlow>
        <serviceTask id="servicetask3" name="取消预订" isForCompensation="true" activiti:class="com.bobo.delegate.MyThreeDelegate"></serviceTask>
        <boundaryEvent id="boundarycompensation1" name="补偿边界事件" attachedToRef="servicetask1" cancelActivity="true">
            <compensateEventDefinition></compensateEventDefinition>
        </boundaryEvent>
        <boundaryEvent id="boundaryerror1" name="错误边界事件" attachedToRef="servicetask2">
            <errorEventDefinition errorRef="payFail"></errorEventDefinition>
        </boundaryEvent>
        <intermediateThrowEvent id="compensationintermediatethrowevent1" name="补偿抛出中间事件">
            <compensateEventDefinition></compensateEventDefinition>
        </intermediateThrowEvent>
        <sequenceFlow id="flow7" sourceRef="boundaryerror1" targetRef="compensationintermediatethrowevent1"></sequenceFlow>
        <endEvent id="endevent1" name="End"></endEvent>
        <sequenceFlow id="flow8" sourceRef="compensationintermediatethrowevent1" targetRef="endevent1"></sequenceFlow>
        <endEvent id="endevent2" name="End"></endEvent>
        <sequenceFlow id="flow9" sourceRef="parallelgateway2" targetRef="endevent2"></sequenceFlow>
        <association id="association1" sourceRef="boundarycompensation1" targetRef="servicetask3" associationDirection="None"></association>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
        <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
            <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="160.0" y="360.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="parallelgateway1" id="BPMNShape_parallelgateway1">
                <omgdc:Bounds height="40.0" width="40.0" x="380.0" y="357.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="servicetask1" id="BPMNShape_servicetask1">
                <omgdc:Bounds height="55.0" width="105.0" x="580.0" y="220.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="boundarycompensation1" id="BPMNShape_boundarycompensation1">
                <omgdc:Bounds height="30.0" width="30.0" x="650.0" y="270.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="servicetask2" id="BPMNShape_servicetask2">
                <omgdc:Bounds height="55.0" width="105.0" x="580.0" y="450.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="boundaryerror1" id="BPMNShape_boundaryerror1">
                <omgdc:Bounds height="30.0" width="30.0" x="650.0" y="490.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
                <omgdc:Bounds height="55.0" width="105.0" x="820.0" y="220.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="parallelgateway2" id="BPMNShape_parallelgateway2">
                <omgdc:Bounds height="40.0" width="40.0" x="1140.0" y="336.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="servicetask3" id="BPMNShape_servicetask3">
                <omgdc:Bounds height="55.0" width="105.0" x="830.0" y="336.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="compensationintermediatethrowevent1" id="BPMNShape_compensationintermediatethrowevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="740.0" y="590.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="820.0" y="590.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent2" id="BPMNShape_endevent2">
                <omgdc:Bounds height="35.0" width="35.0" x="1225.0" y="339.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
                <omgdi:waypoint x="195.0" y="377.0"></omgdi:waypoint>
                <omgdi:waypoint x="380.0" y="377.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
                <omgdi:waypoint x="685.0" y="247.0"></omgdi:waypoint>
                <omgdi:waypoint x="820.0" y="247.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
                <omgdi:waypoint x="925.0" y="247.0"></omgdi:waypoint>
                <omgdi:waypoint x="1160.0" y="247.0"></omgdi:waypoint>
                <omgdi:waypoint x="1160.0" y="336.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
                <omgdi:waypoint x="400.0" y="357.0"></omgdi:waypoint>
                <omgdi:waypoint x="400.0" y="247.0"></omgdi:waypoint>
                <omgdi:waypoint x="580.0" y="247.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
                <omgdi:waypoint x="400.0" y="397.0"></omgdi:waypoint>
                <omgdi:waypoint x="400.0" y="477.0"></omgdi:waypoint>
                <omgdi:waypoint x="580.0" y="477.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow6" id="BPMNEdge_flow6">
                <omgdi:waypoint x="685.0" y="477.0"></omgdi:waypoint>
                <omgdi:waypoint x="1160.0" y="477.0"></omgdi:waypoint>
                <omgdi:waypoint x="1160.0" y="376.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow7" id="BPMNEdge_flow7">
                <omgdi:waypoint x="665.0" y="520.0"></omgdi:waypoint>
                <omgdi:waypoint x="664.0" y="607.0"></omgdi:waypoint>
                <omgdi:waypoint x="740.0" y="607.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow8" id="BPMNEdge_flow8">
                <omgdi:waypoint x="775.0" y="607.0"></omgdi:waypoint>
                <omgdi:waypoint x="820.0" y="607.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow9" id="BPMNEdge_flow9">
                <omgdi:waypoint x="1180.0" y="356.0"></omgdi:waypoint>
                <omgdi:waypoint x="1225.0" y="356.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="association1" id="BPMNEdge_association1">
                <omgdi:waypoint x="665.0" y="300.0"></omgdi:waypoint>
                <omgdi:waypoint x="664.0" y="363.0"></omgdi:waypoint>
                <omgdi:waypoint x="830.0" y="363.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>
```

&emsp;&emsp;流程说明：



![image-20220401202447583](D:\desktop\桌面文件\工作目录\01-录课资料\20-flowable\01-课件\img\image-20220401202447583.png)

微信支付绑定的JavaDelegate：

```java
public class MyOneDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {

        System.out.println("微信支付-----》MyOneDelegate" + LocalDateTime.now().toString());
        System.out.println("余额不足....");
        throw  new BpmnError("payFail");
    }
}
```

预订机票绑定的JavaDelegate

```java
public class MyTwoDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("MyTwoDelegate---->预订机票流程执行了" + LocalDateTime.now().toString());
    }
}
```

取消订单绑定的javaDelegate:

```java
public class MyThreeDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("MyThreeDelegate---->机票预订取消了...." + LocalDateTime.now().toString());
    }
}
```

整个流程执行的过程是：任务开始后会并行的执行机票预订和微信支付，然后在微信支付是抛出payFail错误，同时错误边界事件会捕获到这个错误，然后执行到 补偿抛出中间事件，之后在机票预订的 补偿边界事件 被触发，对应的补偿触发器会执行对应的代码。 然后我们部署加启动流程后观察控制台的输出：

```java
    /**
     * 部署流程
     * @throws Exception
     */
    @Test
    public void deploy() throws Exception{
        Deployment deployment = processEngine.getRepositoryService().createDeployment()
                .addClasspathResource("补偿事件.bpmn20.xml")
                .name("补偿事件")
                .deploy();
    }

    /**
     * 启动流程实例
     */
    @Test
    public void startProcessInstanceByKey()  throws Exception{
        processEngine.getRuntimeService()
                .startProcessInstanceById("myProcess:4:a45abe9f-b1b5-11ec-9daf-c03c59ad2248");
    }
```

控制台输出：

```txt
MyTwoDelegate---->预订机票流程执行了2022-04-01T20:17:44.985
微信支付-----》MyOneDelegate2022-04-01T20:17:44.987
余额不足....
MyThreeDelegate---->机票预订取消了....2022-04-01T20:17:45.028
```

输出的结果和我们前面设计的是一样的，搞定~

