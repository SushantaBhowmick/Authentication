const express = require('express');
const { SignUp, Login, logoutUser } = require("../controller/AuthController");
const router = express.Router();

router.route('/signup').post(SignUp);
router.route('/login').post(Login);
router.route('/logout').get(logoutUser);

module.exports= router