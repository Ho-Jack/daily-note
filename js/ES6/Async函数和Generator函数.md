## generator函数
### generator函数的特点：

1、generator函数又名生成器函数，与普通函数不同，普通函数一旦调用就会执行完，但generator函数中间可以**暂停**，执行一会歇一会。(函数遇见yield暂停，需要.next()来启动)

2、函数声明时带上 * ，如 function *go(){}。函数内部使用 yield 关键字实现暂停。

3、generator函数函数执行并不会执行其代码，而是**返回一个迭代器对象**，之后调用迭代器的 next 方法，可以获得`yield`/`return`的返回值象。

![generator函数](F:\daily-note\js\ES6\generator函数.jpg)

```js
function *go(a){
    console.log(1);
    // yield语句只是个标识符，并没有返回值
    // yield左边等于等于next()传来的参数值，没传参则为undefined。yield右边的是next()的返回值。
    let b = yield a;
    console.log(2);
    let c = yield b;
    console.log(3);
    return c;
}
 
let iterator = go('aaa');
let r1 = iterator.next();   //第一次next不用传参，没有意义
console.log(r1);    //{ value: 'aaa', done: false }
let r2 = iterator.next('bbb');
console.log(r2)     //{ value: 'bbb', done: false }
let r3 = iterator.next();
console.log(r3)     //{ value: undefined, done: true }
```

**注意：**

- next()的返回值：  {value:xx, done:true/false}
- yield语句只是个标识符，并没有返回值。
- yield左边等于等于next()传来的参数值，没传参则为undefined。yield右边的是next()的返回值。
- **第二次调用`next()`的参数**会被**第一次`yield`赋值的变量接收到**
- next()返回的对象中done属性值代表当前迭代是否完成

### 用作迭代器使用

因为`Generator`对象是一个迭代器，所以我们可以直接用于`for of`循环：

> 但是要注意的是，用作迭代器中的使用，则只会作用于`yield`
>  `return`的返回值不计入迭代

```js
function * oddGenerator () {
  yield 1
  yield 2
  yield 3

  return '不会被迭代器使用'
}

for (let value of oddGenerator()) {
  console.log(value)
}
// > 1
// > 2
// > 3
```




##  async函数
async函数顾名思义就是异步函数，可以理解为是**generator的语法糖**。现在应用中异步任务更多使用基于promise与async函数的解决方案。

### async函数的几个特点:

1、使用async关键字声明函数（如：async function fn(){}）.

2、async函数默认返回一个已解决的promise对象，如果手动return其他值，函数会自动return Promise.resolve(其他值)


### await

async await是天生一对，async函数中没有出现await那就跟普通函数没什么区别，而await也只能在async函数中使用。

await“等待”，await命令后是一个promise对象，如果不是，会被转成一个resolve的promise对象。如果await后面的promise状态是reject的话会抛出异常，所以可以将await语句写在**try catch**里。

当async函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句，所以调用async函数虽然有等待, 但是并不会导致阻塞, 因为他内部的所有阻塞都封装在promise对象中异步执行.。

```js
function promiseFn(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello');
        }, 2000)
    })
}
 
//promise方式
promiseFn().then(re => {
    console.log(re);
})
 
//async await方式
async function fn(){
    let re = await promiseFn();
    console.log(re);
}
fn();
 
console.log('world')
```

实例1：

```js
function A(){
    console.log('AAAAAA');
 //  return Promise.reject('函数A 失败')
 return Promise.resolve('函数A 成功')
}
function B(){
    console.log('BBBBBB');
   // return Promise.reject('函数B 失败')
    return Promise.resolve('函数B 成功')
}

function C(){
    console.log('CCCCCC');
    return  '普通函数'
}
async function GO (){
  try{
      let result1= await A()
      console.log(result1);
      
      let result2=await B()
      console.log(result2);

      let result3=await C()
      console.log(result3);
  }catch(error){
      console.log('被caech 捕获');     
      console.log(error); 
  }
}
```

```
AAAAAA
函数A 成功
BBBBBB
函数B 成功
CCCCCC
普通函数
```

实例2：

```js
function A(){
    console.log('AAAAAA');
 //  return Promise.reject('函数A 失败')
 return Promise.resolve('函数A 成功')
}
function B(){
    console.log('BBBBBB');
    return Promise.reject('函数B 失败')
   // return Promise.resolve('函数B 成功')
}

function C(){
    console.log('CCCCCC');
    return  '普通函数'
}
async function GO (){
  try{
      let result1= await A()
      console.log(result1);
      
      let result2=await B()
      console.log(result2);

      let result3=await C()
      console.log(result3);
  }catch(error){
      console.log('被caech 捕获');     
      console.log(error); 
  }
}
```

```
AAAAAA
函数A 成功
BBBBBB
被caech 捕获
函数B 失败
```

