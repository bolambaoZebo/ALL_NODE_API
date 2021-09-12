const express = require('express');
const router = express.Router();
const importTravelData = require("../data.json")

router.get('/', async (req, res) => {
    res.send(importTravelData)
});


module.exports = router;