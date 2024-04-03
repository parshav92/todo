import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "./todoForm";
import TodoTable from "./todoTable";
import { validateForm } from "../utils/validation";
import Pagination from "./common/pagination";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
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
      if (isEditing) {
        await patchTodo(editingTodoId, {
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
        });
        toast.success("Todo updated successfully");
        fetchData();
      } else {
        // If not editing, send POST request to create new todo
        await createTodo({
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
        });
        toast.success("Todo added successfully");
        fetchData();
      }
      setSuccessMessage(
        isEditing ? "Todo updated successfully" : "Todo added successfully"
      );
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      setTodo({
        title: "",
        description: "",
        dueDate: "",
      });
      setIsEditing(false);
      setEditingTodoId(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred. Please try again.");
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

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    setTodo({
      title: todoToEdit.title,
      description: todoToEdit.description,
      dueDate: todoToEdit.dueDate,
    });
    setIsEditing(true);
    setEditingTodoId(id);
  };

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
    <>
      <TodoForm
        todo={todo}
        errors={errors}
        successMessage={successMessage}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <TodoTable
        todos={todos}
        onDelete={handleDelete}
        onComplete={handleCompleted}
        currentItems={currentItems}
        onEdit={handleEdit}
      />
      <Pagination
        itemsCount={todos.length}
        pageSize={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default TodoContainer;
