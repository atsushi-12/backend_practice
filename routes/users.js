//ユーザー情報の管理
const router = require("express").Router();

//Userスキーマーをインポート
const User = require("../models/User");
// // /api/users/にアクセスしたときに、"user Router"と表示する
// router.get("/", (req, res) => {
//   res.send("user Router");
// });
// // /api/users/profileにアクセスしたときに、"UserProfile"と表示する
// router.get("/profile", (req, res) => {
//   res.send("UserProfile");
// });

//CRUD操作
//update
router.put("/:id", async (req, res) => {
  //req.params.idでidを取得する
  if (req.body.userId === req.params.id || req.body.isAdmin){
    try{
      //findByIdAndUpdateはidを探して更新する mongooseのドキュメント参照
      const user = await User.findByIdAndUpdate(req.params.id, {
        //$set すべてのフィールドを更新する
        $set: req.body,
    });
  }catch(err){
      return res.status(500).json(err);
    }
    else{
      return res.status(403).json("You can update only your account!(あなたはあなたのアカウントのみ更新できます)");
    }
  }})
module.exports = router
