主应用与微应用的路由设置相关问题：

1、路由模式的选择：

 主应用的路由hash模式+微应用的路由hash模式

主应用：

main.js 入口文件

```javascript
registerMicroApps([
  {
    name: 'miscoApp',  //应用名
    entry: 'http://localhost:8080',//fetch加载这个html解析里面的js（子应用必须支持跨域）
    container: '#miscoApp',//挂载微应用的dom容器
    activeRule: '#/miscoApp',//激活路径  父应用的路由为hash模式
  },
]);
start()
```

路由入口

```javascript
const router=new VueRouter({
//mode: 'hash',        
//base: process.env.BASE_URL,   //hash 模式下的 base 参数不支持添加 hash 路径 base。
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
     {
      path: '/miscoApp',  //加载微应用 
      name: 'miscoAppHome',
      component: Home
    },
     {
      path: '/miscoApp/about',//加载微应用  about路由
      name: 'miscoAppAbout',
      component: Home
    },
   ] 
})
```

微应用：

> 作为微应用被主应用加载时，微应用的路由应该和主应用加载微应用的路由一致

路由入口

```javascript
const router=new VueRouter({
//mode: 'hash',        
//base: process.env.BASE_URL,  //hash 模式下的 base 参数不支持添加 hash 路径 base。
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
     {
      path: '/miscoApp',  //作为微应用的路由  加载首页
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
    },
     {
      path: '/miscoApp/about', //作为微应用的路由 加载about路由
      name: 'about',
    },
   ] 
})
```

