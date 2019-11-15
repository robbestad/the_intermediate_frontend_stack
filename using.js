var through = require('through2');    
var debug = require("debug")("using");
module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    debug("compiling",file.relative);
    callback(null, file);
  });
};
