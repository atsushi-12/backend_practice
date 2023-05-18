//ユーザー情報の管理
const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
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
    const post = await Post.findById(req.params.id);
    //投稿のユーザーidとログインしているユーザーidが一致するかどうかを確認する
    if (post.userId === req.body.userId) {
      //投稿を更新する
      await post.updateOne({ $set: req.body });
      return res
        .status(200)
        .json("the post has been updated(投稿が更新されました)");
    } else {
      return res
        .status(403)
        .json(
          "you can update only your post(あなたは自分の投稿のみ更新できます)"
        );
    }
  } catch (err) {
    return res
      .status(500)
      .json("you failed to update post(投稿の更新に失敗しました)");
  }
});

//投稿を削除する
router.delete("/:id", async (req, res) => {
  try {
    //投稿のidを取得する
    const post = await Post.findById(req.params.id);
    //投稿のユーザーidとログインしているユーザーidが一致するかどうかを確認する
    if (post.userId === req.body.userId) {
      //投稿を削除する
      await post.deleteOne();
      return res
        .status(200)
        .json("the post has been deleted(投稿が削除されました)");
    } else {
      return res
        .status(403)
        .json(
          "you can delete only your post(あなたは自分の投稿のみ削除できます)"
        );
    }
  } catch (err) {
    return res
      .status(500)
      .json("you failed to delete post(投稿の削除に失敗しました)");
  }
});

//投稿を見るため取得する
router.get("/:id", async (req, res) => {
  try {
    //投稿のidを取得する
    const post = await Post.findById(req.params.id);
    return res
      .status(200)
      .json({ message: "投稿の取得に成功しました", post: post.desc });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//投稿にいいねをつける

//条件
//1,自分にいいねができるので、そこの判定は行わない
//2,いいねをする際にすでにいいねがついていない
//3,すでにいいねがされている場合はいいねを外す

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // いいねをしているかどうかを確認する
    if (!post.likes.includes(req.body.userId)) {
      // いいねをつける
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json({ message: "いいねされました", post });
    } else {
      // いいねを外す
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({ message: "いいねが外されました", post });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//タイムライン投稿の取得
//　エンドポイントは"/timelineのみだと、他のルートが被り、エラーが発生するので、"/:userId/timeline"、あるいはtimeline/allとする

router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    //人の投稿内容をすべて取得する
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    return;
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
