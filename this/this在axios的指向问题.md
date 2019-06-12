---
title: Element-UI中分页组件在项目中如何用
date: 2019-2-11 04:00:00
tags: [JS,ES6,开发笔记]
---
## this在axios的指向问题

- ### 在Vue中this始终指向Vue，但axios中this为undefined，例如

```js
methods:{
    loadData:function(){
        axios.get('static/mock.json')
            .then( function (response){
            //this为undefined
            response=response.data
            this.title=response.title
        })
            .catch( function(error){
            console.log(error)
        })
    }
}
```

- ### 若需要赋值给变量用以渲染数据，可以通过=>函数，这时this为Vue

```javascript
methods:{
    loadData:function(){
        axios.get('static/mock.json')
            .then(  (response)=>{
            //this为undefined
            response=response.data
            this.title=response.title
        })
            .catch( function(error){
            console.log(error)
        })
    }
}
```

- ### 或者可以直接通过： 

  ###  let that = this 
  ### 将this保存在that中，再在函数中使用that均可 

