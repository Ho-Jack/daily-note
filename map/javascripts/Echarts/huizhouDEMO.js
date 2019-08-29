$(function() {


	var myChart = echarts.init(document.getElementById('map'));
	//各省份的地图json文件
	var ququ = {
		'惠东县': '/Echarts/huidon.json',
		'龙门县': '/Echarts/longmen.json',
		'博罗县': '/Echarts/boluo.json',
		'惠阳区': '/Echarts/huiyang.json',
		'仲恺区': '/Echarts/zhongkai.json',
		'惠城区': '/Echarts/huicheng.json',
		'大亚湾区': '/Echarts/dayawan.json',


	};
	//  在建项目坐标点
	var building = [{
		name: '测试点1',
		value: [114.8895263671875,23.044352663791813, 120],
		type: 'build'
	},
		{
			name: '测试点2',
			value: [115.15594482421874,23.22620304830155, 80],
			type: 'build'
		},

	];

//预警项目
	var warming = [{
		name: '测试点1',
		value: [ 115.09002685546875,23.092364899997815, 120],
		type: 'build'
	},
		{
			name: '测试点2',
			value: [ 114.99114990234375,23.185813175302915, 80],
			type: 'build'
		},
		{
			name: '测试点3',
			value: [  114.8675537109375,22.950806043101025, 80],
			type: 'build'
		},

	];
	//地图上的点
	var  geoCoordMap={
		'测试点1':[  114.8895263671875,23.044352663791813],
		'测试点2':[  115.15594482421874,23.22620304830155],
		'测试点3':[  114.76318359375,22.917922936146045]
	}
	var mydata=  [
		{
			name: '测试点1',
			value: 85
		}];
	// 数据转换
	var convertData = function(data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value)
				});
			}
		}
		return res;
	};

	//各省份的数据
	var allData = [{
		name: '龙门县',
		value: 1111,
		itemStyle: {
			areaColor: '#0c254d' //区域颜色
		},

	}, {
		name: '博罗县',
		value: 2222,
		itemStyle: {
			areaColor: '#0c254d' //区域颜色
		}
	}, {
		name: '惠阳区',
		value: 3333,
		itemStyle: {
			areaColor: '#0c254d' //区域颜色
		}
	}, {
		name: '仲恺区',
		value: 4444,
		itemStyle: {
			areaColor: '#0c254d' //区域颜色
		}
	}, {
		name: '惠城区',
		value: 555,
		itemStyle: {
			areaColor: '#0c254d' //区域颜色
		}
	}, {
		name: '大亚湾区',
		value: 6666,
		itemStyle: {
			areaColor: '#0c254d' //区域颜色
		}
	}, {
		name: '惠东县',
		value: 7777,
		itemStyle: {
			areaColor: '#0c254d' //区域颜色
		}
	}, ];





	loadMap('/Echarts/huizhou.json', 'huizhou'); //初始化惠州地图

	var timeFn = null;

	//单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
	myChart.on('click', function(params) {
		clearTimeout(timeFn);
		//由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
		timeFn = setTimeout(function() {
			var name = params.name; //地区name
			//debugger
			var mapCode = ququ[name]; //地区的json数据地址
			if (!mapCode) {

			}

            //加载地区地图
			console.log(name)
			loadMap(mapCode, name);

		}, 250);
	});


	// 绑定双击事件，返回惠州地图
	myChart.on('dblclick', function(params) {
		//当双击事件发生时，清除单击事件，仅响应双击事件
		clearTimeout(timeFn);
		myChart.clear();
		//返回惠州地图
		loadMap('/Echarts/huizhou.json', 'huizhou');
	});

	/**
	 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
	 @params {String} mapCode:json数据的地址
	 @params {String} name: 地图名称
	 */
	function loadMap(mapCode, name) {
		$.get(mapCode, function(data) {

				echarts.registerMap(name, data);
				//debugger
			//惠州整体数据
				if (name=="huizhou"){

					var option = {
						tooltip: {
							show: true,
							formatter: function(params) {
								if (params.data) return 	 params.name + '：' + params.data['value']
							},
						},
						legend: {
							orient: 'vertical',
							id: 1,
							y: 'bottom',
							x: 'right',
							itemWidth: 15,
							data: [{
								name: '在建项目',
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC9ElEQVRYR+2WPUwTYRjH/8/1DgygaUATYoiUxEGDCV0YjAO9DsboIMZ2MUZxcXBiYQAHyyAkLsqgiYmJuLC0URlcuTYmLgxqRCWRoRoGg3zUQMtHPx7z3pWmH8ddeyWBwSe55e593+f3/p+vIxyw0QH7x+EGcI+zx8Xpl0Kl8z3kfcRDUrO8JVup9mGnd/P59q3NLz94AeDEykjjNav1lgq4x9M+F7MmDrh0gTCxfRetyoZl1F6nLuJFdgCzc6yvy5LSlRim+F6bLAFaH26HiOhBfQCkJoaVqDOAsZ1JAm7vAijLvyBT1lKBpOsY1qitoAAzj67ebww5Amgb2xHkfWJz50lAlqvL2fUkY2nFcMnAq9WRhgGnAEYg67PYykiDryaAm+/TvlQKVxeXeLA+38bu06cohJw8PaXSp/LzTDW9EUtHKS/9fgDkQxGb6lMqlDi0AE+O8rqvA4s9+6HAdzobAxCd6lMqqmHPtGat381Q1uoGYPyV/GF3TUm4uzinBeuvAkZM8odrq4ICwEwwCjL6gKnJTcbrTMpCKJ6W1Ei/MwWsAFo8IE8QyCTB8TCw9cfUB4NHXWrEWSfMaoEQwZgFBZObQGfuGbcWj1BBbjZA5p9VQBBwh9TwpCMFWAsMMuhx8WY6NwRengV+l82Xdh+oxQNeKPVFYJXUiLNhxFrAxyB9HOsmZO+4bHpT8Zm8IfD805JwENJdpL51No5ZC3oZ+FgAaM8nc/nt8wtETnDiK5D4VtgiqWHLCWY73kpKUQBkkoAIgYlVADA+S/6w16JE7P8JczOBOIg69UOOnICeAyLryyFEDrT7SkNg0wP0sFnRiW+54lI83gvquAJefFcBoJekSMKiBGVgwqWGLSeqLUBWC0wSSP8r2jXdmbsbnJjTX5G7W4+7rkyR2fWAqhQw7QVip6j/Fo/hbiNu2g3tSrAqANau9zOkN3ahMk1Kmx5QJUBZL6iBxK4EqwRwOJaZf0r+SD5Ge1PbJmENF3a09D/APzM9MDBOoIkUAAAAAElFTkSuQmCC",
							},
								{
								name: '预警项目',
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACZUlEQVRYR7WX300bQRDGfyPBc0gFMRWQVBBb8j2TDoAKAhUEVxCoAFJB4PlO4lxBnApiKgg829JEuz7b92f3dm9F7sWStTPzzezM980KCZ9OGSOcsWImJcsEFzsTSTHWMSMO+WNtlWspmKX4MTZJAGzcDK0FXQAXkmN+B31vBcBU4gVhMhREEgDN+Aj8cqS6YMVESl5iy5AGYMolwndPkB+Sc/5/AWT2rk+8QVYcx07H4ApUI/jUm6FyJQU3MVUYBEDHHHGICW56oO+bS8747QFk3ANnEY6XknMccS6eBzQ+uI0reZzv4BXYsh9wh/AlJqOKHZ+lYKQZNygqBVc+214A1bzfRdx52/8c7HUZW/PdS86FC4QXgO12+IlwFJ35/qARqFHLzlC1AdX4nAA0s0SyRZ8Q32vyqU3VHQC27MpTYub9YJVSCib1Q10AU5YIH4JpK88ID8DX4Nn6AWUiBeX2rwYA7ef4vRvlkTXnHFhN+DYIADS0og0gJvudg8ReaZDUDkBFs38D2TTQNzajIWVY8X4r2XsAmz3PLzLKK2tGba3XkDK6gNX6YAgAp8JVU1MivIsuQhKAWtnagYb2Ql0n4npAeZWinxEHgPgt+V7Om1Pgv88oedUpDwingatoUHIbgJeCY+Q1OBWORm4C2EjvwsOEHR53Nnj/VHQEyacF3a5WZlJwHep09VO5c1v2qaERpDaIYB94r6Cibtd7wb8PbN5/Rr8/77IObLueSbiVnEtf5cIr2WY3MA5O7PNrbXd+58unVf559XDdKd+gjchBNmYVty8eV0ZV9gaoCWhWsKiH6j/NPeohS8oR6gAAAABJRU5ErkJggg==",
							},

							],
							textStyle: {
								color: '#fff'
							}
						},
						series: [{
							name: 'MAP',
							type: 'map',
							mapType: name,
							data: allData,
							selectedMode: 'false', //是否允许选中多个区域
							label: {
								normal: {
									show: true,
									formatter: function(val) {
									//	console.log(val, 9999999999)
										var area_content =
											'{a|' +val.value+'}' + '-' + '{c|' + val.name + '-'+'}';
										return area_content.split("-").join('\n');
									}, //让series 中的文字进行换行
									rich: {
										a: {
											color: '#f6f7ff',
											backgroundColor: {
												image: './img/img_warning.png'
											},
											width:60,
											height:40,
											align:'right',
											position:'top',
											lineHeight:35
											//verticalAlign:'text-top'


										},
										b:{
										color:'white'
										},
										c: {
											color: '#fff1f8',
											fontFamily: 'Microsoft YaHei',
											fontSize: 14,
											width: 16,
											height: 16,
											textAlign: 'center',

										}
									}, //富文本样式,就是上面的formatter中'{a|'和'{b|'
								},
								emphasis: {
									show: false
								}
							}, //地图中文字内容及样式控制

						}]
					};
				}else {

					var option = {
						tooltip: {
							show: true,
							formatter: function(params) {

							 return 	params.name;
							},
						},
						geo: {
							map: name,
							show: false,
							itemStyle: {
							    normal: {
							        areaColor: '#172260',
							        borderColor: '#216ca7',
							        borderWidth: 1,
							        shadowColor: '#216ca7',
							        shadowBlur: 1
							    }
							},
							zoom: 1.2,
						},
						series: [{

							name: 'MAP',
							type: 'map',
							mapType: name,
							//   geoIndex: 1,
							//  aspectScale: 0.75, //长宽比
							zoom: 1.2,
							itemStyle: {
								normal: {
									areaColor: '#031525',
									borderColor: 'rgba(191,160,20,0.84)',
								},
								emphasis: {
									areaColor: '#b7ad26'
								}
							},

						},
							//标志
							{
								show: false,
								name: '在建项目',
								type: 'scatter',
								coordinateSystem: 'geo',
								data: building,
								symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC9ElEQVRYR+2WPUwTYRjH/8/1DgygaUATYoiUxEGDCV0YjAO9DsboIMZ2MUZxcXBiYQAHyyAkLsqgiYmJuLC0URlcuTYmLgxqRCWRoRoGg3zUQMtHPx7z3pWmH8ddeyWBwSe55e593+f3/p+vIxyw0QH7x+EGcI+zx8Xpl0Kl8z3kfcRDUrO8JVup9mGnd/P59q3NLz94AeDEykjjNav1lgq4x9M+F7MmDrh0gTCxfRetyoZl1F6nLuJFdgCzc6yvy5LSlRim+F6bLAFaH26HiOhBfQCkJoaVqDOAsZ1JAm7vAijLvyBT1lKBpOsY1qitoAAzj67ebww5Amgb2xHkfWJz50lAlqvL2fUkY2nFcMnAq9WRhgGnAEYg67PYykiDryaAm+/TvlQKVxeXeLA+38bu06cohJw8PaXSp/LzTDW9EUtHKS/9fgDkQxGb6lMqlDi0AE+O8rqvA4s9+6HAdzobAxCd6lMqqmHPtGat381Q1uoGYPyV/GF3TUm4uzinBeuvAkZM8odrq4ICwEwwCjL6gKnJTcbrTMpCKJ6W1Ei/MwWsAFo8IE8QyCTB8TCw9cfUB4NHXWrEWSfMaoEQwZgFBZObQGfuGbcWj1BBbjZA5p9VQBBwh9TwpCMFWAsMMuhx8WY6NwRengV+l82Xdh+oxQNeKPVFYJXUiLNhxFrAxyB9HOsmZO+4bHpT8Zm8IfD805JwENJdpL51No5ZC3oZ+FgAaM8nc/nt8wtETnDiK5D4VtgiqWHLCWY73kpKUQBkkoAIgYlVADA+S/6w16JE7P8JczOBOIg69UOOnICeAyLryyFEDrT7SkNg0wP0sFnRiW+54lI83gvquAJefFcBoJekSMKiBGVgwqWGLSeqLUBWC0wSSP8r2jXdmbsbnJjTX5G7W4+7rkyR2fWAqhQw7QVip6j/Fo/hbiNu2g3tSrAqANau9zOkN3ahMk1Kmx5QJUBZL6iBxK4EqwRwOJaZf0r+SD5Ge1PbJmENF3a09D/APzM9MDBOoIkUAAAAAElFTkSuQmCC',
								symbolSize: function(val) {
									return val[2] / 7.5;
								},
								label: {
									normal: {
										show: false,
										formatter: function(params) {
											// console.log(params);
											return params.name;
										},
										position: 'right',
										color: '#fff9ff',
										fontSize: '8'
									},
									emphasis: {
										show: false
									}
								},
								itemStyle: {
									normal: {
										color: '#bbb4b9',
										borderWidth: 2,
										borderColor: '#b4dccd'
									}
								}
							},
							{
								name: '预警项目',
								type: 'scatter',
								coordinateSystem: 'geo',
								data: warming,
								symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACZUlEQVRYR7WX300bQRDGfyPBc0gFMRWQVBBb8j2TDoAKAhUEVxCoAFJB4PlO4lxBnApiKgg829JEuz7b92f3dm9F7sWStTPzzezM980KCZ9OGSOcsWImJcsEFzsTSTHWMSMO+WNtlWspmKX4MTZJAGzcDK0FXQAXkmN+B31vBcBU4gVhMhREEgDN+Aj8cqS6YMVESl5iy5AGYMolwndPkB+Sc/5/AWT2rk+8QVYcx07H4ApUI/jUm6FyJQU3MVUYBEDHHHGICW56oO+bS8747QFk3ANnEY6XknMccS6eBzQ+uI0reZzv4BXYsh9wh/AlJqOKHZ+lYKQZNygqBVc+214A1bzfRdx52/8c7HUZW/PdS86FC4QXgO12+IlwFJ35/qARqFHLzlC1AdX4nAA0s0SyRZ8Q32vyqU3VHQC27MpTYub9YJVSCib1Q10AU5YIH4JpK88ID8DX4Nn6AWUiBeX2rwYA7ef4vRvlkTXnHFhN+DYIADS0og0gJvudg8ReaZDUDkBFs38D2TTQNzajIWVY8X4r2XsAmz3PLzLKK2tGba3XkDK6gNX6YAgAp8JVU1MivIsuQhKAWtnagYb2Ql0n4npAeZWinxEHgPgt+V7Om1Pgv88oedUpDwingatoUHIbgJeCY+Q1OBWORm4C2EjvwsOEHR53Nnj/VHQEyacF3a5WZlJwHep09VO5c1v2qaERpDaIYB94r6Cibtd7wb8PbN5/Rr8/77IObLueSbiVnEtf5cIr2WY3MA5O7PNrbXd+58unVf559XDdKd+gjchBNmYVty8eV0ZV9gaoCWhWsKiH6j/NPeohS8oR6gAAAABJRU5ErkJggg==",
								symbolSize: function(val) {
									return val[2] / 7.5;
								},
								label: {
									normal: {
										show: false,
										formatter: function(params) {
											// console.log(params);
											return params.name;
										},
										position: 'right',
										color: '#fff',
										fontSize: '8'
									},
									emphasis: {
										show: false
									}
								},
								itemStyle: {
									normal: {
										color: '#FAFF1A',
										borderWidth: 2,
										borderColor: '#E3BC1F'
									}
								}
							},

							]
					};
				}
				myChart.setOption(option);
				// curMap = {
				//     mapCode: mapCode,
				//     mapName: name
				// };

		});
	}
})
