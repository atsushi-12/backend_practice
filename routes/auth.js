//ユーザー情報の管理
const router = require("express").Router();
const User = require("../models/User");
// /api/auth/にアクセスしたときに

router.post("/register", async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    //保存忘れずに
    const user = await newUser.save();
    ///
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    //emailが一致するユーザーを探す
    //fingOneは一つのドキュメントを返し、reqはつまりなんらかの形で受け取ったキーemailの値を探す
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    //つまりこれは入力欄に入力したパスワードとmongoDBに保存されているパスワードが一致するかどうかを確認している
    const validPassword = (await user.password) === req.body.password;
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }
    //成功時はstatus200を返す
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
