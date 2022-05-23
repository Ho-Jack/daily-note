## SourceMap 

### SourceMap 定义（MDN）

调试原始源代码会比浏览器下载的转换后的代码更加容易。 [source map](https://link.juejin.cn/?target=https%3A%2F%2Fwww.html5rocks.com%2Fen%2Ftutorials%2Fdevelopertools%2Fsourcemaps%2F) 是从已转换的代码映射到原始源的文件，使浏览器能够重构原始源并在调试器中显示重建的原始源。（通俗：将编译的代码映射成源码）



### 生成环境一般是关闭SourceMap的

source map 一般在生产环境不会部署上去的，一般都是开发环境。假如是监控系统要结合的话，应该是上传到内部服务，当生产环境报错的时候，根据相关的信息结合对应的 source map 定位到具体的问题..