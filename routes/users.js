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
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      //findByIdAndUpdateはidを探して更新する mongooseのドキュメント参照
      const user = await User.findByIdAndUpdate(req.params.id, {
        //$set すべてのフィールドを更新する
        $set: req.body,
      });
      res
        .status(200)
        .json("Account has been updated(ユーザー情報が更新されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json(
        "You can update only your account!(あなたはあなたのアカウントのみ更新できます)"
      );
  }
});
//delete
router.delete("/:id", async (req, res) => {
  //req.params.idでidを取得する
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      //findByIdAndUpdateはidを探して更新する mongooseのドキュメント参照
      const user = await User.findByIdAndDelete(req.params.id, {
        //$set すべてのフィールドを更新する
        $set: req.body,
      });
      res
        .status(200)
        .json("Account has been updated(ユーザー情報が削除されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json(
        "You can update only your account!(あなたはあなたのアカウントのみ削除できます)"
      );
  }
});
//get
router.get("/:id", async (req, res) => {
  //ユーザー情報の取得にはpostやdeleteと違い、pramsとqueryを照合をする必要がない
  //しかしそのままgetしてしまうとパスワードなどの情報が漏れてしまうので、分割代入を使用して必要な情報のみを取得する
  try {
    //findByIdAndUpdateはidを探して更新する mongooseのドキュメント参照
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  //req.params.idでidを取得する
  //ユーザーをフォローする条件は、他のユーザーであること、すでにフォローしていないことである
  if (req.body.userId !== req.params.id) {
    try {
      const followedUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      //includesは配列に引数の値が含まれているかどうか(この場合はいないか）を確認する
      if (!followedUser.followers.includes(req.body.userId)) {
        //フォローする
        await followedUser.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("ユーザーをフォローしました");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("自分をフォローすることはできません!!!");
  }
  //findByIdAndUpdateはidを探して更新する mongooseのドキュメント参照
});

//ユーザーのフォロー解除
router.put("/:id/unfollow", async (req, res) => {
  //req.params.idでidを取得する
  //ユーザーをフォロー解除する条件は、他のユーザーであること、すでにフォローしていることである

  if (req.body.userId !== req.params.id) {
    try {
      const unfollowedUser = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      //includesは配列に引数の値が含まれているかどうか）を確認する
      if (unfollowedUser.followers.includes(req.body.userId)) {
        //フォローする
        await unfollowedUser.updateOne({
          $pull: { followers: req.body.userId },
        });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("ユーザーのフォローを解除しました");
      } else {
        res.status(403).json("フォローしていません");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("フォロー解除に失敗しました");
  }
  //findByIdAndUpdateはidを探して更新する mongooseのドキュメント参照
});

module.exports = router;
