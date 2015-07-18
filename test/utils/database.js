var config = require('../../config.js');
var mongoose = require('mongoose');

describe('Database' , function() {
  describe('Connection', function () {
    it('should connecto to the mongodb database', function () {
      mongoose.connect('mongodb://' + config.db.server + ':' + config.db.port + '/' + config.db.database);
    });
  });
});