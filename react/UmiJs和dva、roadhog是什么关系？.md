UmiJs和dva、roadhog是什么关系？

- **roadhog** 是基于 webpack 的封装工具，目的是简化 webpack 的配置
- **umi** 可以简单地理解为 roadhog + 路由，思路类似 next.js/nuxt.js，辅以一套插件机制，目的是通过框架的方式简化 React 开发
- **dva** 目前是最纯粹的数据流，和 umi 和 roadhog 之间并没有相互的依赖关系，可以分开使用也可以一起使用。
