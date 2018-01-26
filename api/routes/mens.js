var express = require('express');
var router = express.Router();

// Database connection
const monk = require('monk');
const url = 'localhost/vivid';
const db = monk(url);

// Collections
const mens = db.get('mens')



// Seed database collections
router.get('/', (req, res, next)=>{
  mens.find()
    .then((mens)=>{
      res.json(mens)
    })
})

//By id 
router.get('/:id', (req, res, next) => {
  mens.findOne({ _id : req.params.id })
    .then((model) => {
      res.json(model)
    })
})

module.exports = router;
