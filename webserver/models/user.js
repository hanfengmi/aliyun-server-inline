import mongoose from "mongoose";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // 用户手机号
  phone: {
    type: String,
    unique: true,
    required: [true, "Phone is required."]
  },
  name: {
    type: String,
    required: [true, "Nickname is required."],
    lowercase: true
  },
  // 用户密码
  password: { type: String, required: [true, "Password is required."]},
  // 用户头像
  picture: { type: String, default: "" },
  // 用户个性签名
  signature: { type: String, default: "" },
  // 用户类型。
  role: { type: Number, default: 0 },
  // 用户性别
  gender: { type: String, default: "famale" },
  // 用户地址
  address: [{ type: String }],
  // 用户组别
  group: { type: Number },
  // 用户邮箱
  email: { type: String,required: false, lowercase: true },
  // 用户创建的blog
  blog: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  // 用户收藏的blog
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog", _id: false }],
  // meta信息
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

export default mongoose.model("User", userSchema);
