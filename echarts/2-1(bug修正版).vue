// 噪音扬尘圆环
<template>
	<div :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
	mixins: [resize],
	props: {
		count: {
			type: Number,
			default: 0
		},
		total: {
			type: Number,
			default: 0
		},
		unit: {
			type: String,
			default: "dbb"
		},
		ledColor: {
			type: String,
			default: "red"
		},
		firstColor: {
			type: String,
			default: "#D66AFF"
		},
		secondColor: {
			type: String,
			default: "#FF575D"
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '500px'
		}
	},
	data() {
		return {
			chart: null

		}
	},
	watch: {
		count: function(val) {
			this.initChart()
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart()
		})
	},
	beforeDestroy() {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
	},
	methods: {
		initChart() {
			this.chart = echarts.init(this.$el)
			var count=this.count
                if(this.count>this.total*2){
				    count=this.total*2
				}
				/* 
				注意：环形 2个数据环形A和B    A数据是负数 会影响B的正常显示，所以要避免负数数据的出现
				 */
			this.chart.setOption({
				backgroundColor: "#082751",
				title: {
					text: "{a|" + this.count + "}{b|" + this.unit + "}",
					x: 'center',
					y: 'center',
					textStyle: {
						rich: {

							a: {
								color: this.ledColor,
								fontSize: 60,
								fontWeight: 'normal',
								fontFamily: "led"
							},
							b: {
								color: '#fff',
								padding: [-20, 0, 0, 20],
								fontSize: 15

							}
						}
					}
				},

				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						//	debugger
						if (params.name == "实时数据") {
							
							if(params.percent==100){
								var out = `${params.name}<span style="color:red;">已超标${((params.data.value-params.data.bz)/params.data.bz*100).toFixed(2)}%</span>`
							}else{
                                 var out=`${params.name}:${params.data.value} (正常)`
							}
							
							return out
						} else {
							var ou1 = `${params.name}:${params.data.total / 2}`
							return ou1
						}
					}
				},
				calculable: true,
				series: [
					/* 大环 */
					{
						name: '噪音扬尘情况',
						type: 'pie',
						labelLine: {
							show: false
						},
						radius: [100, 130],
						center: ['50%', '50%'],
						data: [{
								/* 大环实时-设置实时数据-（显示）  total:标准   count 实时数据*/
							name: '实时数据',
							value: this.count, // 实时数据
							bz: this.total*2,// 标准
							label: {
								show: false
							},
							itemStyle: {
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: this.secondColor
								}, {
									offset: 1,

									color: this.firstColor
								}])
							}
						},
						{
							/* 大环标准-设置标准-（透明）  total:标准   count 实时数据*/
							name: '超标标准',
							value: this.total * 2 -count, 
							total: this.total * 2,
							count:this.count,
							itemStyle: {
								color: 'transparent'  //透明颜色
							}
						}
						]
					},
					/* 小环 */
					{
						name: '数据比例',
						type: 'pie',
						labelLine: {
							show: false
						},
						label: {
							show: false
						},
						radius: [105, 120],
						center: ['50%', '50%'],
						data: [{
							/* 小环实时数据-（透明）  count：实时数据  total：标准*/
							value: this.count, // 实时数据 
							bz: this.total*2,// 标准
							name: '实时数据',
							itemStyle: {
								color: 'transparent'
							}
						},
						{
							/* 小环标准数据-（显示）  count：实时数据  total：标准*/
							name: '超标标准',
							value: this.total * 2 - count, // 设置标准数据（超标应该是0）
								count:this.count,
							total: this.total * 2,
							itemStyle: {
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: '#1248DB'
								}, {
									offset: 1,
									color: '#0982DC'
								}])
							}
						}
						]
					}
				]
			})
		}
	}
}
</script>

