---
title: Vue中混入mixin的使用
date: 2019-4-11 04:00:00
tags: [VUE,开发笔记]
---

###  关于VUE的混入使用

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
