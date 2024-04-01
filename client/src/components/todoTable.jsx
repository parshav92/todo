import React, { useState, useEffect } from "react";
import Actions from "./actions";
import Pagination from "./common/pagination";
import { getTodos } from "../services/todoService";
import { toast } from "react-toastify";

const TodoTable = () => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [sampleTodos, setSampleTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await getTodos();
        setSampleTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOdFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleTodos.slice(indexOdFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    // await deleteTodo()
  };

  const handleUpdate = async (id) => {};

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
                <td>{item.dueDate}</td>
                <td>{item.completed ? "Completed" : "Pending"}</td>

                <td>
                  <Actions
                    onDelete={() => handleDelete(item._id)}
                    onUpdate={(updatedTodo) =>
                      handleUpdate(item._id, updatedTodo)
                    }
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        itemsCount={sampleTodos.length}
        pageSize={itemsPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};
export default TodoTable;
