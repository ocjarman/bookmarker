const { Bookmark, Category } = require("./db");

const express = require("express");
const app = express();

app.get("/", async (req, res, next) => {
  const bookmark = await Bookmark.findAll({
    include: [Category],
  });

  console.log(bookmark);
  //   res.send(`
  //   <body>
  //   <h1>Bookmarker</h1>
  //       ${Bookmark.map(
  //         (bookmark) => `
  //               <div>
  //                   <p><a href="${bookmark.url}">${bookmark.name}</a> - ${bookmark.category.name}</p>
  //               </div>
  //           `
  //       ).join("")}
  //   </body>
  // `);
});

//new get request
// The bookmark’s category, which is linked to the corresponding single category view page (at the route GET /categories/:id).

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
