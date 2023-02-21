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
- act_ru_event_subscr：监听信息(运行时事件)表，不常用；
- act_ru_execution：运行时流程执行**实例表，**记录运行中流程运行的各个分支信息（当没有子流程时，其数据与act_ru_task表数据是一一对应的）；
- act_ru_identitylink：运行时流程人员表，重要，常用于查询人员或部门的待办任务时使用；
- act_ru_job：运行时定时任务数据表，存储流程的定时任务信息；
- act_ru_variable：运行时流程变量数据表，存储运行中的流程各节点的变量信息；

#### 启动一个流程实例的时候涉及到以下四个表

##### act_ru_execution 运行时-流程实例表

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

##### act_ru_task 运行时- 任务表

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

##### act_ru_variable 运行时-变量表

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

##### act_ru_identitylink 运行时- 用户关系信息 

| 字段          | 名称         | 备注                                                         |
| ------------- | ------------ | ------------------------------------------------------------ |
| ID_           | 主键         |                                                              |
| REV_          | 版本号       |                                                              |
| GROUP_ID_     | 用户组ID     |                                                              |
| TYPE_         | 关系数据类型 | assignee支配人(组)、candidate候选人(组)、owner拥有人,participant参与者,starter发起者 |
| USER_ID_      | 用户ID       |                                                              |
| TASK_ID_      | 任务ID       |                                                              |
| PROC_INST_ID_ | 流程定义ID   |                                                              |
| PROC_DEF_ID_  | 属性ID       |                                                              |



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

#### 完成一个任务涉及到的表

##### act_hi_actinst 历史-节点表

| 字段               | 名称                 | 备注                                         |
| ------------------ | -------------------- | -------------------------------------------- |
| ID_                | 主键                 |                                              |
| PROC_DEF_ID_       | 流程定义ID           |                                              |
| PROC_INST_ID_      | 流程实例ID           |                                              |
| EXECUTION_ID_      | 执行ID               |                                              |
| ACT_ID_            | 节点实例ID           |                                              |
| TASK_ID_           | 任务ID               | startEvent、sequenceFlow、userTask、endEvent |
| CALL_PROC_INST_ID_ | 调用外部的流程实例ID |                                              |
| ACT_NAME_          | 节点名称             |                                              |
| ACT_TYPE_          | 节点类型             |                                              |
| ASSIGNEE_          | 处理人               |                                              |
| START_TIME_        | 开始时间             |                                              |
| END_TIME_          | 结束时间             |                                              |
| DURATION_          | 耗时                 |                                              |
| DELETE_REASON_     | 删除原因             |                                              |
| TENANT_ID_         | 租户编号             |                                              |

#####  act_hi_identitylink历史的流程运行过程中用户关系

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

##### act_hi_procinst历史的流程实例

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
| NAME_                      |              |      |

##### act_hi_taskinst历史的任务实例

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

##### act_hi_varinst历史的流程运行中的变量信息：

> 流程变量虽然在任务完成后在流程实例表中会删除，但是在历史表中还是会记录的

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

### 完整流程示例图

![flowable完整流程](img\flowable完整流程.png)

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

##### 2.1.2.1.  list( )

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



#### 2.1.5. getBpmnModel()

> 获取流程定义的信息对象，传入processDefinitionId

##### 2.1.5.1 getMainProcess()

> 获取流程定义的信息对象的主流程信息

###### 2.1.5.2  getFlowElements()

> 获取流程定义的信息对象的主流程信息-的流程元素信息
>
> 获取的是流程上点、线、任务的元素信息

```java
List<FlowElement> FlowElement =repositoryService.getBpmnModel(processDefinition.getId())
                                            .getMainProcess()
                                            .getFlowElements()
```



#### 2.1.6. getModel()

> 获取流程定义的模型信息，传入processModelId

