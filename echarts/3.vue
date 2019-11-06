// 一周车辆出入数量曲线图
<template>
	<div
		:class="className"
		:style="{height:height,width:width}"
	/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
	mixins: [resize],
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '250px'
		}
	},
	data() {
		return {
			chart: null
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

			this.chart.setOption({
				backgroundColor: '#0C3369',
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: '#FC7474'// 竖线颜色
						}
					}
				},
				grid: {
					top: "5%",
					left: '5%',
					right: '3%',
					bottom: '15%'
				},
				xAxis: {
					type: 'category',
					boundaryGap: false, // 起始坐标
					data: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisLine: {
						lineStyle: {
							color: '#0A56CB'
						}
					},
					axisTick: {
						lineStyle: {
							color: '#0A56CB'
						},
						length: 8,
						alignWithLabel: true
					},
					axisLabel: {
						color: '#A4A7B6',
						margin: 15
					}
				},
				yAxis: {
				
					type: 'value',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#A4A7B6'
					},
					splitLine: {
						lineStyle: {
							color: '#144693'
						}
					}
				},
				series: [
					{
						data: [0, 23, 43, 56, 76, 13, 17, 44],
						type: 'line',
						smooth: true,
						symbol: 'rect',
						lineStyle: {
							color: '#DF45F8'
						},
						itemStyle: {
							color: '#FE565C'
						},
						areaStyle: { // 区域填充样式
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(255, 0, 212, 0.8)'
								}, {
									offset: 1,
									color: 'rgba(255, 136, 212, 0)'
								}], false),
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						}

					}
				]
			})
		}
	}
}
</script>
