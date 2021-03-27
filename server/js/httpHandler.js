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
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end()
  } else if (req.url === '/SwimCommand') {
    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
  } else if (req.url === '/background.jpg') {
    try {
      const data = fs.readFileSync(__dirname + '/../spec/background.jpg')
      res.writeHead(200, headers);
      res.end(data);
    } catch (err) {
      res.writeHead(404, headers);
    }
  } else if (req.url === '/UploadImage' && req.method === 'POST') {
    var chunks = [];
    var newBuffer = Buffer.alloc(0);
    req.on('data', chunk => {
      newBuffer = Buffer.concat([newBuffer, chunk])
    })
    req.on('end', () => {
      var file = multipart.getFile(newBuffer);
      fs.writeFile(__dirname + '/../spec/background.jpg', file.data, { flag: 'w+' }, () => {console.log('File is Posted')})
      res.writeHead(201, headers);
      res.end()
    })
  }
  else {
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
