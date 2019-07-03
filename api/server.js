/**
 * Created by lidy on 2019/3/14.
 */
var express = require('express')
var app = express();
var fs = require('fs');
const config = require('../config')
var port = config.dev.mockPort;
console.log(config.dev.port)
var allowCrossDomain = function (req, res, next) {//设置response头部的中间件
  res.header('Access-Control-Allow-Origin', '*');//8089是vue项目的端口，这里相当于白名单
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'x-requested-with,Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);
app.all("/api/:name", function (request, response, next) {
  var fileName = __dirname + "/" + request.params.name + '.json';//要获取的json文件
  response.sendFile(fileName, {}, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
})
app.listen(port, function () {
  console.log('>listening on ' + port)
});
