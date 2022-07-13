



# Flowable实战篇

> Lecture：波波老师



# 一、多人会签

## 1.流程图绘制

&emsp;&emsp;多人会签是指一个任务需要多个人来处理，案例讲解

![image-20220402092950976](img\image-20220402092950976.png)

完整的xml内容

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
    <process id="myProcess" name="My process" isExecutable="true">
        <startEvent id="startevent1" name="Start"></startEvent>
        <userTask id="usertask1" name="User Task">
            <extensionElements>
                <activiti:taskListener event="create" expression="${mulitiInstanceTaskListener.completeListener(execution)}"></activiti:taskListener>
            </extensionElements>
            <multiInstanceLoopCharacteristics isSequential="false" activiti:collection="persons" activiti:elementVariable="person">
                <loopCardinality>3</loopCardinality>
                <completionCondition>${mulitiInstanceCompleteTask.completeTask(execution)}</completionCondition>
            </multiInstanceLoopCharacteristics>
        </userTask>
        <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="usertask1"></sequenceFlow>
        <endEvent id="endevent1" name="End"></endEvent>
        <sequenceFlow id="flow2" sourceRef="usertask1" targetRef="endevent1"></sequenceFlow>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
        <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
            <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="420.0" y="310.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
                <omgdc:Bounds height="55.0" width="105.0" x="700.0" y="300.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="950.0" y="310.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
                <omgdi:waypoint x="455.0" y="327.0"></omgdi:waypoint>
                <omgdi:waypoint x="700.0" y="327.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
                <omgdi:waypoint x="805.0" y="327.0"></omgdi:waypoint>
                <omgdi:waypoint x="950.0" y="327.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>
```

## 2. 流程说明

1.在用户任务节点绑定了一个监听器，监听`create`行为，该监听器我们是通过UEL表达式来实现的，`mulitiInstanceTaskListener`是我们注入到Spring容器中的对象

![image-20220402095348908](\img\image-20220402095348908.png)

对应的监听的代码如下：

```java
@Component("mulitiInstanceTaskListener")
public class MulitiInstanceTaskListener implements Serializable {
    
    public void completeListener(DelegateExecution execution){
        System.out.println("任务："+execution.getId());
        System.out.println("persons:" + execution.getVariable("persons"));
        System.out.println("person" + execution.getVariable("person"));
    }
}
```

2.在Multi instance中的配置

* Loop cardinality:设置为3表示只循环3次，也就是三个人会签
* Collection：表示要循环的集合，我们给的是persons，后面需要在流程变量中赋值
* Element variable：表示循环的变量
* Completion condition：表示任务结束的条件，也就是多人会签的结束条件，在此处我们用的是UEL表达式，`mulitiInstanceCompleteTask`表示的是我们注入到Spring容器中的对象

![image-20220402100649924](\img\image-20220402100649924.png)



`mulitiInstanceCompleteTask`对象的完整代码为：

```java
@Component("mulitiInstanceCompleteTask")
public class MulitiInstanceCompleteTask implements Serializable {
    /**
     * 完成任务是需要触发的方法
     * @param execution
     * @return
     *     false 表示会签任务还没有结束
     *     true 表示会签任务结束了
     */
    public boolean completeTask(DelegateExecution execution) {
        System.out.println("总的会签任务数量：" + execution.getVariable("nrOfInstances")
                + "当前获取的会签任务数量：" + execution.getVariable("nrOfActiveInstances")
                + " - " + "已经完成的会签任务数量：" + execution.getVariable("nrOfCompletedInstances"));
        //有一个人同意就通过
        Boolean flag = (Boolean) execution.getVariable("flag");
        System.out.println("当前意见："+flag);
        return flag;
    }
}
```

上面的三个变量是Flowable中自带的可用变量

1. nrOfInstances:该会签环节中总共有多少个实例

2. nrOfActiveInstances:当前活动的实例的数量，即还没有完成的实例数量。

3. nrOfCompletedInstances:已经完成的实例的数量



## 3.案例演示

### 3.1 部署流程

```java
    /**
     * Deploy
     */
    @Test
    void testDeploy() throws Exception {
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("会签案例.bpmn20.xml")
                .name("会签案例")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }
```

### 3.2 启动流程

&emsp;&emsp;在启动流程实例的时候，我们需要设置相关的参数，在流程定义的时候设置的persons在此处我们就需要设置了，设置为Arrays.asList("张三","李四","王五","赵六")，这里设置了4个元素，在流程定义里定义了3个，表示只会循环3次，启动流程后，在Task中可以看到只有3个任务

```java
    @Test
    void startFlow() throws Exception{
        Map<String,Object> map = new HashMap<>();
        // 设置多人会签的数据
        map.put("persons", Arrays.asList("张三","李四","王五","赵六"));
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceById("myProcess:1:ba1518fc-b22d-11ec-9313-c03c59ad2248",map);
    }
