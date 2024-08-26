## require.context 是什么[#](https://www.cnblogs.com/chanwahfung/p/11509155.html#346685019)

require.context 是由webpack内部实现，require.context``在构建时，webpack 在代码中进行解析。

当需要引入文件夹内多个文件模块时，可以使用 require.context 自动化批量引入，而不用手动一条一条添加。

## 参数[#](https://www.cnblogs.com/chanwahfung/p/11509155.html#1585144173)

require.context 函数接收三个参数

- **String** 读取文件夹的路径
- **Boolean** 是否遍历文件夹的子目录
- **RegExp** 匹配文件的正则

```js
//引入api文件夹下的api接口
let requireAll = require.context('./api', false, /\.js$/)
//requireAll.keys()为文件名数组（含文件扩展名）  文件的相对路径 如：./app.js; 
//requireAll(apiName)获取文件暴露的内容
const apiArr = requireAll.keys().map(apiName=> requireAll(apiName).default || requireAll(apiName))
//组合接口
//reduce汇总遍历，传入了初始值{}
let api = apiArr.reduce((prev,curr)=> Object.assign(prev,curr), {})

export default api
```

```
ruquireAllApi(apiName).default 获取的是Es6规范暴露的内容（如：export default）
ruquireAllApi(apiName) 获取的是CommonJs规范暴露的内容(如：module.exports)
```

