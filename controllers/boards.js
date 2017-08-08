const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const boardsController = express.Router();

  // 1 - ONE
  // Retrieve a list of boards
  boardsController.get('/', (req, res) => {
    dataLoader.getAllBoards({
      page: req.query.page,
      limit: req.query.count
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
  });

  // 2 - TWO
  // Retrieve a single board
  boardsController.get('/:id', (req, res) => {
    dataLoader.getSingleBoard(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
  });

  // 3 - THREE
  // Create a new board
  boardsController.post('/', onlyLoggedIn, (req, res) => {
    dataLoader.createBoard({
      ownerId: req.user.id,
      title: req.body.title,
      description: req.body.description
    })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json(err));
  });

  // 4- FOUR
  // Modify an owned board
  boardsController.patch('/:id', onlyLoggedIn, (req, res) => {
    // First check if the board to be PATCHed belongs to the user making the request
    dataLoader.boardBelongsToUser(req.params.id, req.user.id)
    .then(() => {
      return dataLoader.updateBoard(req.params.id, {
        title: req.body.title,
        description: req.body.description
      });
    })
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
  });

  // 5 - FIVE
  // Delete an owned board
  boardsController.delete('/:id', onlyLoggedIn, (req, res) => {
    // First check if the board to be DELETEd belongs to the user making the request
    dataLoader.boardBelongsToUser(req.params.id, req.user.id)
    .then(() => {
      return dataLoader.deleteBoard(req.params.id);
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(400).json(err));
  });

  // 6 - SIX OK MATT
  // Retrieve all the bookmarks for a single board
  boardsController.get('/:id/bookmarks', (req, res) => {
    // TODO: this is up to you to implement :)
    dataLoader.getAllBookmarksForBoard(req.params.id)
       .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
  });




  // Create a new bookmark under a board  OK MATT
  boardsController.post('/:id/bookmarks', onlyLoggedIn, (req, res) => {
    dataLoader.boardBelongsToUser(req.params.id, req.user.id)
    .then (() => {
        return dataLoader.createBookmark({
           boardId: req.params.id,
          title: req.body.title,
           url: req.body.url
        }) .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
    });


    })




  return boardsController;
}
