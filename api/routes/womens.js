var express = require('express')
var router = express.Router()

// Database connection
const monk = require('monk')
const url = 'localhost/vivid'
const db = monk(url)

// Collections
const womens = db.get('womens')

// Routes

// GET All
router.get('/', (req, res, next) => {
    womens.find().then(womens => res.json(womens))
})

// GET One by model querystring
router.get('/search', (req, res, next) => {
    if (req.query.model) {
        womens.findOne({ 'sunglass.model': req.query.model }).then(model => res.json(model))
    } else {
        res.json({ error: 'Please enter search term' })
    }
})

// GET One by id
router.get('/:id', (req, res, next) => {
    womens.findOne({ _id: req.params.id }).then(model => res.json(model))
})

module.exports = router