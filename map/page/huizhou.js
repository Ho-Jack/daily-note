$(function(){
	var myChart = echarts.init(document.getElementById('map'));
	$.get('./Echarts/huizhou.json',function(geoJson){
		echarts.registerMap('xicheng',geoJson,{});
		var option = {
			title : {
				text : '惠州快要倒闭的楼盘',
			
			
			},
		    tooltip: {
		        trigger: 'item',
            	formatter: '<img src="./img/img.svg" style="width:20px;height:20px"/>30个'
		    },
		    series: [
		        {
		        	name: '惠州',
		            type: 'map',
		            mapType: 'xicheng',  //这个不知道干嘛的，改了就报错
		            aspectScale: 1,  //地图长度比
		            label: {
		                normal: {
		                    show: true,
		                    textStyle: {
		                        color: 'red'  //常规字颜色
		                    }
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        color: 'blue' //选中字颜色
		                    }
		                }
		            }
		        }
		    ]
		};
		myChart.setOption(option);
	});
});