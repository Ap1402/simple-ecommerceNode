const Joi = require("@hapi/joi");

exports.userSchema = Joi.object({
  username: Joi.when("$login", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().alphanum().min(3).max(30),
    otherwise: Joi.string().alphanum().min(3).max(30).required(),
  }),

  name: Joi.when("$login", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),

  lastName: Joi.string().max(30),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeatPassword: Joi.when("$login", {
    is: Joi.boolean().valid(true),
    then: Joi.string().max(30),
    otherwise: Joi.ref("password"),
  }).when("$update", {
    is: Joi.boolean().valid(true),
    then: Joi.string().max(30).optional(),
    otherwise: Joi.ref("password"),
  }),

  email: Joi.when("$login", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: true },
      })
      .required(),
    otherwise: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: true },
    }),
  }),
}).messages({
  "string.base": `"{#value}" should be a type of 'text'`,
  "string.empty": `"{#value}" cannot be an empty field`,
  "string.max": `"{#value}" should have a maximum length of {#limit}`,
  "any.required": `"{#value}" is a required field`,
  "string.alphanum": `"{#value}"  must be a alphanumeric value`,
});

exports.productSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().empty().required(),

  description: Joi.string().required(),
  discountAmount: Joi.string(),
  discountPercent: Joi.string(),
}).messages({
  "string.base": `"{#value}" should be a type of 'text'`,
  "string.empty": `"{#value}" cannot be an empty field`,
  "string.max": `"{#value}" should have a maximum length of {#limit}`,
  "any.required": `"{#value}" is a required field`,
  "string.alphanum": `"{#value}"  must be a alphanumeric value`,
  "number.base": `"{#value}" should be a number`,
  "number.empty": `"{#value}" cannot be an empty field`,
  "any.required": `"{#value}" is a required field`,
});

exports.orderSchema = Joi.object({
  shippingAddress: Joi.string().alphanum().min(3).max(30).required(),

  phoneNumber: Joi.string().empty().required(),

  specificationsForShipping: Joi.string().alphanum().max(60),
}).messages({
  "string.base": `"{#value}" should be a type of 'text'`,
  "string.empty": `"{#value}" cannot be an empty field`,
  "string.max": `"{#value}" should have a maximum length of {#limit}`,
  "any.required": `"{#value}" is a required field`,
  "string.alphanum": `"{#value}"  must be a alphanumeric value`,
  "number.base": `"{#value}" should be a number`,
  "number.empty": `"{#value}" cannot be an empty field`,
  "any.required": `"{#value}" is a required field`,
});

exports.categorySchema = Joi.object({
  name: Joi.string().alphanum().max(30).required(),
}).messages({
  "string.base": `"{#value}" should be a type of 'text'`,
  "string.empty": `"{#value}" cannot be an empty field`,
  "string.max": `"{#value}" should have a maximum length of {#limit}`,
  "any.required": `"{#value}" is a required field`,
  "string.alphanum": `"{#value}"  must be a alphanumeric value`,
  "number.base": `"{#value}" should be a number`,
  "number.empty": `"{#value}" cannot be an empty field`,
  "any.required": `"{#value}" is a required field`,
});
