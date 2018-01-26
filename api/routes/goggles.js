var express = require('express');
var router = express.Router();

// Database connection
const monk = require('monk');
const url = 'localhost/vivid';
const db = monk(url);

// Collections
const goggles = db.get('goggles')



// Seed database collections
router.get('/', (req, res, next) => {
    goggles.find()
        .then((goggles) => {
            res.json(goggles)
        })
})

router.get('/:id', (req, res, next) => {
    goggles.findOne({_id : req.params.id })
        .then((goggle) => {
            res.json(goggle)
        })
})

module.exports = router;
