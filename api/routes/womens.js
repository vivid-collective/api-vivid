var express = require('express');
var router = express.Router();

// Database connection
const monk = require('monk');
const url = 'localhost/vivid';
const db = monk(url);

// Collections
const womens = db.get('womens')



// Seed database collections
router.get('/', (req, res, next) => {
    womens.find()
        .then((womens) => {
            res.json(womens)
        })
})

//get by id
router.get('/:id', (req, res, next) => {
    womens.findOne({
            _id: req.params.id
        })
        .then((model) => {
            res.json(model)
        })
})
// find by model
router.get('/search/:model', (req, res, next) => {
    womens.find()
        .then((womens) => {
            let model = womens.find((thing) => {
                return thing.sunglass.model === req.params.model;
            })
            res.json(model)
        })
})

module.exports = router;