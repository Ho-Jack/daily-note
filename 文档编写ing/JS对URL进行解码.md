三种编码和解码函数：

encodeURI和 decodeURI

它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。

需要注意的是，它不对单引号’编码。

encodeURIComponent和decodeURIComponent（推荐使用）

它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。

因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码

escape 和 unescape

对除ASCII字母、数字、标点符号 @ * _ + - . / 以外的其他字符进行编码。





###  在axios中get请求直接写params上会对中文自动加密

```js
export const ApiDemo = (parmas) =>{
 return  axios({
    url:'/api/v1',
    method:'get',
    params
 })
}
```

