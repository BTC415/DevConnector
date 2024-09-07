const express = require('express');

const router = express.Router();
const User = require('../../models/Post')

router.get('/', (req, res) => {
    res.json("Post routes")
})

module.exports = router;