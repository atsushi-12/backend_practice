//ユーザー情報の管理
const router = require("express").Router();

// /api/auth/にアクセスしたときに
router.get("/", (req, res) => {
  res.send("auth Router");
});

module.exports = router;
