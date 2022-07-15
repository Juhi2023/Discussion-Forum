const express = require('express');
const router = express.Router();
const passport = require('passport')

const {signup, login, logout, loggedIn} = require('../controllers/userController')

router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', passport.authenticate("jwt", {session: false}), logout)
router.get('/loggedIn', passport.authenticate("jwt", {session: false}), loggedIn)


module.exports = router;