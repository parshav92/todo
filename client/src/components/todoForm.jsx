import React, { useState } from "react";
import Joi from "joi";
import { createTodo } from "../services/todoService";

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    dueDate: Joi.date().iso().required().label("Date"),
    description: Joi.string().allow("").label("Description"),
  });

  const validateForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await createTodo(todo);

        console.log(todo);
        setSuccessMessage("Your Todo has been created");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setTodo({
          title: "",
          dueDate: "",
          description: "",
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center align-middle text-2xl font-bold">Todo List</h1>
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <div role="alert" className="alert alert-success p-2 mt-1 text-xs">
            <span>{successMessage}</span>
          </div>
        )}
        {(errors.title || errors.dueDate) && (
          <div role="alert" className="alert alert-error p-2 mt-1 text-xs">
            <span>Error! Please enter a task and date</span>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-md input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            name="dueDate"
            value={todo.dueDate}
            onChange={handleChange}
            className="input input-bordered input-md w-full max-w-xs text-slate-400"
          />
          <button type="submit" className="btn btn-circle btn-secondary btn-s">
            +
          </button>
        </div>
        <textarea
          name="description"
          value={todo.description}
          onChange={handleChange}
          className="textarea w-full textarea-bordered textarea-sm"
          placeholder="Description"
        ></textarea>
      </form>
    </div>
  );
};

export default TodoForm;
