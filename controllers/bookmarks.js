const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const bookmarksController = express.Router();

  // Modify a bookmark

  bookmarksController.patch('/:id', onlyLoggedIn, (req, res) => {
    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.id)
      .then((data) => {

        return dataLoader.updateBookmark({
          ownerId:req.user.id,
          boardId:data,
          id: req.params.id,
          title: req.body.title,
          description:req.body.description,
          url: req.body.url
        });
      })
      .then(data => res.json(data[0]))
      .catch(err => res.status(400).json({
        error: 'Not your bookmark to modify'
      }));
  });


  // Delete a bookmark

  bookmarksController.delete('/:id', onlyLoggedIn, (req, res) => {
    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.id)
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

