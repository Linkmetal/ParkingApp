/** ---------------------------------------------------
Variables and config
---------------------------------------------------- */
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
const config = require('../config');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    // user_id: Number, // C# server ID
},
{
  shardKey: { _id: 1 }
});

var userModel = mongoose.model('user', UserSchema );

async function login(req, res) {
  
  // Save the new model instance, passing a callback
  userModel.findOne({"username": req.body.username}, await function (err, result) {
    if (err) return res.status(500).send(`Internal server error ${err}`);
    if(!result) return res.status(403).send(`Invalid credentials ${err}`);

    if (bcrypt.compareSync(req.body.password, result.password)) {
      const token = jwt.sign({ sub: result._uid }, config.secret);
      res.status(200).json({
        token: token
      });
    } else return res.status(403).send({message: 'Invalid credentials'}); 

  });
}

async function addUser(req, res) {
  // Create an instance of model SomeModel

  let saltRounds = 10;
  let salt = bcrypt.genSaltSync(saltRounds);
  let hashedPassword = bcrypt.hashSync(req.body.password, salt);

  var instance = new userModel({ username: req.body.username, password: hashedPassword});
  
  // Save the new model instance, passing a callback
  instance.save( await function (err) {
    if (err) return res.status(500).send(`Error creating the user: ${err}`);

    
      
    return res.status(200).send('Saved!');
  });
}

module.exports = {
  login,
  addUser,
}
