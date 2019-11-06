$(function() {
  var myChart = echarts.init(document.getElementById('map'))
  //一共要显示5种颜色的数据，这里按颜色分组
  //数据载入，这里需要自己定义自己的数据，主要是[{value : [lng,lat]}]

  var redData = [
    { value: [113.583339, 22.299965] },
    { value: [113.582198, 22.299329] }
  ]

  var greenData = [{ value: [113.58394, 22.299965] }]
  /*数据分组的代码省略*/
  var option = {
    //标题设置
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
          params.data.count +
          "</a>个</p>\
                <p style='color:#6CA7E4'>人员总数：<a style='text-decoration:underline;color:#8DEF2F' >" +
          params.data.workerCount +
          '</a>人</p>\
                </div>'
        )
      }
    },
    //图例,name的值要与下面series中的name值对应上才会有效果
    legend: {
      data: [
        {
          name: '不法户',
          icon: 'circle',
          textStyle: {
            color: '#ff0000'
          }
        },

        {
          name: '正常户',
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
      //bottom : '60px'
      top: '400px'
    },
    //百度地图配置，必须配置项
    bmap: {
      //中心坐标，如下定义为常德
      center: [113.582584, 22.298656, 19],
      //地图初始显示的缩放大小
      zoom: 19,
      roam: false,
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
    //散点数据的配置
    series: [
      {
        name: '不法户',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        //数据载入，这里需要自己定义自己的数据，主要是[{value : [lng,lat]}]
        data: redData,
        symbolSize: 5,
        //配置标签的显示
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
        //配置散点的颜色
        itemStyle: {
          normal: {
            shadowBlur: 2,
            shadowColor: '#ff0000',
            color: '#ff0000'
          }
        }
      },

      {
        name: '正常户',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        //数据载入，这里需要自己定义自己的数据，主要是[{value : [lng,lat]}]
        data: greenData,
        symbolSize: 5,
        //配置标签的显示
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
        //配置散点的颜色
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
  // function toolTipFormatter(param) {
  //   //param传进来的是鼠标悬停点的series内容，可用param.data来获取data内容
  //   //这里可以根据需求拼HTML字符串然后返回
  //   return '<div>...</div>'
  // }
  //这是让echarts真正开始干活的代码
  myChart.setOption(option)
  // 百度地图实例,使用变量map的方式和BMap的实例使用方式一致
  var map = myChart
    .getModel()
    .getComponent('bmap')
    .getBMap()
})
