const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../utils/validation');

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

    console.log('register path')

    //VALIDATE DATA FROM THE USER
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if user already registered
    const userPhone = await User.findOne({ phone: req.body.phone })
    if(userPhone) return res.status(400).send('User already exist')

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        password: hashedPassword,
        phone: req.body.phone,
        location: req.body.location,
        email: req.body.email,
    })
    
   try{
    const saveUser = await user.save()
    res.json({ user: user._id })
   }catch(err){
        res.status(404).send(err)
    }
})

//LOGIN

router.post('/login', async (req,res) => {

    console.log('login path')

    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check if user already registered
    const user = await User.findOne({ phone: req.body.phone })
    if(!user) return res.status(400).send("account doesn't exist")
    //check password correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    res.send('login')
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    // res.header('aut-token', token)
 
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