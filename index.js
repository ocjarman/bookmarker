const { Bookmark, Category } = require("./db");

const express = require("express");
const app = express();

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// methodOverride middleware for overriding POST and GET requests in forms
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// importing routes
const bookmarkRouter = require("./routes/bookmark");
const categoryRouter = require("./routes/category");

app.use("/bookmarks", bookmarkRouter);
app.use("/category", categoryRouter);

// ---------- SEE ALL BOOKMARKS --------------

app.get("/", async (req, res, next) => {
  res.redirect("/bookmarks");
});

//--------------------PORT----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
