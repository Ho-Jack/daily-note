---
title: Vue中echarts父组件向子组件传值出现获取不到数据的解决方案
date: 2019-9-08 00:00:00
tags: [开发笔记, Vue, echarts]
---

##### 通过props  父组件向子组件传值 出现获取不到数据的解决方案

问题：当父组件传值给子组件echarts时，发现子组件获取的props为空，刚开始以为是钩子函数放错了地方，后来发现从mounted和created都不行。当在父组件data定义传递的数据的时候子组件显示正常

> 原因：后来经过排查，此处省略N字，发现echarts是在渲染的时候就传递数据

解决方案

1、在父组件定义一个flag，当数据获得的之后再进行echarts子组件的渲染

```js
/父组件
   <div class="chart-wrapper">
    <pie-chart v-if="flag" :pie-data="piedata"></pie-chart>
  </div>
  ...
  import {getPie} from '@/api/status'
  export default {
  name: 'device',
  data() {
    return { 
      flag:false,
      piedata:{},
      ...
  },
  created(){
    this.init()
  },
 methods:{
   init(){   
        getPie().then(this.getInfoSucc)
   }, 
   getInfoSucc(res){
      res = res.data;
       if(res.code ==0){
         const values = res.values;  
         this.piedata = values.piedata;  
         this.flag = true 
       }
     }
```

2、在子组件中通过watch监控父组件传来的值，控制echarts子组件的渲染

```js
	props: {
		chartData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			chart: null
		}
	},
	watch: {
		chartData: function(val) {
			if (val) {
				this.initChart()  //当监控到值，渲染echarts
			}
		}
	},
```

