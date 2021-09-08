const express = require("express");
const app = express();
const importData = require("./data.json")
const importTravelData = require("./travel-vlog.json")
let port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("hello world")
});

app.get("/vlog", (req, res) => {
    res.send(importData)
})

app.get("/travel-vlog", (req, res) => {
    res.send(importTravelData)
})

app.listen(port, () => {
    console.log(`exampl;e app is listening on port ${port}`)
})