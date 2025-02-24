// src/controllers/mainController.js
const mainController = {
  getHome: (req, res) => {
    res.send("Hello, this is the backend server!");
  },
  postData: (req, res) => {
    const data = req.body;
    console.log("Received data:", data);
    res.json({ message: "Data received successfully!" });
  },
  // 处理 GET 请求，返回包含 message 的 JSON 数据
  // app.get('/api/mock/list', (req, res) => {
  //     res.json({
  //       code: 200,
  //       message: '这是点击',
  //       list: []
  //     });
  //   });
  getMessage: (req, res) => {
    // console.log("🚀 ~ req:", req);
    const data = req.body;
    // console.log("🚀 ~ data:", data)
    // console.log('Received data:', data);
    res.json({
      code: 200,
      result: {
        message: "这是点击"
      }
    });
  }
};

module.exports = mainController;
