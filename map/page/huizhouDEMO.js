$(function () {


	var myChart = echarts.init(document.getElementById('map'));
	//各省份的地图json文件
	var ququ = {
		'惠东县': '../javascripts/Echarts/huidon.json',
		'龙门县': '../javascripts/Echarts/longmen.json',
		'博罗县': '../javascripts/Echarts/boluo.json',
		'惠阳区': '../javascripts/Echarts/huiyang.json',
		'仲恺区': '../javascripts/Echarts/zhongkai.json',
		'惠城区': '../javascripts/Echarts/huicheng.json',
		'大亚湾区': '../javascripts/Echarts/dayawan.json',


	};
	//  在建项目坐标点
	var building = [{
			name: '测试点1',
			value: [114.8895263671875, 23.044352663791813, 120],
			type: 'build'
		},
		{
			name: '测试点2',
			value: [115.15594482421874, 23.22620304830155, 80],
			type: 'build'
		},

	];

	//预警项目
	var warming = [{
			name: '测试点1',
			value: [115.09002685546875, 23.092364899997815, 120],
			type: 'build'
		},
		{
			name: '测试点2',
			value: [114.99114990234375, 23.185813175302915, 80],
			type: 'build'
		},
		{
			name: '测试点3',
			value: [114.8675537109375, 22.950806043101025, 80],
			type: 'build'
		},

	];

	// 数据转换
	var convertData = function (data) {
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
			areaColor: '#0D1E2E' //区域颜色
		},

	}, {
		name: '博罗县',
		value: 2222,
		itemStyle: {
			areaColor: '#0D1E2E' //区域颜色
		}
	}, {
		name: '惠阳区',
		value: 3333,
		itemStyle: {
			areaColor: '#0D1E2E' //区域颜色
		}
	}, {
		name: '仲恺区',
		value: 4444,
		itemStyle: {
			areaColor: '#0D1E2E' //区域颜色
		}
	}, {
		name: '惠城区',
		value: 555,
		itemStyle: {
			areaColor: '#0D1E2E' //区域颜色
		}
	}, {
		name: '大亚湾区',
		value: 6666,
		itemStyle: {
			areaColor: '#0D1E2E' //区域颜色
		}
	}, {
		name: '惠东县',
		value: 7777,
		itemStyle: {
			areaColor: '#0D1E2E' //区域颜色
		}
	}, ];





	loadMap('../javascripts/Echarts/huizhou.json', 'huizhou'); //初始化惠州地图

	var timeFn = null;

	//单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
	myChart.on('click', function (params,event) {
		var myEvent=event||window.event
		clearTimeout(timeFn);
		//由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
		timeFn = setTimeout(function () {
			var name = params.name; //地区name
			//debugger
			var mapCode = ququ[name]; //地区的json数据地址
			if (!mapCode) {
function initalertcss(){
		//这里http://www.bejson.com/jshtml_format/通过它来互转
		//css
		var tmp='<style>ul{list-style: none outside none;}.box h2{margin: 0;padding: 0;	}.box{position:absolute;width:300px;left:50%;height:auto;z-index:100;background-color:#fff;border:1px #ddd solid;padding:1px}.box h2{height:25px;font-size:16px;background-color:#aaa;position:relative;padding-left:10px;line-height:25px;color:#fff}.box h2 a{position:absolute;right:5px;font-size:14px;color:#fff}.box .list{padding:10px}.box .list li{height:24px;line-height:24px}.box .list li span{margin:0 5px 0 0;font-family:\"宋体\";font-size:12px;font-weight:400;color:#ddd}.showbtn{font:bold 24px \'微软雅黑\'}#bg{background-color:#666;position:absolute;z-index:99;left:0;top:0;display:none;width:100%;height:100%;opacity:0.5;filter:alpha(opacity=50);-moz-opacity:0.5}</style>';
		//bg
		//tmp=tmp+'<div id=bg></div>'
		$("body").append(tmp);
	}
	initalertcss();
	
	$("#bg").css({
	    display: "block", height: $(document).height()
	});
	var $box = $('.box');
	$box.css({
	    //设置弹出层距离左边的位置
	   left: myEvent.clientX+"px",
	    //设置弹出层距离上面的位置
	   top: myEvent.clientY+"px",
	    display: "block"
	});
	 //点击关闭按钮的时候，遮罩层关闭
	$(".close").click(function () {
	    $("#bg,.box").css("display", "none");
	});
			}

			//加载地区地图
			console.log(name)
			loadMap(mapCode, name);

		}, 250);
	});


	// 绑定双击事件，返回惠州地图
	myChart.on('dblclick', function (params) {
		//当双击事件发生时，清除单击事件，仅响应双击事件
		clearTimeout(timeFn);
		myChart.clear();
		//返回惠州地图
		loadMap('../javascripts/Echarts/huizhou.json', 'huizhou');

	});

	/**
	 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
	 @params {String} mapCode:json数据的地址
	 @params {String} name: 地图名称
	 */
	function loadMap(mapCode, name) {
		$.get(mapCode, function (data) {

			echarts.registerMap(name, data);
			//debugger
			//惠州整体数据
			if (name == "huizhou") {

				var option = {
					tooltip: {
						show: false,
						formatter: function (params) {
							if (params.data) return params.name + '：' + params.data['value']
						},
					},
					legend: {
						orient: 'vertical',
						id: 1,
						y: 'bottom',
						x: 'right',
						itemWidth: 20,
						data: [{
								name: '在建项目',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABTtJREFUWAnFmH9oW1UUx899SW0y1nWmq2t+WG1RGSj4g00ENyRsuqST+ceYIijIQBSmVK1siI4hU9DhFHFF949/TJChTlCwy37UKhvijyEy6R/+2NZuTVraLWBX2nRpcz3fl6XJy/uR+5JYD7TvvXvP+Z5Pzz0v96aC3NqJkRaa82wiOb+BQ9tJiiAJCukyklIk5CjfXyDhOUHe+W9oQ+SymxRC2fnIyFb23c4Aa4mkRy1OzDPgKfbtpXjkc5WYykCJ0ShX422StEZF0NZH0C9ctZ0UCw7Y+vCEPdBp2UATyQ8Y5BknAddzgg5Qa/h5Wi2yVrHWQH2jrSRyh0nKdVZBNY8JcZKktoW6ghPlWmYgwND8j+zYWe5c5+dzRJ77yqE0Q5JBeR1X5stFgEHaTj0XcpaYEWg49REvE79Fi2TIhZwlVlyyvtRDRLmjJXOLeKttpK7QMSTMV0hKjcu3txaCDp9Guzv89Ou9y+ni/dfT2LoAJe5uplv8xkWwzIHcYGDz6g5Hx57g1/tOS2eFwW3BRtp321JiJoN9m75Kf8/kDGOWD8gNBqKD1yqUe9bSUWGwp91PvavMMLvPTdPe4RkFhWsuMs8gaGC8jTLZFJes2E+KMquXeem7e5rJUxbpGgb5hJDkawhplJnbXA0MNLpv9Jlg+tNZx8rY9hQKwiy8ZDIKcbfm5ao80tpoCruUte+ZHTf5af+qJlNMcUBG0UOR4oD6XbhRo4aypUL0lhsa6eEVhs86XRQwr3cuobuWOh4UIhovV/4so86ie1rBYAKV+/SOJtpUAlWAwXw2J3GxNmbBax+0nnUevZCxXxrAHmKow+OztKJBo/WBhgWx8awDELMAKMM//oUIxZtdHUscPVGpx1aae+zriVmnuAx6KOnkYTX3BvfCy9wTbg1FPTjqCJTkLUP85EZ4D8P0VAGDHD1/TtF5h6UGCyrUrwpUbWXmuW1ePTtNHztXBxj9gvouLyOaGeMHxzUAjNvKoH+/4p55/2KGTk/OVfq7eZ/xt3mpq2WSjozwcZWwuVmaKsw7vHftOT9N7bzLAiY5m6M5x5eqJJ2gLyjeMokl40OI+LBkynCrCrOPYXbxhnqVAbDDD3OvKMPkGfSDWh5oY/gHbqiTBhJ+eOVmtWVCZV5jmKoNucHAlgfSlcSb5YIvtfvKh0zPgEFlarNi7iJQPMTHV3G8VPjnCo1YJ5jjpOfOZy4C4VnTXuSlW3gdnhy8QmemFh5LWakuMMiFnCVmBIoFB/ltW/gWkOZXJf7bpAmqLjCAQC7kLDHzASLxT4Dklb/YOVDwC/Bu+cntTbSmyUvv8mfKW0O19gwrC0qTaLqVYs3pQh5czUAYTSS3U07ux+1/Zpp4jmLh3nJ9ayB8JUmkvuez0trygLo8C3GKYqEHuF9NZxhjDxWywVF6n+IC1mFtCqKFK2tC2wIGHtZAmOlaeZZnd+K2rgZNaNuY9ZIVnPFNIJHs5waPFoZquvKXLu6b9Vwd2x3OvkLIrAd6tvF1siaQvBZr6Fq2MHBzBoJHPDjE/yd8Grc1GTSgVcEqA0EgFvmMPyAOVNCyn0YsNBRMDQhCvvALDHVGQdPoghjEKpo6UFTwtxPxKPfTlKI2epB9OUaPVYtSB4JePPwH/3bTT9w3eowaDXu5A4JsPHyIl+69ihngA1+X5h4ICXzhHQw1YJsLc/CpwqoDivI5xqehn4ZMOTGGOfhUYdUBIVE0dIm8ns2GJkcTYwxzVVr1QEj4YNvvpMnH+U3iXZt/cI+x/90SqW4+rnTXg+Nfs/6bjXIkBk8AAAAASUVORK5CYII='
							},
							{
								name: '预警项目',
								icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABYdJREFUWAm1WF1sVFUQnrm3W4qAAVv8IUaqRlstLWpL0rRF+xeNGHwxjdEYH0wEojaWF02MStVogg/6gIafB1/6YjT6oojV7m7pn2AhUkhjDGoqsfpgBbWG/u3e43fOLrf33r0/5y4yyW7PzHwz8+2cuT+nTDFFdHSU04L1EFnUidCbiOkGIrEhl4Z/I0G/Y32ODBqgFcZhTib/jFOCdcGipb2LLPEsCLSQEKZWHHMWBEfI4Pd5JPWxTkwkIdHc0UYiuxfJtugkDMGME5sv8mgyHYLB7w0QsWNHgibP7kM3dgZAijMzH6Sa27r50KElvwS+hMTWB9eTNfcJ2r3VL+iybUzDZKx8hIeP/OHNVUAoR2b+GDpzixf8v+rMP5NR1uglZTiLiK6uUnTm0ytORhaVPxi1VE0HCRchmp45gG1qcfiv7FLWkjUdYm+ZaGq/n8jqd/hCl4vv7CVrc10oRjqNsz9S6a7uCJzxAI+lvlJ4+SV6ew1i8XZE1LK7pITEHdXLesjKPHwkxJt3obbiADW3ZQNHn8Cebo6OzCFE1e0kSksj4Tw/T2ZyMBKnaksOkBwhIXZFRy0jrNpNy0rIyjw6THTxYgjC4cpzMETrtusxyI0OV+TSqq2JxEiA1nZdygQOkotBmbmHYbOH+5I/7K9Vc2eYW/mMqV+IJ7+PxDkALLkYeGC2OYyRS3FzJYk1qyNx5ucaw+zNAi64uuhGrz1M15kfXlwicyAVlsbfBy4Yas6/y/hjvFad+TGGMMyzs95QDZ03GLjk8IKlLzodKvlC+/7qLgwucsvm3dZgTVx3LYn1FcEAeIxfp4knTodiAp3ggg7RdCDA4xB1tR5LoWqmBguNuhZwQYf4uC5eZ34yjz9KmR48uyI66VsTXCShpK/Tx6gzPwLPucz2bbTQ9wFlup8hqij3yRRgAhezt6b6HC1kegBJBMBsM8/MEP/1N9HKMhJr19p234VpklVdpXDmyJgvxGOco6vLdqo7tGhu7cMsqYebBxSsrltH1l11tLS7m8SqVb44SSTx+ptEWcvX7zZyH4+ln8w9XE1jv9upoV24QMYpXE1BZEa/AZm3NMmgXgmrFzVFiIdSY7j8cTeLJ1b93WhsoZjHvs2TyRY6/SyorTjAl+uQBBmM3saTLAh5xTw+Tok9bxBlMl5XsO6obRPi4XQ/uvR1cFShx6q/x2U0T5yMTwY1Ve18JptQTufdIKX100TlRhLl19iEzJPfUeKV14iWfM9/Ns61ULVQ0yEuQjyanoRPDZcD47u0Gpa7Y56aoMTLvUR4yseUA/madpiLkLKuXrEHbwDnbUTAwmqoVx5z4gwlXkLI4mIAMsiMGqqW219AiPv7z5MhXnXDPFoiQVbdJjJOSzKALix4ABoqaqhaHmgBIeXvbN2PWRrxYG1VvsKyPG9JMjhZxBaZW9bwkcB3aRwcb8WJDXc+cZU3zmpqxE1xAieKOa9LQ2ccQ7gOB8Of/MCBhCRYNLc/R8La5xdYtI2Nbh5NvRcUH05ICPy/rC2J23FbUIJYdqY0jaQ7mNnvBq9S+c9QvooKTJQ9hRb/E6uwLxg5kCuMjAwLJSQBPPjlFAb8abm+LEEOlSsiSSQhGY+b10d4kTsYkSvYjViVIxhhe7QIKXRiYw9I4aqLKTJGxmpK6FB7c4jmtipceycw5NFHVxnM9C++GtCdH7y5gnT9Dsn8MrFh6s8TsHHISJKxCMkAHk5+iK17V65DBRiFDQUVOmMTUikS972A7UgXpstbpE9iipBYM+TML1q3V9Di7DhslU471lNUumYLD34247FrqUUTktnFvZ21lM2M2UMuh9gsaeKhgTNa1X1AxW1ZPpEqzOZjmCycc/DB+nLI+PArziRaWp+Xn+Ki3VH/AW1uqUffgzR5AAAAAElFTkSuQmCC'
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
						zoom: 1.25,
						data: allData,
						selectedMode: 'false', //是否允许选中多个区域
						label: {
							normal: {
								show: true,
								formatter: function (val) {
									//	console.log(val, 9999999999)
									var area_content =
										'{a|' + val.value + '}' + '-' + '{b|' + val.name + '-' + '}';
									return area_content.split("-").join('\n');
								}, //让series 中的文字进行换行
								rich: {
									a: {
										color: '#f6f7ff',
										backgroundColor: {
											image: '../images/img_warning.png'
										},
										padding:[10,6],
										align: 'center',
									},
									
									b: {
										color: '#fff1f8',
										fontFamily: 'Microsoft YaHei',
										fontSize: 14,
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
			} else {

				var option = {
					tooltip: {
						show: false,
						formatter: function (params) {
							return params.name;
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
	label: {
							normal: {
								show: true,
								formatter: function (val) {
									//	console.log(val, 9999999999)
									
									return '{c|'+val.name+'}' 
								}, //让series 中的文字进行换行
								rich: {
							
									
									c: {
										color: 'white',
										fontFamily: 'Microsoft YaHei',
										fontSize: 14,
										textAlign: 'center',
									}
								}, //富文本样式,就是上面的formatter中'{a|'和'{b|'
							},
							emphasis: {
								show: false
							}
						}, //地图中文字内容及样式控制
						},
						//标志
						{
							show: false,
							name: '在建项目',
							type: 'scatter',
							coordinateSystem: 'geo',
							data: building,
							symbol:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABTtJREFUWAnFmH9oW1UUx899SW0y1nWmq2t+WG1RGSj4g00ENyRsuqST+ceYIijIQBSmVK1siI4hU9DhFHFF949/TJChTlCwy37UKhvijyEy6R/+2NZuTVraLWBX2nRpcz3fl6XJy/uR+5JYD7TvvXvP+Z5Pzz0v96aC3NqJkRaa82wiOb+BQ9tJiiAJCukyklIk5CjfXyDhOUHe+W9oQ+SymxRC2fnIyFb23c4Aa4mkRy1OzDPgKfbtpXjkc5WYykCJ0ShX422StEZF0NZH0C9ctZ0UCw7Y+vCEPdBp2UATyQ8Y5BknAddzgg5Qa/h5Wi2yVrHWQH2jrSRyh0nKdVZBNY8JcZKktoW6ghPlWmYgwND8j+zYWe5c5+dzRJ77yqE0Q5JBeR1X5stFgEHaTj0XcpaYEWg49REvE79Fi2TIhZwlVlyyvtRDRLmjJXOLeKttpK7QMSTMV0hKjcu3txaCDp9Guzv89Ou9y+ni/dfT2LoAJe5uplv8xkWwzIHcYGDz6g5Hx57g1/tOS2eFwW3BRtp321JiJoN9m75Kf8/kDGOWD8gNBqKD1yqUe9bSUWGwp91PvavMMLvPTdPe4RkFhWsuMs8gaGC8jTLZFJes2E+KMquXeem7e5rJUxbpGgb5hJDkawhplJnbXA0MNLpv9Jlg+tNZx8rY9hQKwiy8ZDIKcbfm5ao80tpoCruUte+ZHTf5af+qJlNMcUBG0UOR4oD6XbhRo4aypUL0lhsa6eEVhs86XRQwr3cuobuWOh4UIhovV/4so86ie1rBYAKV+/SOJtpUAlWAwXw2J3GxNmbBax+0nnUevZCxXxrAHmKow+OztKJBo/WBhgWx8awDELMAKMM//oUIxZtdHUscPVGpx1aae+zriVmnuAx6KOnkYTX3BvfCy9wTbg1FPTjqCJTkLUP85EZ4D8P0VAGDHD1/TtF5h6UGCyrUrwpUbWXmuW1ePTtNHztXBxj9gvouLyOaGeMHxzUAjNvKoH+/4p55/2KGTk/OVfq7eZ/xt3mpq2WSjozwcZWwuVmaKsw7vHftOT9N7bzLAiY5m6M5x5eqJJ2gLyjeMokl40OI+LBkynCrCrOPYXbxhnqVAbDDD3OvKMPkGfSDWh5oY/gHbqiTBhJ+eOVmtWVCZV5jmKoNucHAlgfSlcSb5YIvtfvKh0zPgEFlarNi7iJQPMTHV3G8VPjnCo1YJ5jjpOfOZy4C4VnTXuSlW3gdnhy8QmemFh5LWakuMMiFnCVmBIoFB/ltW/gWkOZXJf7bpAmqLjCAQC7kLDHzASLxT4Dklb/YOVDwC/Bu+cntTbSmyUvv8mfKW0O19gwrC0qTaLqVYs3pQh5czUAYTSS3U07ux+1/Zpp4jmLh3nJ9ayB8JUmkvuez0trygLo8C3GKYqEHuF9NZxhjDxWywVF6n+IC1mFtCqKFK2tC2wIGHtZAmOlaeZZnd+K2rgZNaNuY9ZIVnPFNIJHs5waPFoZquvKXLu6b9Vwd2x3OvkLIrAd6tvF1siaQvBZr6Fq2MHBzBoJHPDjE/yd8Grc1GTSgVcEqA0EgFvmMPyAOVNCyn0YsNBRMDQhCvvALDHVGQdPoghjEKpo6UFTwtxPxKPfTlKI2epB9OUaPVYtSB4JePPwH/3bTT9w3eowaDXu5A4JsPHyIl+69ihngA1+X5h4ICXzhHQw1YJsLc/CpwqoDivI5xqehn4ZMOTGGOfhUYdUBIVE0dIm8ns2GJkcTYwxzVVr1QEj4YNvvpMnH+U3iXZt/cI+x/90SqW4+rnTXg+Nfs/6bjXIkBk8AAAAASUVORK5CYII=',
							symbolSize: function (val) {
								return 20
							},
							label: {
								normal: {
									show: false,
									formatter: function (params) {
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
							symbol:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABYdJREFUWAm1WF1sVFUQnrm3W4qAAVv8IUaqRlstLWpL0rRF+xeNGHwxjdEYH0wEojaWF02MStVogg/6gIafB1/6YjT6oojV7m7pn2AhUkhjDGoqsfpgBbWG/u3e43fOLrf33r0/5y4yyW7PzHwz8+2cuT+nTDFFdHSU04L1EFnUidCbiOkGIrEhl4Z/I0G/Y32ODBqgFcZhTib/jFOCdcGipb2LLPEsCLSQEKZWHHMWBEfI4Pd5JPWxTkwkIdHc0UYiuxfJtugkDMGME5sv8mgyHYLB7w0QsWNHgibP7kM3dgZAijMzH6Sa27r50KElvwS+hMTWB9eTNfcJ2r3VL+iybUzDZKx8hIeP/OHNVUAoR2b+GDpzixf8v+rMP5NR1uglZTiLiK6uUnTm0ytORhaVPxi1VE0HCRchmp45gG1qcfiv7FLWkjUdYm+ZaGq/n8jqd/hCl4vv7CVrc10oRjqNsz9S6a7uCJzxAI+lvlJ4+SV6ew1i8XZE1LK7pITEHdXLesjKPHwkxJt3obbiADW3ZQNHn8Cebo6OzCFE1e0kSksj4Tw/T2ZyMBKnaksOkBwhIXZFRy0jrNpNy0rIyjw6THTxYgjC4cpzMETrtusxyI0OV+TSqq2JxEiA1nZdygQOkotBmbmHYbOH+5I/7K9Vc2eYW/mMqV+IJ7+PxDkALLkYeGC2OYyRS3FzJYk1qyNx5ucaw+zNAi64uuhGrz1M15kfXlwicyAVlsbfBy4Yas6/y/hjvFad+TGGMMyzs95QDZ03GLjk8IKlLzodKvlC+/7qLgwucsvm3dZgTVx3LYn1FcEAeIxfp4knTodiAp3ggg7RdCDA4xB1tR5LoWqmBguNuhZwQYf4uC5eZ34yjz9KmR48uyI66VsTXCShpK/Tx6gzPwLPucz2bbTQ9wFlup8hqij3yRRgAhezt6b6HC1kegBJBMBsM8/MEP/1N9HKMhJr19p234VpklVdpXDmyJgvxGOco6vLdqo7tGhu7cMsqYebBxSsrltH1l11tLS7m8SqVb44SSTx+ptEWcvX7zZyH4+ln8w9XE1jv9upoV24QMYpXE1BZEa/AZm3NMmgXgmrFzVFiIdSY7j8cTeLJ1b93WhsoZjHvs2TyRY6/SyorTjAl+uQBBmM3saTLAh5xTw+Tok9bxBlMl5XsO6obRPi4XQ/uvR1cFShx6q/x2U0T5yMTwY1Ve18JptQTufdIKX100TlRhLl19iEzJPfUeKV14iWfM9/Ns61ULVQ0yEuQjyanoRPDZcD47u0Gpa7Y56aoMTLvUR4yseUA/madpiLkLKuXrEHbwDnbUTAwmqoVx5z4gwlXkLI4mIAMsiMGqqW219AiPv7z5MhXnXDPFoiQVbdJjJOSzKALix4ABoqaqhaHmgBIeXvbN2PWRrxYG1VvsKyPG9JMjhZxBaZW9bwkcB3aRwcb8WJDXc+cZU3zmpqxE1xAieKOa9LQ2ccQ7gOB8Of/MCBhCRYNLc/R8La5xdYtI2Nbh5NvRcUH05ICPy/rC2J23FbUIJYdqY0jaQ7mNnvBq9S+c9QvooKTJQ9hRb/E6uwLxg5kCuMjAwLJSQBPPjlFAb8abm+LEEOlSsiSSQhGY+b10d4kTsYkSvYjViVIxhhe7QIKXRiYw9I4aqLKTJGxmpK6FB7c4jmtipceycw5NFHVxnM9C++GtCdH7y5gnT9Dsn8MrFh6s8TsHHISJKxCMkAHk5+iK17V65DBRiFDQUVOmMTUikS972A7UgXpstbpE9iipBYM+TML1q3V9Di7DhslU471lNUumYLD34247FrqUUTktnFvZ21lM2M2UMuh9gsaeKhgTNa1X1AxW1ZPpEqzOZjmCycc/DB+nLI+PArziRaWp+Xn+Ki3VH/AW1uqUffgzR5AAAAAElFTkSuQmCC',
							symbolSize: function (val) {
								return 20
							},
							label: {
								normal: {
									show: false,
									formatter: function (params) {
										var str = "<div>\
										<h3>"+params.name+"1231</h3>\
										</div>";
										return str;
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