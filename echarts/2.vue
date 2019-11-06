// 数据比例
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
			chart: null,
			total: 140

		}
	},
	mounted() {
		console.log(this.num)
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
							var out = `${params.name}:${params.percent}%`
							return out
						} else {
							var ou1 = `${params.name}:${params.data.total / 2}`
							return ou1
						}
					}
				},
				calculable: true,
				series: [
					{
						name: '噪音扬尘情况',
						type: 'pie',
						labelLine: {
							show: false
						},
						radius: [100, 130],
						center: ['50%', '50%'],
						data: [{
							name: '实时数据',
							value: this.count, // 右
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
							total: this.total,
							name: '超标标准',
							value: this.total - this.count, // 左
							itemStyle: {
								color: 'transparent'
							}
						}
						]
					},
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
							value: this.count, // 右
							name: '实时数据',
							itemStyle: {
								color: 'transparent'
							}
						},
						{
							name: '超标标准',
							total: this.total,
							value: this.total - this.count, // 左
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

