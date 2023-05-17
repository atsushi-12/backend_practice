//ユーザー情報の管理
const router = require("express").Router();
const User = require("../models/User");

// /api/users/にアクセスしたときに、"user Router"と表示する
router.get("/", (req, res) => {
  res.send("user Router");
});
// /api/users/profileにアクセスしたときに、"UserProfile"と表示する
router.get("/profile", (req, res) => {
  res.send("UserProfile");
});

//postメソッド ユーザー登録
router.post("/register", async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    //保存
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
