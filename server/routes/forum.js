const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getUserQuestions, getAllQuestions, createQuestion, addAnswer, incrementView, getQuestion, search} = require('../controllers/forumController');


router.get('/getUserQuestions',passport.authenticate("jwt", {session: false}),  getUserQuestions)
router.get('/getAllQuestions',  getAllQuestions)
router.post('/createQuestion', passport.authenticate("jwt", {session: false}), createQuestion)
router.post('/addAnswer', passport.authenticate("jwt", {session: false}), addAnswer)
router.get('/getQuestion/:id',passport.authenticate("jwt", {session: false}) , getQuestion)
router.post('/search', search)
router.post('/incrementView', incrementView)

module.exports = router;