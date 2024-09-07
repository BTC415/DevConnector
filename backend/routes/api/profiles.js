const express = require('express');

const router = express.Router();
const User = require('../../models/Profile')

router.get('/', (req, res) => {
    res.json("Profile routes")
})

module.exports = router;