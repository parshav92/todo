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
  deleteAllTodos,
} from "../services/todoService";
import { toast } from "react-toastify";
import DeleteAll from "./deleteAll";
import Filter from "./filter";
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
  const [filteredTodos, setFilteredTodos] = useState([]);
  const itemsPerPage = 3;
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const todosData = await getTodos();
      setTodos(todosData);
      setFilteredTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setFilteredTodos((prevFilteredTodos) =>
        prevFilteredTodos.filter((todo) => todo._id !== id)
      );
      const updatedTodosLength = filteredTodos.length - 1;
      const totalPages = Math.ceil(updatedTodosLength / itemsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This todo has already been deleted");
      } else {
        console.error("Error deleting todo:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(todo, setErrors)) return;

    try {
      setIsLoading(true);
      if (isEditing) {
        const updatedTodo = {
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
        };
        await patchTodo(editingTodoId, updatedTodo);

        // Update the todo and filteredTodos states immediately
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t._id === editingTodoId ? { ...t, ...updatedTodo } : t
          )
        );
        setFilteredTodos((prevFilteredTodos) =>
          prevFilteredTodos.map((t) =>
            t._id === editingTodoId ? { ...t, ...updatedTodo } : t
          )
        );

        toast.success("Todo updated successfully");
      } else {
        const newTodo = await createTodo({
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
        });
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setFilteredTodos((prevFilteredTodos) => [
          ...prevFilteredTodos,
          newTodo,
        ]);
        toast.success("Todo added successfully");
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllTodos();
      setTodos([]);
      setCurrentPage(1);
      fetchData();
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };

  const handleFilter = (e) => {
    const status = e.target.textContent.toLowerCase();
    if (status === "all") {
      setFilteredTodos(todos);
    } else if (status === "completed" || status === "pending") {
      const filteredTodos = todos.filter(
        (todo) =>
          (status === "completed" && todo.completed) ||
          (status === "pending" && !todo.completed)
      );
      setFilteredTodos(filteredTodos);
    } else {
      console.error("Unknown filter status:", status);
    }
    setCurrentPage(1);
  };
  const handleCompleted = async (id) => {
    try {
      const todoIndex = filteredTodos.findIndex((todo) => todo._id === id);
      if (todoIndex === -1) throw new Error("Todo not found");

      const updatedFilteredTodos = [...filteredTodos];
      updatedFilteredTodos[todoIndex].completed =
        !updatedFilteredTodos[todoIndex].completed;

      setFilteredTodos(updatedFilteredTodos);

      const todoInTodos = todos.find((todo) => todo._id === id);
      if (todoInTodos) {
        todoInTodos.completed = updatedFilteredTodos[todoIndex].completed;
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t._id === id ? todoInTodos : t))
        );
      }

      await patchTodo(id, {
        completed: updatedFilteredTodos[todoIndex].completed,
      });
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
  const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <TodoForm
        todo={todo}
        errors={errors}
        successMessage={successMessage}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className="flex justify-between">
        <Filter onFilter={handleFilter} />
        <DeleteAll ondeleteAll={handleDeleteAll} />
      </div>
      <TodoTable
        todos={filteredTodos}
        onDelete={handleDelete}
        onComplete={handleCompleted}
        currentItems={currentItems}
        onEdit={handleEdit}
      />
      <Pagination
        itemsCount={filteredTodos.length}
        pageSize={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {isLoading && <div>Loading...</div>}
    </>
  );
};

export default TodoContainer;
