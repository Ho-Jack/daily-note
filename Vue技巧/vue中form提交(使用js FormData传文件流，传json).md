

基础知识：

```
XMLHttpRequest 的实例有两种方式提交表单：
①使用 AJAX
②使用 FormData API
第一种方式使用AJAX最复杂的但也是最灵活和最强大。
第二种方式（ 使用 FormData API ）是最简单最快捷的，但是缺点是被收集的数据无法使用JSON.stringify()转换为一个 JSON字符串。

```

> ###### new FormData() - FormData对象的作用及用法
>
> 1. 概述
> FormData类型其实是在XMLHttpRequest 2级定义的，它是为序列化表(存储)以及创建与表单格式相同的数据（当然是用于XHR传输）提供便利。.使用FormData的最大优点就是我们可以异步上传一个`二进制文件`.AJAX 操作往往用来传递表单数据。为了方便表单处理，HTML 5新增了一个 [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData) 对象，可以用于模拟表单
>
> 2. 构造函数
> 创建一个formData对象实例有几种方式：
>
> ​          1、创建一个空对象实例:  var formData = new FormData();
>
> ​        （用关键字new调用FormData（）这个构造函数，来创建一个空对象）
>
> 此时可以调用`append()`方法来添加数据 (将普通数据转为表单数据)

```js
  onSubmit() {
      /* json格式提交： */
   // let formData = JSON.stringify(this.myForm);
/* formData格式提交： */
  let formData = new FormData();   //这是关键，用关键字new调用FormData（）这个构造函数
  for(var key in this.myForm){
    formData.append(key,this.myForm[key]);
  }
 
    axios({
    method:"post",
    url:"xxxxxxx",
    headers: {
	  "Content-Type": "multipart/form-data"
    },
    withCredentials:true,
    data:formData
}).then((res)=>{
        console.log(res);
    });
}
```



axios封装的示例：

api.js

```js
import request from '@/utils/request'
// 企业变更提交
export function PostModifyCompany(formData) {
	return request({
		url: '/v1/Company/PostModifyCompany',
		method: 'post',
		data: formData
	})
}
```

xx.vue

```js
 let formData = new FormData();   //这是关键，用关键字new调用FormData（）这个构造函数
  for(var key in this.myForm){
    formData.append(key,this.myForm[key]);
  }
PostModifyCompany(formData).then(res => {
			
			})
```

