const express = require('express');

const router = express.Router();
const User = require('../../models/Profile');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');

//@route    POST api/profiles/create
//@desc     Create Profiles 
//@access   Private

module.exports = router;