const { Bookmark, Category } = require("./db");

const express = require("express");
const app = express();

//----------- VIEW ALL BOOKMARKS ----------

app.get("/bookmarks", async (req, res, next) => {
  const bookmark = await Bookmark.findAll({
    include: [Category],
  });
  res.send(`
      <body>
        <h1>Bookmarker</h1>
            ${bookmark
              .map(
                (bookmark) => `
                    <div>
                        <p><a href="${bookmark.dataValues.url}">${bookmark.dataValues.name}</a> - <a href="/categories/${bookmark.dataValues.categoryId}">${bookmark.dataValues.category.dataValues.name}</a></p>
                    </div>
                `
              )
              .join("")}

        <h2>Add a Bookmark</h2>
          <input placeholder="name"></input><br>
          <input placeholder="url"></input><br>
          <select id="category"><br>
              <option>code</option>
              <option>jobs</option>
              <option>search</option>
          </select>
          <button>add</button>
      </body>
    `);
});

//--------------CREATE A BOOKMARK-----------------

app.post("/bookmarks", async (req, res, next) => {
  const name = req.body.name;
  const url = req.body.title;
  const categoryId = req.body.content;

  console.log(name);

  // await Bookmark.create({
  //   name: "Indeed",
  //   url: "https://www.indeed.com/",
  //   categoryId: jobs.id,
  // });

  // The form should allow the user to POST a new bookmark to
  // /bookmarks with a name, a url, and an associated category.
  // After a new bookmark is created, redirect the user to the
  // GET /categories/:id route of the category the new bookmark is in.
});

// ---------- SEE ALL BOOKMARKS --------------

app.get("/", async (req, res, next) => {
  res.redirect("/bookmarks");
});

// ---------- SEE BOOKMARKS BY CATEGORY--------------
app.get("/categories/:id", async (req, res, next) => {
  const category = await Category.findAll({
    include: [Bookmark],
  });

  const bookmark = await Bookmark.findAll({
    include: [Category],
  });

  const categoryId = req.params.id;

  const code = category[0].dataValues.name;
  const jobs = category[1].dataValues.name;
  const search = category[2].dataValues.name;

  const filteredBookmarks = bookmark.filter(
    (bookmark) => bookmark.dataValues.categoryId === Number(categoryId)
  );

  console.log("filtered: ", filteredBookmarks);

  res.send(`
      <body>
      <h1>Bookmarker</h1>
      <h2>${category[categoryId - 1].dataValues.name}</h2>
      <a href="/bookmarks">Back</a>

      ${filteredBookmarks
        .map(
          (bookmark) => `
              <div>
                  <p><a href="${bookmark.dataValues.url}">${bookmark.dataValues.name}</a> - <a href="/categories/${bookmark.dataValues.categoryId}">${bookmark.dataValues.category.dataValues.name}</a></p>
              </div>
          `
        )
        .join("")}
      </body>
    `);
});

// app.post("/bookmarks", async (req, res, next) => {
//   const category = await Category.findAll({
//     include: [Bookmark],
//   });

//   const bookmark = await Bookmark.findAll({
//     include: [Category],
//   });

//--------------------PORT----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
