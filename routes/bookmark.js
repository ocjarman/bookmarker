const express = require("express");
const router = express.Router();

const { Category, Bookmark } = require("../db");

const { bookmarkList } = require("../views/bookmarkHtml");

//----------- VIEW ALL BOOKMARKS ----------

router.get("/", async (req, res, next) => {
  const bookmarks = await Bookmark.findAll({
    include: [Category],
  });
  const categories = await Category.findAll();
  res.send(bookmarkList(bookmarks, categories));
});

//--------------CREATE A BOOKMARK-----------------

router.post("/", async (req, res, next) => {
  const categoryString = req.body.category;
  console.log(req.body);

  const category = await Category.findOne({
    where: { name: categoryString },
  });

  // The form should allow the user to POST a new bookmark to
  // /bookmarks with a name, a url, and an associated category.
  await Bookmark.create({
    name: req.body.name,
    url: req.body.url,
    categoryId: category.id,
  });

  // After a new bookmark is created, redirect the user to the
  // GET /categories/:id route of the category the new bookmark is in.
  res.redirect(`/categories/${category.id}`);
});

//delete button
router.delete("/:id", async (req, res, next) => {
  const bookmarkIdToDelete = req.params.id;
  const bookmarkToDelete = await Bookmark.findByPk(bookmarkIdToDelete);
  await bookmarkToDelete.destroy();
  res.redirect("/bookmarks");
});

module.exports = router;
