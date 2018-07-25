import mongoose from "mongoose";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  // 图片地址
  url: {
    type: String,
    required: [true, "url is required."]
  },
  //图片标题
  title: {
    type: String,
    required: [true, "title is required."]
  },
  // 是否展示
  show: { type: Number, default: 1 },
  // 是否删除
  stage: { type: Number, default: 1 },
  // 图片描述
  describtion: { type: String, default: "" },
  // 图片组别，非必填
  group: [{ type: String }],
  // meta信息
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

export default mongoose.model("Image", imageSchema);
