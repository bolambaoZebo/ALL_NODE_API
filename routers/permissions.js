const express = require('express');
const router = express.Router();
const importTravelData = require("./travel-vlog.json")

router.get('/', async (req, res) => {
    res.send(importTravelData)
});


module.exports = router;