const Joi = require("joi");

//creation-examinee
const examineeValidation = {
  insert: (data) => {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(30).required().messages({
        "string.base": `First Name should be a type of 'text'`,
        "string.empty": `First Name cannot be empty`,
        "string.min": `First Name should have a minimum length of {#limit}`,
        "string.max": `First Name should have a maximum length of {#limit}`,
        "any.required": `First Name cannot be null or empty`,
      }),
      last_name: Joi.string().min(3).max(30).required().messages({
        "string.base": `Last Name should be a type of 'text'`,
        "string.empty": `Last Name cannot be empty`,
        "string.min": `Last Name should have a minimum length of {#limit}`,
        "string.max": `Last Name should have a maximum length of {#limit}`,
        "any.required": `Last Name cannot be null or empty`,
      }),
      middle_name: Joi.string().min(3).max(30).required(),
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().max(30).required(),
    });
    return schema.validate(data);
  },

  update: (data) => {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(30).empty().optional(),
      last_name: Joi.string().min(3).max(30).empty().optional(),
      middle_name: Joi.string().min(3).max(30).empty().optional(),
    });
    return schema.validate(data);
  },
};

const courseValidation = {
  checkValidate: (data) => {
    const schema = Joi.object({
      description: Joi.string().required().messages({
        "string.empty": `Description cannot be empty`,
        "any.required": `Description cannot be null or empty`,
      }),
      score: Joi.number().min(1).required().messages({
        "string.base": `Score should be a type of 'integer'`,
        "string.empty": `Score cannot be empty`,
        "any.required": `Score cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },
};

module.exports = {
  examineeValidation,
  courseValidation,
};
