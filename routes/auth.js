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

module.exports = router;
