// 实名制-项目属性-项目状态
<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    color1: {
      type: String,
      default: "#FF70A3"
    },
    color2: {
      type: String,
      default: "#23B1FE"
    },
    color3: {
      type: String,
      default: "#3648CE"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      var chartName = ["在建", "停工", "竣工", "未开工"];
      var chartData = ["10", "20", "30", "15"];
      var count = chartData.reduce((prev, curr) => prev - 0 + (curr - 0));
      var data = [];
      var legendName = [];
/* 这里将图例数据和 圆饼数据的name 要一样， 图例上显示的name才能显示（高度自定义legend需要相同  ） */
      chartData.forEach((item, index) => {
        //图例数据
        legendName[index] = `${chartName[index]}:  ${item}个  ${
          (((item / count) * 100).toFixed(2) + "").split(".")[1] == "00"
            ? (item / count) * 100
            : ((item / count) * 100).toFixed(2)
        }%`;
        //圆饼数据
        data[index] = {
          value: item,
          name: legendName[index]
        };


      });
      console.log(legendName);

      this.chart = echarts.init(this.$el);
      this.chart.setOption({
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          formatter(val) {
            return `${val.name.split(":")[0]}项目共${val.value}个<br/>占总项目${
              val.percent
            }%`;
          }
        },

        legend: {
          orient: "vertical",
          x: "60%",
          y: "center",
          itemWidth: 10,
          itemHeight: 10,
          align: "left",
          textStyle: {
            fontSize: 14,
            color: "#B6B7CA"
          },
          data: legendName
          // formatter: `{b} :{c}个项目 <br/>占总项目数的{d}% `
        },
        series: [
          {
            type: "pie",
            radius: [40, 80],
            center: ["40%", "50%"],
            color: [
              "#23B1FE",
              "#F59A15",
              "#FF70A3",
              "#5951DB",
              "#E64D3D",
              "#4AEAB0"
            ],
            data: data,
            labelLine: {
              normal: {
                show: false,
                length: 20,
                length2: 20,
                lineStyle: {
                  color: "#12EABE",
                  width: 2
                }
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      });
    }
  }
};
</script>

