const Validator = require('validator');
const isInputEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isInputEmpty(data.email) ? data.email : '';
  data.password = !isInputEmpty(data.password) ? data.password : '';

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is empty';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is empty';
  }
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }
  return {
    errors,
    isValid: isInputEmpty(errors)
  }
}