```java
Model model = repositoryService.getModel(modelBo.getModelId());
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

##### 2.2.9. setVariables()

> 给流程设置变量
>
> `void setVariables(String executionId, Map<String, ? extends Object> variables);`
>
> `ProcessInstance startProcessInstanceByKey(String processDefinitionKey, Map<String, Object> variables);`
>
> setVariables方法的作用等同于startProcessInstanceByKey的第二参数

```
runtimeService.setVariables("流程实例id",variables);
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

> 根据**任务id**查询`act_ru_task`表数据的任务查询对象

```java
//根据任务id查询任务表
TaskQuery taskQuery1 = taskQuery.taskId(taskid + "");
```

##### 2.3.2.2. processInstanceId（）

> 通过**流程实例ID** 查询`act_ru_task`表数据 的任务的查询对象

```java
TaskQuery taskQuery1 = taskQuery.processInstanceId(processInstance.getProcessInstanceId())
```

##### 2.3.2.3. singleResult()

> 获取单个数据

```java
Task task = taskQuery1.singleResult();
//通过taskId查询一个任务
Task task = taskService.createTaskQuery()
            .taskId(taskid + "")
            .singleResult();
//通过流程实例ID 查询一个任务(第一个任务?)
Task task = taskService.createTaskQuery()
            .taskId(taskid + "")
            .singleResult();
//获取任务ID
String taskid = task.getId()
```

##### 2.3.2.4. getAssignee（）

> 获取act_ru_task这个表单个数据的操作人

```java
// 获取当前任务的  处理人
String assignee = task.getAssignee();
```

##### active()

#####  includeProcessVariables

> 查询结果包含流程参数

##### taskCandidateOrAssigned()

> 查询已签收和未签收?? 待办任务

##### taskCandidateGroupIn

> 

#### 2.3.3. addComment（）

> 添加审批意见   保存至 `act_hi_comment`

```java
//  设置审批意见的审批人,  这个必须写
identityService.setAuthenticatedUserId(userid+"");
//添加审批意见
taskService.addComment(taskid+"",task.getProcessInstanceId(),comment);;
```

#### 2.3.4. getProcessInstanceComments（）

> 获取流程实例下的所有评论，可以通过任务id 过滤出当前任务的评论

```java
List<Comment> commentList = taskService.getProcessInstanceComments(procInsId);
List<Comment> comments = new ArrayList<>();
 //通过任务id 过滤出当前任务的评论                  
for (Comment comment : commentList) {
    if (comment.getTaskId().equals(taskInstance.getId())) {
        comments.add(comment);
    }
}
```



#### 2.3.5. complete（）

> 完成任务
>
> - 参数1：任务id
> - 参数2： 任务设置的变量
> - 参数3：localScope（存储范围：本任务）
> - complete(String taskId, Map<String,Object> variables, boolean localScope)

```java
Map<String, Object> map = new HashMap<String, Object>();
map.put("agree",agree);

taskService.complete(taskid+"",map);
```



#### 2.3.6. claim（）

> 拾取任务 (和多个候选人的任务关联,candidate) 
>
> * 一个候选人拾取了这个任务之后其他的用户就没有办法拾取这个任务了
>
> * 所以如果一个用户拾取了任务之后又不想处理了，那么可以退还 **`unclaim()`**
>
> 参数1：任务id **taskid**
>
> 参数2：候选人名字

```java
taskService.claim("f5c87a6e-ba27-11ec-89da-e02be94c81b8","wukong");
```



#### 2.3.7. setAssignee（）

> 设置支配人，可以在流程画图里面设置
>
> + 归还
> + 交办

```java
  //归还候选任务
taskService.setAssignee("f5c87a6e-ba27-11ec-89da-e02be94c81b8",null);
//交办,其实就是设置执行人
taskService.setAssignee("f5c87a6e-ba27-11ec-89da-e02be94c81b8","wukong");
```

在BPMN画图设置支配人`assignee`

