const Joi = require("joi");

const todoJoiSchema = Joi.object({
  todo: Joi.string().required(),
  description: Joi.string(),
  dueDate: Joi.date().required(),
  completed: Joi.boolean().default(false),
});

function validateTodo(todo) {
  return todoJoiSchema.validate(todo);
}

module.exports = { validateTodo };