```

![image-20220402104240267](\img\image-20220402104240267.png)



同时控制也有对应的输出，触发了Task的创建事件

![image-20220402104319944]( \img\image-20220402104319944.png)



### 3.3 会签处理任务

&emsp;&emsp;启动流程后我们发下在Task中产生了3条任务，我们先通过TaskService来完成其中一个任务，设置一个标志flag为false，来控制会签还没有结束，同时Task中另外两个任务还在

```java 
    @Test
    void completeTask1(){
        Map<String,Object> map = new HashMap<>();
        map.put("flag",false);
        taskService.complete("71337501-b22e-11ec-a534-c03c59ad2248",map);
        System.out.println("complete ....");
    }
```

![image-20220402104554823](\img\image-20220402104554823.png)

当任务执行完成时会同步触发会签完成表达式中对象方法。有如下的输出

![image-20220402104729627](\img\image-20220402104729627.png)

同时Task表中的记录还有两条

![image-20220402104819239](\img\image-20220402104819239.png)

然后当我们在完成一个任务，这时设置flag为true，会发现在这个多人处理中，最多3个人处理在第二个人处理后就结束了

```java
    @Test
    void completeTask1(){
        Map<String,Object> map = new HashMap<>();
        map.put("flag",true); // 设置为true 结束多人会签
        taskService.complete("713570d4-b22e-11ec-a534-c03c59ad2248",map);
        System.out.println("complete ....");
    }
```





![image-20220402105058601](\img\image-20220402105058601.png)



同时来看看表结构中的记录，发现没有了

![image-20220402105148471](\img\image-20220402105148471.png)



搞定~







# 二、动态表单



&emsp;&emsp;Flowable提供了一种简便灵活的方式，用来为业务流程中的人工步骤添加表单。 有两种使用表单的方法：使用（由表单设计器创建的）表单定义的内置表单渲染，以及外部表单渲染。 使用外部表单渲染时，可以使用（自Explorer web应用V5版本支持的）表单参数；也可以使用表单key定义，引用外部的、使用自定义代码解析的表单。

## 1.流程绘制



![image-20220403133804306](\img\image-20220403133804306.png)



表单设计

![image-20220403133735195](\img\image-20220403133735195.png)



![image-20220403133710713](\img\image-20220403133710713.png)









## 2. 案例演示



### 2.1 部署流程

&emsp;&emsp;流程图绘制好之后我们就可以直接来部署这个流程了

```java
/**
     * Deploy
     */
    @Test
    void testDeploy() throws Exception {
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("动态表单01.bpmn20.xml")
                .name("动态表单01")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }
```



### 2.2 查看流程关联的表单信息

&emsp;&emsp;我们部署了一个流程后，如果不清楚之前关联了什么表单，表单中有哪些字段，属性是什么？这时我们可以通过定义的流程查询出对应的form表单信息

```java
    @Test
    public void getStartFromData(){
        String departemntId = "4da14de4-b313-11ec-882d-c03c59ad2248";
        ProcessDefinition processDefinition = repositoryService
                .createProcessDefinitionQuery()
                .deploymentId(departemntId)
                .singleResult();
        StartFormData startFormData = processEngine.getFormService()
                .getStartFormData(processDefinition.getId());
        List<FormProperty> formProperties = startFormData.getFormProperties();
        for (FormProperty formProperty : formProperties) {
            String id = formProperty.getId();
            String name = formProperty.getName();
            FormType type = formProperty.getType();
            System.out.println("id = " + id);
            System.out.println("name = " + name);
            System.out.println("type.getClass() = " + type.getClass());
        }
    }
```





### 2.3 启动流程

&emsp;&emsp;启动流程的方式有两种，一种是正常的通过RuntimeService来启动，还有一种就是通过FormService来启动，具体代码如下：

```java
    /**
     * 正常的启动流程
     */
    @Test
    void startFlow() throws Exception{
        Map<String,Object> map = new HashMap<>();
        map.put("days","5");
        map.put("startDate","20220403");
        map.put("reason","想休息下");
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceById("myProcess:5:4dd61987-b313-11ec-882d-c03c59ad2248",map);
    }


    /**
     * 通过FormService来启动一个表单流程
     * @throws Exception
     */
    @Test
    void startFormFlow() throws Exception{
        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .deploymentId("4da14de4-b313-11ec-882d-c03c59ad2248")
                .singleResult();
        Map<String,String> map = new HashMap<>();
        map.put("days","2");
        map.put("startDate","20220406");
        map.put("reason","出去玩玩");
        ProcessInstance processInstance = processEngine.getFormService().submitStartFormData(processDefinition.getId(), map);

    }
```



### 2.4 保存表单数据

&emsp;&emsp;在Task执行之前我们也可以保存表单数据到Task对应的Form表单中。

```java
/**
 * 保存表单数据
 */
@Test
void saveFormData(){
    String taskId = "80efeb32-b313-11ec-a7ff-c03c59ad2248";
    Map<String,String> map = new HashMap<>();
    map.put("days","3");
    map.put("startDate","20220407");
    map.put("reason","出去玩玩11");
    processEngine.getFormService().saveFormData(taskId,map);
}
```



### 2.5 查看任务表单数据



```java
/**
 * 根据Task编号来查看表单数据
 */
