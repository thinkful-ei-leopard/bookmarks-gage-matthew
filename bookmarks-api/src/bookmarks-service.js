const BookmarksService = {

  getAllBookmarks(knex) {
    return knex
      .select('*')
      .from('bookmarks');
  },

  getBookmarkById(knex, id) {
    return knex
      .select('*')
      .from('bookmarks')
      .where('id', id)
      .first();
  },

  insertBookmark(knex, newBookmark) {
    return knex
      .insert(newBookmark)
      .into('bookmarks')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  deleteBookmark(knex, id) {
    return knex('bookmarks')
      .where('id', id)
      .delete();
  },

  updateBookmark(knex, id, newBookmarkFields) {
    return knex('bookmarks')
      .where('id', id)
      .update(newBookmarkFields);
  }
};

module.exports = BookmarksService;