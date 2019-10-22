/** ---------------------------------------------------
Variables and config
---------------------------------------------------- */
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
const config = require('../config');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    username: String,
    timestamp: {
      in: Number,
      out: Number
    },
    coords: {
      lat: Number,
      long: Number,
    }
},
{
  shardKey: { _id: 1 }
});

var locationModel = mongoose.model('locations', LocationSchema );

async function list(req, res) {
  
  // Save the new model instance, passing a callback
  locationModel.find({"username": req.body.username}, await function (err, result) {
    if (err) return res.status(500).send(`Internal server error ${err}`);

    else return res.status(200).json({result: result});
  });
}

async function addLocation(req, res) {
  // Create an instance of model SomeModel
  var instance = new locationModel({ username: req.body.username, coords: req.body.coords.coords, timestamp: req.body.coords.timestamp});
  
  // Save the new model instance, passing a callback
  instance.save( await function (err, product) {
    if (err) return res.status(500).send(`Error creating the user: ${err}`);
    return res.status(200).send(product);
  });
}

async function saveExit(req, res) {
  locationModel.findOneAndUpdate({"_id": req.body.id}, {"timestamp.out": req.body.time},  await function (err, doc) {
    if(err) res.status(500).send(`Internal server error ${err}`);
    res.status(200).send(doc);
  });
}

module.exports = {
  list,
  addLocation,
  saveExit,
};
