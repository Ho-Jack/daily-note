<template>
	<div
		:id="id"
		:class="className"
		:style="{height:height,width:width}"
	/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

import luoyangMap from './mapJson/luoyang.json'
export default {
	mixins: [resize],
	props: {
		className: {
			type: String,
			default: 'chart'
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
		},
		xms: {
			type: Object,
			required: true
		},
		xmgrs: {
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
		xms: function(val) {
			console.log("33" + this.xms.偃师市)
			this.initChart()
		}
	},
	mounted() {

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
			this.chart = echarts.init(document.getElementById(this.id))
			var _this = this
			loadMap(luoyangMap, 'luoyang')
			function loadMap(mapCode, name) {
				echarts.registerMap(name, luoyangMap)
				var option = {
					backgroundColor: '#0B3063',
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
              'padding:10px 20px;color: #fff;',
						formatter: function(params) {
							return (
								`<div style="width:200px;height:108px;font-size:16px">
									 <p>${params.name}</p>
									 <p style="color:#81C1FF;font-size:12px">项目总数：<span style="color:#7BD43A" >${params.count}</span> 个</p>
									  <p style="color:#81C1FF;font-size:12px">人员总数：<span style="color:#7BD43A">${params.workerCount}</span> 个</p>
					</div>`
							)
						}
					},

					visualMap: {
						show: false,

						min: 1,
						max: 15,
						pieces: [
							{
								start: 1,
								end: 1,
								label: '新安县',
								color: '#FFC449'
							},
							{
								start: 2,
								end: 2,
								label: '汝阳县',
								color: '#FFE757'
							},
							{
								start: 3,
								end: 3,
								label: '栾川县',
								color: '#D2FF98'
							},

							{
								start: 4,
								end: 4,
								label: '瀍河回族区',
								color: '#C2F285'
							},
							{
								start: 5,
								end: 5,
								label: '洛宁县',
								color: '#ADDE62'
							},
							{
								start: 6,
								end: 6,
								label: '宜阳县',
								color: '#7BDA72'
							},
							{
								start: 7,
								end: 7,
								label: '孟津县',
								color: '#72DAB4'
							},
							{
								start: 8,
								end: 8,
								label: '偃师市',
								color: '#72CFDA'
							},
							{
								start: 9,
								end: 9,
								label: '吉利区',
								color: '#72BEDA'
							},
							{
								start: 10,
								end: 10,
								label: '洛龙区',
								color: '#1DA2CC'
							},
							{
								start: 11,
								end: 11,
								label: '老城区',
								color: '#3CAAE6'
							},

							{
								start: 12,
								end: 12,
								label: '嵩县',
								color: '#4B91E7'
							},
							{
								start: 13,
								end: 13,
								label: '西工区',
								color: '#2B71F1'
							},
							{
								start: 14,
								end: 14,
								label: '涧西区',
								color: '#0149C7'
							},
							{
								start: 15,
								end: 15,
								label: '伊川县',
								color: '#0648B3'
							}
						]
					},
					series: [
						{
							name: 'AQI',
							type: 'map',
							aspectScale: 0.75, // 长宽比
							zoom: 1.2, // 地图缩放比例
							map: name,
							// 地图边界线颜色
							itemStyle: {
								areaColor: '#1e9eff',
								color: '#1e9eff',
								borderColor: '#fff',
								borderWidth: 0,
								emphasis: {
									areaColor: '#9E8DFF' // 选中颜色
								}
							},

							label: {
								normal: {
									show: true,
									textStyle: {
										color: '#000000'
									}
								}

							},

							data: [
								{ name: '新安县', value: 1, count: _this.xms['新安县'], workerCount: _this.xmgrs['新安县'] },
								{ name: '汝阳县', value: 2, count: _this.xms['汝阳县'], workerCount: _this.xmgrs['汝阳县'] },
								{ name: '栾川县', value: 3, count: _this.xms['新安县'], workerCount: _this.xmgrs['新安县'] },
								{ name: '瀍河回族区', value: 4, count: _this.xms['瀍河回族区'], workerCount: _this.xmgrs['瀍河回族区'] },
								{ name: '洛宁县', value: 5, count: _this.xms['洛宁县'], workerCount: _this.xmgrs['洛宁县'] },
								{ name: '宜阳县', value: 6, count: _this.xms['宜阳县'], workerCount: _this.xmgrs['宜阳县'] },
								{ name: '孟津县', value: 7, count: _this.xms['孟津县'], workerCount: _this.xmgrs['孟津县'] },
								{ name: '偃师市', value: 8, count: _this.xms['偃师市'], workerCount: _this.xmgrs['偃师市'] },
								{ name: '吉利区', value: 9, count: _this.xms['吉利区'], workerCount: _this.xmgrs['吉利区'] },
								{ name: '洛龙区', value: 10, count: _this.xms['洛龙区'], workerCount: _this.xmgrs['洛龙区'] },
								{ name: '老城区', value: 11, count: _this.xms['老城区'], workerCount: _this.xmgrs['老城区'] },
								{ name: '嵩县', value: 12, count: _this.xms['嵩县'], workerCount: _this.xmgrs['嵩县'] },
								{ name: '西工区', value: 13, count: _this.xms['西工区'], workerCount: _this.xmgrs['西工区'] },
								{ name: '涧西区', value: 14, count: _this.xms['涧西区'], workerCount: _this.xmgrs['涧西区'] },
								{ name: '伊川县', value: 15, count: _this.xms['伊川县'], workerCount: _this.xmgrs['伊川县'] }
							]
						}
					]
				}
				_this.chart.setOption(option)
			}
		}
	}
}
</script>
