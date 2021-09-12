const express = require('express');
const router = express.Router();
const importTravelData = require("../data_pop_up/casino-poker-tips.json")

router.get('/', async (req, res) => {
    res.send(importTravelData)
});


module.exports = router;