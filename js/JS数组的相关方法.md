---
title: 数组的相关方法总结
date: 2020-04-16  10:05:51
tags: [JS, ES6, 开发笔记]
---

## 数组的相关方法总结

### 数组的方法有数组原型方法，也有从Object对象继承来的方法，这里我们只介绍数组的原型方法，数组原型方法主要有以下这些：
`join() `              数组=>字符串    返回一个新的字符串，原来的没改变
`split() `                     字符串=>数组     返回一个新的数组，原来的没改变

`push()`           (从后添加)接收任意数量的参数，逐个添加至数组末尾，返回修改后数组的长度。  
`pop()`          （从后删除）从数组末尾删除最后一项并返回该项  

`shift()`         （从前删除）与pop()类似  
`unshift()`     （从前添加）与push()类似  

注意：pop()和 shift() 等数组删除操作  不需要参数  直接使用即可



`sort()`        排序，需要传入 callback函数  (**修改原数组**，返回数组的引用)  

> arr.sort( (a,b)=>(a-b) )   从小到大排序  
> arr.sort( (a,b)=>(a-b) )   从大到小排序   

reverse()      反转数组项的顺序。 (修改原数组) 
arr/str.concat()      将参数添加到原数组中。（参数可以是 单个值/数组）  

截取字符串:  （3个中只有slice()可以用在数组的截取，**截取不会修改原来的**，返回截取的字符串）  
substr(start [, length ])                   返回一个从指定位置开始的指定长度的子字符串。  
substring(开始索引，结束索引)     返回起始和结束位置之间的项（不包括结束位置的项）  

arr/str.slice(开始索引，结束索引)               返回起始和结束位置之间的项（不包括结束位置的项）参数可以  是负数  

arr.splice(索引，删除数量，插入元素)      数组增/删/改，返回被删除/替换的元素。  (**修改原数组**)

查询字符串
arr/str.indexOf()和arr/str.lastIndexOf() （ES5新增）  返回第一次/最后一次的索引，不存在返回-1
arr/str.includes()    判断是否给定值，返回布尔  
str.startWith()    判断是否以xx开始，返回布尔
str.endWith()     判断是否以xx结束，返回布尔

str.toUpperCase()                                  将一个字符串转换为大写并返回
str.toLowerCase()                                  将一个字符串转换为小写并返回
str.replace("正则/字符串","新内容")        将匹配的内容替换，返回新的字符串（不修改原字符串）
str.match("正则/字符串")                        将匹配的内容封装到数组，返回数组
str.search("正则/字符串")                       返回首次出现的索引，没有返回-1

#### search()与indexOf()区别         includes？
- str.search("正则/字符串")                       返回首次出现的索引，没有返回-1
- arr/str.indexOf()（ES5新增） 返回首次出现的索引，没有返回-1  
- arr/str.indexOf()是比search()更加底层，系统资源消耗更小，效率更高
- search()能使用正则表达式，匹配复杂的数据源

#### indexOf()和includes()的区别

