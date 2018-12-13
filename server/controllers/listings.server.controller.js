
/* Dependencies */
var Sequelize = require('sequelize'), 
    sqlite3 = require('sqlite3').verbose();

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
  sync: { force: true },

  // SQLite only
  storage: 'db/flowers.db'
});

exports.add = function(req, res) {
  // open the database connection
  let db = new sqlite3.Database('db/flowers.db');
  let sql = `INSERT INTO SIGHTINGS VALUES ("${req.params.fname}", "${req.params.name}", "${req.params.loc}", DATE('now'));`;

  // output the INSERT statement
  console.log(sql);

  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted`);
  });
 
  // close the database connection
  db.close();
  res.json({});

}

exports.remove = function(req,res) {
  // open the database connection
  let db = new sqlite3.Database('db/flowers.db');
  let sql = `DELETE FROM SIGHTINGS WHERE NAME = "${req.params.fname}" AND PERSON = "${req.params.name}" AND LOCATION = "${req.params.loc}";`;

  // output the INSERT statement
  console.log(sql);

  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows Deleted`);
  });
 
  // close the database connection
  db.close();
  res.json({});
}

exports.flowers = function(req, res) {
  sequelize.query("SELECT GENUS || ' ' || SPECIES AS sciname, COMNAME as comname, GENUS as genus, SPECIES as species FROM FLOWERS").spread((results, metadata) => {
    res.json(results);
  });
};

exports.sightings = function(req, res) {
  sequelize.query("SELECT * FROM SIGHTINGS").spread((results, metadata) => {
    res.json(results);
  });
}

exports.update = function(req, res) {
  console.log(req.params);
  let db = new sqlite3.Database('db/flowers.db');
  let sql = `UPDATE FLOWERS SET COMNAME = '${req.params.ncom}', GENUS = '${req.params.ngen}', SPECIES = '${req.params.nspe}' WHERE GENUS = '${req.params.ogen}' AND SPECIES = '${req.params.ospe}';`;

  // output the INSERT statement
  console.log(sql);

  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows Updated`);
  });
 
  // close the database connection
  db.close();
  res.json({});
}

exports.search = function(req, res, fname) {
  var q = req.params.fname;
  sequelize.query(`Select NAME as name, PERSON as person, LOCATION as location, SIGHTED as sighted from SIGHTINGS WHERE NAME = '${q}' ORDER BY SIGHTED DESC LIMIT 10`).spread((results, metadata) => {
    res.json(results)
  });
}
