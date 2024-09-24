const Validator = require('validator');
const isInputEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isInputEmpty(data.school) ? data.school : '';
  data.from = !isInputEmpy(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required.";
  }

  if(Validator.isEmpty(data.from)) {
    errors.from = "From field is required."
  }
}