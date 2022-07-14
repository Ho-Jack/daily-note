## 8种基本元素

![img](img\8种基本元素.jpg)





BPMN2.0概述：
1、是一套业务流程模型与符号建模标准；

2、精准的执行语义来描述元素的操作，可以将元素的操作描述的很清楚，没有二义性；

3、以XML为载体，以符号可视化业务，每个xml模块都可以对应符号，流程图与xml有一个相互转换的过程。

BPMN2.0所包含的元素：

- 流对象（活动、事件、网关）
- 连接对象
- 数据
- 泳道
- 描述对象

![image-20220711085935982](img\bpmn整体架构1.png)

![image-20220711090012486](\img\bpmn整体架构2.png)

## 1、流对象（FlowObjects）：

- 活动
- 事件
- 网关

![img](img\流对象.JPEG)

        活动（Activities）  [User Task 、Service Task ......]
        事件（Events）  [Start Event、End Event......]
        网关（Gateways）  [Exclusive Gateway ......]


​        

### 事件

![image-20220711090058239](\img\事件.png)

#### 终止结束事件：会结束整个流程实例

#### 空结束事件：只会结束当前流程路径

#### 定时启动事件：用来表示流程需要在指定时间启动。

#### 中间事件：在流程执行过程中发生的事件（比如， 在流程启动之后，在它完成之前）

- 抛出：流程到达事件时，触发器触发抛出事件
- 捕获：流程到达事件时，等待触发器捕获事件





### 网关

> 控制流程中的流向的

![image-20220711090132653](D:\notes\daily-note\JavaNote\flowable\img\网关.png)

#### 排他网关/唯一网关/专用网关

> 只有一条路径才会被选择

- 发散

![image-20220711090239932](D:\notes\daily-note\JavaNote\flowable\img\排他网关发散.png)

- 汇聚

![image-20220711090316817](D:\notes\daily-note\JavaNote\flowable\img\排他网关汇聚.png)

#### 并行网关AND：

> 所有路径会被同时选择,

- 并行切分或'AND-split'

  > 同时拥有切分和汇聚

![image-20220711090348889](D:\notes\daily-note\JavaNote\flowable\img\并行网关-发散-汇聚.png)

- 并行归并

  > 同时拥有切分和汇聚

  A B并行触发，AB完成时，CDE触发

  ![image-20220711090524777](D:\notes\daily-note\JavaNote\flowable\img\并行网关-归并.png)



#### 包容网关 OR-gateway：

> 可以同时执行多条线路，也可以在网关上设置条件

## 2、连接对象（ConnectingObject）：

> **流对象**通过连接对象连接起来表示数据的流转；

### 序列流/顺序流

> 事件，活动和网关之间的连线

![image-20220711090624827](D:\notes\daily-note\JavaNote\flowable\img\连接对象-顺序流.png)

#### 条件序列流



![image-20220711090853978](D:\notes\daily-note\JavaNote\flowable\img\连接对象-条件序列流.png)

#### 默认序列流

![image-20220711090934747](D:\notes\daily-note\JavaNote\flowable\img\流对象-默认序列流.png)



3、数据（Data）：包括一些数据对象、数据输入\输出对象等。

        数据对象（Data Objects）
    
        数据输入（Data Inputs ）
    
        数据输出（Data OutPuts）
    
        数据存储（Data Stores）


​        

4、泳道（Swimlanes）：对业务做范围维度的区分，一般通过不同的职能进行区分。

        池（Pools ）： 池描述流程中的一个参与者。可以看做是将一系列活动区别于其他池的一个图形容器
        道（Lanes ）：道就是在池里面再细分，可以是垂直的也可以是水平的。道也是用于组织和分类活动。


​       

5、描述对象（Artifacts）：不影响流程运行，为流程图可读性进行补充性描述。

下面看一下购物工作流程的样例流程图：

![image-20220711091027828](D:\notes\daily-note\JavaNote\flowable\img\购物流程.png)

        这个流程使用了泳池泳道介绍了电商购物流程，其中有三条泳道，分别为用户、电商平台与仓储物流。可以看到这里一共有6个事件，使用了5个用户任务和一个服务任务，从用户开始流程。在校验库存中有一个排他性网关，分别结束或者继续向下执行支付，然后再经过电商平台确定订单、仓储物流分拣发货后用户签收以后流程结束。这个也就是一个比较完善的简单流程。
————————————————
版权声明：本文为CSDN博主「青山孤客」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/JJBOOM425/article/details/88053594