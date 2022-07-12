# Flowable

## 1. 数据库

> Flowable的所有数据库表都以ACT_开头。

### 数据库表的第二部是表的用途

- `ACT_RE_`:

  >  'RE’代表repository。仓库，例如流程定义与流程资源（图片、规则等）。

- `ACT_RU_`: 

  > 'RU’代表runtime。这些表存储运行时信息，例如流程实例（process instance）、用户任务（user task）、变量（variable）、作业（job）等。Flowable只在流程实例运行中保存运行时数据，并在流程实例**结束时删除记录**。这样保证运行时表小和快。

- `ACT_HI_`:

  > 'HI’代表history。这些表存储历史数据，例如**已完成的**流程实例、变量、任务等。

- `ACT_GE_`: 

  > 通用数据。在多处使用。

#### 1.1. 通用数据表（2个）

- act_ge_bytearray：二进制数据表，如流程定义、流程模板、流程图的字节流文件(**png图片和bpmn文件**)；
- act_ge_property：属性数据表（不常用）；

#### 1.2. 流程定义、流程模板相关表（3个）

> RepositoryService接口操作的表

- act_re_deployment： 流程定义**部署**表，每部署一次就增加一条记录 

- act_re_procdef：流程定义**信息**表，存储流程定义相关描述信息，但其真正内容存储在**act_ge_bytearray**表中，以字节形式存储；

- act_re_model：流程模板信息表，存储流程模板相关描述信息，但其真正内容存储在**act_ge_bytearray**表中，以字节形式存储；

#### 1.3. 流程运行时表（6个）

> RuntimeService接口操作的表

- act_ru_task：运行时流程任务节点表，存储运行中流程的任务节点信息，重要，常用于查询人员或部门的待办任务时使用；
- act_ru_event_subscr：监听信息表，不常用；
- act_ru_execution：运行时流程执行实例表，记录运行中流程运行的各个分支信息（当没有子流程时，其数据与act_ru_task表数据是一一对应的）；
- act_ru_identitylink：运行时流程人员表，重要，常用于查询人员或部门的待办任务时使用；
- act_ru_job：运行时定时任务数据表，存储流程的定时任务信息；
- act_ru_variable：运行时流程变量数据表，存储运行中的流程各节点的变量信息；

#### 1.4. 历史表（8个）

> HistoryService接口操作的表

- act_hi_actinst：历史节点表，存放流程实例运转的各个节点信息（包含开始、结束等非任务节点）；
- act_hi_attachment：历史附件表，存放历史节点上传的附件信息（不常用）；
- act_hi_comment：历史意见表；
- act_hi_detail：历史详情表，存储节点运转的一些信息（不常用）；
- act_hi_identitylink：历史流程人员表，存储流程各节点候选、办理人员信息，常用于查询某人或部门的已办任务；
- act_hi_procinst：历史流程实例表，存储流程实例历史数据（包含正在运行的流程实例）；
- act_hi_taskinst：历史流程任务表，存储历史任务节点；
- act_hi_varinst：流程历史变量表，存储流程历史节点的变量信息；

#### 1.5. 用户相关表（4个）

> IdentityService接口操作的表

- act_id_group：用户组信息表，对应节点选定候选组信息；
- act_id_info：用户扩展信息表，存储用户扩展信息；
- act_id_membership：用户与用户组关系表；
- act_id_user：用户信息表，对应节点选定办理人或候选人信息；

## 2. API与服务

![](img\API.png)

| service名称       | 定义                                       |
| ----------------- | ------------------------------------------ |
| RepositoryService | 管理流程的定义和部署                       |
| RuntimeService    | 执行管理，流程实例、启动、推进、删除等操作 |
| TaskService       | 任务管理                                   |
| HistoryService    | 历史管理（执行玩的数据管理）               |
| FormService       | 一个可选服务                               |
| ManagerService    | 管理服务                                   |



