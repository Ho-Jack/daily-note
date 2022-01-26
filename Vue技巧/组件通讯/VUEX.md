---
title: Vuex知识要点
date: 2019-04-11 04:00:00
tags: [VUE, 开发笔记]
---

## Vuex 知识

*  ### 基础知识总结

  > store( state、mutations、actions、getters)

* state 用来数据共享数据存储                       

  ```js
  $store.state.xxx  
  ```

* mutation 用来注册改变数据状态（**同步**）          

  ```
   $store.commit( "mutation名称 ")
  ```

* action 解决异步改变共享数据**( 异步/同步 )**                

  ```js
  $store.dispatch("action名称" ，data)
  $store.dispatch("user/login" ，data)  
  // 'user/login' (modules中user下的login) 
  ```

* getters 用来对共享数据进行过滤操作（计算属性）

  ```js
  $store.getters.xx    
  ```
  
  (在js文件中 引入store文件 然后直接  store.dispach 不用写$ )  

>在组件中分发 state、mutations 、actions 、getters
>* **...mapActions([   '你要获取的actions名字'   ])**，你传入什么，就会返回一个包含对应的actions的对象，通过...对象扩展运算符，将返回值解析就成为methods的属性，和平常的方法一样调用即可
>
>  **mapActions**、**mapMutations**、   **①**必须先引用   **②**且要放在 **methods**中。  
>
>  **mapState、mapGetters **              **①**必须先引用 **②**并且放在**computed**中   
```js
import { mapActions } from 'vuex'   //引用
export default {
 // ...
    methods: {
        ...mapActions([
         'increment',  
 // 将 this.increment() 映射为  this.$store.dispatch('increment') 
 // `mapActions` 也支持载荷：
         'incrementBy'
// 将this.incrementBy(amount)  映射为  this.$store.dispatch('incrementBy', amount)
        ]),
        ...mapActions({
            add: 'increment'  // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        })
    }}
```
```js
<span>{{user}}</span>

import { mapState } from 'vuex'   //引用
computed: {
    ...mapState({
    user: state => state.user.XX,
   })
}
//只要vuex里面的user.xx发生变化就能监控到

```



1. 
```js
const state ={
    AA: ' '
}
const  mutations={
    BB(state,{对象1}){    
        state.AA=对象1.xx //更新state的操作
    }
}
const actions ={
    CC({commit,state},对象1){
        commit(BB,{对象1})    //触发mutations里的BB函数
    }
}
const getters ={
    DD(state){
        return  state.AA
}
const getters  ={
    DD：state=>state.AA
}
```

2. 
```js
const moduleA = {
    state: {...},
    mutations: {...},
    actions: {...},
    getters: {...}
}
const moduleB = {
    state: {...},
    mutations: {...},
    actions: {...},
}
const store =new Vuex.Store({
                modules:{
                a:moduleA,
                b:moduleB
               }
            })
  export default store
    store.state.a.XX      //  获取moduleA
    store.state.b.XX      //  获取moduleB    
```



* ### 项目中的使用实例

  1. 在store文件夹下创建 index.js   (这是配置vuex的入口)

     ```js
     import Vue from 'vue'
     import Vuex from 'vuex'
     import user from './user'  //包含state、mutations、actions、getter的modules
     Vue.use(Vuex)
     
     export default new Vuex.Store({
           modules: {
             user,   //store.state.user  获取user的状态
         }
     })
     ```

     2. 在store文件夹下创建 user.js

     ```js
     import Vue from 'vue'
     export const USER_SIGNIN = 'USER_SIGNIN' //登录成功     向外导出这个方法
     export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录   向外导出这个方法
     export default {
         state: JSON.parse(sessionStorage.getItem('userInfo')) || {},
         mutations: {
             [USER_SIGNIN](state, userInfo) {
                 sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                 sessionStorage.setItem('token', userInfo.token);
                 Object.assign(state, userInfo)
             },
             [USER_SIGNOUT](state) {
                 sessionStorage.clear();
                 console.log('state ', Object.keys(state));
                 Object.keys(state).forEach(k => Vue.delete(state, k))
             }
         },
         actions: {
             [USER_SIGNIN]({ commit }, userInfo) {
                 commit(USER_SIGNIN, userInfo)
             },
             [USER_SIGNOUT]({ commit }) {
                 commit(USER_SIGNOUT)
             }
         }
     ```

     3.  main.js入口文件

        ```js
        import store from './store/'   //结尾还有一个 / 这是寻找到store文件夹下的index.js入口文件
        new Vue({
            store,
        }
        ```
     

     

4.使用

```js
        import {  mapActions} from 'vuex'
        import { USER_SIGNIN} from 'store/user'
        methods: {
            ...mapActions([USER_SIGNIN]),
            login() {
                this.$refs.loginModel.validate((valid) => {
                    if (valid) {
                        let params = {
                            username: this.loginModel.username,
                            password: this.loginModel.password,
                            mark :true
                            //captcha: this.loginModel.captcha
                        };
                        this.$api.post('/login', params, (data, isOK, message) => {
                            if (!isOK) {
                                this.$api.error(message)
                                return false
                            }
        //记录记住用户名和密码
               localStorage.setItem('autologin',this.loginModel.autologin)
               localStorage.setItem('username', this.loginModel.username)
               localStorage.setItem('password', this.loginModel.password)
                            let userInfo = data;
                            //保存用户登录信息，共享到state
                            this.USER_SIGNIN(userInfo)
                            this.$router.push("/bmManagement/page")
                        })
                    } else {
                        console.log('error submit!!')
                        return false;
                    }
                });
            },
```



  ```js
 computed: {
    //对象写法
    ...mapState({
    user: state => state.user,//从全局存储里取出当前登录用户信息
    menuTabList: state => state.menuTab.menuTabList,//从全局存储里取出当前打开的菜单tab
   })
    //数组写法
   ...mapState([  'user',  'menuTabList'  ])
}
  ```

```js
computed: {
      ...mapGetters([ 'singer'  ]),
      }
      //转换
computed: {
   singer() {
        return this.$store.state.singer
    }
 }
```







###  只用state的用法

- 在 /store/modules/goods 下

```js
export default{
  state:{
  AA:0
  }
}
```

- 在 xx.vue  下

```js
//import store from 'vuex'; //引用  (都用了$store 不用再引入)
  computed：{
        AA: {
            get: function() {
                return this.$store.state.goods.AA;
            },
            set: function(val) {
               // this.$store.state.goods.AA = val;
             // this.$store.commit('goods', val)
            }
        },
    }
```

> 这样就能像使用  data（）{     retrun{    AA:0            }} 一样使用AA这个变量了