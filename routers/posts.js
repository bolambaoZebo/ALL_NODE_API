const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.get('/', async (req, res) => {
    // res.send("hello wold")
    try{
        const posts = await Post.find();
        res.json(posts);
       }catch(err){
            res.json({message: err})
        }
});

router.post('/', async (req,res) => {

    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    
   try{
    const savePost = await post.save()
    res.json(savePost)
   }catch(err){
        res.json({message: err})
    }
})

module.exports = router;