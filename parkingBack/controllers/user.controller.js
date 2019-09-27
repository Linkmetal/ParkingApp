/** ---------------------------------------------------
Variables and config
---------------------------------------------------- */
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require('../config');

function login(req, res) {
  console.log("Entra a login")
  var db = req.db;
  var username = req.body.username;
  var password = req.body.password;
  var collection = db.get('users');

  collection.findOne({
    "username": username
  }, function(e, docs) {

    if (docs) {
      if (bcrypt.compareSync(password, docs.password)) {
        const token = jwt.sign({ sub: docs._uid }, config.secret);
        res.status(200).json({
          token: token
        });
      } else
        return res.status(403).send({message: 'Wrong credentials'}); 

    } else {
      return res.status(403).send({message: 'Wrong credentials'}); 
    }
  });
};

/** ---------------------------------------------------
* @author Sandro
* Método para añadir un usuario
---------------------------------------------------- */
function addUser(req, res) {

  var db = req.db;

  var username = req.body.username;
  var password = req.body.password;

  let saltRounds = 10;
  let salt = bcrypt.genSaltSync(saltRounds);
  password = bcrypt.hashSync(password, salt);

  var collection = db.get('users');

  collection.findOne({username: username}, 
    'username'
  , function(e, docs) {
    console.log(docs);
    let autoIndex = 0;
    if (!docs)
    collection.insertOne({
      "username": username,
      "password": password,
    }, function(err, doc) {
      if (err) {
        return res.status(500).send({message: 'User already exists'});
      } else {
        res.status(200).send("USER ADD OK");
      }
    });
  });
};


module.exports = {
  login,
  addUser,
}
