####  Live-server

> 具有实时重载功能的简单开发HTTP服务器。
>
> 1. 搭建临时的服务,如http-server
> 2. 修改文件浏览器自动刷新hot socketing（热拔插），如live-reload。
> 3. 浏览器自动打开项目，如opener

现在live-server实现了三个插件的所有功能，并且很简单就能启动一个看起来很专业的本地服务

- NPM全局安装

  ```shell
  npm install -g live-server
  ```

- 使用方法： (在项目目录下使用命令)

  ```shell
  live-server
  ```

- 指定端口

  ```
  live-server --port=9000
  ```

- 指定IP

  ```
  live-server --host=0.0.0.0
  ```



- `--port=NUMBER`‎- 选择要使用的端口，默认：端口 env var 或 8080‎
- `--host=ADDRESS`‎- 选择要绑定到的主机地址，默认值：IP env var 或 0.0.0.0（"任何地址"）‎
- `--no-browser`‎- 抑制自动网页浏览器启动‎
- `--browser=BROWSER`‎- 指定要使用的浏览器而不是系统默认值‎
- `--quiet | -q`‎- 抑制日志记录‎
- `--verbose | -V`‎- 更多日志记录（记录所有请求，显示所有侦听IPv4接口等）‎
- `--open=PATH`‎- 启动浏览器到PATH而不是服务器根目录‎
- `--watch=PATH`‎- 以逗号分隔的路径字符串，用于专门监视更改（默认：监视所有内容）‎
- `--ignore=PATH`‎- 要忽略的以逗号分隔的路径字符串（‎[‎任意匹配‎](https://link.zhihu.com/?target=https%3A//github.com/es128/anymatch)‎兼容的定义）‎
- `--ignorePattern=RGXP`‎- 要忽略的文件的正则表达式（即）（‎**‎弃用‎**‎以支持‎`.*\.jade``--ignore`)
- `--no-css-inject`‎- 在CSS更改时重新加载页面，而不是注入更改的CSS‎
- `--middleware=PATH`‎- .js文件导出中间件功能的路径;可以是没有路径或扩展名的名称，以引用文件夹中捆绑的中间件‎`middleware`
- `--entry-file=PATH`‎- 提供此文件（服务器根目录相对）代替丢失的文件（适用于单页应用程序）‎
- `--mount=ROUTE:PATH`‎- 在定义的路由下提供路径内容（可能多个定义）‎
- `--spa`‎- 将请求从 /abc 翻译为 /#/abc（对于单页应用程序来说很方便）‎
- `--wait=MILLISECONDS`‎- （默认为100ms）等待所有更改，然后再重新加载‎
- `--htpasswd=PATH`‎- 启用 http-auth 期望位于 PATH 的 htpasswd 文件‎
- `--cors`‎- 为任何源启用 CORS（反映请求源，支持具有凭据的请求）‎
- `--https=PATH`‎- HTTPS 配置模块的路径‎
- `--https-module=MODULE_NAME`‎- 自定义HTTPS模块（例如‎`spdy`)
- `--proxy=ROUTE:URL`‎- 代理路由到URL的所有请求‎
- `--help | -h`‎- 显示简洁的使用提示和退出‎
- `--version | -v`‎- 显示版本和退出‎