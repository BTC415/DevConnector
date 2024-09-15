const Validator = require("validator");
const isInputEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  data.handle = !isInputEmpty(data.handle) ? data.handle : "";
  data.status = !isInputEmpty(data.status) ? data.status : "";
  data.skills = !isInputEmpty(data.skills) ? data.skills : "";

  let errors = {};
  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle needs to be between 2 and 30 characters."
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle Field is required."
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skill Field is required."
  }
  if (!isInputEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Invalid URL for website"
    }
  }
  if (!isInputEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Invalid URL for twitter"
    }
  }
  if (!isInputEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Invalid URL for facebook"
    }
  }
  if (!isInputEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Invalid URL for youtube"
    }
  }
  if (!isInputEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Invalid URL for linkedin"
    }
  }
  if (!isInputEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Invalid URL for instagram"
    }
  }

  return {
    errors,
    isValid: isInputEmpty(errors)
  }
}