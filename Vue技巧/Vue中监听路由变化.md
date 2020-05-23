---
title: vue 监听路由变化
date: 2019-10-24 ‏‎14:32:43
tags: [Vue, 路由]
---

## vue 监听路由变化

> - **to: Route** 即将要进入的目标 路由对象
> - **from: Route**当前导航正要离开的路由

### 方法一：通过 watch

```js
// 监听,当路由发生变化的时候执行
watch:{
  $route(to,from){
    console.log(to.path);
  }
},
```
或

```js
// 监听,当路由发生变化的时候执行
watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},
```
或

```js
// 监听,当路由发生变化的时候执行
watch: {
  '$route':'getPath'
},
methods: {
  getPath(){
    console.log(this.$route.path);
  }
}
```

```js
 watch: {
    '$route' (to, from) {
      if(to.path !==  from.path){
        setTimeout(() => {
          //重新刷新valine
          this.createValine()
        }, 300)
      }

```

### 方法二：：通过 vue-router 的钩子函数

>  beforeRouteEnter   beforeRouteUpdate   beforeRouteLeave

```js
<script>
  // 引入 Tabbar组件
  import mTabbar from './components/Tabbar'
  import mTabbarItem from './components/TabbarItem'
  // 引入 vuex 的两个方法
  import {mapGetters, mapActions} from 'vuex'
 
  export default {
    name: 'app',
    // 计算属性
    computed:mapGetters([
      // 从 getters 中获取值
      'tabbarShow'
    ]),
    // 监听,当路由发生变化的时候执行
    watch:{
      $route(to,from){
        if(to.path == '/' || to.path == '/Prisoner' || to.path == '/Goods' || to.path == '/Time' || to.path == '/Mine'){
          /**
           * $store来自Store对象
           * dispatch 向 actions 发起请求
           */
          this.$store.dispatch('showTabBar');
        }else{
          this.$store.dispatch('hideTabBar');
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    },
    components:{
      mTabbar,
      mTabbarItem
    },
    data() {
      return {
        select:"Building"
      }
    }
  }
</script>
```

