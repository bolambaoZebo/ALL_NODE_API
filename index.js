const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// require('dotenv/config');

const authRoute = require('./routers/auth');
const postRoute = require('./routers/posts');

const vlogRoute = require('./routers/vlog');
const permissionVlogRoute = require('./routers/permissions');

const videoLink = require('./routers/getVideoLink');

const horseRaceRoute = require('./routers/horseRace');
const horseNews = require('./routers/horseNews');

const casinoPokerTipsRoute = require('./routers/casinoPokerTips');

let port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(
    process.env.DATABASE,
    () => {
    console.log('connect db')
})

app.use(express.urlencoded({extended:false}));

//ROUTES
app.use('/auth', authRoute)

app.use('/posts', postRoute)

app.use('/vlog', vlogRoute)

app.use('/travel-vlog', permissionVlogRoute)

app.use('/horse-race', horseRaceRoute)

app.use('/horse-news', horseNews)

app.use('/video-link', videoLink)

app.use('/casino-poker-tips', casinoPokerTipsRoute)


app.listen(port, () => {
    console.warn(`THE APP IS LISTENING ${port}`)
})


