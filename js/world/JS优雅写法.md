掘金收藏夹内

### 1、 判断为空

- 直白写法

```js
    if(a == undefined) a = [];
    
    if(params.success){
        params.success(res);
    }

```

- 优雅写法

```js
     a = a || [];           
    
    params.success&&params.success(res);        
    //注意事项
    1、if内不能出现var、=等赋值定义语句，才可以使用优雅写法
    2、if内可以有多个方法调用，但必须方法内有true返回值（此用法意义不大）
```

问题：我们编写js代码时经常遇到复杂逻辑判断的情况，通常大家可以用if/else或者switch来实现多个条件判断，但这样会有个问题，随着逻辑复杂度的增加，代码中的if/else/switch会变得越来越臃肿，越来越看不懂.

### 2、多条件判断

- 小白写法

```js
var Statistics = function(){
  console.log('执行')
}
switch (currentTab) 
{
   case 0:
       Statistics();
       break;
  case 1:
     Statistics();
       break;
   case 2:
       Statistics();
     break;
    case 3:
     Statistics();
     break;
}
```
* 优雅写法

```js
//将判断条件作为对象的属性名，将处理逻辑作为对象的属性值
var Statistics = function(){
  console.log('执行')
}
const comparativeTotles = new Map([
    [0,Statistics],
    [1,Statistics],
    [2,Statistics],
    [3,Statistics]
 ])
let map = function(val){
      return comparativeTotles.get(val)
} 
let getMap  = map(1); //如果查找不到返回undefined
if(!getMap){
      console.log('查找不到')
}else{
    concaozuole.log('执行操作')
      getMap()
}
```
* if else

```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开票中 2开票失败 3 开票成功 4 商品售罄 5 有库存未开团
 * @param {string} identity 身份标识：guest客态 master主态
 */
const onButtonClick = (status, identity) => {
  if (identity == 'guest') {
    if (status == 1) {
      //函数处理
    } else if (status == 2) {
      //函数处理
    } else if (status == 3) {
      //函数处理
    } else if (status == 4) {
      //函数处理
    } else if (status == 5) {
      //函数处理
    } else {
      //函数处理
    }
  } else if (identity == 'master') {
    if (status == 1) {
      //函数处理
    } else if (status == 2) {
      //函数处理
    } else if (status == 3) {
      //函数处理
    } else if (status == 4) {
      //函数处理
    } else if (status == 5) {
      //函数处理
    } else {
      //函数处理
    }
  }
}

```

* 改完后

  ```js
  //利用数组循环的特性，符合条件的逻辑都会被执行，那就可以同时执行公共逻辑和单独逻辑。
  const functionA = ()=>{/*do sth*/}       // 单独业务逻辑
  const functionB = ()=>{/*do sth*/}       // 单独业务逻辑
  const functionC = ()=>{/*send log*/}   // 公共业务逻辑
  const actions = new Map([
      ['guest_1', () => { functionA }],
      ['guest_2', () => {  functionB }],
      ['guest_3', () => { functionC }],
      ['guest_4', () => { functionA }],
      ['default', () => { functionC  }],
      //...
  ])
   
  /**
   * 按钮点击事件
   * @param {string} identity 身份标识：guest客态 master主态
    * @param {number} status 活动状态：1开票中 2开票失败 3 开票成功 4 商品售罄 5 有库存未开团
   */
  const onButtonClick = (identity, status) => {
    let action = actions.get(`${identity}_${status}`) || actions.get('default')
    action.call(this)
  }
  
  ```

  