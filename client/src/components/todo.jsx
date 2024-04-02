import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "./todoForm";
import TodoTable from "./todoTable";
import { validateForm } from "../validators/validation";
import {
  getTodos,
  deleteTodo,
  patchTodo,
  createTodo,
} from "../services/todoService";
import { toast } from "react-toastify";
const TodoContainer = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todos, setTodos] = useState([]);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const todosData = await getTodos();
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(todo, setErrors)) return;

    try {
      await createTodo({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
      });
      setSuccessMessage("Task added successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      setTodo({
        title: "",
        description: "",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error creating todo", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);

      const totalPages = Math.ceil(updatedTodos.length / itemsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This todo has already been deleted");
      } else {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const handleCompleted = async (id) => {
    try {
      const todoIndex = todos.findIndex((todo) => todo._id === id);
      if (todoIndex === -1) throw new Error("Todo not found");

      const updatedTodos = [...todos];
      updatedTodos[todoIndex].completed = !updatedTodos[todoIndex].completed;

      setTodos(updatedTodos);

      await patchTodo(id, { completed: updatedTodos[todoIndex].completed });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This todo has already been deleted");
      } else {
        console.error("Error toggling todo completion:", error);
      }
    }
  };

  //   Other functions for pagination, etc.
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center bg-opacity-15 backdrop-blur-md mx-4">
      <div
        className="bg-opacity-50 rounded-lg p-4 w-full max-w-lg"
        style={{ boxShadow: "0 0 16px 0 rgba(31, 38, 135, 0.3)" }}
      >
        <TodoForm
          todo={todo}
          errors={errors}
          successMessage={successMessage}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <TodoTable
          currentPage={currentPage}
          todos={todos}
          onDelete={handleDelete}
          onComplete={handleCompleted}
          currentItems={currentItems}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TodoContainer;
