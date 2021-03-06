var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

app.use('/public/images', express.static(path.join(__dirname, './public/images/'))) //这样访问mlskd.cn:5000/public/images/1.jpg
//app.use(express.static(path.join(__dirname, 'views'))) //可以把前端用webpack打包的代码放到这里部署到服务器，这样访问mlskd.cn:5000/index.html

// 配置模板引擎和 解析表单POST请求插件body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router)

app.listen(5000, function () { //可以配置第二个参数 '10.62.20.72' 使得服务运行在10.62.20.72上， 否则就是localhost
  console.log('running at 5000...')
})
