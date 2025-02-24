// src/controllers/mainController.js
const User = require("../mongodb/mongodb");

// 统一响应封装函数
const sendResponse = (res, statusCode, success, message, result = null) => {
  res.status(statusCode).json({
    success,
    message,
    ...(result && { result })
  });
};

const mainController = {
  getHome: (req, res) => {
    sendResponse(res, 200, true, "Hello, this is the backend server!");
  },
  postData: (req, res) => {
    const data = req.body;
    console.log("Received data:", data);
    sendResponse(res, 200, true, "Data received successfully!");
  },

  getMessage: async (req, res) => {
    // 获取查询参数中的 id
    const id = req.query.id;

    try {
      if (!id) {
        return sendResponse(res, 400, false, "缺少必要的参数 id");
      }
      const user = await User.findOne({ id: id });

      // console.log("🚀 ~ getMessage: ~ user:", user);
      if (!user) {
        return sendResponse(res, 404, false, "未找到对应的用户");
      }

      // 如果找到用户，可以返回用户信息
      sendResponse(res, 200, true, "查询成功", { user });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      sendResponse(res, 500, false, "服务器错误");
    }
  },
  addUser: async (req, res) => {
    const { name, age } = req.body;
    // const id = 4;
    try {
      const update = await User.create({ name, age });
      
      sendResponse(res, 200, true, "用户添加成功", update);
    } catch (error) {
      console.error("🚀 ~ addUser: ~ error:", error);
      sendResponse(res, 500, false, "添加用户时出错", error.message);
    }
  }
};

module.exports = mainController;