### 2.1. RepositoryService

> 提供了管理与控制部署(deployments)与流程定义(process definitions)的操作。
>
> - deploymentId   ("78323ad6-fdd2-11ec-a784-00ff0b7a6947")   部署ID
> - definitionId   ("Process_1657183049555:8:785fda89-fdd2-11ec-a784-00ff0b7a6947")   定义id-含版本信息
> - procInsId:( "f432d9c1-fdd4-11ec-a784-00ff0b7a6947")   实例id
> - processKey:( "Process_1657183049555"  )  实例key
> - 

- 流程定义和流程部署 

- 查询引擎现有的部署与流程定义。

- 暂停或激活部署中的某些流程，或整个部署。暂停意味着不能再对它进行操作，激活刚好相反，重新使它可以操作。
- 获取各种资源，比如部署中保存的文件，或者引擎自动生成的流程图。
- 获取POJO版本的流程定义。它可以用Java而不是XML的方式查看流程。

#### 2.1.1. getRepositoryService（）

> 使用这个方法获取到RepositoryService对象，用这个对象里面的各种各样的方法操作25张表

#### 2.1.2. createDeployment() 和deploy()

> 流程创建部署并生产定义（版本号）
>
> act_ge_bytearray表里存入流程bpmn文件和png文件
>
> - deploymentId   ("78323ad6-fdd2-11ec-a784-00ff0b7a6947")   部署ID
> - definitionId   ("Process_1657183049555:8:785fda89-fdd2-11ec-a784-00ff0b7a6947")   定义id-含版本信息

```java
// 创建流程部署
DeploymentBuilder deploymentBuilder = repositoryService.createDeployment()
    .name(processName)
    .key(name)
    .category(category)
    .addInputStream(processName, in);
// 部署
deploymentBuilder.deploy();
```

#### 2.1.2. createDeploymentQuery（）

> 创建查询部署的对象，
>
> 相当于查询 act_re_deployment

```java
DeploymentQuery deploymentQuery = repositoryService.createDeploymentQuery();
```

#### 2.1.3. list( )

> 创建查询部署的对象，
>
> 相当于查询 act_re_deployment

```java
  List<Deployment> list = repositoryService.createDeploymentQuery().list();
   for(Deployment dep : list){
            System.out.println("Id："+dep.getId());
            System.out.println("Name："+dep.getName());
            System.out.println("DeploymentTime："+dep.getDeploymentTime());
            System.out.println("Key："+dep.getKey());
        }
```

#### 2.1.4. createProcessDefinitionQuery（）

> 使用这个方法，创建流程定义对象；																														相当于操作这个表act_re_procdef

```java
//查询流程定义
ProcessDefinition processDefinition=repositoryService.createProcessDefinitionQuery()
            .latestVersion()
            .active()
            .orderByProcessDefinitionKey()
            .asc();
for(ProcessDefinition processDefinition : processDefinition){
            vo.setDefinitionId(processDefinition.getId());
            vo.setProcessKey(processDefinition.getKey());
            vo.setProcessName(processDefinition.getName());
            vo.setVersion(processDefinition.getVersion());
            vo.setCategory(processDefinition.getCategory());
            vo.setDeploymentId(processDefinition.getDeploymentId());
            vo.setSuspended(processDefinition.isSuspended());
            // 流程定义时间
            vo.setCategory(deployment.getCategory());
            vo.setDeploymentTime(deployment.getDeploymentTime());
}
//查询-根据部署id
ProcessDefinition processDefinition=repositoryService.createProcessDefinitionQuery()
                .deploymentId(deployment.getId())
                .singleResult();
//查询-根据定义id
 ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .processDefinitionId(procDefId)
                .singleResult();
```



### 2.2. RuntimeService

> 创建流程定义的新流程实例
>
> 启动流程实例
>
> 定义流程变量

#### 2.2.1. getRuntimeService（）

