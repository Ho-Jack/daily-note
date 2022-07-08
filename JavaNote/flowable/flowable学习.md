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

![](D:\notes\daily-note\JavaNote\flowable\API.png)

### 2.1. RepositoryService

> 提供了管理与控制部署(deployments)与流程定义(process definitions)的操作。
>
> - deploymentId
> - definitionId
> - procInsId

- 流程定义和流程部署 

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

- 查询引擎现有的部署与流程定义。

- 暂停或激活部署中的某些流程，或整个部署。暂停意味着不能再对它进行操作，激活刚好相反，重新使它可以操作。

- 获取各种资源，比如部署中保存的文件，或者引擎自动生成的流程图。

- 获取POJO版本的流程定义。它可以用Java而不是XML的方式查看流程。

### 2.2. TaskService

> BPM引擎来说，核心是需要人类用户操作的任务

- 查询分派给用户或组的任务
- 创建*独立运行(standalone)*任务。这是一种没有关联到流程实例的任务。
- 决定任务的执行用户(assignee)，或者将用户通过某种方式与任务关联。
- 认领(claim)与完成(complete)任务。认领是指某人决定成为任务的执行用户，也即他将会完成这个任务。完成任务是指“做这个任务要求的工作”，通常是填写某个表单。

### 2.2. RuntimeService

> 用于**启动流程定义的新流程实例**。

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

