const express = require('express');
const router = express.Router();
const HorseNewsPost = require('../models/HorseNews');
const NewsModel = require('../models/HorseNewsModel')

router.get('/', async (req, res) => {
    try{
        const horsePosts = await HorseNewsPost.find();
        const loadedNews = [];

        for (const key in horsePosts) {
  
            loadedNews.push(
            new NewsModel(
                horsePosts[key].id,
                horsePosts[key].title,
                horsePosts[key].description,
                horsePosts[key].imageUrl
            )
          );
        };

        console.log(loadedNews)

        res.json(loadedNews);

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

    console.log(`Formated datajson${horsePost}`)
    
   try{
     const saveHorsePost = await horsePost.save()
     console.log(`Save from database${saveHorsePost}`)
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