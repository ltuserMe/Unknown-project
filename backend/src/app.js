// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const mainRoutes = require('./routes/mainRoutes');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config/config');

const app = express();

// 使用中间件
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

// 挂载路由
app.use('/', mainRoutes);

// 错误处理中间件
app.use(errorHandler);

module.exports = app;