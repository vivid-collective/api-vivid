var express = require('express');
var router = express.Router();

// Seed data
const mensSeedData = require('../seed/mensSunglasses.json')
const womensSeedData = require('../seed/womensSunglasses.json')
const goggleSeedData = require('../seed/goggleSeedData.json')

// Database connection
const monk = require('monk');
const url = 'localhost/vivid';
const db = monk(url);

// Collections
const mens = db.get('mens')
const womens = db.get('womens')
const goggles = db.get('goggles')


// Seed database collections
router.get('/seed', (req, res) => {
  mens.drop()
    .then(() => womens.drop())
    .then(() => goggles.drop())
    .then(() => {
      goggles.insert(goggleSeedData)
      mens.insert(mensSeedData)
      womens.insert(womensSeedData)
    })
    .then(() => {
      res.send('seeded')
    })
})

router.get('/goggles', (req, res) => {
  goggles.find()
    .then(goggles => {
      res.json(goggles)
    })
})

router.get('/mens', (req, res) => {
  mens.find()
    .then(mens => {
      res.json(mens)
    })
})

router.get('/womens', (req, res) => {
  womens.find()
    .then(womens => {
      res.json(womens)
    })
})

module.exports = router;
