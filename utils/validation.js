
const Joi = require('@hapi/joi');


//Register validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(6),
        location: Joi.string().min(6).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        date: Joi.date()
        // email: Joi.string().min(6).required().email(),
    })

   return schema.validate(data)

};

//Login validation
const loginValidation = data => {
    const schema = Joi.object({
        phone: Joi.string().min(6),
        password: Joi.string().min(6).required(),
    })

   return schema.validate(data)

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