- arr/str.indexOf() 返回首次出现索引，不存在返回-1   
- (false   -1）
-   (true    !-1)
- arr/str.includes()返回布尔值



### 数组遍历相关方法：

- `Array.forEach(callback)`         遍历数组中的每一项 (ES5新增)

  > 没有返回值，对原数组没有影响（可以用数组方法改变数组）
  >
  > 无法中途跳出循环，break命令无效,只能用return退出本次回调，进行下一次回调。  

```javascript
var arr = [12, 4, 8, 9]
var result = arr.forEach(item => console.log(item))
```

- `Array.map(callback)` 映射 一个对一个  （ES5新增）

  > 有返回值，返回新的数组，对原数组没有影响（原数组克隆一份来遍历）
  >
  > return映射每项，无返回值，该项为undefined

  ```javascript
  let score = [18, 86, 88, 24]
  let resul = score.map(item => item >= 60 ? '及格' : '不及格')
  [ '不及格', '及格', '及格', '不及格' ]
  ```

- `Array.filter(callback)`     过滤器   （ES5新增）  

  > 有返回值，返回新的数组
  >
  > 保留返回值为true的项  

  ```javascript
  var arr = [12, 4, 8, 9]
  var result = arr.filter(item => (item % 3 === 0) ? true :false)
  [12,9]
  ```

- `Array.find(callback)`

  > 有返回值,返回`数字成员`/`undefined`
  >
  > 找到到第一个符合条件的数组成员返回,没有则返回undefined
  >
  > (return  true  就返回当前item， return false 则查找下一个)

  ```javascript
  let arr = [1, 2, 3, 4]
  let result=arr.find(item => item > 2)
  //result   3   
  ```

- `Array.findIndex(callback)`

  > 有返回值，返回`index`/`-1`
  >
  > 返回找到第一个符合条件的数组成员的index，找不到返回-1

  ```javascript
  let arr = [1, 2, 3, 4]
  let result1 = findIndex(item => item > 2) 
  let result2 = findIndex(item => item > 4) 
  //result1   3
  //result3   -1
  ```

- `Array.some(callback)`

  > 有返回值，返回`Boolean值`
  >
  > 检测`任一元素`是否满足条件，并返回`Boolean值`。
  >
  > 如果有一个元素满足条件，则返回true , 不再执行。如果没有满足条件的元素，则返回false。
  >
  > (任一返回true 则返回true)

  ```javascript
  let arr = [1, 2, 3, 4]
  let result1 = some(item => item > 2) 
  let result2 = some(item => item > 4) 
  //result1   true
  //result2   false
  ```

- `Array.every(callback)`

  > 有返回值，返回`Boolean值`
  >
  > 检测`所有元素`是否满足条件，并返回`Boolean值`。
  >
  > 如果有元素不满足条件，则返回false , 不再执行。如果所有满足条件的元素，则返回true。
  >
  > (全部返回true 则返回true)

  ```javascript
  let arr = [1, 2, 3, 4]
  let result1 = every(item => item > 0) 
  let result2 = every(item => item > 2) 
  //result1   true
  //result2   false
  ```

- `Array.reduce(callback[, initialValue])`   汇总 (合并为一个值)

  > 有返回值，返回最后一次遍历的值
  >
  > initialValue （设置【上次结果】的初始值）
  >
  >  callback =（tmp, item, index） tmp 上次结果，item当前数，index次数1开始
  >
  > 用于 求总数，算个平均

  ```javascript
  //求平均值
  var arr = [1, 3, 5, 7]
  var result = arr.reduce( (tmp, item, index) => {
      if (index != arr.length - 1) { // 不是最后一次
          return tmp + item
      } else {      
          return (tmp + item)/arr.length
      } 
  })
  ```

- `Array.reduceRight (callback[, initialValue])`  

  > reduceRight ,从数组的末尾向前将数组中的数组项做累加

- `for...of`

  > 遍历数组的 value
  >
  > 适用范围：Array、String、Set、Map （还可以遍历 迭代器对象Array Iterator {}）

  ```javascript
  const arr = ["a", "b", "c", "d"]; 
  for (let item of arr) {
   console.log(item); // a b c d 
  }
  ```

- `for...in`

  > 遍历key值。 数组：遍历index值   对象：遍历属性值key
  >
  > 适用范围：Array、Object、String
  > 点评：会枚举原型属性，就是说会遍历来自继承对象的可枚举属性(数组别用)

  ```javascript
  //遍历对象的 key
  const data = { key1: "a", key2: "b", key3: "c" };
  for (let key in data) {
  console.log(key);          // key1 key2 key3 
  console.log(data[key]);   // a b c 
  }
  
  //遍历数组的 index/key
  const data = ["a", "b", "c", "d"];
  for (let index in data) {
  console.log(index);    // 0 1 2 3 
  }
  ```

  ### 扩展：

  数组的3个方法，均返回 Array的迭代器对象

  - `Array.keys() `  

    > 遍历数组键名

  - `Array.values()`

    > 遍历数组键值

  - `Array.entries()`   

    > 遍历数组键名和键值

  ```javascript
  let arr=[1,2,3,4]
  let obj=arr.entries()
  console.log(obj)        //Array Iterator {} 这是一个迭代器对象  不能正常打印
  console.log([...obj]);  //能打印出对象数组
  ```

  说明： 迭代器对象可以被 for...of 遍历  扩展运算符(...)也可以使用

  数组方法entries()可以用于访问迭代项的索引。

  该方法在每次迭代时返回一对 [index，item]。

  就地解构是 for...of 的另一个重要功能



### 对象的方法：

返回遍历后的数组

- `Object.keys(xx)`

- `Object.values(xx)`





##### 数组扁平化 

- flatten

>Array.isArray()   判断一个值是否数组，返回布尔

```javascript
function flatten(arr) {
      return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
      }, []);
}
```

- `Array.flat(Infinity)`          ES6

  > 会递归到指定深度将所有子数组连接，并返回一个新数组, depth指定嵌套数组中的结构深度，默认值为1，不管多少层则可以用Infinity关键字作为参数。

  ```javascript
  let arr = ['a', 2, [3, 'b', 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
  console.log(arr.flat(Infinity)) //["a", 2, 3, "b", 5, 6, 7, 8, 9, 10, 11, 12, 13]
  ```

  