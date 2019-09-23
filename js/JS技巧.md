---
title: JS技巧
date: 2019-9-20 00:00:00
tags: [JS, 开发笔记]
---

JS 技巧

1、不要使用隐式类型转换 （使用===而不是==）

JavaScript是一种松散类型的语言。如果使用得当，这是一个好处，因为它给你带来了灵活性。

①大多数运算符 +-*/==(不包括 ===)在处理不同类型的操作数时会进行隐式转换。

②语句 **if（condition）{...}， while（condition）{...} ** 隐式地将条件转换为布尔值。

```js
console.log("2" + "1");  // => "21"	  console.log("2" - "1");  // => 1	

console.log('' == 0);    // => true	  console.log(true == []); // -> false	

console.log(true == ![]); // -> false
```

方案：

①始终使用严格的 全等  ===  或者 不全等 ！== 进行比较

②不要使用松散等式运算符 相等  ==  或 不想等 ！=

③加法运算符 operand1+operand2：两个操作数应该是数字或字符串

④算术运算符 -*/％**：两个操作数都应该是数字

⑤if（condition）{...}， while（condition）{...}等语句： condition 必须是一个布尔类型值



2、不要使用早期的JavaScript技巧

查看数组是否包含某个元素：

ES6 中可以使用 array.includes(item)  来代替 array.indexOf(item)!== -1

 

3、不要污染函数作用域

通过引入具有块作用域 let和 const，应该尽可能地限制变量的生命周期。

```js
// 不好	
let message;  if (notFound) {	  message = 'Item not found';	}
let item;     for (item of array) {   }	
// 好	
if (notFound) {	 const message = 'Item not found';	}
for (const item of array) { }
```



4、Undefined  null  0  false  NaN    ’’（空字符串）都被视为false。

5、创建对象构造函数

```js
function Person(firstName, lastName){
        this.firstName =  firstName;
        this.lastName = lastName;    
}
  var Saad = new Person("Saad", "Mousliki");
```

 6、小心使用typeof、instanceof和constructor

typeof：不要忘了typeof null返回object，而大多数对象，typeof(Array, Date, and others)也将返回object

constructor：内部原型属性，可以被覆盖

instanceof：JavaScript的一个用于检查构造函数的原型链的操作符

```js
var arr = ["a", "b", "c"];
typeof arr;   // return "object"
arr  instanceof Array   // true
arr.constructor();     //[]
```

7、创建一个自执行函数

```js
(function(){
       // some private code that will be executed automatically
})();

(function(a,b){
        var result = a+b;
        return result;
})(10,20)

!function(){      
   //doSomething
}()
```

8、随机获取一个数组项

```js
var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119];
var  randomItem = items[Math.floor(Math.random() * items.length)];
```

9、在特定范围内获取一个随机数

```js
x = Math.floor(Math.random() * (max - min + 1)) + min;
```

10、从数字0到最大值之间获取一个数字数组

```js
var numbersArray = [] , max = 100;
for( var i=1; numbersArray.push(i++) < max;);  // numbers = [0,1,2,3 ... 100]
```

11、生成一个随机字符串

```js
function generateRandomAlphaNum(len) {
   var rdmstring = "";
for( ; rdmString.leng<len; rdmString += Math.random().toString(36).substr(2));
        return  rdmString.substr(0, len);
}
```

12、打乱一个数字数组的元素顺序

```js
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers = numbers.sort(function(){ return Math.random() – 0.5});
```

13、String的trim函数

```js
String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};
```

14、将一个数组附加到另一个数组

```js
var array1 = [12 , "foo" , {name: "Joe"} , -2458];
var array2 = ["Doe" , 555 , 100];
Array.prototype.push.apply(array1, array2);
/* array1 will be equal to  [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */
```

15、将arguments对象转换成一个数组

```js
var argArray = Array.prototype.slice.call(arguments);
```

16、验证参数是否是number类型

```js
function isNumber(n){
   return !isNaN(parseFloat(n)) && isFinite(n);
}
```

17、验证参数是否是数组

```js
function isArray(obj){
     return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

 注意，toString()方法被重写，使用这个技巧将得不到期望的结果了。或者可以这样：

​       **Array.isArray(obj); **                   // 这是一个新的array的方法

如果你不在使用多重frames的情况下，你还可以使用 instanceof 方法。但如果你有多个上下文，你就会得到错误的结果。

```js
var myFrame = document.createElement('iframe');
 document.body.appendChild(myFrame);
 var myArray = window.frames[window.frames.length-1].Array;
var arr = new myArray(a,b,10);   // [a,b,10]
arr instanceof Array; // false
```

instanceof将无法正常工作，MyArray将失去其构造函数,构造函数在'iframe'之间不共享  

18、获取数字数组中的最大值和最小值

```js
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
var maxInNumbers = Math.max.apply(Math, numbers);
var minInNumbers = Math.min.apply(Math, numbers);
```

 19、清空一个数组

```js
var myArray = [12 , 222 , 1000 ];
   myArray.length = 0; // myArray 将会等于 [].
