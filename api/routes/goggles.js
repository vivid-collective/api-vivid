var express = require('express');
var router = express.Router();

// Database connection
const monk = require('monk');
const url = 'localhost/vivid';
const db = monk(url);

// Collections
const goggles = db.get('goggles')

// Routes

// GET All
router.get('/', (req, res, next) => {
    goggles.find().then(goggles => res.json(goggles))
})

// GET One by model querystring
router.get('/search', (req, res, next) => {
    if (req.query.model) {
        goggles.findOne({ 'sunglass.model': req.query.model }).then(model => res.json(model))
    } else {
        res.json({ error: 'Please enter search term' })
    }
})

// GET One by id
router.get('/:id', (req, res, next) => {
    goggles.findOne({ _id: req.params.id }).then(model => res.json(model))
})

module.exports = router;
