const Validator = require("validator");
const isInputEmpty = require("./is-empty")

module.exports = function validateExperienceInput(data) {
  let errors = {}

  data.title = !isInputEmpty(data.title) ? data.title : '';
  data.company = !isInputEmpty(data.company) ? data.company : '';
  data.from = !isInputEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title Field is required."
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company Field is required."
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From Field is required."
  }

  return {
    errors,
    isValid: isInputEmpty(errors)
  }
}