```xml
<bpmn2:userTask id="Activity_1fuexxv" name="审批" flowable:dataType="USERS" flowable:assignee="1" flowable:text="若依管理员">
```



### 2.4.  HistoryService

> 暴露Flowable引擎收集的所有历史数据。要提供查询历史数据的能力。

例如流程实例启动时间、谁在执行哪个任务、完成任务花费的事件、每个流程实例的执行路径，等等

#### 2.4.1. getHistoryService()

> 获取HistoryService的方法

```java
//      获取引擎
ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
HistoryService historyService = processEngine.getHistoryService();
```

#### 2.4.2.  历史任务: createHistoricTaskInstanceQuery()

>  创建历史任务实例对象（无论是否完成都能查到）
>
> 操作act_hi_taskinst这个表

```java
// 创建历史任务实例对象
HistoricTaskInstanceQuery historicTaskInstanceQuery = historyService.createHistoricTaskInstanceQuery();
```

##### 2.4.2.1. processDefinitionKey（）

> 通过流程定义key 获取任务实例对象

```java
HistoricTaskInstanceQuery qingjia1 = historyService.createHistoricTaskInstanceQuery()
     .processDefinitionKey("qingjia");
```

##### 2.4.2.2  taskAssignee()

> 根据用户id，查询属于当前用户的任务

```java
HistoricTaskInstanceQuery qingjia1 =  historyService.createHistoricTaskInstanceQuery()
      .taskAssignee(id + "");
```

##### 2.4.3 taskNameLike（）

> act_hi_taskinst表里的name字段，是当前任务的名称，我们可以根据这个字段进行模糊查询

```java
HistoricTaskInstanceQuery qingjia1 = historyService.createHistoricTaskInstanceQuery()
    .taskNameLike("%审批%");
```

##### 2.4.4 finished（）

> 查询已经完成的任务，就是endTime字段有值的数据，相当于查询已经审核完成的数据

```java
HistoricTaskInstanceQuery finished = historyService.createHistoricTaskInstanceQuery()
    .finished();
```



##### 2.4.5 listPage（page, rows）  根据上述限定条件形成集合

> 分页查询act_hi_taskinst这个表里面的数据

```java
  List<HistoricTaskInstance> historicTaskInstances =  historyService.createHistoricTaskInstanceQuery()
      .listPage(page, rows);
```

##### 2.4.6.  orderByHistoricTaskInstanceEndTime()

> act_hi_taskinst这个表里面有个endTime字段，完成的任务，这个字段就有值，可以根据这个字段进行排序

```java
 List<HistoricTaskInstance> historicTaskInstances = historyService.createHistoricTaskInstanceQuery()
            .orderByHistoricTaskInstanceEndTime()
            .asc()
            .listPage(page, rows);
```

##### 2.4.7.  orderByHistoricTaskInstanceStartTime()



##### 2.4.8. taskId（）

##### startedBy()

> 创建任务时设置的发起人

##### 2.4.9. singleResult()

###### 2.4.9.1  getProcessVariables()

> 根据单条任务实例，获取流程变量

###### taskDefinitionKey()

> 任务定义key





#### 2.4.3 历史流程实例:createHistoricProcessInstanceQuery（）

> 创建流程实例对象
>
> 操作act_hi_procinst这个表

```java
HistoricProcessInstanceQuery hisquery = historyService.createHistoricProcessInstanceQuery();
```

##### 2.4.3.1. processDefinitionKey（）

> 根据流程定义的key查询创建的流程实例

```java
HistoricProcessInstanceQuery qingjia3 = historyService.createHistoricProcessInstanceQuery()
    .processDefinitionKey("qingjia");
```



##### 2.4.3.2.  processInstanceBusinessKey()

> 根据业务id，查询当前业务下创建的流程实例
>
> 根据表中的BusinessKey字段来查

```java
 HistoricProcessInstanceQuery qingjia3 = historyService.createHistoricProcessInstanceQuery()
            .processInstanceBusinessKey(id + "");
```

