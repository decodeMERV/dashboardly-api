const validate = require('validate.js');


// ************* USER VALIDATION **********************
const VALID_ID = {
  onlyInteger: true,
  greaterThan: 0
};

const USER_VALIDATION = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 12,
      message: 'must be at least 12 characters'
    }
  }
};
exports.user = function validateUser(userData) {
  return validate(userData, USER_VALIDATION);
};

//****************************************************

const BOARD_VALIDATION = {
     ownerId: {
    presence: true,
    numericality: VALID_ID
  },
  title: {
    presence: true
  }
};
exports.board = function validateBoard(boardData) {
  return validate(boardData, BOARD_VALIDATION);
};


//****************************************************

const BOARD_UPDATE_VALIDATION = {
  ownerId: {
    presence: true,
    numericality: VALID_ID
  }
};
exports.boardUpdate = function validateBoardUpdate(boardData) {
  return validate(boardData, BOARD_UPDATE_VALIDATION);
};


//****************************************************

const BOOKMARK_UPDATE_VALIDATION = {

  boardId:{
    presence:true,
    numericality: VALID_ID
  },
  title: {
    presence: true
  },
  url: {
    presence:true,
    url:true
  }

} ;

exports.bookmarkUpdate = function validateBookmarkUpdate(bookmarkData){
  return validate(bookmarkData, BOOKMARK_UPDATE_VALIDATION);

}

const BOOKMARK_VALIDATION = {

  boardId:{
    presence:true,
    numericality: VALID_ID
  },
  title: {
    presence: true
  },
  url: {
    presence:true,
    url:true
  }

} ;

exports.bookmark = function validateBookmark(bookmarkData) {
  return validate(bookmarkData, BOOKMARK_VALIDATION);

}

//****************************************************
const CREDS_VALIDATION = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true
  }
};
exports.credentials = function validateCredentials(credsData) {
  return validate(credsData, CREDS_VALIDATION);
};
