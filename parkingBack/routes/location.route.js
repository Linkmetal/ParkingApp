"use strict"
let LocationController = require('../controllers/location.controller.js');
var express = require('express');

var router = express.Router();

/** ---------------------------------------------------
Methods
---------------------------------------------------- */
router.post('/list', LocationController.list);
router.post('/add', LocationController.addLocation);
router.post('/saveExitTime', LocationController.saveExit);

module.exports = router;
