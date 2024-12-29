const Joi = require('joi');

const personScheme = Joi.object({
    name: Joi.string().min(1).required(),
    surname: Joi.string().min(1).required(),
    age: Joi.number().integer().greater(10),
    description: Joi.string().min(10).required(),
});

const idScheme = Joi.object({
    id: Joi.number().required(),
})

module.exports = {personScheme: personScheme, idScheme};