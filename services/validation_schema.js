const Joi = require("joi");

const registrationValidation = Joi.object({
    username:Joi.string().required(),
    country:Joi.string().required(),
    phone:Joi.string().required(),
    email:Joi.string().required(),
    password: Joi.string().required()
});

module.exports = { registrationValidation };