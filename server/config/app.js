var config = require('./config'), 
    Sequelize = require('sequelize'),   
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen(process.env.PORT || config.port, function() {
    console.log('App listening on port', config.port);
  });
};