> 获取到RuntimeService对象，用这个对象里面的各种各样的方法操作25张表

#### 2.2.2. startProcessInstanceByKey（）

> 创建流程实例-通过processKey( 流程key)

```java
        //1、获取页面表单填报的内容，请假时间，请假事由，String fromData
        //2、fromData 写入业务表，返回业务表主键ID==businessKey
        //3、把业务数据与Activiti7流程数据关联
        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("myProcess_claim","bKey002");
        System.out.println("流程实例ID："+processInstance.getProcessDefinitionId());
```

#### 2.2.3. startProcessInstanceById

> 创建流程定义的实例-通过procDefId 流程定义id)

```java
//定义流程变量
Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("employee", employee);
        variables.put("nrOfHolidays", nrOfHolidays);
        variables.put("description", description);
//启动流程并设置流程变量
 ProcessInstance processInstance=runtimeService.startProcessInstanceById(procDefId, variables);
```

#### 2.2.4. createProcessInstanceQuery（）

> 获取流程实例查询对象

```java
ProcessInstanceQuery processInstanceQuery = runtimeService.createProcessInstanceQuery();
```

#### 2.2.5 list( )

> 获取流程实例list集合

```java
 List<ProcessInstance> list = runtimeService.createProcessInstanceQuery().list();
```

#### 2.2.6.  suspendProcessInstanceById()

> 挂起流程实例，传参是流程实例的id

```java
runtimeService.suspendProcessInstanceById("73f0fb9a-ce5b-11ea-bf67-dcfb4875e032");
```



#### 2.2.7. activateProcessInstanceById（）

> 激活流程实例，传参是流程实例的id

```java
runtimeService.activateProcessInstanceById("73f0fb9a-ce5b-11ea-bf67-dcfb4875e032");
```

#### 2.2.8. deleteProcessInstance()

> 删除流程实例

```java
runtimeService.deleteProcessInstance("45b8b797-ba0c-11ec-8af3-e02be94c81b8","删着玩");
```



### 2.3.  TaskService

> BPM引擎来说，核心是需要人类用户操作的任务
>
> 实例化流程后就可以查询任务节点,启动和分配任务

- 查询实例流程的所有任务

  ```java
  //通过流程实例ID 查询第一个任务
  Task task = taskService.createTaskQuery()
          .processInstanceId(processInstance.getProcessInstanceId())
          .singleResult();
  ```

- 添加审批意见

- 查询分派给用户或组的任务

- 创建*独立运行(standalone)*任务。这是一种没有关联到流程实例的任务。

- 决定任务的执行用户(assignee)，或者将用户通过某种方式与任务关联。

- 认领(claim)与完成(complete)任务。认领是指某人决定成为任务的执行用户，也即他将会完成这个任务。完成任务是指“做这个任务要求的工作”，通常是填写某个表单。

#### 2.3.1. getTaskService（）

> 获取到TaskService对象

#### 2.3.2. createTaskQuery( )

> 创建查询对象

```java
TaskQuery taskQuery = taskService.createTaskQuery();
```

##### 2.3.2.1. taskId（）

> 根据**任务id**查询`act_ru_task`表数据的任务

```java
//根据任务id查询任务表
TaskQuery taskQuery1 = taskQuery.taskId(taskid + "");
```

##### 2.3.2.2. processInstanceId（）

> 通过**流程实例ID** 查询`act_ru_task`表数据 的任务

```java
TaskQuery taskQuery1 = taskQuery.processInstanceId(processInstance.getProcessInstanceId())
```

##### 2.3.2.3. singleResult()

> 获取单个数据

```java
Task task = taskQuery1.singleResult();
//获取任务ID
String taskid = task.getId()
```

##### 2.3.2.4. getAssignee（）

> 获取act_ru_task这个表单个数据的操作人

```java
// 获取当前任务的  处理人
String assignee = task.getAssignee();
```



#### 2.3.3. addComment（）