@Test
void getTaskFormData(){
    String taskId = "80efeb32-b313-11ec-a7ff-c03c59ad2248";
    TaskFormData taskFormData = processEngine.getFormService().getTaskFormData(taskId);
    List<FormProperty> formProperties = taskFormData.getFormProperties();
    for (FormProperty formProperty : formProperties) {
        System.out.println("formProperty.getId() = " + formProperty.getId());
        System.out.println("formProperty.getName() = " + formProperty.getName());
        System.out.println("formProperty.getValue() = " + formProperty.getValue());
    }
}
```

输出结果

```txt
formProperty.getId() = days
formProperty.getName() = 请假天数
formProperty.getValue() = 3
formProperty.getId() = reason
formProperty.getName() = 请假理由
formProperty.getValue() = 出去玩玩11
formProperty.getId() = startDate
formProperty.getName() = 开始日期
formProperty.getValue() = 20220407
```



### 2.6 完成任务

&emsp;&emsp;现在就可以通过指派人或者任务编号来完成当前任务,当然这时我们还是可以修改form表单中的数据

```java
    /**
     * 保存表单数据并完成任务
     */
    @Test
    void submitTaskFormData(){
        String taskId = "80efeb32-b313-11ec-a7ff-c03c59ad2248";
        Map<String,String> map = new HashMap<>();
        map.put("days","4");
        map.put("startDate","20220408");
        map.put("reason","出去玩玩");
        processEngine.getFormService().submitTaskFormData(taskId,map);
    }
```



### 2.7 查看完成的Task的表单数据

&emsp;&emsp;一个Task完成后，如果我们想要查看之前的表单的历史数据可以通过如下的方法来实现

```java
    /**
     * 查看已经完成的Task的表单数据
     */
    @Test
    void getHisTaskFormData(){
        String taskId = "80efeb32-b313-11ec-a7ff-c03c59ad2248";
        List<HistoricDetail> list = processEngine.getHistoryService()
                .createHistoricDetailQuery()
                .taskId(taskId)
                .formProperties()
                .list();
        for (HistoricDetail historicDetail : list) {
            HistoricFormPropertyEntityImpl his = (HistoricFormPropertyEntityImpl) historicDetail;
            System.out.println("his.getPropertyId() = " + his.getPropertyId());
            System.out.println("his.getPropertyValue() = " + his.getPropertyValue());
        }
    }
```







## 3.外置表单

&emsp;&emsp;我们会发现在上面的例子中通过内置的表单，我们需要在每个节点都设置一份表单数据，不是很灵活，这时我们可以单独创建一份表单，然后在对应的节点做应用就可以了。

### 3.1 创建表单

&emsp;&emsp;表单定义文件是以.form为后缀， 内容格式为Json格式

```json
{
"key": "form1",
"name": "请假流程",
"fields": [
            {
            "id": "startTime",
            "name": "开始时间",
            "type": "date",
            "required": true,
            "placeholder": "empty"
            },
            {
            "id": "days",
            "name": "请假天数",
            "type": "string",
            "required": true,
            "placeholder": "empty"
            },
            {
            "id": "reason",
            "name": "请假原因",
            "type": "text",
            "required": true,
            "placeholder": "empty"
            }
    ]
}
```

&emsp;&emsp;注意：上面文件中的key是唯一标识，我们在表单处理的时候是根据这个key来获取的哦，



### 3.2 然后创建流程文件

&emsp;&emsp;流程文件还是以我们上面的案例来演示，主要是对表单这块做了调整

![image-20220403231037718](\img\image-20220403231037718.png)

form表单通过引用来关联

![image-20220403231121921](\img\image-20220403231121921.png)



完整的xml文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
    <process id="myProcess" name="My process" isExecutable="true">
        <startEvent id="startevent1" name="Start" activiti:formKey="form1"></startEvent>
        <userTask id="usertask1" name="用户申请" activiti:assignee="zhangsan" activiti:formKey="form1"></userTask>
        <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="usertask1"></sequenceFlow>
        <sequenceFlow id="flow2" sourceRef="usertask1" targetRef="exclusivegateway1"></sequenceFlow>
        <userTask id="usertask2" name="总监审批" activiti:assignee="lisi"></userTask>
        <sequenceFlow id="flow3" sourceRef="exclusivegateway1" targetRef="usertask2">
            <conditionExpression xsi:type="tFormalExpression"><![CDATA[${days>3}]]></conditionExpression>
        </sequenceFlow>
        <userTask id="usertask3" name="部门经理审批" activiti:assignee="wangwu"></userTask>
        <sequenceFlow id="flow4" sourceRef="exclusivegateway1" targetRef="usertask3">
            <conditionExpression xsi:type="tFormalExpression"><![CDATA[${days<=3}]]></conditionExpression>
        </sequenceFlow>
        <sequenceFlow id="flow5" sourceRef="usertask2" targetRef="exclusivegateway2"></sequenceFlow>
        <sequenceFlow id="flow6" sourceRef="usertask3" targetRef="exclusivegateway2"></sequenceFlow>
        <endEvent id="endevent1" name="End"></endEvent>
        <sequenceFlow id="flow7" sourceRef="exclusivegateway2" targetRef="endevent1"></sequenceFlow>
        <exclusiveGateway id="exclusivegateway1" name="Exclusive Gateway"></exclusiveGateway>
        <exclusiveGateway id="exclusivegateway2" name="Exclusive Gateway"></exclusiveGateway>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
        <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
            <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="300.0" y="280.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
                <omgdc:Bounds height="55.0" width="105.0" x="380.0" y="270.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask2" id="BPMNShape_usertask2">
                <omgdc:Bounds height="55.0" width="105.0" x="650.0" y="140.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask3" id="BPMNShape_usertask3">
                <omgdc:Bounds height="55.0" width="105.0" x="660.0" y="370.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="965.0" y="260.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="exclusivegateway1" id="BPMNShape_exclusivegateway1">
                <omgdc:Bounds height="40.0" width="40.0" x="530.0" y="278.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="exclusivegateway2" id="BPMNShape_exclusivegateway2">
                <omgdc:Bounds height="40.0" width="40.0" x="880.0" y="257.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
                <omgdi:waypoint x="335.0" y="297.0"></omgdi:waypoint>
                <omgdi:waypoint x="380.0" y="297.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
                <omgdi:waypoint x="485.0" y="297.0"></omgdi:waypoint>
                <omgdi:waypoint x="530.0" y="298.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
                <omgdi:waypoint x="550.0" y="278.0"></omgdi:waypoint>
                <omgdi:waypoint x="550.0" y="167.0"></omgdi:waypoint>
                <omgdi:waypoint x="650.0" y="167.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
                <omgdi:waypoint x="550.0" y="318.0"></omgdi:waypoint>
                <omgdi:waypoint x="550.0" y="397.0"></omgdi:waypoint>
                <omgdi:waypoint x="660.0" y="397.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
                <omgdi:waypoint x="755.0" y="167.0"></omgdi:waypoint>
                <omgdi:waypoint x="899.0" y="167.0"></omgdi:waypoint>
                <omgdi:waypoint x="900.0" y="257.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow6" id="BPMNEdge_flow6">
                <omgdi:waypoint x="765.0" y="397.0"></omgdi:waypoint>
                <omgdi:waypoint x="900.0" y="397.0"></omgdi:waypoint>
                <omgdi:waypoint x="900.0" y="297.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow7" id="BPMNEdge_flow7">
                <omgdi:waypoint x="920.0" y="277.0"></omgdi:waypoint>
                <omgdi:waypoint x="965.0" y="277.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>
```



