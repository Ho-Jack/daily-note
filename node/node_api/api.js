var express = require("express");
var app = express();
/* body-parser是一个HTTP请求体解析中间件，
使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，
Express框架中就是使用这个模块做为请求体解析中间件。 */
var bodyParser = require("body-parser");
var api = require("./api_all");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//设置跨域访问
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    } else {
        //move on
        next();
    }
});
app.use(api);

//配置服务端口
var server = app.listen(9191, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});