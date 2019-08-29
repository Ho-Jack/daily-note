$(function () {


	var myChart = echarts.init(document.getElementById('map'));
	//各省份的地图json文件
	var geoCoordMap = {
	  "a":[114.3791770935,23.1181012424],
    "b":[114.3732547760,23.1151804946],
    "c":[114.3714523315,23.0592003824],
    "d":[114.4311904907,22.9836811603],
    "e":[23.0389818092,114.5486068726],
    "f":[23.0516187732,114.6389007568],
    "g":[23.1473052231,114.5376205444],
    "h":[23.3126215393,114.3381500244],
   

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


	
	loadMap('../javascripts/Echarts/huizhou.json', 'huizhou'); //初始化惠州地
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
		

				var option = {
					   title: {
        text: '热力图',
        subtext: '',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    backgroundColor: '#404a59',
					 visualMap: {
        min: 0,
        max: 500,
        splitNumber: 5,
        inRange: {
            color: ['#d94e5d','#eac736','#50a3ba'].reverse()
        },
        textStyle: {
            color: '#fff'
        }
    },
	 geo: {
        map: name,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
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