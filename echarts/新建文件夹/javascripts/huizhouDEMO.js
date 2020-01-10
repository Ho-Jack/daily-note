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
        status: "停工",
        jsdw: "建设单位1",
        sgdw: "施工单位1",
        cblx: "超标类型1",
    },
        {
            name: '测试点2',
            value: [115.15594482421874, 23.22620304830155, 80],
            status: "停工",
            jsdw: "建设单位1",
            sgdw: "施工单位1",
            cblx: "超标类型1",
        },

    ];
    //总预警项目 \ 114.21112060546875, 23.324602156920964
    114.1204833984375,23.67219738298302
    var warmingTotal = [{
        name: '惠东县',
        value: [114.9774169921875, 23.1959117878095, 120],
        total: 222
    },
        {
            name: '龙门',
            value: [   114.1094970703125,
                23.713696173823276, 120],
            total: 222
        },
        {
            name: '博罗',
            value: [114.21112060546875,23.324602156920964, 120],
            total: 111
        },
        {
            name: '仲恺',
            value: [  114.33403015136719,
                23.085416821274503, 120],
            total: 111
        },
        {
            name: '惠阳区',
            value: [  114.37110900878906,22.92804166565176, 120],
            total: 111
        },
        {
            name: '惠城区',
            value: [   114.52835083007812,23.24639340521435  , 120],
            total: 111
        },
        {
            name: '大亚湾',
            value: [   114.57435607910156,22.818592860572195
                , 120],
            total: 111
        },
    ]
    //预警项目
    var warming = [{
        name: '测试点1测试点1测试点1测试点1测试点1测试点1测试点1',
        value: [115.09002685546875, 23.092364899997815, 120],
        status: "停工",
        jsdw: "建设单位1",
        sgdw: "施工单位1",
        cblx: "超标类型1",
    },
        {
            name: '测试点2',
            value: [114.99114990234375, 23.185813175302915, 80],
            status: "停工",
            jsdw: "建设单位1",
            sgdw: "施工单位1",
            cblx: "超标类型1",
        },
        {
            name: '测试点3',
            value: [114.8675537109375, 22.950806043101025, 80],
            status: "停工",
            jsdw: "建设单位1",
            sgdw: "施工单位1",
            cblx: "超标类型1",
        },

    ];

    //各省份的数据
    var allData = [{
        name: '龙门县',
        value: 1111,


    }, {
        name: '博罗县',
        value: 2222,

    }, {
        name: '惠阳区',
        value: 3333,

    }, {
        name: '仲恺区',
        value: 4444,

    }, {
        name: '惠城区',
        value: 555,

    }, {
        name: '大亚湾区',
        value: 6666,

    }, {
        name: '惠东县',
        value: 7777,

    },];
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

    loadMap('../javascripts/Echarts/huizhou.json', 'huizhou'); //初始化惠州地图

    var timeFn = null;

    //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
    myChart.on('click', function (params) {

        clearTimeout(timeFn);
        //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
        timeFn = setTimeout(function () {
            var name = params.name; //地区name
            //debugger
            var mapCode = ququ[name]; //地区的json数据地址
            myChart.clear();   //清楚返回时上个地图的信息
            if (!mapCode) {
                if (params.seriesType === "scatter") {

                    alert("跳转到详情页，参数是：" + JSON.stringify(params.data));
                   
                } else {
                    console.log('无法加载地图')

                }
                return
            }

            console.log(params);
            console.log('你点击了一下')

            //加载地区地图
            // if (params.seriesType === "map") {
            //     console.log(name)
            //     loadMap(mapCode, name);
            // }
            loadMap(mapCode, name);
        }, 250);
    });


    // 绑定双击事件，返回惠州地图
    myChart.on('dblclick', function (params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        clearTimeout(timeFn);
        myChart.clear();   //清楚返回时上个地图的信息
        //返回惠州地图
        console.log('你双击了')
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
            //惠州整体数据
            if (name == "huizhou") {
                var option = {
                    title:{
                        text:"惠州市",
                        x:'right',
                        y:'bottom',
                        textStyle: {
                            color: '#fff'
                        },
                        padding:[60,40]
                    },
                    //图例
                    legend: {
          // orient: 'vertical',
                        id:1,
                    //    zlevel:1,
                      y: 'bottom',
                      x: 'right',
                        itemWidth: 15,
                      //  backgroundColor:'#0E2C42',
                       // borderWidth:0.1,
                        padding:[rate*40,rate*70],
                        title:'111',
                        data: [

                            {
                                name: '总预警',
                               // icon: "react"
                                icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABYdJREFUWAm1WF1sVFUQnrm3W4qAAVv8IUaqRlstLWpL0rRF+xeNGHwxjdEYH0wEojaWF02MStVogg/6gIafB1/6YjT6oojV7m7pn2AhUkhjDGoqsfpgBbWG/u3e43fOLrf33r0/5y4yyW7PzHwz8+2cuT+nTDFFdHSU04L1EFnUidCbiOkGIrEhl4Z/I0G/Y32ODBqgFcZhTib/jFOCdcGipb2LLPEsCLSQEKZWHHMWBEfI4Pd5JPWxTkwkIdHc0UYiuxfJtugkDMGME5sv8mgyHYLB7w0QsWNHgibP7kM3dgZAijMzH6Sa27r50KElvwS+hMTWB9eTNfcJ2r3VL+iybUzDZKx8hIeP/OHNVUAoR2b+GDpzixf8v+rMP5NR1uglZTiLiK6uUnTm0ytORhaVPxi1VE0HCRchmp45gG1qcfiv7FLWkjUdYm+ZaGq/n8jqd/hCl4vv7CVrc10oRjqNsz9S6a7uCJzxAI+lvlJ4+SV6ew1i8XZE1LK7pITEHdXLesjKPHwkxJt3obbiADW3ZQNHn8Cebo6OzCFE1e0kSksj4Tw/T2ZyMBKnaksOkBwhIXZFRy0jrNpNy0rIyjw6THTxYgjC4cpzMETrtusxyI0OV+TSqq2JxEiA1nZdygQOkotBmbmHYbOH+5I/7K9Vc2eYW/mMqV+IJ7+PxDkALLkYeGC2OYyRS3FzJYk1qyNx5ucaw+zNAi64uuhGrz1M15kfXlwicyAVlsbfBy4Yas6/y/hjvFad+TGGMMyzs95QDZ03GLjk8IKlLzodKvlC+/7qLgwucsvm3dZgTVx3LYn1FcEAeIxfp4knTodiAp3ggg7RdCDA4xB1tR5LoWqmBguNuhZwQYf4uC5eZ34yjz9KmR48uyI66VsTXCShpK/Tx6gzPwLPucz2bbTQ9wFlup8hqij3yRRgAhezt6b6HC1kegBJBMBsM8/MEP/1N9HKMhJr19p234VpklVdpXDmyJgvxGOco6vLdqo7tGhu7cMsqYebBxSsrltH1l11tLS7m8SqVb44SSTx+ptEWcvX7zZyH4+ln8w9XE1jv9upoV24QMYpXE1BZEa/AZm3NMmgXgmrFzVFiIdSY7j8cTeLJ1b93WhsoZjHvs2TyRY6/SyorTjAl+uQBBmM3saTLAh5xTw+Tok9bxBlMl5XsO6obRPi4XQ/uvR1cFShx6q/x2U0T5yMTwY1Ve18JptQTufdIKX100TlRhLl19iEzJPfUeKV14iWfM9/Ns61ULVQ0yEuQjyanoRPDZcD47u0Gpa7Y56aoMTLvUR4yseUA/madpiLkLKuXrEHbwDnbUTAwmqoVx5z4gwlXkLI4mIAMsiMGqqW219AiPv7z5MhXnXDPFoiQVbdJjJOSzKALix4ABoqaqhaHmgBIeXvbN2PWRrxYG1VvsKyPG9JMjhZxBaZW9bwkcB3aRwcb8WJDXc+cZU3zmpqxE1xAieKOa9LQ2ccQ7gOB8Of/MCBhCRYNLc/R8La5xdYtI2Nbh5NvRcUH05ICPy/rC2J23FbUIJYdqY0jaQ7mNnvBq9S+c9QvooKTJQ9hRb/E6uwLxg5kCuMjAwLJSQBPPjlFAb8abm+LEEOlSsiSSQhGY+b10d4kTsYkSvYjViVIxhhe7QIKXRiYw9I4aqLKTJGxmpK6FB7c4jmtipceycw5NFHVxnM9C++GtCdH7y5gnT9Dsn8MrFh6s8TsHHISJKxCMkAHk5+iK17V65DBRiFDQUVOmMTUikS972A7UgXpstbpE9iipBYM+TML1q3V9Di7DhslU471lNUumYLD34247FrqUUTktnFvZ21lM2M2UMuh9gsaeKhgTNa1X1AxW1ZPpEqzOZjmCycc/DB+nLI+PArziRaWp+Xn+Ki3VH/AW1uqUffgzR5AAAAAElFTkSuQmCC'
                            },

                        ],
                        textStyle: {
                            color: '#fff',
                            fontSize:15
                        }
                    },
                    geo: {
                        map: "huizhou",
                        show: true,
                        roam: "move",
                        label: {
                            normal: {
                                show: true,

                                textStyle: {
                                    color: '#F7F7F7',
                                    fontSize: 25 * rate
                                }
                            },
                            emphasis: {
                                show: true,
                                color: 'yellow'
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#1773c3',
                                shadowColor: '#031525',
                                shadowBlur: 20
                            },
                            emphasis: {
                                areaColor: '#051217',
                            },
                        },
                        zoom: 1.2,
                    },
                    series: [
                        //渲染地图
                        {
                            type: 'map',
                            coordinateSystem: 'geo',
                          //  zoom: 1.2,
                        },
                        {
                            name: '总预警',
                            type: 'scatter',
                            coordinateSystem: 'geo',//该系列使用的坐标系
                            data: warmingTotal,
                            symbol: 'image://data:image/png;base64,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',
                            symbolSize: [150 * rate,  80*rate],
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return '{f|' + params.data.total + '}'
                                },
                                rich: {
                                    f: {
                                        color: 'white',
                                        width: 40 * rate,
                                        padding: [rate * 20, 1 * rate, 1, 20 * rate],
                                    }
                                }


                            }
                        },


                    ]
                };
            } else {
                var option = {
                    title:{
                        show:true,
                        x:'right',
                        y:'bottom',
                        textStyle: {
                            color: '#fff'
                        },
                        text:name,
                        padding:[80,60]
                    },
                    //图例
                    legend: {
                        orient: 'vertical',
                        id: 1,
                        y: 'bottom',
                        x: 'right',
                        itemWidth: 15,
                        padding:[rate*40,rate*70],
                        data: [{
                            name: '在建项目',
                            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABTtJREFUWAnFmH9oW1UUx899SW0y1nWmq2t+WG1RGSj4g00ENyRsuqST+ceYIijIQBSmVK1siI4hU9DhFHFF949/TJChTlCwy37UKhvijyEy6R/+2NZuTVraLWBX2nRpcz3fl6XJy/uR+5JYD7TvvXvP+Z5Pzz0v96aC3NqJkRaa82wiOb+BQ9tJiiAJCukyklIk5CjfXyDhOUHe+W9oQ+SymxRC2fnIyFb23c4Aa4mkRy1OzDPgKfbtpXjkc5WYykCJ0ShX422StEZF0NZH0C9ctZ0UCw7Y+vCEPdBp2UATyQ8Y5BknAddzgg5Qa/h5Wi2yVrHWQH2jrSRyh0nKdVZBNY8JcZKktoW6ghPlWmYgwND8j+zYWe5c5+dzRJ77yqE0Q5JBeR1X5stFgEHaTj0XcpaYEWg49REvE79Fi2TIhZwlVlyyvtRDRLmjJXOLeKttpK7QMSTMV0hKjcu3txaCDp9Guzv89Ou9y+ni/dfT2LoAJe5uplv8xkWwzIHcYGDz6g5Hx57g1/tOS2eFwW3BRtp321JiJoN9m75Kf8/kDGOWD8gNBqKD1yqUe9bSUWGwp91PvavMMLvPTdPe4RkFhWsuMs8gaGC8jTLZFJes2E+KMquXeem7e5rJUxbpGgb5hJDkawhplJnbXA0MNLpv9Jlg+tNZx8rY9hQKwiy8ZDIKcbfm5ao80tpoCruUte+ZHTf5af+qJlNMcUBG0UOR4oD6XbhRo4aypUL0lhsa6eEVhs86XRQwr3cuobuWOh4UIhovV/4so86ie1rBYAKV+/SOJtpUAlWAwXw2J3GxNmbBax+0nnUevZCxXxrAHmKow+OztKJBo/WBhgWx8awDELMAKMM//oUIxZtdHUscPVGpx1aae+zriVmnuAx6KOnkYTX3BvfCy9wTbg1FPTjqCJTkLUP85EZ4D8P0VAGDHD1/TtF5h6UGCyrUrwpUbWXmuW1ePTtNHztXBxj9gvouLyOaGeMHxzUAjNvKoH+/4p55/2KGTk/OVfq7eZ/xt3mpq2WSjozwcZWwuVmaKsw7vHftOT9N7bzLAiY5m6M5x5eqJJ2gLyjeMokl40OI+LBkynCrCrOPYXbxhnqVAbDDD3OvKMPkGfSDWh5oY/gHbqiTBhJ+eOVmtWVCZV5jmKoNucHAlgfSlcSb5YIvtfvKh0zPgEFlarNi7iJQPMTHV3G8VPjnCo1YJ5jjpOfOZy4C4VnTXuSlW3gdnhy8QmemFh5LWakuMMiFnCVmBIoFB/ltW/gWkOZXJf7bpAmqLjCAQC7kLDHzASLxT4Dklb/YOVDwC/Bu+cntTbSmyUvv8mfKW0O19gwrC0qTaLqVYs3pQh5czUAYTSS3U07ux+1/Zpp4jmLh3nJ9ayB8JUmkvuez0trygLo8C3GKYqEHuF9NZxhjDxWywVF6n+IC1mFtCqKFK2tC2wIGHtZAmOlaeZZnd+K2rgZNaNuY9ZIVnPFNIJHs5waPFoZquvKXLu6b9Vwd2x3OvkLIrAd6tvF1siaQvBZr6Fq2MHBzBoJHPDjE/yd8Grc1GTSgVcEqA0EgFvmMPyAOVNCyn0YsNBRMDQhCvvALDHVGQdPoghjEKpo6UFTwtxPxKPfTlKI2epB9OUaPVYtSB4JePPwH/3bTT9w3eowaDXu5A4JsPHyIl+69ihngA1+X5h4ICXzhHQw1YJsLc/CpwqoDivI5xqehn4ZMOTGGOfhUYdUBIVE0dIm8ns2GJkcTYwxzVVr1QEj4YNvvpMnH+U3iXZt/cI+x/90SqW4+rnTXg+Nfs/6bjXIkBk8AAAAASUVORK5CYII='
                        },
                            {
                                name: '预警项目',
                                icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABYdJREFUWAm1WF1sVFUQnrm3W4qAAVv8IUaqRlstLWpL0rRF+xeNGHwxjdEYH0wEojaWF02MStVogg/6gIafB1/6YjT6oojV7m7pn2AhUkhjDGoqsfpgBbWG/u3e43fOLrf33r0/5y4yyW7PzHwz8+2cuT+nTDFFdHSU04L1EFnUidCbiOkGIrEhl4Z/I0G/Y32ODBqgFcZhTib/jFOCdcGipb2LLPEsCLSQEKZWHHMWBEfI4Pd5JPWxTkwkIdHc0UYiuxfJtugkDMGME5sv8mgyHYLB7w0QsWNHgibP7kM3dgZAijMzH6Sa27r50KElvwS+hMTWB9eTNfcJ2r3VL+iybUzDZKx8hIeP/OHNVUAoR2b+GDpzixf8v+rMP5NR1uglZTiLiK6uUnTm0ytORhaVPxi1VE0HCRchmp45gG1qcfiv7FLWkjUdYm+ZaGq/n8jqd/hCl4vv7CVrc10oRjqNsz9S6a7uCJzxAI+lvlJ4+SV6ew1i8XZE1LK7pITEHdXLesjKPHwkxJt3obbiADW3ZQNHn8Cebo6OzCFE1e0kSksj4Tw/T2ZyMBKnaksOkBwhIXZFRy0jrNpNy0rIyjw6THTxYgjC4cpzMETrtusxyI0OV+TSqq2JxEiA1nZdygQOkotBmbmHYbOH+5I/7K9Vc2eYW/mMqV+IJ7+PxDkALLkYeGC2OYyRS3FzJYk1qyNx5ucaw+zNAi64uuhGrz1M15kfXlwicyAVlsbfBy4Yas6/y/hjvFad+TGGMMyzs95QDZ03GLjk8IKlLzodKvlC+/7qLgwucsvm3dZgTVx3LYn1FcEAeIxfp4knTodiAp3ggg7RdCDA4xB1tR5LoWqmBguNuhZwQYf4uC5eZ34yjz9KmR48uyI66VsTXCShpK/Tx6gzPwLPucz2bbTQ9wFlup8hqij3yRRgAhezt6b6HC1kegBJBMBsM8/MEP/1N9HKMhJr19p234VpklVdpXDmyJgvxGOco6vLdqo7tGhu7cMsqYebBxSsrltH1l11tLS7m8SqVb44SSTx+ptEWcvX7zZyH4+ln8w9XE1jv9upoV24QMYpXE1BZEa/AZm3NMmgXgmrFzVFiIdSY7j8cTeLJ1b93WhsoZjHvs2TyRY6/SyorTjAl+uQBBmM3saTLAh5xTw+Tok9bxBlMl5XsO6obRPi4XQ/uvR1cFShx6q/x2U0T5yMTwY1Ve18JptQTufdIKX100TlRhLl19iEzJPfUeKV14iWfM9/Ns61ULVQ0yEuQjyanoRPDZcD47u0Gpa7Y56aoMTLvUR4yseUA/madpiLkLKuXrEHbwDnbUTAwmqoVx5z4gwlXkLI4mIAMsiMGqqW219AiPv7z5MhXnXDPFoiQVbdJjJOSzKALix4ABoqaqhaHmgBIeXvbN2PWRrxYG1VvsKyPG9JMjhZxBaZW9bwkcB3aRwcb8WJDXc+cZU3zmpqxE1xAieKOa9LQ2ccQ7gOB8Of/MCBhCRYNLc/R8La5xdYtI2Nbh5NvRcUH05ICPy/rC2J23FbUIJYdqY0jaQ7mNnvBq9S+c9QvooKTJQ9hRb/E6uwLxg5kCuMjAwLJSQBPPjlFAb8abm+LEEOlSsiSSQhGY+b10d4kTsYkSvYjViVIxhhe7QIKXRiYw9I4aqLKTJGxmpK6FB7c4jmtipceycw5NFHVxnM9C++GtCdH7y5gnT9Dsn8MrFh6s8TsHHISJKxCMkAHk5+iK17V65DBRiFDQUVOmMTUikS972A7UgXpstbpE9iipBYM+TML1q3V9Di7DhslU471lNUumYLD34247FrqUUTktnFvZ21lM2M2UMuh9gsaeKhgTNa1X1AxW1ZPpEqzOZjmCycc/DB+nLI+PArziRaWp+Xn+Ki3VH/AW1uqUffgzR5AAAAAElFTkSuQmCC'
                            },

                        ],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        show: true,
                        formatter: function (params) {
                            return "";
                        },
                    },
                    geo: {
                        map: name,
                        show: true,
                        roam: true,
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#F7F7F7',
                                    fontSize: 25 * rate
                                },
                            },
                            emphasis: {
                                show: true,
                                color: 'yellow'
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#1773c3',
                                shadowColor: '#031525',
                                shadowBlur: 20
                            },
                            emphasis: {
                                areaColor: '#051217',
                            },
                        },
                        zoom: 1.2,
                    },
                    series: [{
                        name: 'MAP',
                        type: 'map',
                        zoom: 1.2,


                    },
                        // 标志
                        {
                            name: '在建项目',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: building,
                            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABTtJREFUWAnFmH9oW1UUx899SW0y1nWmq2t+WG1RGSj4g00ENyRsuqST+ceYIijIQBSmVK1siI4hU9DhFHFF949/TJChTlCwy37UKhvijyEy6R/+2NZuTVraLWBX2nRpcz3fl6XJy/uR+5JYD7TvvXvP+Z5Pzz0v96aC3NqJkRaa82wiOb+BQ9tJiiAJCukyklIk5CjfXyDhOUHe+W9oQ+SymxRC2fnIyFb23c4Aa4mkRy1OzDPgKfbtpXjkc5WYykCJ0ShX422StEZF0NZH0C9ctZ0UCw7Y+vCEPdBp2UATyQ8Y5BknAddzgg5Qa/h5Wi2yVrHWQH2jrSRyh0nKdVZBNY8JcZKktoW6ghPlWmYgwND8j+zYWe5c5+dzRJ77yqE0Q5JBeR1X5stFgEHaTj0XcpaYEWg49REvE79Fi2TIhZwlVlyyvtRDRLmjJXOLeKttpK7QMSTMV0hKjcu3txaCDp9Guzv89Ou9y+ni/dfT2LoAJe5uplv8xkWwzIHcYGDz6g5Hx57g1/tOS2eFwW3BRtp321JiJoN9m75Kf8/kDGOWD8gNBqKD1yqUe9bSUWGwp91PvavMMLvPTdPe4RkFhWsuMs8gaGC8jTLZFJes2E+KMquXeem7e5rJUxbpGgb5hJDkawhplJnbXA0MNLpv9Jlg+tNZx8rY9hQKwiy8ZDIKcbfm5ao80tpoCruUte+ZHTf5af+qJlNMcUBG0UOR4oD6XbhRo4aypUL0lhsa6eEVhs86XRQwr3cuobuWOh4UIhovV/4so86ie1rBYAKV+/SOJtpUAlWAwXw2J3GxNmbBax+0nnUevZCxXxrAHmKow+OztKJBo/WBhgWx8awDELMAKMM//oUIxZtdHUscPVGpx1aae+zriVmnuAx6KOnkYTX3BvfCy9wTbg1FPTjqCJTkLUP85EZ4D8P0VAGDHD1/TtF5h6UGCyrUrwpUbWXmuW1ePTtNHztXBxj9gvouLyOaGeMHxzUAjNvKoH+/4p55/2KGTk/OVfq7eZ/xt3mpq2WSjozwcZWwuVmaKsw7vHftOT9N7bzLAiY5m6M5x5eqJJ2gLyjeMokl40OI+LBkynCrCrOPYXbxhnqVAbDDD3OvKMPkGfSDWh5oY/gHbqiTBhJ+eOVmtWVCZV5jmKoNucHAlgfSlcSb5YIvtfvKh0zPgEFlarNi7iJQPMTHV3G8VPjnCo1YJ5jjpOfOZy4C4VnTXuSlW3gdnhy8QmemFh5LWakuMMiFnCVmBIoFB/ltW/gWkOZXJf7bpAmqLjCAQC7kLDHzASLxT4Dklb/YOVDwC/Bu+cntTbSmyUvv8mfKW0O19gwrC0qTaLqVYs3pQh5czUAYTSS3U07ux+1/Zpp4jmLh3nJ9ayB8JUmkvuez0trygLo8C3GKYqEHuF9NZxhjDxWywVF6n+IC1mFtCqKFK2tC2wIGHtZAmOlaeZZnd+K2rgZNaNuY9ZIVnPFNIJHs5waPFoZquvKXLu6b9Vwd2x3OvkLIrAd6tvF1siaQvBZr6Fq2MHBzBoJHPDjE/yd8Grc1GTSgVcEqA0EgFvmMPyAOVNCyn0YsNBRMDQhCvvALDHVGQdPoghjEKpo6UFTwtxPxKPfTlKI2epB9OUaPVYtSB4JePPwH/3bTT9w3eowaDXu5A4JsPHyIl+69ihngA1+X5h4ICXzhHQw1YJsLc/CpwqoDivI5xqehn4ZMOTGGOfhUYdUBIVE0dIm8ns2GJkcTYwxzVVr1QEj4YNvvpMnH+U3iXZt/cI+x/90SqW4+rnTXg+Nfs/6bjXIkBk8AAAAASUVORK5CYII=',
                            symbolSize: 35 * rate,
                            //不能去
                            label: {
                                show: false, formatter: function (params) {
                                    return ''
                                }
                            },
                            tooltip: {
                                backgroundColor: "#17334D",
                                formatter: function (data) {
                                    var data = data.data;
                                    var str = "<div class='tips_map'>\
										<div style='border-bottom:2px solid #0D1923;padding-bottom:0.1rem'>\
											<span>" + data.name + "1231</span>\
											<span class='status1'>" + data.status + "</span>\
										</div>\
										<div>建设单位：" + data.jsdw + "</div>\
										<div>施工单位：" + data.sgdw + "</div>\
										<span class='err1'>" + data.cblx + "</span>\
										</div>";
                                    return str;
                                }
                            },

                        },
                        {
                            name: '预警项目',
                            type: 'scatter',
                            coordinateSystem: 'geo',//该系列使用的坐标系
                            data: warming,
                            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAAAXNSR0IArs4c6QAABYdJREFUWAm1WF1sVFUQnrm3W4qAAVv8IUaqRlstLWpL0rRF+xeNGHwxjdEYH0wEojaWF02MStVogg/6gIafB1/6YjT6oojV7m7pn2AhUkhjDGoqsfpgBbWG/u3e43fOLrf33r0/5y4yyW7PzHwz8+2cuT+nTDFFdHSU04L1EFnUidCbiOkGIrEhl4Z/I0G/Y32ODBqgFcZhTib/jFOCdcGipb2LLPEsCLSQEKZWHHMWBEfI4Pd5JPWxTkwkIdHc0UYiuxfJtugkDMGME5sv8mgyHYLB7w0QsWNHgibP7kM3dgZAijMzH6Sa27r50KElvwS+hMTWB9eTNfcJ2r3VL+iybUzDZKx8hIeP/OHNVUAoR2b+GDpzixf8v+rMP5NR1uglZTiLiK6uUnTm0ytORhaVPxi1VE0HCRchmp45gG1qcfiv7FLWkjUdYm+ZaGq/n8jqd/hCl4vv7CVrc10oRjqNsz9S6a7uCJzxAI+lvlJ4+SV6ew1i8XZE1LK7pITEHdXLesjKPHwkxJt3obbiADW3ZQNHn8Cebo6OzCFE1e0kSksj4Tw/T2ZyMBKnaksOkBwhIXZFRy0jrNpNy0rIyjw6THTxYgjC4cpzMETrtusxyI0OV+TSqq2JxEiA1nZdygQOkotBmbmHYbOH+5I/7K9Vc2eYW/mMqV+IJ7+PxDkALLkYeGC2OYyRS3FzJYk1qyNx5ucaw+zNAi64uuhGrz1M15kfXlwicyAVlsbfBy4Yas6/y/hjvFad+TGGMMyzs95QDZ03GLjk8IKlLzodKvlC+/7qLgwucsvm3dZgTVx3LYn1FcEAeIxfp4knTodiAp3ggg7RdCDA4xB1tR5LoWqmBguNuhZwQYf4uC5eZ34yjz9KmR48uyI66VsTXCShpK/Tx6gzPwLPucz2bbTQ9wFlup8hqij3yRRgAhezt6b6HC1kegBJBMBsM8/MEP/1N9HKMhJr19p234VpklVdpXDmyJgvxGOco6vLdqo7tGhu7cMsqYebBxSsrltH1l11tLS7m8SqVb44SSTx+ptEWcvX7zZyH4+ln8w9XE1jv9upoV24QMYpXE1BZEa/AZm3NMmgXgmrFzVFiIdSY7j8cTeLJ1b93WhsoZjHvs2TyRY6/SyorTjAl+uQBBmM3saTLAh5xTw+Tok9bxBlMl5XsO6obRPi4XQ/uvR1cFShx6q/x2U0T5yMTwY1Ve18JptQTufdIKX100TlRhLl19iEzJPfUeKV14iWfM9/Ns61ULVQ0yEuQjyanoRPDZcD47u0Gpa7Y56aoMTLvUR4yseUA/madpiLkLKuXrEHbwDnbUTAwmqoVx5z4gwlXkLI4mIAMsiMGqqW219AiPv7z5MhXnXDPFoiQVbdJjJOSzKALix4ABoqaqhaHmgBIeXvbN2PWRrxYG1VvsKyPG9JMjhZxBaZW9bwkcB3aRwcb8WJDXc+cZU3zmpqxE1xAieKOa9LQ2ccQ7gOB8Of/MCBhCRYNLc/R8La5xdYtI2Nbh5NvRcUH05ICPy/rC2J23FbUIJYdqY0jaQ7mNnvBq9S+c9QvooKTJQ9hRb/E6uwLxg5kCuMjAwLJSQBPPjlFAb8abm+LEEOlSsiSSQhGY+b10d4kTsYkSvYjViVIxhhe7QIKXRiYw9I4aqLKTJGxmpK6FB7c4jmtipceycw5NFHVxnM9C++GtCdH7y5gnT9Dsn8MrFh6s8TsHHISJKxCMkAHk5+iK17V65DBRiFDQUVOmMTUikS972A7UgXpstbpE9iipBYM+TML1q3V9Di7DhslU471lNUumYLD34247FrqUUTktnFvZ21lM2M2UMuh9gsaeKhgTNa1X1AxW1ZPpEqzOZjmCycc/DB+nLI+PArziRaWp+Xn+Ki3VH/AW1uqUffgzR5AAAAAElFTkSuQmCC',
                            symbolSize: 35 * rate,
                            label: {show: false},
                            tooltip: {
                                backgroundColor: "#17334D",
                                formatter: function (data) {
                                    var data = data.data;
                                    var str = "<div class='tips_map'>\
										<div style='border-bottom:2px solid #0D1923;padding-bottom:0.1rem'>\
											<span>" + data.name + "1231</span>\
											<span class='status1'>" + data.status + "</span>\
										</div>\
										<div>建设单位：" + data.jsdw + "</div>\
										<div>施工单位：" + data.sgdw + "</div>\
										<span class='err1'>" + data.cblx + "</span>\
										</div>";
                                    return str;
                                }
                            },
                        },

                    ]
                };
            }
            myChart.setOption(option);
            // window.onresize=function () {
            // 	myChart.resize()
            // }
            window.addEventListener('resize', function () {
                console.log(rate)
                myChart.resize();

            });
            // curMap = {
            //     mapCode: mapCode,
            //     mapName: name
            // };

        });
    }
})