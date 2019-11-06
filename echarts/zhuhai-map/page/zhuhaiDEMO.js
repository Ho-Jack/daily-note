$(function () {


	var myChart = echarts.init(document.getElementById('map'));
	//各省份的地图json文件
	var geoCoordMap = {
	 "a":[113.31985473632812, 22.07927714382793],
    "b":[ 113.22647094726562,
          22.137803695626545],
    "c":[ 113.50662231445312,
          22.191219750968507],
    "d":[  113.54644775390625,
          22.313237278525385],
    "e":[  113.58352661132812,
          22.3424548401465],
    "f":[  113.55743408203124,
          22.355156218589755],
    "g":[  113.52035522460938,
          22.37928564733929],
    "h":[113.53134155273438,
          22.36023644579937],
   

	};


var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push(geoCoord.concat(data[i].value));
        }
    }
    return res;
};


	
	loadMap('../javascripts/Echarts/aaa.json', 'zhuhai'); //初始化惠州地
	/**
	 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
	 @params {String} mapCode:json数据的地址
	 @params {String} name: 地图名称
	 */
	function loadMap(mapCode, name) {
		$.get(mapCode, function (data) {
			echarts.registerMap(name, data);
		
		

				var option = {
					
    backgroundColor: 'white',
	 
					 visualMap: {
        min: 0,
        max: 500,
        splitNumber: 5,
        inRange: {
            color: ['#d94e5d','#eac736','#50a3ba'].reverse()
        },
        textStyle: {
            color: 'black'
        }
		
    },
	
	 geo: {
        map: name,
		
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                areaColor: '#5F7187',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#5F7187'
            }
        }
    },
				  series: [{
        name: 'AQI',
        type: 'heatmap',
        coordinateSystem: 'geo',
        data: convertData([
            {name: "a", value: 400},
            {name: "b", value: 500},
            {name: "c", value: 400},
            {name: "d", value: 500},
            {name: "e", value: 600},
            {name: "f", value: 100},
           {name: "g", value: 500},
		    {name: "h", value: 500},
			
        ])
    }]
				};
	
			myChart.setOption(option);
		

		});
	}
})