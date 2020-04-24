const Joi = require("@hapi/joi");

exports.userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": `"{#value}" should be a type of 'text'`,
    "string.empty": `"{#value}" cannot be an empty field`,
    "string.max": `"{#value}" should have a maximum length of {#limit}`,
    "any.required": `"{#value}" is a required field`,
    "string.alphanum": `"{#value}"  must be a alphanumeric value`,
  }),

  name: Joi.string().max(30).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.max": `"name" should have a maximum length of {#limit}`,
    "any.required": `"name" is a required field`,
    "string.alphanum": `"name"  must be a alphanumeric value`,
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeatPassword: Joi.ref("password"),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: true },
  }),
}).with("password", "repeatPassword");

exports.productSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": `"{#value}" should be a type of 'text'`,
    "string.empty": `"{#value}" cannot be an empty field`,
    "string.max": `"{#value}" should have a maximum length of {#limit}`,
    "any.required": `"{#value}" is a required field`,
    "string.alphanum": `"{#value}"  must be a alphanumeric value`,
  }),

  price: Joi.number().empty().required().messages({
    "number.base": `"{#value}" should be a number`,
    "number.empty": `"{#value}" cannot be an empty field`,
    "any.required": `"{#value}" is a required field`,
  }),

  description: Joi.string(),
});
