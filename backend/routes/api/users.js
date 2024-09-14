const express = require('express');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

const router = express.Router();
const User = require('../../models/User')
const secretOrKey = require('../../config/keys').secretOrKey
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")

//@route    POST api/users/register
//@desc     Register user
//@access   Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar,
        })

        bcryptjs.genSalt(10, (err, salt) => {
          bcryptjs.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => res.status(404).json(err))
          })
        })
      }
    })
})

//@route    POST api/users/login
//@desc     Login 
//@access   Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    res.status(400).json(errors)
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found!'
        return res.status(404).json(errors)
      } else {
        bcryptjs.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              //User Matched
              const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar
              }
              jwt.sign(
                payload,
                secretOrKey,
                { expiresIn: '1h' },
                (err, token) => {
                  return res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                }
              )
            } else {
              errors.password = "Password incorrect"
              return res.status(400).json(errors)
            }
          })
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json("message: Server Error")
    })

})

//@route    GET api/users/
//@desc     Get current user 
//@access   Private
router.get('/', auth, (req, res) => {
  try {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  } catch (err) {
    res.status(500).json("Server error")
  }
})

module.exports = router;