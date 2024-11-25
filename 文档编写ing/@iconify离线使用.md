- unplugin-icons 主要是通过自动生成组件来工作

- 1.按需引入:

  ```
  import <MaterialSymbolsLight10kOutline/> from '~icons/material-symbols-light/10k-outline'
  <MaterialSymbolsLight10kOutline/>
  ```

  

- 2.自动按需引入,使用组件解析器时，必须遵循名称转换才能正确推断图标。

  也就是要下载 `unplugin-icons/resolver`自动引入组件

  ```
  vite: {
      plugins: [
        ViteComponents({
          resolvers: [
            IconsResolver({/* options */}),
          ],
        }),
      ],
    },
  ```

  







@iconify/vue

存在的问题:

1. 按需加载,减小打包体积,但需要网络连接来获取图标

2. 离线全量加载,离线使用可以避免网络依赖,但会增加您的项目体积

   上面的问题是相悖的没有适合的途径解决

