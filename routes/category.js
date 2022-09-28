const { response } = require("express");
const express = require("express");
const router = express.Router();

const { Category, Bookmark } = require("../db");

const {
  categoryList,
  categorizedBookmarks,
  categoryView,
} = require("../views/bookmarkHtml");

// ---------- SEE BOOKMARKS BY CATEGORY--------------
router.get("/:id", async (req, res, next) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  const bookmark = await Bookmark.findAll({
    include: [Category],
  });

  //   find category using ID where name matches

  const filteredBookmarks = bookmark.filter(
    (bookmark) => bookmark.dataValues.categoryId === Number(categoryId)
  );

  res.send(categorizedBookmarks(filteredBookmarks, category));
});

router.get("/", async (req, res, next) => {
  const categories = await Category.findAll({
    include: [Bookmark],
  });

  res.send(categoryView(categories));
});

router.post("/", async (req, res, next) => {
  const category = await Category.create({
    name: req.body.category,
  });

  res.redirect(`/category/${category.id}`);
});

module.exports = router;
