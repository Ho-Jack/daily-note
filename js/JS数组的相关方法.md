---
title: 数组的相关方法总结
date: 2020-04-16  10:05:51
tags: [JS, ES6, 开发笔记]
---

## 数组的相关方法总结

### 数组的方法有数组原型方法，也有从Object对象继承来的方法，这里我们只介绍数组的原型方法，数组原型方法主要有以下这些：
join()                        数组=>字符串    返回一个新的字符串，原来的没改变
split()                      字符串=>数组     返回一个新的数组，原来的没改变

push()           (从后添加)接收任意数量的参数，逐个添加至数组末尾，返回修改后数组的长度。  
pop()          （从后删除）从数组末尾删除最后一项并返回该项  

shift()         （从前删除）与pop()类似  
unshift()     （从前添加）与push()类似  

注意：pop()和 shift() 等数组删除操作  不需要参数  直接使用即可



sort()         排序，需要传入callback函数  (**修改原数组**，返回数组的引用)  

> arr.sort( (a,b)=>(a-b) )   从小到大排序  
> arr.sort( (a,b)=>(a-b) )   从大到小排序   

reverse()      反转数组项的顺序。  
concat()      将参数添加到原数组中。（参数可以是 单个值/数组）  

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
- indexOf()是比search()更加底层，系统资源消耗更小，效率更高
- search()能使用正则表达式，匹配复杂的数据源




### 数组遍历相关方法：
forEach() （ES5新增）  
map() （ES5新增）  
filter() （ES5新增）  	
find()   
every() （ES5新增）  
some() （ES5新增）  
reduce()和 reduceRight() （ES5新增）     callback=（tmp, item, index） tmp 上次结果，item当前数，index次数1开始
（reduceRight ,从数组的末尾向前将数组中的数组项做累加)