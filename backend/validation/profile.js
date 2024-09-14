const Validator = require("validator");
const isInputEmpty = require("./is-input-empty");

module.exports = function ValidateProfileInput(data) {
  data.handle = !isInputEmpty(data.handle) ? data.handle : "";
  data.status = !isInputEmpty(data.status) ? data.status : "";
  data.skills = !isInputEmpty(data.skills) ? data.company : "";

  let errors = {};
  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle needs to be between 2 and 30 characters."
  }
  if (!Validator.isEmpty(data.handle)) {
    errors.handle = "Handle Field is required."
  }
  if (!Validator.isEmpty(data.skills)) {
    errors.skills = "Skill Field is required."
  }
  if (!Validator.isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Invalid URL for website"
    }
  }
  if (!Validator.isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Invalid URL for twitter"
    }
  }
  if (!Validator.isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Invalid URL for facebook"
    }
  }
  if (!Validator.isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Invalid URL for youtube"
    }
  }
  if (!Validator.isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Invalid URL for linkedin"
    }
  }
  if (!Validator.isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Invalid URL for instagram"
    }
  }

  return {
    errors,
    isValid: isInputEmpty(errors)
  }
}