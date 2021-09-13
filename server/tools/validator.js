const Validator = require('validator');
const isEmpty = value => {
  return (
    value == undefined || value === null ||
    (typeof value ==='object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

exports.validateLoginInput = function validateLoginInput(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(data.email)) {
    errors.email = 'You must type your email!'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'You must type correct email!'
  }

  if (Validator.isEmpty(data.password)) {
    errors.email = 'You must type your password!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

exports.validateRegisterInput = function validateRegisterInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''


  if (Validator.isEmpty(data.name)) {
    errors.name = 'You must type your name!'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'You must type your email!'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'You must type correct email!'
  }

  if (Validator.isEmpty(data.password)) {
    errors.email = 'You must type your password!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
