const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const bookmarksController = express.Router();

  // Modify a bookmark
  bookmarksController.patch('/:id', onlyLoggedIn, (req, res) => {

    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.users_id)
    .then((data) => {
    return dataLoader.updateBookmark({
      ownerId:req.user.users_id,
      boardId:data,
      id: req.params.id,
   title: req.body.title,
     url: req.body.url
   });
 })
.then(data => res.json(data))
.catch(err => res.status(400).json({
    error: 'Not your bookmark to modify'
  }));
});


  // Delete a bookmark

  bookmarksController.delete('/:id', onlyLoggedIn, (req, res) => {
    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.users_id)
    .then(() => {
    return dataLoader.deleteBookmark({
      id: req.params.id
    });
})
.then(() => res.status(204).end())
.catch(err => res.status(400).json({
    error: 'Not your bookmark to delete take it easy there'
  }));
});


  return bookmarksController;
};

