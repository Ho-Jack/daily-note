---
title: Element-UI中分页组件在项目中如何用
date: 2019-04-11 04:00:00
tags: [Echarts, 数据可视化]
---

## Echart中各种富文本的配置

- 折线（区域）图、柱状（条形）图、K线图 : `{a}`（系列名称），`{b}`（类目值），`{c}`（数值）, `{d}`（无）
- 散点图（气泡）图 : `{a}`（系列名称），`{b}`（数据名称），`{c}`（数值数组）, `{d}`（无）
- 地图 : `{a}`（系列名称），`{b}`（区域名称），`{c}`（合并数值）, `{d}`（无）
- 饼图、仪表盘、漏斗图: `{a}`（系列名称），`{b}`（数据项名称），`{c}`（数值）, `{d}`（百分比）


```js
formatter: function (val) {   // console.log(val, 9999999999)   
 var area_content = '{a|' + val.value + '}' + '-' + '{b|' + val.name + '-' + '}';      return area_content.split("-").join('\n');
},
        //让series 中的文字进行换行
   rich: {   a: {   
                  color: '#f6f7ff',  
                  backgroundColor: {   image: '../images/img_warning.png' },                               padding:[10,6],   
                  align: 'center', 
                }, 
               
            b: {     
                color: '#fff1f8',     
                fontFamily: 'Microsoft YaHei',   
                fontSize: 14,   
                textAlign: 'center',   
               }
        },
                   //富文本样式,就是上面的formatter中'{a|'和'{b|'
```



#### title 富文本

```js
	title: {
					text: "{a|84}{b|db}",
					x: 'center',
					y: 'center',
					textStyle: {
						rich: {
							// label: {
							//   formatter: ['{a|84}{b|db}'].join('\n'),
							// },
							a: {
								color: 'red',
								fontSize: 80,
								fontWeight: 'normal',
								fontFamily: "led"
							},
							b: {
								color: '#ffff'
							}
						}
					}
				},
```

#### tooltip

```js
  tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"，
            /*formatter:function(val){   //让series 中的文字进行换行
                 console.log(val);//查看val属性，可根据里边属性自定义内容
                 var content = var['name'];
                 return content;//返回可以含有html中标签
             },*/ //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
        },//提示框，鼠标悬浮交互时的信息提示


```

#### 坐标轴上的数据格式化

- ##### Y轴

```js
yAxis : [{
  type : 'value',
  axisLabel : {
  formatter: function(value){
                 return value+"单位";
              }
         }
}]
```

#### series的数据格式化

```js
series : [{
  name:'',
  type:'bar',
  data:[],
  itemStyle:{
    normal:{
      label:{
        formatter:function(a,b,c){return c+"%";}
      }
    }
  }
  }]
```



