const express = require("express");
const app = express();
const importData = require("./data.json")
let port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("hello world")
});

app.get("/vlog", (req, res) => {
    res.send(importData)
})

app.get("/travel-blog", (req, res) => {
    res.send(importData)
})

app.listen(port, () => {
    console.log(`exampl;e app is listening on port ${port}`)
})