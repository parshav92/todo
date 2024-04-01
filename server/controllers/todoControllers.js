const Todo = require("../models/Todo");
const { validateTodo } = require("../validations/validate");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  const { title, description, dueDate } = req.body;

  const { error } = await validateTodo({
    title,
    description,
    dueDate,
  });

  if (error) {
    return res.status(400).json({ error: error.details });
  }
  try {
    const newTodo = new Todo({
      title,
      description,
      dueDate,
    });

    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.patchTodo = async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  const { id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, dueDate, completed },
      { new: true, useFindAndModify: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).json("Todo deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany();
    res.status(204).json("all todos deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
