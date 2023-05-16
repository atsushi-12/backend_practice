//インスタンスのような形
const express = require("express");
const app = express();
//routes/user.jsからusersRouteをインポート
const usersRoute = require("./routes/users");
//auth.jsからauthRouteをインポート
const authRoute = require("./routes/auth");
//post.jsからpostRouteをインポート
const postRoute = require("./routes/posts");
//PORTの設定
const PORT = 3000;
//ミドルウェア 第一引数にパスを指定することで、そのパスにアクセスしたときに第二引数の関数が実行される
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
// reqとはリクエストのこと、resはレスポンスのこと
// "/"にアクセスしたときにHello World!と表示する
app.get("/", (req, res) => {
  // sendメソッドで文字列を返す
  res.send("Hello World!");
});

// app.get("/users", (req, res) => {
//   // sendメソッドで文字列を返す
//   res.send("Hello World!");
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
