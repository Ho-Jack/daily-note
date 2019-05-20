##    qc是一个增加了一些安全性的查询字符串解析和序列化字符串的库。

1. 下载   在项目中使用命令行工具输入：npm install qs
2. 安装完成后在需要用到的组件中：      import qs from  'qs’
> ###   主要的**2**个方法   **qs.parse() **   **qs.stringify()**

```js
qs.parse()         //是将URL解析成对象的形式       >对象
qs.stringify() //是将对象 序列化成URL的形式，以&进行拼接    >url
```