### 3.3 部署流程

&emsp;&emsp;接下来我们先部署流程

```java
    /**
     * 部署流程：
     */
    @Test
    public void deploy(){
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("动态表单02.bpmn20.xml")
                .name("动态表单02")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
    }
```



### 3.4 部署表单

&emsp;&emsp;这个步骤很重要，我们需要单独把我们的form文件部署到流程中。

```java
    @Autowired
    private FormRepositoryService formRepositoryService;

    /**
     * 部署form表单
     */
    @Test
    public void deployForm() throws Exception{

        FormDeployment formDeployment = formRepositoryService.createDeployment()
                .addClasspathResource("holiday.form")
                .name("test")
                .parentDeploymentId("1")
                .deploy();
        System.out.println("formDeployment.getId() = " + formDeployment.getId());
    }
```

&emsp;&emsp;我们需要通过FormRepositoryService来部署我们的form表单。对应的会在这几种表中生成对应的数据

Form部署表：

![image-20220403231443464](\img\image-20220403231443464.png)



Form定义表：

![image-20220403231556049](\img\image-20220403231556049.png)



Form资源表：

![image-20220403231624905](\img\image-20220403231624905.png)





### 3.5 启动任务

&emsp;&emsp;带有外置Form表单的流程我们需要通过`runtimeService.startProcessInstanceWithForm`来启动

```java
    /**
     * 启动流程实例，并且设置对应的值
     */
    @Test
    void startTask(){
        Map<String,Object> map = new HashMap<>();
        map.put("days","4");
        map.put("startTime","20220404");
        map.put("reason","出去玩玩");
        ProcessInstance processInstance = runtimeService.startProcessInstanceWithForm(
                "myProcess:1:4"
                , null
                , map
                , "请假流程");
        String id = processInstance.getId();
        System.out.println("id = " + id);

    }
```

可以看到对应的任务

![image-20220403231811784](\img\image-20220403231811784.png)





### 3.6 查看任务表单数据

&emsp;&emsp;在任务处理之前我们可以查看表单的对应信息。

