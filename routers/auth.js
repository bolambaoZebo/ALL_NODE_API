const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyUser = require('../utils/verifyToken');
const {registerValidation,loginValidation} = require('../utils/validation');



router.get('/user', verifyUser, async (req, res) => {
    try{
        res.send(req.user)
       }catch(err){
            res.json({message: err})
        }
});

//REGISTER ROUTE
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
    

   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
   
   try{
    const saveUser = await user.save()
    res.header('aut-token', token).send({
        message: "isSuccessful",
        user: {
            id: user._id,
            token:token,
            location: user.location,
            email: user.email
        }
    })
    // res.json({ 
    //     message: "isSuccessful",
    //     user: {
    //         id: user._id,
    //         token:token,
    //         location: user.location,
    //         email: user.email
    //     }
    //  })
   }catch(err){
        res.status(404).send(err)
    }
})


//LOGIN ROUTE
router.post('/login', async (req,res) => {

    console.log('login path')
    console.log(req.body.phone,req.body.password)

    const { error } = loginValidation(req.body)
    console.log(error)
    if (error) return res.status(400).send(error.details[0].message)

    //check if user already registered
    const user = await User.findOne({ phone: req.body.phone })
    if(!user) return res.status(400).send("account doesn't exist")
    //check password correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('aut-token', token).send({
        message: "isSuccessful",
        user: {
            id: user._id,
            token:token,
            location: user.location,
            email: user.email
        }
    })
 
})

module.exports = router;