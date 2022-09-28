const html = require("html-template-tag");

function bookmarkList(bookmarks, categoryNames) {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Document</title>
      </head>
      <body>
        <h1>Bookmarker</h1>
        <!--New Bookmark Form-->
        <div>
          <form method="post" action="/bookmarks">
            <label for="name">New Bookmark</label><br />
            <input type="text" name="name" /><br />
            <label for="url">URL</label><br />
            <input type="url" name="url" /><br />
            <label for="category">Category</label><br />
            <select id="select" name="category">
              ${categoryNames.map(
                (categoryName) =>
                  `
                  <option value='${categoryName.dataValues.name}'>${categoryName.dataValues.name}</option>                
                  `
              )}
            </select>
            <button type="submit">add</button>
          </form>
        </div>
        <!--NEW CATEGORY FORM-->
        <hr />

        <hr />

        ${bookmarks.map(
          (bookmark) =>
            `
            <!--Using the method-override middleware to turn POST request into DELETE request-->
            <form method="POST" action="/bookmarks/${bookmark.id}?_method=DELETE">
            <a href="${bookmark.url}">${bookmark.name}</a> - <a href="/categories/${bookmark.category.id}">${bookmark.category.name}</a>
            <button type="submit">&#10006</button>
            </form>
            `
        )}
        <div>
          <button><a href="/category">View ALL categories</a></button>
        </div>
      </body>
    </html>`;
}

function categorizedBookmarks(bookmarks, category) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Bookmarker</title>
      </head>
      <body>
        <h1>${category.name}</h1>
        <div>
          ${bookmarks.map(
            (bookmark) =>
              `
               <a href='${bookmark.url}'>${bookmark.name}</a><br>
              `
          )}
        </div>
        <br /><br />
        <button><a href="/bookmarks">Back to ALL bookmarks</a></button>
      </body>
    </html>
  `;
}

function categoryView(categoryList) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Bookmarker</title>
      </head>
      <body>
        <h1>categories</h1>
        <div>
        <!---NEED TO FIX--!>
          ${categoryList.map(
            (category) =>
              `<p><a href="/category/${category.id}">${category.name}</a></p>`
          )}
        </div>
        <br /><br />
        <form method="post" action="/category">
        <label for="name">Create New Category</label>
        <input type="text" name="category" />
        <button type="submit">Submit</button>
      </form>
        <button><a href="/bookmarks">Back to ALL bookmarks</a></button>
      </body>
    </html>
  `;
}

module.exports = { bookmarkList, categorizedBookmarks, categoryView };