```java
    /**
     * 查看流程定义表单数据
     */
    @Test
    public void getTaskFormData1(){
        Task task = taskService.createTaskQuery()
                .processDefinitionId("myProcess:1:4")
                .taskAssignee("zhangsan")
                .singleResult();
        // FormInfo 表单的元数据信息
        FormInfo formInfo = runtimeService.getStartFormModel("myProcess:1:4", "5001");
        System.out.println("formInfo.getId() = " + formInfo.getId());
        System.out.println("formInfo.getName() = " + formInfo.getName());
        System.out.println("formInfo.getKey() = " + formInfo.getKey());
        // FormModel 表单中的具体信息 具体实现是 SimpleFormModel
        SimpleFormModel formModel = (SimpleFormModel) formInfo.getFormModel();
        List<FormField> fields = formModel.getFields();
        for (FormField field : fields) {
            System.out.println("field.getId() = " + field.getId());
            System.out.println("field.getName() = " + field.getName());
            System.out.println("field.getValue() = " + field.getValue());
        }
        System.out.println("formModel = " + formModel);
    }

	/**
	* 查看具体的Task的表单数据
	*/
    @Test
    void getTaskData(){
        FormInfo formInfo = taskService.getTaskFormModel("17505");
        System.out.println("formInfo.getId() = " + formInfo.getId());
        System.out.println("formInfo.getName() = " + formInfo.getName());
        System.out.println("formInfo.getKey() = " + formInfo.getKey());
        SimpleFormModel formModel = (SimpleFormModel) formInfo.getFormModel();
        List<FormField> fields = formModel.getFields();
        for (FormField field : fields) {
            System.out.println("field.getId() = " + field.getId());
            System.out.println("field.getName() = " + field.getName());
            System.out.println("field.getValue() = " + field.getValue());
        }
    }
```





### 3.7 完成任务

&emsp;&emsp;在外置表单的场景中我们需要通过`taskService.completeTaskWithForm`来完成表单的任务

```java
    /**
     * 完成任务
     */
    @Test
    public void completeTaskForm(){
        Map<String,Object> map = new HashMap<>();
        map.put("days","4");
        map.put("startTime","20220404");
        map.put("reason","出去玩玩");
        String taskId = "5010";
        String formDefinitionId = "2503";
        String outcome = "波哥";
        taskService.completeTaskWithForm(taskId,formDefinitionId,outcome,map);
    }
```



然后任务就流转到了下一个节点来处理了

![image-20220403233308221](\img\image-20220403233308221.png)





搞定~！









# 三、任务的回退



## 1.串行的回退

&emsp;&emsp;我们先从最简单的串行流程来分析，案例如下

![image-20220404221942030](\img\image-20220404221942030.png)

完整的xml文件内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
  <process id="myProcess" name="My process" isExecutable="true">
    <startEvent id="startevent1" name="Start"></startEvent>
    <userTask id="usertask1" name="用户任务1" activiti:assignee="user1"></userTask>
    <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="usertask1"></sequenceFlow>
    <userTask id="usertask2" name="用户任务2" activiti:assignee="user2"></userTask>
    <sequenceFlow id="flow2" sourceRef="usertask1" targetRef="usertask2"></sequenceFlow>
    <userTask id="usertask3" name="用户任务3" activiti:assignee="user3"></userTask>
    <sequenceFlow id="flow3" sourceRef="usertask2" targetRef="usertask3"></sequenceFlow>
    <userTask id="usertask4" name="用户任务4" activiti:assignee="user4"></userTask>
    <sequenceFlow id="flow4" sourceRef="usertask3" targetRef="usertask4"></sequenceFlow>
    <endEvent id="endevent1" name="End"></endEvent>
    <sequenceFlow id="flow5" sourceRef="usertask4" targetRef="endevent1"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
    <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
      <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="390.0" y="260.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
        <omgdc:Bounds height="55.0" width="105.0" x="470.0" y="250.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask2" id="BPMNShape_usertask2">
        <omgdc:Bounds height="55.0" width="105.0" x="620.0" y="250.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask3" id="BPMNShape_usertask3">
        <omgdc:Bounds height="55.0" width="105.0" x="770.0" y="250.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask4" id="BPMNShape_usertask4">
        <omgdc:Bounds height="55.0" width="105.0" x="920.0" y="250.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="1070.0" y="260.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
        <omgdi:waypoint x="425.0" y="277.0"></omgdi:waypoint>
        <omgdi:waypoint x="470.0" y="277.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
        <omgdi:waypoint x="575.0" y="277.0"></omgdi:waypoint>
        <omgdi:waypoint x="620.0" y="277.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
        <omgdi:waypoint x="725.0" y="277.0"></omgdi:waypoint>
        <omgdi:waypoint x="770.0" y="277.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
        <omgdi:waypoint x="875.0" y="277.0"></omgdi:waypoint>
        <omgdi:waypoint x="920.0" y="277.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
        <omgdi:waypoint x="1025.0" y="277.0"></omgdi:waypoint>
        <omgdi:waypoint x="1070.0" y="277.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

&emsp;&emsp;上面的流程就是一个非常简单的串行任务，定义了4个用户任务，指派的处理人分别是`user1`,`user2`,`user3`,`user4`.在流程的执行过程中我们可以通过回退来演示具体的效果。首先来部署流程

```java
    /**
     * 部署流程
     */
    @Test
    void testDeploy() throws Exception {
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("任务回退01.bpmn20.xml")
                .name("任务回退01")
                .deploy();
        System.out.println("deploy.getId() = " + deploy.getId());
        System.out.println("deploy.getName() = " + deploy.getName());
        System.out.println("部署开始的时间：" + new Date());
        //TimeUnit.MINUTES.sleep(3);
    }
```

然后我们启动一个流程实例。