##### 2.4.3.3.  list()

> 查询流程实例的集合

```java
List<HistoricProcessInstance> qingjia2 = historyService.createHistoricProcessInstanceQuery()
            .processDefinitionKey("qingjia")
            .processInstanceBusinessKey(id + "")
            .list();
```

##### 2.4.3.4  getEndActivityId()

> 获取当前流程结束的节点的活动id
>
> 判断当前流程实例是否已经走完；为null就是没有走完；

```java
List<HistoricProcessInstance> qingjia2 = historyService.createHistoricProcessInstanceQuery()
            .processDefinitionKey("qingjia")
            .processInstanceBusinessKey(id + "")
            .list();  
for(HistoricProcessInstance item: qingjia2){
       //getEndActivityId   判断当前流程实例是否完成，如果没有完成，不能创建
                if(item.getEndActivityId() == null){
                    System.out.println("不能重复提交申请单");
                }
            }
```



#### 2.4.4. 创建流程活动对象createHistoricActivityInstanceQuery（）

> 拿到操作act_hi_actinst 这个表的对象，这个表里面的各个节点都有

```java
HistoricActivityInstanceQuery historicActivityInstanceQuery = historyService.createHistoricActivityInstanceQuery();
```

##### 2.4.4.1. activityId（）

> 根据查询出来的流程结束的节点id，查询最后一个数据

```java
HistoricActivityInstanceQuery historicActivityInstanceQuery = historyService.createHistoricActivityInstanceQuery()
     .activityId(endActivityId);
```

##### 2.4.4.2. list（）

```java
//根据最后节点的id，获取任务,其实只有一个，但是这里使用了list，是没有找到获取单个的方法
List<HistoricActivityInstance> list1 = historyService.createHistoricActivityInstanceQuery()
    .activityId(endActivityId)
    .list();
HistoricActivityInstance historicActivityInstance = list1.get(0);

```

##### 2.4.4.3. getActivityName()

> 获取act_hi_actinst 这个表的name字段，获取最后节点的名称

```java
  String activityName = historicActivityInstance.getActivityName();//获取最后节点的名称
```



#### 2.4.5  创建历史流程变量查询createHistoricVariableInstanceQuery

```
historyService.createHistoricVariableInstanceQuery().processInstanceId("f478444b-2815-11ed-8fc3-00ff0b7a6947").list()
```



### 2.5. IdentityService

> 用于管理（创建，更新，删除，查询……）组与用户。

### 2.6. FormService

> 是可选服务。也就是说Flowable没有它也能很好地运行，而不必牺牲任何功能。

- *开始表单(start form)*是在流程实例启动前显示的表单
- *任务表单(task form)*是用户完成任务时显示的表单

#### 多态表单

> 在流程XML上定义表单字段，如：字段名、类型、可读、可写、必填；在开始事件(startEvent)定义，如果任务(Task)节点需要用到开始节点的表单字段，需要再写一遍声明

```xml
//开始节点
<startEvent activiti:initiator="applyUserId" id="start" name="start">
  <extensionElements>
    <activiti:formProperty datePattern="yyyy-MM-dd" id="startDate" name="请假开始日期" required="true" type="date"/>
    <activiti:formProperty datePattern="yyyy-MM-dd" id="endDate" name="请假结束日期" required="true" type="date"/>
    <activiti:formProperty id="reason" name="请假原因" required="true" type="string"/>
  </extensionElements>
</startEvent>
//任务节点，如果需要使用
<userTask activiti:assignee="admin" activiti:exclusive="true" id="deptLeaderAudit" name="部门领导审批">
  <extensionElements>
    <activiti:formProperty datePattern="yyyy-MM-dd" id="startDate" name="请假开始日期" 
                           type="date" writable="false"/>
    <activiti:formProperty datePattern="yyyy-MM-dd" id="endDate" name="请假结束日期" type="date" writable="false"/>
    <activiti:formProperty id="reason" name="请假原因" type="string" writable="false"/>
    <activiti:formProperty id="deptLeaderPass" name="审批意见" required="true" type="enum">
      <activiti:value id="true" name="同意"/>
      <activiti:value id="false" name="不同意"/>
    </activiti:formProperty>
  </extensionElements>
</userTask>
```

