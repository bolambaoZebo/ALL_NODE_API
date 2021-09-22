const express = require('express');
const router = express.Router();
const HorseNewsPost = require('../models/HorseNews');

router.get('/', async (req, res) => {
    try{
        const horsePosts = await HorseNewsPost.find();
        
        // const data = {
        //     title: horsePosts.title,
        //     description: horsePosts.description,
        //     imageUrl: horsePosts.imageUrl
        // }
        
        // res.send(data)
        res.json(horsePosts);


       }catch(err){
            res.json({message: err})
        }
});

router.post('/', async (req,res) => {

    const horsePost = new HorseNewsPost({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    })
    
   try{
     const saveHorsePost = await horsePost.save()
     res.json(saveHorsePost)
   }catch(err){
        res.json({message: err})
    }
})

// router.get('/:postId', async (req,res) => {
//     try{
//         const post = await Post.findById(req.params.postId)
//         res.json(post)
//     }catch (err){
//         res.json({ message: err })
//     }
// })

// router.delete('/:postId', async (req,res) => {
//     try{
//         const removePost = await Post.remove({_id: req.params.postId})
//         res.json(removePost)
//     }catch (err){
//         res.json({ message: err })
//     }
// })

// router.patch('/:postId', async (req,res) => {
//     try{ 
//         const updatePost = await Post.updateOne(
//             { _id: req.params.postId },
//             { $set: {title: req.body.title }})

//         res.json(updatePost)
        
//     }catch(err){
//         res.json({ message: err })
//     }
// })

module.exports = router;