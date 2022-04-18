1. 用npm init 命令初始化一个package.json文件

> 使用`npm init -y`这个命令来一次生成package.json文件,不会咨询太多问题



2. 安装webpack

   > webpack 在 4 以后就支持 0 配置打包

   ```
   npm install webpack webpack-cli --save-dev  // 安装本地项目模块
   ```

3. webpack配置

   > webpack 在 4 以后就支持 0 配置打包

   - 根路径下新建一个配置文件 `webpack.config.js`

   - 新增基本配置信息

     ```javascript
     const path = require('path')
     
     module.exports = {
       mode: 'development', // 模式
       entry: './src/index.js', // 打包入口地址
       output: {
         filename: 'bundle.js', // 输出文件名
         path: path.join(__dirname, 'dist') // 输出文件目录
       }
     }
     ```

4. 打包

   > webpack 在 4 以后就支持 0 配置打包
   >
   > 入口文件必须在src下
   >
   > 打包会过滤没有使用过的函数和变量

   - 全局下载webpack打包命令

     ```
     webpack 
     ```

   - 本地环境下载webpack打包命令

     ```
     npx webpack
     ```

     







