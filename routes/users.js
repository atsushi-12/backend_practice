//ユーザー情報の管理
const router = require("express").Router();

// /api/users/にアクセスしたときに、"user Router"と表示する
router.get("/", (req, res) => {
  res.send("user Router");
});
// /api/users/profileにアクセスしたときに、"UserProfile"と表示する
router.get("/profile", (req, res) => {
  res.send("UserProfile");
});

module.exports = router;