```

 20、不要使用delete去删除一个数组项

使用 split 而不要使用 delte 来删除数组中的某个项。

使用 delete 只是用 undefined 来替换掉原有的项，并不是真正的从数组中删除。

21、使用 length 来截短一个数组 

跟上面的清空数组的方式类似，我们使用 length 属性来截短一个数组。

```js
var myArray = [1, 2, 3, 3, 4, 5];
myArray.length = 4;      //    [1, 2, 3, 4].
```

将一个数组的 length 设置成一个比现在大的值，那么这个数组的长度就会被改变，会增加新的 undefined 的项补上。 数组的 length 属性是可读写的。

```js
myArray.length = 10;    // 新数组的长度是10
myArray[myArray.length - 1] ;   // undefined
```

 22、在条件中使用逻辑运算符:AND、OR

```js
var foo = 10;
foo == 10 && doSomething(); // 等价于 if (foo == 10) doSomething();
foo == 5 || doSomething(); // 等价于 if (foo != 5) doSomething();
```

OR可以用于给函数设置默认参数

```js
function doSomething(arg1){
       Arg1 = arg1 || 10;   // 如果arg1没有被设置的话，Arg1将被默认设成10
}
```

 23、使用 map() 方法来遍历一个数组里的项（ 返回新数组，return）

```js
var squares = [1,2,3,4].map(function (val) {
   return val * val;   
});     //[1,4,9,16]
```

24、保留小数位

```js
var num =2.443242342;
num = num.toFixed(4);  // 2.4432
```

 25、浮点数问题

```js
0.1 + 0.2 === 0.3      // is false
9007199254740992 + 1   // 9007199254740992
9007199254740992 + 2   // 9007199254740994
```

为什么是false？0.1+0.2等于0.30000000000000004。

所有的JavaScript数字在内部都是以64位二进制表示的浮点数，符合IEEE 754标准.

解决方案：① toFixed()       数字转换为字符串，结果的小数点后有指定位数的数字 

​             ② toPrecision()   数字格式化为指定的长度

26、使用for-in遍历一个对象内部属性的时候注意检查

下面的代码片段能够避免在遍历一个对象属性的时候访问原型的属性

```js
for (var name in object) {
     if (object.hasOwnProperty(name)) {
        // do something with name
    }
}
```

27、逗号运算符

逗号运算符的特性及作用：逗号运算符的作用是将若干表达式连接起来。

它的优先级是所有运算符中最低的，结合方向是自左至右

 逗号表达式：
①一般形式：表达式1，表达式2，表达式3，......表达式n

   ②求解过程：先计算表达式1的值，再计算表达式2的值，......一直计算到表达式n的值。最后整个表达式的值是表达式n的值。 

```js
var a = 0;
var b = ( a++, 99 );
console.log(a);    // 1
console.log(b);   //99
```

28、缓存需要查询或计算的变量

querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。

```js
var navright = document.querySelector('#right');
var navleft = document.querySelector('#left');
var navup = document.querySelector('#up');
var navdown = document.querySelector('#down');
```

29、将参数传给isFinite()之前要验证

isFinite()函数用来判断被传入的参数值是否为一个有限数值

```js
isFinite(0/0) ;    // false
isFinite("foo");   // false
isFinite("10");    // true
isFinite(10);      // true
isFinite(undifined);  // false
isFinite();        // false
isFinite(null);     // true  !!!
```

  30、避免数组中的负索引

```js
var arr= [1,2,3,4,5];
var from = arr.indexOf("foo") ;    //  -1
arr.splice(from,2);                // [5]
```

 31、对JSON进行序列化和反序列化

```js
var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} };
var stringFromPerson = JSON.stringify(person);
// {"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}"   
var personFromString = JSON.parse(stringFromPerson);
```

 32、避免使用eval()和Function()构造函数

使用 eval 和 Function 构造函数是非常昂贵的操作，因为每次他们都会调用脚本引擎将源代码转换成可执行代码。

```js
var func1 = new Function(functionCode);
var func2 = eval(functionCode);
```



 33、避免使用with

使用 with() 会插入一个全局变量。因此，同名的变量会被覆盖值而引起混淆。

(不建议使用with语句，因为它可能是混淆错误和兼容性问题的根源)

34、避免用for-in循环一个数组，索引顺序很重要（数组索引只是具有整数名称的枚举属性，并且与通用对象属性相同。）

不要这么使用

```js
var sum = 0;
for (var i in arrayNumbers) {
   sum += arrayNumbers[i];
} 
```

有更好的方式

```js
var sum = 0;
for (var i = 0, len = arrayNumbers.length; i < len; i++) {
  sum += arrayNumbers[i];
}
```

 for ...in  用来遍历一个对象的全部属性



  35、传函数给setTimeout()和setInterval()而不是字符串

如果你将字符串传递给 setTimeout() 或者 setInterval()，这个字符串将被如使用 eval 一样被解析，这个是非常耗时的。不要使用：

```js
setInterval('doSomethingPeriodically()', 1000);

