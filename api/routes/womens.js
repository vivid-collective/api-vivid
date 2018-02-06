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

// DELETE One by id
router.delete('/:id', (req, res, next) => {
    womens.findOneAndDelete({ _id: req.params.id }).then(deleted => res.json({ message: 'Deleted', deletedModel: deleted }))
})

// PATCH One by id
router.patch('/:id', (req, res, next) => {
    womens.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(updated => res.json({ message: 'Updated', updatedModel: updated }))
})

// POST One
router.post('/', (req, res, next) => {
    womens.insert(req.body).then(posted => res.json({ message: 'Posted', newModel: posted }))
})

module.exports = router