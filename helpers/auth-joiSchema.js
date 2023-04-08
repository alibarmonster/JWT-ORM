const Joi = require('joi');

const registerValidation = Joi.object({
  username: Joi.string().alphanum().min(5).max(15).required().messages({
    'string.empty': 'username tidak boleh kosong',
    'string.min': 'username harus terdiri dari 5 karakter ',
    'string.max': 'username tidak boleh lebih dari 15 karakter',
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
    'string.pattern.base':
      'password harus terdiri dari 8 sampai 30 karakter dan hanya mengandung huruf dan angka ',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': 'email tidak boleh kosong',
      'string.email': 'email harus valid',
    }),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': 'email tidak boleh kosong',
      'string.email': 'email harus valid',
    }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
    'string.pattern.base':
      'password harus terdiri dari 8 sampai 30 karakter dan hanya mengandung huruf dan angka ',
  }),
});

module.exports = { registerValidation, loginValidation };
