$(function () {

    var data = [
        { name: '更合镇', value: 15, pm10: 11, zy: 1 },
        { name: '明城镇', value: 10, pm10: 22, zy: 2 },
        { name: '杨和镇', value: 60, pm10: 33, zy: 3 },
        { name: '荷城街道', value: 1, pm10: 44, zy: 4 },
        { name: '西江新城', value: 5, pm10: 55, zy: 5 }]

       console.log( data.sort((a,b)=>a.value-b.value));
        var Data= data.sort((a,b)=>a.value-b.value)
        
    var mapChart = echarts.init(document.getElementById('map'));
    //加载地图json文件
    loadMap('../map/gaoming.json', 'gaoming'); //初始化地图


    /**
     获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
     @params {String} mapCode:json数据的地址
     @params {String} name: 地图名称
     */
    function loadMap(mapCode, name) {
        $.get(mapCode, function (geoJson) {
            echarts.registerMap(name, geoJson);
            //惠州整体数据
            var option = {
                //   backgroundColor:'yellow',
                title: {
                    text: "高明区",
                    x: 'right',
                    y: 'bottom',
                    textStyle: {
                        color: '#fff'
                    },
                    padding: [60, 40]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (val) {
                           if(val.seriesType=="bar"){
                               
                              return ''
                           }else{
                            return `${val.data.name}<br/>PM2.5：${val.data.value} ug/m³<br/>PM10：${val.data.pm10} ug/m³<br/>噪音：${val.data.zy} db`;//返回可以含有html中标签
                           }
                     
                    }, //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
                },

                xAxis: [
                    {
                        type: "value",
                        position: 'top',
                        inside: false,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        
                    }
                ],
                yAxis: [
                    {
                        type: "category",
                        boundaryGap: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            align: "right",
                            fontSize:"10" ,
                            color:'#383C4E'  
                         //   showMaxLabel: true,//是否显示最小 tick 的 label。
                        },
                        data: Data.map(item=>item.name)
                    }
                ],
                // visualMap: {
                //     //    type: 'piecewise', //图例分块（分段型。）

                //     min: 0,
                //     max: 50,
                //     right: '10%',
                //     top: 'bottom',
                //     text: ['高', '低'], // 文本，默认为数值文本
                //     calculable: true   //图例是否分块
                // },
                visualMap: {
                    type: 'continuous',
                    min: 0,
                    max: 50,
                    text: ['多', '少'],

                    dimension: 0, //指定用数据的『哪个维度』，映射到视觉元素上。
                    realtime: false,
                    right: 0,
                    itemWidth: 18,
                    itemHeight: 100,
                    calculable: true,

                },
                grid: {
                    top:'0%',
                    left: "0%",
                  //  right: "4%",
                    bottom: "85%",
                    containLabel: true
                  },
                series: [
                    {
                        name: '11',
                        type: 'map',
                        mapType: name,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                textStyle: {
                                    color: '#fff'
                                },
                                borderWidth: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#fce8ca',
                                areaColor: '#fff',
                            },
                            emphasis: {
                                areaColor: '#b44316',
                                opacity:0.3,
                                borderWidth: 1
                            }
                        },
                        animation: false,

                        data: Data
                    },
                    {
                        name: "pm2.5",
                        type: "bar",
                        //roam: false,
                      //  visualMap: false,
                        // itemStyle: {
                        //   color: "#60ACFC"
                        // },
                        barCategoryGap : "0%", // 柱图间距
                        barWidth: 18,
                        label: {
                            normal: {
                                show: true,
                                fontSize: 12,
                                color:'#A4A7B6',
                                position: 'right'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:Data.map(item=>item.value)
                    }
                ]
            };

            mapChart.setOption(option);
            window.addEventListener('resize', function () {

                mapChart.resize();

            });

        });
    }
})