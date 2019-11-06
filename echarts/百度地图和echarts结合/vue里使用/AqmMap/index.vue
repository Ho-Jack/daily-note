<template>
	<div
		:id="id"
		:style="{height:height,width:width}"
		:redData="redData"
		:greenData="greenData"
	/>
</template>

<script>
import echarts from 'echarts'
import bmap from "./bmap"
import resize from '../mixins/resize'
export default {
	mixins: [resize],
	props: {
		greenData: {
			type: Array,
			default: () => []
		},
		redData: {
			type: Array,
			default: () => []
		},
		id: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100px'
		},
		height: {
			type: String,
			default: '100%'
		}

	},
	data() {
		return {
			chart: null

		}
	},

	mounted() {
		this.$nextTick(() => {
			//	console.log(this.redData)
			this.initChart()
			console.log("红红" + this.redData)
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
		// reChart() {
		// 	setTimeout(() => {
		// 		// debugger
		// 		//	this.resetChart()
		// 		this.initChart()
		// 		console.log("强制刷新")
		// 	}, 1500)
		// },
		initChart() {
			this.chart = echarts.init(document.getElementById(this.id))
			// 数据载入，这里需要自己定义自己的数据，主要是[{value : [lng,lat]}]

			// var redData = [
			// 	{ value: ['112.51133014767561', '34.62603427107153'], name: "李雷1", workType: "木工", teams: "班组A", phone: 13012345678, status: "已佩戴", img: "url" }
			// { value: [113.582198, 22.299329], name: "李一", workType: "木工", teams: "班组A", phone: 13012345678, status: "已佩戴" }
			// ]
			// var greenData = [{ value: [113.58394, 22.299965], name: "李二", workType: "木工", teams: "班组A", phone: 13012345678, status: "已佩戴" }]
			/* 数据分组的代码省略*/
			var option = {
				// 标题设置
				title: {},
				tooltip: {
					show: true,
					triggerOn: 'click',
					enterable: true,
					backgroundColor: '#103973',
					position: function(point, params, dom, rect, size) {
						// 固定在顶部
						return [point[0] + 10, point[1]]
					},
					extraCssText:
            'padding:10px 10px;color: #fff;',
					formatter: function(params) {
						// debugger
						return (
							`	<div style="width:365px;height:130px;">
					<div style="display: inline-block;  width: 100px;height: 125px;">
						<img
							src="/static/txDEMO.png"
							style="width:100%;height:100%"
						/>
					</div>
					<div style="display: inline-block;position: absolute;margin-left:10px">
						<div >姓名：${params.data.name}</div>
						<div 	style="margin-top:5px">工种：${params.data.workType}</div>
						<div 	style="margin-top:5px">班组：${params.data.teams}</div>
						<div 	style="margin-top:5px">联系电话：${params.data.phone}</div>
						<div 	style="margin-top:5px">安全帽佩戴情况：
						<span   style="color:${params.seriesName === "已佩戴" ? 'green' : 'red'}" >${params.seriesName}</span>
				
						</div>
					</div>
				</div>`
						)
					}
				},
				// 图例, name的值要与下面series中的name值对应上才会有效果
				legend: {
					data: [
						{
							name: '未佩戴',
							icon: 'circle',
							textStyle: {
								color: '#ff0000'
							}
						},

						{
							name: '已佩戴',
							icon: 'circle',
							textStyle: {
								color: '#2ad14b'
							}
						}
					],
					orient: 'vertical',
					backgroundColor: 'rgba(140,101,101,0.1)',
					shadowColor: 'rgba(140,101,101, 0.5)',
					shadowBlur: 10,
					width: '100px',
					left: '30px',
					bottom: '60px'
					//	top: '400px'
				},
				// 百度地图配置，必须配置项
				bmap: {
					// 中心坐标，如下定义为洛阳
					center: [112.51133014767561, 34.62603427107153],
					// 地图初始显示的缩放大小
					zoom: 19,
					roam: true,
					mapStyle: {
						styleJson: [
							{
								featureType: 'all',
								elementType: 'labels.text.fill',
								stylers: {
									color: '#2da0c6',
									visibility: 'off'
								}
							}
						]
					}
				},
				// 散点数据的配置
				series: [
					{
						name: '未佩戴',
						type: 'effectScatter',
						coordinateSystem: 'bmap',
						// 数据载入，这里需要自己定义自己的数据，主要是[{value : [lng,lat]}]
						data: this.redData,
						symbolSize: 7,
						// 配置标签的显示
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: false
							},
							emphasis: {
								show: false
							}
						},
						// 配置散点的颜色
						itemStyle: {
							normal: {
								shadowBlur: 2,
								shadowColor: 'red',
								color: 'red'
							}
						}
					},

					{
						name: '已佩戴',
						type: 'effectScatter',
						coordinateSystem: 'bmap',
						// 数据载入，这里需要自己定义自己的数据，主要是[{value : [lng,lat]}]
						data: this.greenData,
						symbolSize: 5,
						// 配置标签的显示
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: false
							},
							emphasis: {
								show: false
							}
						},
						// 配置散点的颜色
						itemStyle: {
							normal: {
								shadowBlur: 2,
								shadowColor: '#2ad14b',
								color: '#2ad14b'
							}
						}
					}
				]
			}
			this.chart.setOption(option)
			var map = this.chart
				.getModel()
				.getComponent('bmap')
				.getBMap()
		}
	}
}
</script>
<style lang="scss" >
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
