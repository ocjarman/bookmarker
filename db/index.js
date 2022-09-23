const Sequelize = require("sequelize");

const DB_URL = process.env.DB_URL || "postgres://localhost/bookmarker";
const db = new Sequelize(DB_URL);

const Bookmark = db.define("bookmark", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Category = db.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Category.hasMany(Bookmark);
Bookmark.belongsTo(Category);

module.exports = {
  db,
  Bookmark,
  Category,
};