```java
    /**
     * 启动流程实例
     */
    @Test
    void startProcess(){
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceById("myProcess:1:4");
        System.out.println("processInstance.getId() = " + processInstance.getId());
    }
```





![image-20220404222436788](\img\image-20220404222436788.png)



然后我们通过user1完成任务，直到user3完成任务，到user4来处理任务。

```java
    /**
     * 完成任务
     */
    @Test
    void completeTask(){
        Task task = taskService.createTaskQuery()
                .processDefinitionId("myProcess:1:4")
                .taskAssignee("user1")
                .singleResult();
        taskService.complete(task.getId());
    }

```

通过上面的多个Task完成操作，现在已经到了user4来处理的节点了

![image-20220404223234982](\img\image-20220404223234982.png)



![image-20220404223253043](\img\image-20220404223253043.png)



我们先看下从`用户任务4`回退到`用户任务3`的操作。

```java
/**
 * 回退操作
 */
@Test
void rollbackTask(){
    // 当前的Task对应的用户任务的Id
    List<String> currentActivityIds = new ArrayList<>();
    currentActivityIds.add("usertask4");
    // 需要回退的目标节点的用户任务Id
    String newActivityId = "usertask3";
    // 回退操作
    runtimeService.createChangeActivityStateBuilder()
            .processInstanceId("2501")
            .moveActivityIdsToSingleActivityId(currentActivityIds,newActivityId)
            .changeState();

}
```

操作后我们可以在对应的历史表中看到相关的信息

![image-20220404224948722](\img\image-20220404224948722.png)



![image-20220404225319024](\img\image-20220404225319024.png)



然后我们通过user3来完成任务继续到user4处理，然后我们可以测试回退到user1处。

![image-20220404225345357](\img\image-20220404225345357.png)

```java
/**
 * 回退操作
 */
@Test
void rollbackTask(){
    // 当前的Task对应的用户任务的Id
    List<String> currentActivityIds = new ArrayList<>();
    currentActivityIds.add("usertask4");
    // 需要回退的目标节点的用户任务Id
    String newActivityId = "usertask1";
    // 回退操作
    runtimeService.createChangeActivityStateBuilder()
            .processInstanceId("2501")
            .moveActivityIdsToSingleActivityId(currentActivityIds,newActivityId)
            .changeState();
}
```

![image-20220404225532864](\img\image-20220404225532864.png)



&emsp;&emsp;可以看到任务又回到了user1处。也就是在串行的流程中，我们可以回退到任意的用户节点，当然这个串行也包括多人会签和排他网关节点。当然在回退的时候我们还可以使用`moveActivityIdTo(String currentActivityId,String newActivityId)`这个方法来处理。





## 2.并行的回退

&emsp;&emsp;接下来我们在并行的场景中来看看各种回退的场景。具体案例流程如下：

![image-20220405111325145](\img\image-20220405111325145.png)