> 添加审批意见   保存至 `act_hi_comment`

```java
//  设置审批意见的审批人,  这个必须写
Authentication.setAuthenticatedUserId(userid+"");
//添加审批意见
taskService.addComment(taskid+"",task.getProcessInstanceId(),comment);;
```



#### 2.3.4. complete（）

> 完成任务
>
> - 参数1：任务id
> - 参数2： 任务设置的变量

```java
Map<String, Object> map = new HashMap<String, Object>();
map.put("agree",agree);

taskService.complete(taskid+"",map);
```



#### 2.3.5. claim（）

> 拾取任务
>
> 参数1：任务id **taskid**
>
> 参数2：候选人名字

```java
taskService.claim("f5c87a6e-ba27-11ec-89da-e02be94c81b8","wukong");
```



#### 2.3.6. setAssignee（）

> 设置候选人，可以在流程画图里面设置
>
> + 归还
> + 交办

```java
  //归还候选任务
taskService.setAssignee("f5c87a6e-ba27-11ec-89da-e02be94c81b8",null);
//交办,其实就是设置执行人
taskService.setAssignee("f5c87a6e-ba27-11ec-89da-e02be94c81b8","wukong");
```



### 2.3. HistoryService

> 暴露Flowable引擎收集的所有历史数据。要提供查询历史数据的能力。

例如流程实例启动时间、谁在执行哪个任务、完成任务花费的事件、每个流程实例的执行路径，等等

### 2.4. IdentityService

> 用于管理（创建，更新，删除，查询……）组与用户。

### 2.5. FormService

> 是可选服务。也就是说Flowable没有它也能很好地运行，而不必牺牲任何功能。

- *开始表单(start form)*是在流程实例启动前显示的表单
- *任务表单(task form)*是用户完成任务时显示的表单

### 2.6. ManagementService

> 通常在用Flowable编写用户应用时不需要使用。它可以读取数据库表与表原始数据的信息，也提供了对作业(job)的查询与管理操作。

### 2.7. DynamicBpmnService

> 可用于修改流程定义中的部分内容，而不需要重新部署它。例如可以修改流程定义中一个用户任务的办理人设置，或者修改一个服务任务中的类名。



## 3. 实例

