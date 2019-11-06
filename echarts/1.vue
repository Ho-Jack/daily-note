// 最近七天管理人员到岗率
<template>
	<div :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
	mixins: [resize],
	props: {
		ShouldAttendNumber: {
			type: Array,
			default: () => []
		},
		RealAttendNumber: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: '标题1'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '300px'
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
			var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAGQAAAADmp/eaAAAA/UlEQVRIDWNk9u33ZPj3dxYDA4MMEA8m8ISBiTmNaZA6DhRQMiC3MYEZgyncUN0iA3LgoAajDqQ0ekZDcDQEKQ0BSvWPpsHREKQ0BCjVP5oGR0OQ0hCgVD8TAyPDL0oNoZl+oNuYGBkYN9PMAgoNBrmNRUGRNfrhgz/b////L0uqeUA9MUA9ygT03WVkZFxCQA2GNFDPY3kFliWMGDIkCPAEThf78evrtv8MDMbYtAENP8vBxu31ZX3mK2zyxIhRVA6CLBbk4nQARsVudMtAYiA5ShwHMpMiB4IMeL06+4u+NI83MLMtBvHBAMgGiYHkYEKDgmb17jEGYWo6BgANzzkPpwnIdAAAAABJRU5ErkJggg=="
			var ShouldAttendNumber = this.ShouldAttendNumber
			this.chart.setOption({
				title: {
					text: this.title,
					top: "3%",
					left: "25px",
					textStyle: {
						fontSize: 14,
						color: "#F7F7F7",
						fontWeight: "normal"
					}
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['应出勤', '实际出勤'],
					top: '3%',
					right: '4%',
					textStyle: {
						fontSize: '14px',		// 字体大小
						color: '#F7F7F7'
					}

				},
				grid: {
					top: '25%',
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
					axisLabel: {
						color: 'white'
					},
					axisTick: { show: false
					},
					axisLine: {
						show: false
					}
				},
				yAxis: {
					axisLabel: { show: false },
					axisLine: { show: false },
					splitLine: {
						show: true,
						lineStyle: { color: '#064C9E' }
					}
				},
				series: [
					{
						name: '实际出勤',
						type: 'bar',
						stack: '总量',

						barWidth: 20,
						label: {
							show: true,
							position: [-10, -30],
							distance: 0,
							color: "#fff",
							formatter: function(val) {
								var content = `${(val.data / ShouldAttendNumber[val.dataIndex]) * 100}%`
								return content
							},
							fontSize: 12,
							backgroundColor: {
								image: icon,
								color: "#034B8C"
							},
							padding: [5, 8, 8, 8],
							borderRadius: 100
						},
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: '#4F8316' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#B6FF77' // 60% 处的颜色
								}], false),
								barBorderRadius: 2
							}
						},
						data: this.RealAttendNumber
					},
					{
						name: '应出勤',
						type: 'bar',
						z: 1,
						barGap: '-100%', // 重叠的关键
						barWidth: 20,
						label: {
							show: true,
							position: [-10, -30],
							distance: 0,
							color: '#fff',
							fontSize: 12,
							backgroundColor: {
								image: icon
							},
							padding: [8, 9, 8, 9],
							borderRadius: 100
						},
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: '#2F34FF' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#584EFF' // 60% 处的颜色
								}], false),
								barBorderRadius: 2
							}

						},
						data: this.ShouldAttendNumber
					}
				]
			}
			)
		}
	}
}
</script>
