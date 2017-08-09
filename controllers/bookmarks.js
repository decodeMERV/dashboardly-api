const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const bookmarksController = express.Router();

  // Modify a bookmark
  //check FULL URL OF Bookmarked
  bookmarksController.patch('/:id', onlyLoggedIn, (req, res) => {
    // TODO: this is up to you to implement :)
    // First check if the BOOKMARK to be PATCHed belongs to the user making the request

    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.users_id)
    .then(() => {
    return dataLoader.updateBookmark({
      ownerId:req.user.users_id,
      id: req.params.id,
   title: req.body.title,
     url: req.body.url
   });
 })
.then(data => res.json(data))
.catch(err => res.status(400).json(err));
});




  // Delete a bookmark
  bookmarksController.delete('/:id', onlyLoggedIn, (req, res) => {
    // TODO: this is up to you to implement :)
    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.users_id)
    .then(() => {
    return dataLoader.deleteBookmark({
      id: req.params.id
    });
})
.then(() => res.status(204).end())
.catch(err => res.status(400).json(err));
});


  return bookmarksController;
};