```java
import lombok.extern.slf4j.Slf4j;
import org.flowable.engine.HistoryService;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.history.HistoricProcessInstance;
import org.flowable.engine.repository.Deployment;
import org.flowable.engine.repository.ProcessDefinition;
import org.flowable.engine.runtime.Execution;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.idm.api.Group;
import org.flowable.idm.api.User;
import org.flowable.task.api.Task;
import org.flowable.task.api.history.HistoricTaskInstance;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipInputStream;

/**
 * TestFlowable
 *
 * @Author 
 * @Date: 
 * @Version 1.0
 */
@Slf4j
public class TestFlowable {

    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private org.flowable.engine.TaskService taskService;

    @Autowired
    private org.flowable.engine.IdentityService identityService;

    public void createDeploymentZip() {

        /*
         * @Date: 2021/10/17 23:38
         * Step 1: 部署xml（压缩到zip形式，直接xml需要配置相对路径，麻烦，暂不用）
         */
        try {
            File zipTemp = new File("f:/leave_approval.bpmn20.zip");
            ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(zipTemp));
            Deployment deployment = repositoryService
                    .createDeployment()
                    .addZipInputStream(zipInputStream)
                    .deploy();
            log.info("部署成功:{}", deployment.getId());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        /*
         * @Date: 2021/10/17 23:40
         * Step 2: 查询部署的流程定义
         */
        List<ProcessDefinition> list = 
            repositoryService.createProcessDefinitionQuery().processDefinitionKey("leave_approval").list();
        List<ProcessDefinition> pages = 
           repositoryService.createProcessDefinitionQuery().processDefinitionKey("leave_approval").listPage(1, 30);

        /*
         * @Date: 2021/10/17 23:40
         * Step 3: 启动流程，创建实例
         */
        String processDefinitionKey = "leave_approval";//流程定义的key,对应请假的流程图
        String businessKey = "schoolleave";//业务代码，根据自己的业务用
        Map<String, Object> variablesDefinition = new HashMap<>();//流程变量，可以自定义扩充
        ProcessInstance processInstance = 
            runtimeService.startProcessInstanceByKey(processDefinitionKey, businessKey, variablesDefinition);
        log.info("启动成功:{}", processInstance.getId());

        /*
         * @Date: 2021/10/17 23:40
         * Step 4: 查询指定流程所有启动的实例列表
         * 列表，或 分页 删除
         */
        List<Execution> executions = 
            runtimeService.createExecutionQuery().processDefinitionKey("leave_approval").list();
        List<Execution> executionPages = 
            runtimeService.createExecutionQuery().processDefinitionKey("leave_approval").listPage(1, 30);
//        runtimeService.deleteProcessInstance(processInstanceId, deleteReason); //删除实例

        /*
         * @Date: 2021/10/17 23:40
         * Step 5: 学生查询可以操作的任务,并完成任务
         */
        String candidateGroup = "stu_group"; //候选组 xml文件里面的 flowable:candidateGroups="stu_group"
        List<Task> taskList = 
            taskService.createTaskQuery().taskCandidateGroup(candidateGroup).orderByTaskCreateTime().desc().list();
        for (Task task : taskList) {
            // 申领任务
            taskService.claim(task.getId(), "my");
            // 完成
            taskService.complete(task.getId());
        }

        /*
         * @Date: 2021/10/17 23:40
         * Step 6: 老师查询可以操作的任务,并完成任务
         */
        String candidateGroupTe = "te_group"; //候选组 xml文件里面的 flowable:candidateGroups="te_group"
        List<Task> taskListTe = 
          taskService.createTaskQuery().taskCandidateGroup(candidateGroupTe).orderByTaskCreateTime().desc().list();
        for (Task task : taskListTe) {
            // 申领任务
            taskService.claim(task.getId(), "myte");
            // 完成
            Map<String, Object> variables = new HashMap<>();
            variables.put("command","agree"); //携带变量，用于网关流程的条件判定，这里的条件是同意
            taskService.complete(task.getId(), variables);
        }

        /*
         * @Date: 2021/10/18 0:17
         * Step 7: 历史查询，因为一旦流程执行完毕，活动的数据都会被清空，上面查询的接口都查不到数据，但是提供历史查询接口
         */
        // 历史流程实例
        List<HistoricProcessInstance> historicProcessList = 
            historyService.createHistoricProcessInstanceQuery().processDefinitionKey("leave_approval").list();
        // 历史任务
        List<HistoricTaskInstance> historicTaskList = 
            historyService.createHistoricTaskInstanceQuery().processDefinitionKey("leave_approval").list();
        // 实例历史变量 , 任务历史变量
        // historyService.createHistoricVariableInstanceQuery().processInstanceId(processInstanceId);
        // historyService.createHistoricVariableInstanceQuery().taskId(taskId);


        // 可能还需要的API
        // 移动任务，人为跳转任务
        // runtimeService.createChangeActivityStateBuilder().processInstanceId(processInstanceId)
        //       .moveActivityIdTo(currentActivityTaskId, newActivityTaskId).changeState();

        // 如果在数据库配置了分组和用户，还会用到
        List<User> users = identityService.createUserQuery().list();    //用户查询，用户id对应xml 里面配置的用户
        List<Group> groups = identityService.createGroupQuery().list(); //分组查询，分组id对应xml 里面配置的分组 如 stu_group，te_group 在表里是id的值

        // 另外，每个查询后面都可以拼条件，内置恁多查询，包括模糊查询，大小比较都有
    }
}

```

