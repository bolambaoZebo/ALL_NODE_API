const express = require("express");
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const postRoute = require('./routers/posts');
const vlogRoute = require('./routers/vlog');
const permissionVlogRoute = require('./routers/permissions');
const casinoPokerTipsRoute = require('./routers/casinoPokerTips');


// require('dotenv/config');
let port = process.env.PORT || 3000;

app.use(bodyParser.json())

mongoose.connect(
    process.env.DATABASE,
    () => {
    console.log('connect db')
})

//ROUTES
app.use('/posts', postRoute)

app.use('/vlog', vlogRoute)

app.use('/travel-vlog', permissionVlogRoute)

app.use('/casino-poker-tips', casinoPokerTipsRoute)


app.listen(port, () => {
    console.warn(`THE APP IS LISTENING ${port}`)
})


// app.get("/", (req,res) => {
//     res.send("hello world")
// });

// app.get("/vlog", (req, res) => {
//     res.send(importData)
// })

// app.get("/travel-vlog", (req, res) => {
//     res.send(importTravelData)
// })

