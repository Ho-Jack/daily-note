var express = require('express');
var router = express.Router();
// var formidable = require('formidable'),
//   http = require('http'),
//   util = require('util');

// 模拟接口1
router.get('/v1/home/getMap', function (req, res, next) {
  var response_data = {
    "data": [{
      "name": "渭南市",
      "value": "155",
      // TODO: 新增1个字段,
      workerCount: "223" //工人总数
    },
    {
      "name": "华州区",
      "value": "9",
      workerCount: "223"
    },
    {
      "name": "潼关县",
      "value": "88",
      workerCount: "223"
    },
    {
      "name": "大荔县",
      "value": "5",
      workerCount: "223"
    },
    {
      "name": "蒲城县",
      "value": "51",
      workerCount: "223"
    },
    {
      "name": "澄城县",
      "value": "0",
      workerCount: "223"
    },
    {
      "name": "白水县",
      "value": "0",
      workerCount: "223"
    },
    {
      "name": "合阳县",
      "value": "0",
      workerCount: "223"
    },
    {
      "name": "富平县",
      "value": "0",
      workerCount: "223"
    },
    {
      "name": "华阴市",
      "value": "0",
      workerCount: "223"
    },
    {
      "name": "临渭区",
      "value": "0",
      workerCount: "223"
    }
    ],
    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});


// 视频监控
router.get('/spjk/getCount', function (req, res, next) {
  var response_data = {
    "data": {
      "yjrxms": 111,
      "zyxms": 155,
      "ycxms": 11
    },


    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});
//月度环比
router.get('/spjk/getYdhb', function (req, res, next) {
  var response_data = {
    "data": {
      "date": ["2019/01", "2019/02", "2019/03", "2019/04", "2019/05", "2019/06"],
      "yc": [20, 30, 40, 50, 60, 70],
      "xz": [10, 20, 30, 40, 50, 60],
      "cx": [10, 20, 30, 40, 50, 60]
    },
    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});
// 噪音扬尘
router.get('/zyyc/getCount', function (req, res, next) {
  var response_data = {
    "data": {
      "ycyjs": 111,
      "zyyjs": 155,
      "azzs": 11
    },


    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});
// 噪音扬尘
router.get('/zyyc/getTableData', function (req, res, next) {
  var response_data = {
    "data": [{
      "place": 111,
      "pm": 155,
      "time": "2019-1-1"
    },
    {
      "place": 111,
      "pm": 155,
      "time": "2019-1-1"
    }, {
      "place": 111,
      "pm": 155,
      "time": "2019-1-1"
    }],


    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});
// 噪音扬尘  浓度对比
router.get('/zyyc/getNddb', function (req, res, next) {
  var response_data = {
    "data": [
      { "value": 310, "name": '基本' },
      { "value": 234, "name": '装饰' },
      { "value": 335, "name": `主体` },
    ],


    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});
// 噪音扬尘  浓度对比
router.get('/zyyc/getYdyjqs', function (req, res, next) {
  var response_data = {
    "data": [
      { "value": 310, "time": '2019/01' },
      { "value": 234, "time": '2019/02' },
      { "value": 35, "time": "2019/03" },
      { "value": 135, "time": "2019/04" },
      { "value": 235, "time": "2019/05" },
      { "value": 335, "time": "2019/06" },
    ],


    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});
// 视频监控  月运行时长
router.get('/spjk/getYyxsc', function (req, res, next) {
  var response_data = {
    "data": [
      { "value": 10, "time": '0-1k' },
      { "value": 30, "time": '1-3k' },
      { "value": 35, "time": ">3k" },
    ],


    "code": 0,
    "msg": "调用成功!",
    "count": "0",
    "date": "2019-07-11 11:32:55 247"
  }
  res.json(response_data);
  res.end();
});
module.exports = router;