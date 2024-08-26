## vue router API

- createRouter 创建路由

  ```scss
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  router.beforeEach(...)
  router.afterEach(...)
           
  
  vue.use(router)
  ```

- createWebHashHistory  hash 路由

- createWebHistory history 路由

- createMemoryHistory  带缓存 history 路由

- parseQuery  查询参数反序列化

- stringifyQuery 查询参数序列化

- onBeforeRouteLeave 路由离开钩子

  

  to 目标路由信息

  from 当前路由信息

  next 跳转函数

  

- useRoute 返回当前路由， 子属性都被ref包装

  

  path

  name

  params

  query

  hash

  fullpath

  matched

  meta

  redirectedFrom

  

- useRouter 返回路由实例

  

  currentRoute 返回当前路由 , 非ref

   ```
  fullPath: string;
  
  query: LocationQuery;
  
  hash: string;
  
  redirectedFrom: RouteLocation | undefined;
   ```

  

  addRoute 动态添加路由

  removeRoute 动态删除路由

  hasRoute

  getRoutes 获取路由配置, 替换原 3.0 routes 属性

  push 路由跳转

  replace 路由重定向

  resolve 解析目标路由

  beforeEach 全局路由守卫,  路由跳转前

  afterEach 全局路由守卫, 路由跳转后台

  onError 报错监听

  isReady 路由是否初始话， 返回Promise,  替代原3.0 onReady

  history 路由执行器

  install vue插件安装器



- useLink 自定义路由跳转函数, 接受一个路由配置，并返回路由信息及执行回调

  - route 路由对象
  - href  目标地址
  - isActive 是否被激活
  - isExactActive
  - navigate 跳转回调

  ```php
  const { route, href, isActive, isExactActive,navigate } = useLink({ to: '/sub', from :'/sub' }) 
  ```

- Link  router-link 组件， 私有属性

- View  router-view 组件， 私有属性

- START_LOCATION  起始路由

- NavigationFailureType  故障类型

### 总结

将路由拆分为 hash， history，memory history 三种路由形式.  将类的创建方式改为函数式。 除去个别修改例如： isReady， 总体的 API 结构没有太大变化，最大化减少了学习成本.