详细的xml文件内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
    <process id="myProcess" name="My process" isExecutable="true">
        <startEvent id="startevent1" name="Start"></startEvent>
        <userTask id="usertask1" name="用户审批01" activiti:assignee="user1"></userTask>
        <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="usertask1"></sequenceFlow>
        <sequenceFlow id="flow2" sourceRef="usertask1" targetRef="parallelgateway1"></sequenceFlow>
        <parallelGateway id="parallelgateway1" name="Exclusive Gateway"></parallelGateway>
        <userTask id="usertask2" name="业务负责人" activiti:assignee="user2"></userTask>
        <sequenceFlow id="flow3" sourceRef="parallelgateway1" targetRef="usertask2"></sequenceFlow>
        <userTask id="usertask3" name="行政副总" activiti:assignee="user4"></userTask>
        <sequenceFlow id="flow4" sourceRef="parallelgateway1" targetRef="usertask3"></sequenceFlow>
        <userTask id="usertask4" name="业务副总" activiti:assignee="user3"></userTask>
        <sequenceFlow id="flow5" sourceRef="usertask2" targetRef="usertask4"></sequenceFlow>
        <sequenceFlow id="flow6" sourceRef="usertask4" targetRef="parallelgateway2"></sequenceFlow>
        <parallelGateway id="parallelgateway2" name="Exclusive Gateway"></parallelGateway>
        <sequenceFlow id="flow7" sourceRef="usertask3" targetRef="parallelgateway2"></sequenceFlow>
        <userTask id="usertask5" name="总经理" activiti:assignee="user5"></userTask>
        <sequenceFlow id="flow8" sourceRef="parallelgateway2" targetRef="usertask5"></sequenceFlow>
        <endEvent id="endevent1" name="End"></endEvent>
        <sequenceFlow id="flow9" sourceRef="usertask5" targetRef="endevent1"></sequenceFlow>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
        <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
            <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="370.0" y="300.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
                <omgdc:Bounds height="55.0" width="105.0" x="450.0" y="290.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="parallelgateway1" id="BPMNShape_parallelgateway1">
                <omgdc:Bounds height="40.0" width="40.0" x="600.0" y="298.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask2" id="BPMNShape_usertask2">
                <omgdc:Bounds height="55.0" width="105.0" x="740.0" y="180.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask3" id="BPMNShape_usertask3">
                <omgdc:Bounds height="55.0" width="105.0" x="740.0" y="370.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask4" id="BPMNShape_usertask4">
                <omgdc:Bounds height="55.0" width="105.0" x="930.0" y="180.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="parallelgateway2" id="BPMNShape_parallelgateway2">
                <omgdc:Bounds height="40.0" width="40.0" x="1140.0" y="297.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="usertask5" id="BPMNShape_usertask5">
                <omgdc:Bounds height="55.0" width="105.0" x="1225.0" y="290.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
                <omgdc:Bounds height="35.0" width="35.0" x="1375.0" y="300.0"></omgdc:Bounds>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
                <omgdi:waypoint x="405.0" y="317.0"></omgdi:waypoint>
                <omgdi:waypoint x="450.0" y="317.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
                <omgdi:waypoint x="555.0" y="317.0"></omgdi:waypoint>
                <omgdi:waypoint x="600.0" y="318.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
                <omgdi:waypoint x="620.0" y="298.0"></omgdi:waypoint>
                <omgdi:waypoint x="620.0" y="207.0"></omgdi:waypoint>
                <omgdi:waypoint x="740.0" y="207.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
                <omgdi:waypoint x="620.0" y="338.0"></omgdi:waypoint>
                <omgdi:waypoint x="620.0" y="397.0"></omgdi:waypoint>
                <omgdi:waypoint x="740.0" y="397.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
                <omgdi:waypoint x="845.0" y="207.0"></omgdi:waypoint>
                <omgdi:waypoint x="930.0" y="207.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow6" id="BPMNEdge_flow6">
                <omgdi:waypoint x="1035.0" y="207.0"></omgdi:waypoint>
                <omgdi:waypoint x="1159.0" y="207.0"></omgdi:waypoint>
                <omgdi:waypoint x="1160.0" y="297.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow7" id="BPMNEdge_flow7">
                <omgdi:waypoint x="845.0" y="397.0"></omgdi:waypoint>
                <omgdi:waypoint x="1160.0" y="397.0"></omgdi:waypoint>
                <omgdi:waypoint x="1160.0" y="337.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow8" id="BPMNEdge_flow8">
                <omgdi:waypoint x="1180.0" y="317.0"></omgdi:waypoint>
                <omgdi:waypoint x="1225.0" y="317.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge bpmnElement="flow9" id="BPMNEdge_flow9">
                <omgdi:waypoint x="1330.0" y="317.0"></omgdi:waypoint>
                <omgdi:waypoint x="1375.0" y="317.0"></omgdi:waypoint>
            </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>
```

&emsp;&emsp;先部署流程，然后启动并运行到并行流程的节点如下的位置
![image-20220405111459624](\img\image-20220405111459624.png)

&emsp;&emsp;然后我们可以尝试从`业务副总`处回退到`用户审批01`处，看看该处理应该要如何实现。

![image-20220405111926713](\img\image-20220405111926713.png)



回退逻辑代码的实现

```java
    /**
     * 回退操作
     *   业务副总驳回到到用户审批处  那么行政审批的也应该要返回
     */
    @Test
    void rollbackTask(){
        // 当前的Task对应的用户任务的Id
        List<String> currentActivityIds = new ArrayList<>();
        currentActivityIds.add("usertask4"); // 行政副总
        currentActivityIds.add("usertask3"); // 业务副总
        // 需要回退的目标节点的用户任务Id
        String newActivityId = "usertask1"; // 用户审批01
        // 回退操作
        runtimeService.createChangeActivityStateBuilder()
                .processInstanceId("22501")
                .moveActivityIdsToSingleActivityId(currentActivityIds,newActivityId)
                .changeState();
    }
```

查看ACT_RU_TASK可以看到回到了`用户审批01`了

![image-20220405112329439](\img\image-20220405112329439.png)

同时在ACT_HI_ACTINS中也可以看到回退的历史操作

![image-20220405112544706](\img\image-20220405112544706.png)



然后再来看看 行政副总的 并行分支执行完成了，然后在 业务副总处审批要驳回的处理

![image-20220405113125822](\img\image-20220405113125822.png)

![image-20220405113212465](\img\image-20220405113212465.png)



```java
    @Test
    void rollbackTask(){
        // 当前的Task对应的用户任务的Id
        List<String> currentActivityIds = new ArrayList<>();
        currentActivityIds.add("usertask4"); // 行政副总
        //currentActivityIds.add("usertask3"); // 业务副总
        // 需要回退的目标节点的用户任务Id
        String newActivityId = "usertask1"; // 用户审批01
        // 回退操作
        runtimeService.createChangeActivityStateBuilder()
                .processInstanceId("22501")
                .moveActivityIdsToSingleActivityId(currentActivityIds,newActivityId)
                .changeState();
    }