优点：能够根据前台传过来的字段匹配自定义Task的内置表单字段，无须自己put单个赋值，不需要提供实体类

缺点：每一个Task节点如需获取内置表单数据，都需要定义内置表单字段，操作麻烦

#### 外置表单



### 2.7. ManagementService

> 通常在用Flowable编写用户应用时不需要使用。它可以读取数据库表与表原始数据的信息，也提供了对作业(job)的查询与管理操作。

### 2.8. DynamicBpmnService

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



## 流程知识点总结

### 1.ProcessInstance流程实例与Execution执行实例的区别

![流程实例和执行实例的区别](D:\notes\daily-note\JavaNote\flowable\img\流程实例和执行实例的区别.png)

- 如果流程是单线流程，ProcessInstance就是Execution，在act_ru_exection表中的**`ID_`与`PROC_INST_ID`_的值相**同且`PARENT_ID_`为空，这时的数据代表的就是ProcessInstance的相关数据(描述不是很正确，单线流程有一个流程实例和执行实例数据，)
- 如果是多分支流程，一个流程会对应一个ProcessInstance还有与分支数量相同的Execution， 在act_ru_exection表中有一条流程实例和多条执行实例，执行实例的PARENT_ID_为流程实例的ID， 他们的PROC_INST_ID_相等

总结： `ProcessInstance继承于Execution`，本质上ProcessInstance与Execution是一个东西

![image-20220715095528823](D:\notes\daily-note\JavaNote\flowable\img\执行实例和流程实例acti_ru_exection表.png)

#### 流程实例和执行实例和流程任务的关系

![flowable完整流程](img\flowable完整流程.png)

一个流程实例可以有多个执行实例，一个执行实例有多个流程任务

```java
//根据流程实例ID，查询所有的执行实例
List<Execution> executionList = runtimeService.createExecutionQuery()
    .processInstanceId(xx.getProcessInstanceId())
    .list();
```

#### 并行网关

![image-20220326110341232](img\流程实例和执行实例-并行网关.png)

当我们执行了创建请假单后，到并行网关的位置的时候，在ACT_RU_TASK表中就有两条记录

![image-20220326111359504](D:/notes/daily-note/JavaNote/flowable/课件资料/img/image-20220326111359504.png)

然后同时在ACT_RU_EXECUTION中有三条记录，一个流程实例对应的有两个执行实例

![image-20220326111453630](D:/notes/daily-note/JavaNote/flowable/课件资料/img/image-20220326111453630.png)



### 2. 设置任务审批人/执行人/支配人/assignee

1. 画BPMN图时:

   ```xml
       <bpmn2:userTask id="Activity_0b3ukpl" name="发起任务" flowable:dataType="INITIATOR" flowable:assignee="${initiator}" flowable:text="流程发起人">
         <bpmn2:incoming>Flow_1sh09sz</bpmn2:incoming>
         <bpmn2:outgoing>Flow_0y2qces</bpmn2:outgoing>
       </bpmn2:userTask>
       <bpmn2:userTask id="Activity_1fuexxv" name="审批" flowable:dataType="USERS" flowable:assignee="1" flowable:text="若依管理员">
         <bpmn2:incoming>Flow_0y2qces</bpmn2:incoming>
         <bpmn2:outgoing>Flow_0eo7464</bpmn2:outgoing>
       </bpmn2:userTask>
   ```

2. 通过setAssignee()

   ```java
     //归还候选任务
   taskService.setAssignee("f5c87a6e-ba27-11ec-89da-e02be94c81b8",null);
   //交办,其实就是设置执行人
   taskService.setAssignee("f5c87a6e-ba27-11ec-89da-e02be94c81b8","wukong");
   ```

   

