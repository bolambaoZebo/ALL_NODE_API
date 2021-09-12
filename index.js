const express = require("express");
const app = express();
const importData = require("./data.json")

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const postRoute = require('./routers/posts');
const permissionVlogRoute = require('./routers/permissions');


// require('dotenv/config');
let port = process.env.PORT || 3000;

app.use(bodyParser.json())

mongoose.connect(
    process.env.DATABASE,
    () => {
    console.log('connect db')
})

app.get("/", (req,res) => {
    res.send("hello world")
});

app.get("/vlog", (req, res) => {
    res.send(importData)
})

// app.get("/travel-vlog", (req, res) => {
//     res.send(importTravelData)
// })


//ROUTES
app.use('/posts', postRoute)

app.use('/travel-vlog', permissionVlogRoute)


app.listen(port, () => {
    console.log(`example app is listening on port ${port}`)
})