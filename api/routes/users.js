var express = require('express');
var router = express.Router();

// Database connection
const monk = require('monk');

// Collections
const mens = db.get('mens')

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