###  3. 任务的多实例(for-each)-会签的实现

* collection：表示要循环的集合
* elementVariable：表示循环的变量item
* completionCondition ：表示任务结束的条件，也就是多人会签的结束条件，在此处我们用的是UEL表达式，`mulitiInstanceCompleteTask`表示的是我们注入到Spring容器中的对象
  - nrOfInstances:该会签环节中总共有多少个实例
  - nrOfActiveInstances:当前活动的实例的数量，即还没有完成的实例数量
  - nrOfCompletedInstances:已经完成的实例的数量
* isSequential="false|true"  : 顺序执行(三横true)还是并发执行(三竖false)

```xml
<userTask id="miTasks" name="My Task" flowable:assignee="${assignee}">
  <multiInstanceLoopCharacteristics isSequential="true"
     flowable:collection="assigneeList" flowable:elementVariable="assignee" >
     <completionCondition xsi:type="bpmn2:tFormalExpression">${nrOfCompletedInstances &gt;= nrOfInstances}         
     </completionCondition>   
  </multiInstanceLoopCharacteristics>
</userTask> 
```

如上:assigneeList为集合通过 for-each遍历:循环变量的item 为assignee 填充到上面flowable:assignee="${assignee}" 表达式作为任务变量,



### 4. 设置流程变量

#### 运行时变量和历史变量

- 运行时变量

  > 流程实例运行时的变量，存入act_ru_variable表中。在流程实例运行结束时，此实例的变量在表中删除

- 历史变量

  >历史变量，存入act_hi_varinst表中。在流程启动时，流程变量会同时存入历史变量表中；在流程结束时，历史表中的变量仍然存在。可理解为“永久代”的流程变量。

  ```java
   //查询流程实例的历史变量 
  historyService.createHistoricVariableInstanceQuery()
        .processInstanceId("XXX")
        .orderByVariableName
        .desc()
        .list();
  ```

  注意：由于流程实例结束时，对应在运行时表的数据跟着被删除。所以，查询一个已经完结流程实例的变量，只能在历史变量表中查找。

#### 全局变量/流程变量

- 作用域: 流程实例。

- 流程变量中变量名不允许重复，设置相同名称的变量，后设置的值会覆盖前设置的变量值。

#### 局部变量( VariableLocal )

> 局部变量针对于execution、task。设置局部变量，local变量的好处是，可以在每个分支使用同名的变量，互相之间不受影响，会签multi-instance就是通过local局部变量实现的。

- 作用域: task任务和execution执行实例(针对一个任务和一个执行实例范围，范围没有流程实例大)
- Local 变量由于在不同的任务或不同的执行实例中，作用域互不影响，变量名可以相同没有影响。Local 变量名也可以和 global 变量名相同，没有影响。 

```java
//任务task
taskService.setVariableLocal(任务ID,变量名，变量值)
Map<String, Object> getVariables(String executionId);
Map<String, Object> getVariablesLocal(String executionId);
Map<String, Object> getVariables(String executionId, Collection<String> variableNames);
Map<String, Object> getVariablesLocal(String executionId, Collection<String> variableNames);
Object getVariable(String executionId, String variableName);
<T> T getVariable(String executionId, String variableName, Class<T> variableClass);    
 //执行实例execution
execution.getVariables();
execution.getVariables(Collection<String> variableNames);
execution.getVariable(String variableName);
execution.setVariables(Map<String, object> variables);
execution.setVariable(String variableName, Object value);
```



#### 作用: 

- 排他网关上顺序流上的条件,作为表达式计算,如  ${num>1}
- 任务节点XML画图的设置的审批人assignee,如:`flowable:assignee="${assignee}"`

说明: 流程设置的变量将自动填充进去 `${xx}`

#### 设置方法:

