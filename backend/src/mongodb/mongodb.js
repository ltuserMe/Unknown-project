const mongoose = require("mongoose");
// 连接 MongoDB 数据库
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 连接错误:"));
db.once("open", async () => {
  console.log("MongoDB 连接成功");
});

// 创建用户模型
const userSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, default: null }, // 这里可能设置了默认值为 null
    age: { type: Number, default: null }
    // password: String
  },
  { collection: "mycollection" }
);

// console.log("🚀 ~ userSchema:", userSchema);

const User = mongoose.model("User", userSchema);

module.exports = User;
