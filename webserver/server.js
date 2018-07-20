
import fs from "fs";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./routes/router";
import mongodb from "./mongo.config";
// import routeNotMatch from './middleware/routeNotMatch';
// import errorHandler from './middleware/errorHandler';

// express instance
const app = express();
let port = 9990;
// 普通server
const server = http.createServer(app);
// 增强server和sslServer支持webSocket
require('express-ws')(app, server);

// common middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// mongodb setup
mongodb(app);
// routes middleware（普通http路由请求）
router(app);
// // 路由未匹配到
// app.use(routeNotMatch);
// // 错误收集
// app.use(errorHandler);

// http  请求监听端口
server.listen(port, () => console.log(`bigMonkey server listening on port ${port}`));

console.log("process.env.NODE_ENV is: ", process.env.NODE_ENV);
