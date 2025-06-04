// src/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const mainRoutes = require("./routes/mainRoutes");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config/config");

const app = express();
// 解析 JSON 格式的请求体
app.use(express.json());

// 解析 URL-encoded 格式的请求体
app.use(express.urlencoded({ extended: true }));
// 使用中间件
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());

// 挂载路由
app.use("/", mainRoutes);

// 错误处理中间件
app.use(errorHandler);

module.exports = app;