- 创建和启动流程实例时`*startProcessInstanceXXX*`设置:

  *startProcessInstanceXXX*方法都有一个可选参数，用于在流程实例创建及启动时设置变量。例如，在*RuntimeService*中：

  ```java
  ProcessInstance startProcessInstanceByKey(String processDefinitionKey, Map<String, Object> variables);
  //RuntimeService.startProcessInstanceByKey()
  ```

- 任务完成时设置

  ```java
  taskService.complete(taskId,variables);
  ```

- 流程实例`RuntimeService`中设置:

  ```java
  //全局变量(作用于流程实例)
  void setVariable(String executionId, String variableName, Object value);
  void setVariables(String executionId, Map<String, ? extends Object> variables);
  //局部变量(作用于任务和执行实例(针对一个任务和一个执行实例范围，范围没有流程实例大))
  void setVariableLocal(String executionId, String variableName, Object value);
  void setVariablesLocal(String executionId, Map<String, ? extends Object> variables);
  ```

- 任务`taskService`中设置

  ```java
  void setVariable(String executionId, String variableName, Object value);
  void setVariables(String executionId, Map<String, ? extends Object> variables);
  void setVariableLocal(String executionId, String variableName, Object value);
  void setVariablesLocal(String executionId, Map<String, ? extends Object> variables);
  ```

  

#### 读取变量:

流程实例`RuntimeService` 和任务`taskService`均可获取

```java
Map<String, Object> getVariables(String executionId);
Map<String, Object> getVariables(String executionId, Collection<String> variableNames);
Object getVariable(String executionId, String variableName);
<T> T getVariable(String executionId, String variableName, Class<T> variableClass);

Map<String, Object> getVariablesLocal(String executionId);
Map<String, Object> getVariablesLocal(String executionId, Collection<String> variableNames);
```

通过流程实例ID获取流程实例变量(流程实例和执行实例id在)

```java
Map<String, Object> processVariables = runtimeService.getVariables("9c269c58-03ea-11ed-a42b-00ff0b7a6947")
```

通过任务id获取流程实例的变量

```java
Map<String, Object> processVariables = taskService.getVariables(task.getId());
```







#### setVariables与 setVariablesLocal的区别

