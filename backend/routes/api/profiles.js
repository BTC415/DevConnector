const express = require('express');

const router = express.Router();
const User = require('../../models/Profile');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//@route    GET api/profiles
//@desc     Get current users profile 
//@access   Private
router.get('/', auth, (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = "Profile does not exist for this user."
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(500).json(err))
})

//@route    POST api/profiles
//@desc     Create or Edit user profile 
//@access   Private
router.post('/', auth, (req, res) => {
  //Check if register inputs are valid
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  profileFields.skills = req.body.skills
  //Social inputs
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        //update profile

        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json(profile))
      } else {
        //create profile
        //check if handle already exists
        Profile.findOne({ handle: req.user.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "Handle already exists. Try to use another handle."
              res.status(400).json(errors)
            }

            //save profile
            new Profile(profileFields).save()
              .then(profile => res.json(profile))
          })
      }
    })
})

//@route    GET api/profiles/handle/:handle
//@desc     Get user profile by handle
//@access   Public
router.get('/handle/:handle', (req, res) => {
  const handle = req.params.handle;
  const errors = {};

  Profile.findOne({ handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user."
        return res.status(404).json(errors)
      }
      res.json(profile);
    })
    .catch(err => res.status(500).json(err))
})

//@route    GET api/profiles/user/:user_id
//@desc     Get user profile by user id
//@access   Public
router.get('/user/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const errors = {};

  Profile.findOne({ user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user."
        return res.status(400).json(errors);
      }
      res.json(profile)
    })
})

//@route    GET api/profiles/all
//@desc     Get all users' profile
//@access   Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "There isn't any user profiles."
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => res.status(500).json("Internal Server Error: ", err))
})

//@route    POST api/profiles/add-experience
//@desc     Add experience to profile
//@access   Private
router.post('/add-experience', auth, (req, res) => {
  //Check if input field is valid
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  //Get experience fields from input
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user. So you cannot add experience";
        return res.status(404).json(errors);
      }

      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      //Add experience in the exp array from the beginning(insert)
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile))
    })
})

//@route    POST api/profiles/add-education
//@desc     Add education to profile
//@access   Private
router.post('/add-education', auth, (req, res) => {
  //Check if the input fields are valid.
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    res.status(400).json(errors)
  }

  //Get education fields from input
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user."
        return res.status(400).json(errors)
      }

      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      profile.education.unshift(newEdu);
      profile.save()
        .then(profile => res.json(profile))
        .catch(err => {
          return res.status(500).json("Internal Server Error. Please try again later ----->", err)
        })
    })
})

//@route    DELETE api/profiles/:exp_id
//@desc     Delete user's work experience by its id from profile
//@access   Private
router.delete("/:exp_id", auth, (req, res) => {
  const exp_id = req.params.exp_id;
  Profile.fineOne({ user: req.user.id })
    .then(profile => {
      //Find the experience item with its id.
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(exp_id);

      //Delete experience item from profile
      profile = profile.experience.splice(removeIndex, 1);

      //save
      profile.save()
        .then(profile => res.json(profile))
    }).catch(err => res.status(404).json(err))
})

//@route    DELETE api/profiles/:edu_id
//@desc     Delete user's education by its id from profile
//@access   Private


//@route    DELETE api/profiles
//@desc     Delete user's profile and user
//@access   Private

module.exports = router;