const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.get('/', (req, res) => {
    res.send("hello wold")
});

router.post('/', (req,res) => {

    console.log(req.body.title,req.body.description)
    const post = new Post({
        title: 'hello',
        description: 'wolrd'
    })
    
    post.save()
    .then( data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
})

module.exports = router;