- setVariable

  > [生命周期](https://so.csdn.net/so/search?q=生命周期&spm=1001.2101.3001.7020)与“流程实例对象”一致
  >
  > 只要当前这个流程实例还没有走完，都可以在act_ru_variable表中查询到指定的流程变量。
  >
  > 同名变量会覆盖
  >
  > 

- setVariableLocal

  > 生命周期与“当前任务对象”一致
  >
  > 当前流程变量只能在当前任务期间获取。如果流程执行到下一个任务节点，那么将获取不到。
  >
  > 同名变量，在同一个流程实例的不同执行实例，不会覆盖
  >
  > 可以通过历史任务查询对象查询
  >
  > ```java
  > // 创建历史任务查询对象
  >     HistoricTaskInstanceQuery  historicTaskInstanceQuery = historyService.createHistoricTaskInstanceQuery();
  >     // 查询结果包括 local变量
  >     historicTaskInstanceQuery.includeTaskLocalVariables();
  >     for (HistoricTaskInstance historicTaskInstance : list) {
  >         System.out.println("==============================");
  >         System.out.println(" 任 务 id ： "  +
  >         historicTaskInstance.getId());
  >         System.out.println(" 任 务 名 称 ： "  +
  >         historicTaskInstance.getName());
  >         System.out.println(" 任 务 负 责 人 ： "  +
  >         historicTaskInstance.getAssignee());
  >         System.out.println(" 任 务 local 变 量 ： "+
  >         historicTaskInstance.getTaskLocalVariables());
  >     }
  >    ```
  >    
  > 作用： 一个任务节点下form表单的填值记录(同名变量，在同一个流程实例的不同执行实例，不会覆盖)
  >
  > 如果是任务的全局变量：任务节点下form表达填值的最终记录



### 5. 获取下个任务节点

> act_ru_task表的执行特性，当前节点任务完成后自动加载下一节点任务
>
> (当当前节点任务完成后，ac_ru_task表会删除当前任务保存下一待办任务)
>
> 也就是根据流程实例查询的任务节点就是下个任务节点

```java
  public List<Task> nextAllNodeTaskList(Task task) {
        List<Task> taskList = null;
        taskList = taskService.createTaskQuery().processInstanceId(task.getProcessInstanceId()).list();
        //taskList.size() <= 0  那么流程就结束啦
        return taskList;
    }
```

### 6. 流程实例对象

使用流程实例ID，查询正在执行的执行对象表，返回流程实例对象

```java
String instanceId = task.getProcessInstanceId(); 
List<Execution> executions = runtimeService.createExecutionQuery()        
    .processInstanceId(instanceId)        
    .list();
```

### 7. 委派和转办

委派：是将任务节点分给其他人处理，等其他人处理好之后，委派任务会自动回到委派人的任务中

转办：直接将办理人assignee 换成别人，这时任务的拥有者不再是转办人，而是为空，相当与将任务转出。

###  8、 回退、撤销、终止、拒绝

中国式驳回

- moveActivityIdsToSingleActivityId

  ```
  runtimeService.createChangeActivityStateBuilder()
                  .processInstanceId(processInstanceId)
                  .moveActivityIdsToSingleActivityId("当前的任务的节点id", "需要跳转的目标节点")
                  .changeState();
  ```

- moveExecutionsToSingleActivityId



### 9、监听器

#### 9.1. 执行监听器（execution listener）

可以被捕获的事件有：

- 流程实例的启动和结束。

- 流程执行转移。

- 活动的启动和结束。

- 网关的启动和结束。

- 中间事件的启动和结束。

- 启动事件的结束，和结束事件的启动。

  ```java
  @Component("ProcessStartListener")
  public class ProcessStartListener implements ExecutionListener {
      @Resource
      private WfActHiProcinstMapper actHiProcinstMapper;
      
      @Override
      public void notify(DelegateExecution execution) {
       //流程状态保存到act_hi_procinst表中的businnesStaus中
          actHiProcinstMapper.updateHistoryProcessStatusByProcessInst(execution.getProcessInstanceId(), ProcessStatus.FINISH.getType());
      }
  }
  ```

  ```xaml
  <bpmn2:extensionElements>
        <flowable:executionListener delegateExpression="${ProcessStartListener}" event="start" />
  </bpmn2:extensionElements>
  ```

  

#### 9.2.任务监听器（task listener）

*任务监听器*包含下列属性：

- **event（事件）**（必填）：触发任务监听器的任务事件类型。可用的事件有：
  - **create（创建）**：当任务已经创建，并且**所有任务参数都已经设置**时触发。
  - **assignment（指派）**：当任务已经指派给某人时触发。请注意：当流程执行到达用户任务时，在触发*create*事件**之前**，会首先触发*assignment*事件。这顺序看起来不太自然，但是有实际原因的：当收到*create*事件时，我们通常希望能看到任务的所有参数，包括办理人。
  - **complete（完成）**：当任务已经完成，从运行时数据中删除前触发。
  - **delete（删除）**：在任务即将被删除前触发。请注意任务由completeTask正常完成时也会触发。
- **class**：需要调用的委托类。这个类必须实现`org.flowable.engine.delegate.TaskListener`接口。

```javascript
@Component("TaskEmailListener")
public class TaskEmailListener implements TaskListener {
    @Override
    public void notify(DelegateTask delegateTask) {
        System.out.println("------------------------");
    }
}
```

```xaml
   <bpmn2:extensionElements>
        <flowable:taskListener delegateExpression="${TaskEmailListener}" event="complete" />
   </bpmn2:extensionElements>
```

