var path = require('path'),  
    express = require('express'), 
    Sequelize = require('sequelize'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    cors = require('cors');

module.exports.init = function() {
  var sequelize = new Sequelize('flowers', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    // SQLite only
    storage: './flowers.db'
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  

  //initialize app
  var app = express();

  app.use(morgan('dev'));
 
  app.use(bodyParser.json());

  app.use(cors());
  
  app.use(express.static('client'));

  app.use('/api', listingsRouter);
 
  app.use('/*', function(req, res) {
    res.redirect('../index.html');
  });

  return app;
};  