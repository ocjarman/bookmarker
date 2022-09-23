const { db, Bookmark, Category } = require("./db");

const seedDb = async () => {
  //connects to your db
  //clears everything out
  await db.sync({ force: true, logging: false });

  const code = await Category.create({
    name: "code",
  });

  const search = await Category.create({
    name: "search",
  });

  const jobs = await Category.create({
    name: "jobs",
  });

  await Bookmark.create({
    name: "Google",
    url: "https://www.google.com/",
    categoryId: search.id,
  });

  await Bookmark.create({
    name: "Stack Overflow",
    url: "https://stackoverflow.com/",
    categoryId: code.id,
  });

  await Bookmark.create({
    name: "Bing",
    url: "https://www.bing.com/",
    categoryId: search.id,
  });

  await Bookmark.create({
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    categoryId: jobs.id,
  });

  await Bookmark.create({
    name: "Indeed",
    url: "https://www.indeed.com/",
    categoryId: jobs.id,
  });

  await Bookmark.create({
    name: "MDN",
    url: "https://developer.mozilla.org/en-US/",
    categoryId: code.id,
  });

  // console.log((await Bookmark.findAll()).map((bookmark) => bookmark.name));
  console.log((await Category.findAll()).map((category) => category.name));
};

seedDb();
