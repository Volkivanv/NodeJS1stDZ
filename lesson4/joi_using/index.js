const Joi = require('joi');

const schema = Joi.string();
const result = schema.validate(10);
//console.log(JSON.stringify(result, null, 2));
console.log(result.error.details);