setTimeOut('doSomethingAfterFiveSeconds()', 5000)
```

setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。

setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

 

36、使用 switch/case 语句，而不是一系列的 if/else

在2中情况以上的时候，使用 switch/case 更高效，而且更优雅（更易于组织代码）。

但在判断的情况超过10种的时候不要使用 switch/case。

```js
switch(n)
{
case 1:
    执行代码块 1
     break;
case 2:
      执行代码块 2
break;
default:
    n 与 case 1 和 case 2 不同时执行的代码
}
```

switch/case中对条件的判断使用的是恒等“===”，

因此在进行条件判断时不会对比较的值进行任何的类型转换。

 

 37、为创建的对象指定prototype

写一个函数来创建一个以指定参数作为prototype的对象是有可能：

```js
function clone(object) {
    function OneShotConstructor(){};
    OneShotConstructor.prototype= object;
    return new OneShotConstructor();
}

clone(Array).prototype ;  // []
```



 

 38、HTML转义函数

```js
function escapeHTML(text) {
    var replacements= {"<": "<", ">": ">","&": "&", "\"": """};
    return text.replace(/[<>&"]/g, function(character) {
    return replacements[character];
    });
}
```



 39、避免在循环内部使用try-catch-finally

在运行时，每次当 catch 从句被执行的时候，被捕获的异常对象会赋值给一个变量，而在 try-catch-finally 结构中，每次都会新建这个变量。

不要这样用：

```js
var object = ['foo', 'bar'], i;
for (i = 0, len = object.length; i <len; i++) {
    try {
        // do something that throws an exception
    }
    catch (e) {
       // handle exception 
       }
} 
```



而是这样子用

```js
var object = ['foo', 'bar'], i;
try {
    for (i = 0, len = object.length; i <len; i++) {
        // do something that throws an exception
    }
}catch (e) {
    // handle exception
}
```



  40、给XMLHttpRequests设置超时

```js
var xhr = new XMLHttpRequest ();
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        clearTimeout(timeout);
        // do something with response data
   }
}
var timeout = setTimeout( function () {
     xhr.abort();    // call error callback
}, 60*1000            /* timeout after a minute */ );
xhr.open('GET', url, true);
xhr.send();
```



 42、处理WebSocket超时

通常当WebSocket连接建立的时候，如果30秒内没有活动，服务器将暂停连接，同样的道理，防火墙也会暂停连接。

为了防止超时的问题，你可能需要间隔地向服务器端发送空消息。要这样做的话，你可以在你的代码里添加下面的两个函数：一个用来保持连接，另一个用来取消连接的保持。通过这个技巧，你可以控制超时的问题。

```js
var timerID = 0;function keepAlive() {
   var timeout = 15000;
   if (webSocket.readyState == webSocket.OPEN) {
       webSocket.send('');
   }
    timerId = setTimeout(keepAlive, timeout);
}
function cancelKeepAlive() {
    if (timerId) {
       cancelTimeout(timerId);
    }
}
```

keepAlive()方法应该被添加在webSOcket连接的 onOpen() 方法的最后，而 cancelKeepAlive() 添加在 onClose() 方法的最后。

43、牢记，原始运算符始终比函数调用要高效。

举例来说，不使用：

```js
var min = Math.min(a,b);   
A.push(v);
```

而用：

```js
var min = a < b ? a b;   
A[A.length] = v;
```

44、当编码的时候，要保持代码整洁。上线之前对代码进行压缩。

**万物皆对象**

在JavaScript的世界，万物皆对象。除了null和undefined，其他基本类型数字，字符串和布尔值都有对应有包装对象。对象的一个特征是你可以在它身上直接调用方法。

对于数字基本类型，当试图在其身上调用toString方法会失败，但用括号括起来后再调用就不会失败了，内部实现是用相应的包装对象将基本类型转为对象。所以(1).toString()相当于new Number(1).toString()。因此，你的确可以把基本类型数字，字符串，布尔等当对象使用的，只是注意语法要得体。

同时我们注意到，JavaScript中数字是不分浮点和整形的，所有数字其实均是浮点类型，只是把小数点省略了而以，比如你看到的1可以写成1.，这也就是为什么当你试图1.toString()时会报错，所以正确的写法应该是这样：1..toString()，或者如上面所述加上括号，这里括号的作用是纠正JS解析器，不要把1后面的点当成小数点。内部实现如上面所述，是将1.用包装对象转成对象再调用方法。