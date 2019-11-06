$(function() {
  var myChart = echarts.init(document.getElementById('map'))

  loadMap('../javascripts/Echarts/luoyang.json', 'luoyang') //初始化惠州地
  /**
	 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
	 @params {String} mapCode:json数据的地址
	 @params {String} name: 地图名称
	 */
  function loadMap(mapCode, name) {
    $.get(mapCode, function(data) {
      echarts.registerMap(name, data)
      var option = {
        backgroundColor: '#051E41',
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
            'padding:10px 20px;box-shadow:1px 1px 10px #d0d0d0;color: #ffff;',
          formatter: function(params) {
            return (
              "<div>\
                      <p style='color:#ffff;margin-bottom:10px;font-size:20px'>" +
              params.data.name +
              "</p>\
                      <p style='color:#6CA7E4'>项目总数：<a style='text-decoration:underline;color:#8DEF2F' href='javascript:searchProject(\"" +
              params.data.name +
              '")\'>' +
              params.data.value +
              "</a>个</p>\
                      <p style='color:#6CA7E4'>人员总数：<a style='text-decoration:underline;color:#8DEF2F' >" +
              params.data.workerCount +
              '</a>人</p>\
                      </div>'
            )
          }
        },
        visualMap: {
          show: false,
          x: '5%',
          y: '10%',
          min: 1,
          max: 15,
          pieces: [
            {
              start: 1,
              end: 1,
              label: '新安县',
              color: '#CDA8A8'
            },
            {
              start: 2,
              end: 2,
              label: '汝阳县',
              color: '#1CA503'
            },
            {
              start: 3,
              end: 3,
              label: '栾川县',
              color: '#CA79CD'
            },

            {
              start: 4,
              end: 4,
              label: '瀍河回族区',
              color: '#5cd65c'
            },
            {
              start: 5,
              end: 5,
              label: '洛宁县',
              color: '#A5D119'
            },
            {
              start: 6,
              end: 6,
              label: '宜阳县',
              color: '#1DA2CC'
            },
            {
              start: 7,
              end: 7,
              label: '孟津县',
              color: '#A374CC'
            },
            {
              start: 8,
              end: 8,
              label: '偃师市',
              color: '#C87A1D'
            },
            {
              start: 9,
              end: 9,
              label: '吉利区',
              color: '#A4A91F'
            },
            {
              start: 10,
              end: 10,
              label: '洛龙区',
              color: '#7EA4CF'
            },
            {
              start: 11,
              end: 11,
              label: '老城区',
              color: '#A17914'
            },

            {
              start: 12,
              end: 12,
              label: '嵩县',
              color: '#CDA616'
            },
            {
              start: 13,
              end: 13,
              label: '西工区',
              color: '#5cd65c'
            },
            {
              start: 14,
              end: 14,
              label: '涧西区',
              color: '#CAD31A'
            },
            {
              start: 15,
              end: 15,
              label: '伊川县',
              color: '#A3A6D0'
            }
          ]
        },
        series: [
          {
            name: 'AQI',
            type: 'map',
            map: name,
            itemStyle: {
              areaColor: '#1e9eff',
              color: '#1e9eff',
              borderColor: '#fff',
              borderWidth: 0
            },

            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#333'
                }
              }
            },
            label: {
              normal: {
                show: true
              }
            }, //地图中文字内容及样式控制
            data: [
              { name: '新安县', value: 1 },
              { name: '汝阳县', value: 2 },
              { name: '栾川县', value: 3 },
              { name: '瀍河回族区', value: 4 },
              { name: '洛宁县', value: 5 },
              { name: '宜阳县', value: 6 },
              { name: '孟津县', value: 7 },
              { name: '偃师市', value: 8 },
              { name: '吉利区', value: 9 },
              { name: '洛龙区', value: 10 },
              { name: '老城区', value: 11 },
              { name: '嵩县', value: 12 },
              { name: '西工区', value: 13 },
              { name: '涧西区', value: 14 },
              { name: '伊川县', value: 15 }
            ]
          }
        ]
      }

      myChart.setOption(option)
    })
  }
})
