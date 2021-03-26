const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.url === '/SwimCommandRandom'){
    var moves = ['up', 'down', 'left', 'right']
    var randomNumber = Math.floor(Math.random() * moves.length);
    res.end(moves[randomNumber]);
  } else if (req.url === '/SwimCommand') {
    res.end(messageQueue.dequeue());
  }
  else {
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
