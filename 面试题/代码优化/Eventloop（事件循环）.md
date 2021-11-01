##  Event Loop  事件循环

>`Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用**异步**的原理。

搞懂 Event Loop，是理解 Vue 对 DOM 操作优化的第一步。

Micro-Task 与 Macro-Task
事件循环中的**异步队列**有两种：**macro（宏任务）队列**和 **micro（微任务）队列**。

### 宏任务 macro-task 比如： 

- 定时器回调 、DOM 事件回调 、ajax 回调

   setTimeout、setInterval、 setImmediate、script（整体代码）、Dom、ajax、 I/O 操作、UI 渲染等。

### 微任务 micro-task 比如: 

- promise的回调    、MutationObserver 的回调

​    process.nextTick、Promise、MutationObserver 等。
​    
大家也知道了当我们执行 JS 代码的时候其实就是往执行栈中放入函数，当遇到异步的代码时，会被挂起并在需要执行的时候，
加入到 Task（有多种 Task） 队列中。
一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，
所以本质上来说 JS 中的异步还是同步行为。

所以 Event Loop 执行顺序如下所示：

首先执行同步代码，这属于宏任务
当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
执行所有微任务
当执行完所有微任务后，如有必要会渲染页面
然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

微任务包括 process.nextTick ，**promise** ，MutationObserver，其中 process.nextTick 为 Node 独有。

宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。
**因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。**



### 大白话：

js 应该是按照语句先后顺序执行，在出现异步时，则发起异步请求后，接着往下执行，**待异步结果返回后再接着执行**。

### 具体的操作步骤如下：

1. 从宏任务的头部取出一个任务执行；
2. 执行过程中若遇到微任务则将其添加到微任务的队列中；
3. 宏任务执行完毕后，微任务的队列中是否存在任务，若存在，则挨个儿出去执行，直到执行完毕；
4. GUI 渲染；
5. 回到步骤 1，直到宏任务执行完毕；

这 4 步构成了一个事件的循环检测机制，即我们所称的`eventloop`。

