import React, { useState, useEffect, useCallback } from "react";
import Actions from "./actions";
import Pagination from "./common/pagination";
import { getTodos, deleteTodo, patchTodo } from "../services/todoService";
import { toast } from "react-toastify";

const TodoTable = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, []);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
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

  const formatDueDate = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleDateString();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOdFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos.slice(indexOdFirstItem, indexOfLastItem);

  return (
    <div className="rounded overflow-x-auto text-sm">
      <table className="table flex">
        <thead>
          <tr className="bg-base-200 skeleton">
            <th>TASK</th>
            <th>DUE DATE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No tasks found
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{formatDueDate(item.dueDate)}</td>
                <td>{item.completed ? "Completed" : "Pending"}</td>
                <td>
                  <Actions
                    onDelete={() => handleDelete(item._id)}
                    onComplete={() => handleCompleted(item._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        itemsCount={todos.length}
        pageSize={itemsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default TodoTable;
