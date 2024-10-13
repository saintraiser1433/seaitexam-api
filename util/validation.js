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
      username: Joi.string().min(3).max(30).empty().optional(),
      password: Joi.string().min(3).max(30).empty().optional(),
    });
    return schema.validate(data);
  },
};

const courseValidation = {
  insert: (data) => {
    const schema = Joi.object({
      description: Joi.string().required().messages({
        "string.empty": `Description cannot be empty`,
        "any.required": `Description cannot be null or empty`,
      }),
      score: Joi.number().min(1).required().messages({
        "string.base": `Score should be a type of 'number'`,
        "string.empty": `Score cannot be empty`,
        "any.required": `Score cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },
  update: (data) => {
    const schema = Joi.object({
      description: Joi.string().empty().optional().messages({
        "string.empty": `Description cannot be empty`,
        "any.required": `Description cannot be null or empty`,
      }),
      score: Joi.number().min(1).optional().messages({
        "string.base": `Score should be a type of 'number'`,
        "string.empty": `Score cannot be empty`,
        "any.required": `Score cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },
};

const questionValidation = {
  checkValidate: (data) => {
    const schema = Joi.object({
      question: Joi.string().required().messages({
        "string.empty": `Question cannot be empty`,
        "any.required": `Question cannot be null or empty`,
      }),
      exam_id: Joi.number().required().messages({
        "number.empty": `Exam cannot be empty`,
        "number.required": `Exam cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },
};

const examValidation = {
  insert: (data) => {
    const schema = Joi.object({
      exam_title: Joi.string().required().messages({
        "string.empty": `Question cannot be empty`,
        "any.required": `Question cannot be null or empty`,
      }),
      description: Joi.string().required().messages({
        "string.empty": `Exam Title cannot be empty`,
        "any.required": `Exam Title cannot be null or empty`,
      }),
      time_limit: Joi.number().required().messages({
        "string.empty": `Time Limit cannot be empty`,
        "any.required": `Time Limit cannot be null or empty`,
      }),
      question_limit: Joi.number().required().messages({
        "string.empty": `Question Limit cannot be empty`,
        "any.required": `Question Limit cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },
  update: (data) => {
    const schema = Joi.object({
      exam_title: Joi.string().min(1).empty().optional().messages({
        "string.min": `Exam Title should have a minimum length of {#limit}`,
        "string.empty": `Exam Title cannot be empty`,
        "any.required": `Exam Title cannot be null or empty`,
      }),
      description: Joi.string().min(1).empty().optional().messages({
        "string.min": `Exam description should have a minimum length of {#limit}`,
        "string.empty": `Exam description cannot be empty`,
        "any.required": `Exam description  cannot be null or empty`,
      }),
      time_limit: Joi.number().min(1).empty().optional().messages({
        "number.min": `Time limit should have a minimum length of {#limit}`,
        "string.empty": `Time Limit cannot be empty`,
        "any.required": `Time Limit cannot be null or empty`,
      }),
      question_limit: Joi.number().min(1).empty().optional().messages({
        "number.min": `Question Limit should have a minimum length of {#limit}`,
        "string.empty": `Question Limit cannot be empty`,
        "any.required": `Question Limit cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },
};

const choicesValidation = {
  choiceValidate: (data) => {
    const schema = Joi.array().items({
      description: Joi.string().required().messages({
        "string.empty": `Choice cannot be empty`,
        "any.required": `Choice cannot be null or empty`,
      }),
      question_id: Joi.number().required().messages({
        "number.empty": `Question cannot be empty`,
        "any.required": `Question cannot be null or empty`,
      }),
      status: Joi.boolean().optional(),
    });
    return schema.validate(data);
  },
};

const answerValidation = {
  validate: (data) => {
    const schema = Joi.object({
      examinee_id: Joi.number().required().messages({
        "any.required": `Examinee is null or empty`,
      }),
      choices_id: Joi.number().required().messages({
        "any.required": `Choices is null or empty`,
      }),
      exam_id: Joi.number().required().messages({
        "any.required": `Exam is null or empty`,
      }),
      question_id: Joi.number().required().messages({
        "any.required": `Question is null or empty`,
      }),
    });
    return schema.validate(data);
  },
};

module.exports = {
  examineeValidation,
  courseValidation,
  questionValidation,
  examValidation,
  choicesValidation,
  answerValidation,
};