```



一样的效果



## 3.子流程回退

&emsp;&emsp;最后我们来看看带有子流程的场景下如果有回退的情况应该要如何来处理,案例如下：

![image-20220405134220482](\img\image-20220405134220482.png)

完整的xml内容为：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
  <process id="myProcess" name="My process" isExecutable="true">
    <startEvent id="startevent1" name="Start"></startEvent>
    <userTask id="usertask1" name="主任务1" activiti:assignee="user1"></userTask>
    <sequenceFlow id="flow1" sourceRef="startevent1" targetRef="usertask1"></sequenceFlow>
    <subProcess id="subprocess1" name="Sub Process">
      <startEvent id="startevent2" name="Start"></startEvent>
      <userTask id="usertask2" name="子任务1" activiti:assignee="user2"></userTask>
      <sequenceFlow id="flow3" sourceRef="startevent2" targetRef="usertask2"></sequenceFlow>
      <endEvent id="endevent1" name="End"></endEvent>
      <sequenceFlow id="flow4" sourceRef="usertask2" targetRef="endevent1"></sequenceFlow>
    </subProcess>
    <sequenceFlow id="flow2" sourceRef="usertask1" targetRef="subprocess1"></sequenceFlow>
    <userTask id="usertask3" name="主任务2" activiti:assignee="user3"></userTask>
    <sequenceFlow id="flow5" sourceRef="subprocess1" targetRef="usertask3"></sequenceFlow>
    <endEvent id="endevent2" name="End"></endEvent>
    <sequenceFlow id="flow6" sourceRef="usertask3" targetRef="endevent2"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_myProcess">
    <bpmndi:BPMNPlane bpmnElement="myProcess" id="BPMNPlane_myProcess">
      <bpmndi:BPMNShape bpmnElement="startevent1" id="BPMNShape_startevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="320.0" y="290.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask1" id="BPMNShape_usertask1">
        <omgdc:Bounds height="55.0" width="105.0" x="400.0" y="280.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="subprocess1" id="BPMNShape_subprocess1">
        <omgdc:Bounds height="291.0" width="481.0" x="620.0" y="168.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="startevent2" id="BPMNShape_startevent2">
        <omgdc:Bounds height="35.0" width="35.0" x="680.0" y="298.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask2" id="BPMNShape_usertask2">
        <omgdc:Bounds height="55.0" width="105.0" x="760.0" y="288.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent1" id="BPMNShape_endevent1">
        <omgdc:Bounds height="35.0" width="35.0" x="910.0" y="298.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="usertask3" id="BPMNShape_usertask3">
        <omgdc:Bounds height="55.0" width="105.0" x="1146.0" y="286.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="endevent2" id="BPMNShape_endevent2">
        <omgdc:Bounds height="35.0" width="35.0" x="1296.0" y="296.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="flow1" id="BPMNEdge_flow1">
        <omgdi:waypoint x="355.0" y="307.0"></omgdi:waypoint>
        <omgdi:waypoint x="400.0" y="307.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow3" id="BPMNEdge_flow3">
        <omgdi:waypoint x="715.0" y="315.0"></omgdi:waypoint>
        <omgdi:waypoint x="760.0" y="315.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow4" id="BPMNEdge_flow4">
        <omgdi:waypoint x="865.0" y="315.0"></omgdi:waypoint>
        <omgdi:waypoint x="910.0" y="315.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow2" id="BPMNEdge_flow2">
        <omgdi:waypoint x="505.0" y="307.0"></omgdi:waypoint>
        <omgdi:waypoint x="620.0" y="313.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow5" id="BPMNEdge_flow5">
        <omgdi:waypoint x="1101.0" y="313.0"></omgdi:waypoint>
        <omgdi:waypoint x="1146.0" y="313.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="flow6" id="BPMNEdge_flow6">
        <omgdi:waypoint x="1251.0" y="313.0"></omgdi:waypoint>
        <omgdi:waypoint x="1296.0" y="313.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```



部署流程后并启动流程，我们先来看第一个场景，从子流程回退到主流程，也就是如下图：

![image-20220405134411503](\img\image-20220405134411503.png)

Task进入到了子流程的Task处

![image-20220405134811970](\img\image-20220405134811970.png)



然后我们来处理回退到主流程:直接跳转即可

```java
    /**
     * 回退操作
     *   从子流程回退到主流程操作
     */
    @Test
    void rollbackMainTask(){

        // 回退操作
        runtimeService.createChangeActivityStateBuilder()
                .processInstanceId("2501")
                .moveActivityIdTo("usertask2","usertask1")
                .changeState();
    }

}

    /**
     * 回退操作
     *   从子流程回退到主流程操作：moveExecutionToActivityId不关心当前的节点
     */
    @Test
    void rollbackMainTask(){

        // 回退操作
        runtimeService.createChangeActivityStateBuilder()
                .processInstanceId("2501")
                .moveExecutionToActivityId("5003","usertask1")
                .changeState();
    }
```

然后从主流程回退到子流程操作

![image-20220405140816409](\img\image-20220405140816409.png)

![image-20220405141015720](\img\image-20220405141015720.png)



同样的直接跳转即可

```java
/**
 * 回退操作
 */
@Test
void rollbackSubTask(){

    // 回退操作
    runtimeService.createChangeActivityStateBuilder()
            .processInstanceId("2501")
            .moveActivityIdTo("usertask3","usertask2")
            .changeState();
}
```

