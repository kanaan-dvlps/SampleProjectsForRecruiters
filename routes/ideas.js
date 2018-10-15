const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');
module.exports = router;


//LOAD IDEA MODEL
require('../models/Idea');
const Idea = mongoose.model('ideas');

//IDEAS INDEX PAGE
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({user: req.user.id})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      });
    });
});

//ADD IDEA FORM
router.get('/add', ensureAuthenticated, (req, res) =>{
  res.render('ideas/add');
});

//EDIT IDEA FORM
router.get('/edit/:id', ensureAuthenticated, (req, res) =>{
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if(idea.user != req.user.id){
      req.flash('error_msg', 'Not Authorised');
      res.redirect('/ideas');
    }else{
      res.render('ideas/edit', {
        idea: idea
      });
    }
  });
});

//PROCESS FORM POST REQUEST
router.post('/', ensureAuthenticated, (req, res) =>{
  const newUser = {
    title: req.body.title,
    details: req.body.details,
    user: req.user.id
  }
  new Idea(newUser)
  .save()
  .then(idea => {
    req.flash('success_msg', 'Todo Added');
    res.redirect('/ideas')
  });
  console.log(req.body);
});

//EDIT FORM PROCESS
router.put('/:id', ensureAuthenticated, (req, res) =>{
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    //NEW VALUES
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save()
      .then(idea =>{
        req.flash('success_msg', 'Todo Updated');
        res.redirect('/ideas');
      });
  });
});

//DELETE IDEA 
router.delete('/:id', ensureAuthenticated, (req, res) =>{
  Idea.deleteOne({_id: req.params.id})
  .then(() =>{
    req.flash('success_msg', 'Todo Removed');
    res.redirect('/ideas');
  });
});