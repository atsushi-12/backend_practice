//mongoose
const mongoose = require("mongoose");
//mongooseではないと柔軟なデータースキーマーが作成できない

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    //誰がいいねをしているのかを管理する
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
