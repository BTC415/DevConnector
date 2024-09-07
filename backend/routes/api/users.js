const express = require('express');
const gravatar = require('gravatar');

const router = express.Router();
const User = require('../../models/User')
const validateRegisterInput = require("../../validation/register");

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
  const { error, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(error);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        error.email = 'Email already exists';
        return res.status(400).json(error);
      } else {
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar,
        });
        newUser.save()
          .then(user => {
            res.json(user)
          })
          .catch(err => {
            res.status(404).json(err);
          })
      }
    })
})
module.exports = router;