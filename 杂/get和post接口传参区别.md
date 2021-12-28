## [@RequestBody和@RequestParam区别](https://www.cnblogs.com/muxi0407/p/11764140.html)

- ### @RequestParam

  > params传递参数，在url可见

  Content-Type:  application/x-www-form-urlencoded

  （Http协议中，如果不指定Content-Type，则默认传递的参数就是application/x-www-form-urlencoded类型）

  RequestParam可以接受简单类型的属性，也可以接受对象类型。

  

  在java中：实质是将Request.getParameter() 中的Key-Value参数Map利用Spring的转化机制ConversionService配置，转化成参数接收对象或字段。





- ### @RequestBody

  > `data`传递参数

  content-type: application/json

  处理HttpEntity传递过来的数据，一般用来处理非Content-Type: application/x-www-form-urlencoded编码格式的数据。

  在GET请求中，不能使用@RequestBody。

  







##  axios中get请求不能传递数组类型参数，必须用QS插件

```csharp
1、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
// 输出结果：'a[0]=b&a[1]=c'
2、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
// 输出结果：'a[]=b&a[]=c'
3、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
// 输出结果：'a=b&a=c'
4、qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })
// 输出结果：'a=b,c'
```