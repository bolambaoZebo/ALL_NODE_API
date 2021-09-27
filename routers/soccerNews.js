const express = require('express');
const router = express.Router();
const SoccerNewsPost = require('../models/SoccerNews');
const SoccerNewsModel = require('../models/SoccerNewsModel')

router.get('/', async (req, res) => {
    try{
        const soccerPosts = await SoccerNewsPost.find();
        const loadedNews = [];
        const enData = [];
        const zhData = [];

        // new SoccerNewsModel(
        //     soccerPosts[key].id,
        //     soccerPosts[key].title,
        //     soccerPosts[key].description,
        //     soccerPosts[key].imageUr
 
        for (const key in soccerPosts) {
            enData.push({
                title: soccerPosts[key].en.title,
                description: soccerPosts[key].en.description
            })
            zhData.push({
                titleChinese: soccerPosts[key].zh.titleChinese,
                descriptionChinese: soccerPosts[key].zh.descriptionChinese
            })
              loadedNews.push({
                id: soccerPosts[key].id,
                imageUrl: soccerPosts[key].imageUrl
            })

        };

        console.log(loadedNews)

        res.json({loadedNews,enData,zhData});

       }catch(err){
            res.json({message: err})
        }
});

router.post('/', async (req,res) => {

    const soccerPost = new SoccerNewsPost({
        en:{
            title: req.body.en.title,
            description: req.body.en.description,
        },
        zh:{
            titleChinese: req.body.zh.titleChinese,
            descriptionChinese: req.body.zh.descriptionChinese,
        },
        imageUrl: req.body.imageUrl
    })

    console.log(`Formated datajson${soccerPost}`)
    
   try{
     const saveSoccerPost = await soccerPost.save()
     console.log(`Save from database${saveSoccerPost}`)
     res.json(saveSoccerPost)
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