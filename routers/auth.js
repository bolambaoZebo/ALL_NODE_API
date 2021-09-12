const express = require('express');
const router = express.Router();
const User = require('../models/User');

const Joi = require('@hapi/joi');

const schema = {
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().min(6).required()
    // email: Joi.string().min(6).required().email(),
}

router.get('/', async (req, res) => {
    // res.send("hello wold")
    try{
        const users = await User.find();
        res.json(users);
       }catch(err){
            res.json({message: err})
        }
});

router.post('/register', async (req,res) => {

    //VALIDATE DATA FROM THE USER
    const validation = Joi.validate(req.body, schema)

    res.send(validation)
//     const user = new User({
//         name: req.body.name,
//         password: req.body.password,
//         phone: req.body.phone,
//         location: req.body.location,
//         email: req.body.email,
//     })
    
//    try{
//     const saveUser = await user.save()
//     res.json(saveUser)
//    }catch(err){
//         res.status(404).send(err)
//     }
})

// router.post('/login', async (req,res) => {

//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     })
    
//    try{
//     const savePost = await post.save()
//     res.json(savePost)
//    }catch(err){
//         res.json({message: err})
//     }
// })

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