//ユーザー情報の管理
const router = require("express").Router();
const post = require("../models/Post");

router.post("/", async (req, res) => {
  const newPost = new post(req.body);
  try {
    //newでインスタンスを作成した後は必ずsaveする
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    //500はサーバーエラー
    return res.status(500).json(err);
  }
});


//投稿を更新する
router.put("/:id", async (req, res) => {
  try {
    //投稿のidを取得する
    const post = await post.findById(req.params.id);
    //投稿のユーザーidとログインしているユーザーidが一致するかどうかを確認する
    if (post.userId === req.body.userId) {
      //投稿を更新する
      await post.updateOne({ $set: req.body });
      
module.exports = router;
