---
title: Vue中混入mixin的使用
date: 2019-04-11 04:00:00
tags: [VUE,开发笔记]
---

###  关于VUE的混入使用

  >  ######  mixins就是定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改(但是状态不共享)

-     ###  普通使用：

1. 定义一个mixin.js文件

   ![混入](https://raw.githubusercontent.com/Ho-Jack/daily-note/master/img/mixin1.png)

2. 随便写一些数据

   ```js
   const mixin ={
       data(){
           return{
               message:'hello',
               foo:'abc'
           }; 
      }
   };
   export default mixin;   //记得导出
   ```

3. 使用

   ```js
   <script>
       import mixin form '../common/mixin';
   export default {
       mixins: [mixin],
       data(){
           return{
               items:[1,2,3,4,5,6],
               nextNum:10
           }
       },
       created(){
           console.log(this.message); //直接使用了mixin里面的message
       }
   }
       
       
   </script>
   ```


- ### 全局混合：

  1. 在mixin.js 文件中，引入vue 并且注册全局混合

     ![全局混合](https://raw.githubusercontent.com/Ho-Jack/daily-note/master/img/mixin2.png)

     ```js
     import Vue form 'vue';
     Vue.mixin({
         data(){
             return{
                 haha:'你好啊'
             };
         },
         methods:{
             conText(){
                 console.log(this.haha)
             }
         }
     })
     ```


2. 在其他页面直接使用

   ```js
   <script>
       export default{
   data(){
       return{
           
       }
   },
       created(){
           this.conTest()  //这是全局mixin里的一个方法
       }
   }
   </script>
   ```





- #### 一些比较：

  ## 与vuex的区别

  经过上面的例子之后，他们之间的区别应该很明显了哈~

  - vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。
  - Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。

  ## 与公共组件的区别

  同样明显的区别来再列一遍哈~

  - 组件：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。
  - Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。