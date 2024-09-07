const express = require('express');

const router = express.Router();
const User = require('../../models/User')

//@route    GET api/users
//@desc     Test user
//@access   Public
router.get('/', (req, res) => {
    res.json("User routes")
})

//@route    POST api/users/register
//@desc     Register user
//@access   Public
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
})
module.exports = router;