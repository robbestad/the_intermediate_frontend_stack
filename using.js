var through = require('through2');    // npm install --save through2
module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    console.log("compiling",file.relative);
    callback(null, file);
  });
};
