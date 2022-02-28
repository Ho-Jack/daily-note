---
title: Vue中使用定时器技巧
date: 2019-10-24 15:25:19
tags: [Vue,开发笔记]
---

## Vue中使用定时器技巧
### 1.data中定义

```js
data(){
    return{   
   changeData: [0, 90, 180, 270, 360],
   timeName:null
    }
}
```

### 2.method

```js
methods:{
   xx(){
   	clearInterval(this.timeTicket);
			var timesRun = 0;  //循环控制flag
   	this.timeTicket = setInterval(() => {
        //定时循环echart里面的数据
				var datavalue = this.changeData[timesRun]
				option.series[0].data[0] = datavalue;
				this.chart.setOption(option)
				timesRun += 1; //循环控制flag
				if (timesRun === (this.changeData.length)) {
					// clearInterval(timeTicket);
					timesRun = 0;//循环一遍数组就清零flag 再进行一次循环
				}
			}, 1000);
   }
}
```

### 3.离开函数时要及时清除定时器

```js
	beforeDestroy() {
		clearInterval(this.timeTicket);
	},
```

####  更好清除定时器的解决方案

> ### [vm.$once( event, callback )](https://cn.vuejs.org/v2/api/#vm-once)
>
> - **参数**：
>
>   - `{string} event`
>   - `{Function} callback`
>
> - **用法**：
>
>   监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

```vue
<script>
  export default {
    mounted() {
      const timer = setInterval(() => { ... }, 1000);
      this.$once('hook:beforeDestroy', () => clearInterval(timer);)
    }
  };
</script>
```

