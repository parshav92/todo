const Joi = require("joi");

const todoJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  dueDate: Joi.date().required(),
  completed: Joi.boolean().default(false),
});

function validateTodo(todo) {
  return todoJoiSchema.validate(todo);
}

module.exports = { validateTodo };
