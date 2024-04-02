import Joi from "joi";

export const schema = Joi.object({
  title: Joi.string().required().label("Title"),
  dueDate: Joi.date().iso().required().label("Date"),
  description: Joi.string().allow("").label("Description"),
});

export const validateForm = (todo, setErrors) => {
  const { error } = schema.validate(todo, { abortEarly: false });
  if (error) {
    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.context.key] = detail.message;
    });
    setErrors(newErrors);
    setTimeout(() => {
      setErrors({});
    }, 2000);
    return false;
  }
  setErrors({});
  return true;
};
