import React from "react";
import Actions from "./actions";
import Pagination from "./common/pagination";

const TodoTable = ({
  currentPage,
  todos,
  onComplete,
  onDelete,
  onEdit,
  currentItems,
  onPageChange,
  itemsPerPage,
}) => {
  const formatDueDate = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="rounded-btn overflow-x-auto text-sm">
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
                    onDelete={() => onDelete(item._id)}
                    onComplete={() => onComplete(item._id)}
                    onEdit={() => onEdit(item._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
