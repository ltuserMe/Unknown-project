// src/config/config.js
require('dotenv').config();

const config = {
    port: process.env.PORT || 3001,
    // 可以添加其他配置项，如数据库连接信息等
};

module.exports = config;