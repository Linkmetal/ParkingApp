"use strict"
/** ---------------------------------------------------
Variables and config
---------------------------------------------------- */

/** ---------------------------------------------------
Controllers
---------------------------------------------------- */
let UserController = require('../controllers/user.controller.js');
var express = require('express');

var router = express.Router();

/** ---------------------------------------------------
Methods
---------------------------------------------------- */
router.post('/login', UserController.login);
router.post('/add', UserController.addUser);
// router.post('/profile', md_auth.authentication, UserController.getUser)
// router.post('/delete', md_auth.authentication, UserController.deleteUser)
// router.post('/update', md_auth.authentication, UserController.updateUser)
// router.post('/uploadimage', md_auth.authentication, UserController.uploadImage)

module.exports = router;
