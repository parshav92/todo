import React from "react";
import Actions from "./actions";
import Pagination from "./common/pagination";

const TodoTable = () => {
  const sampleTodos = [
    { task: "task 1", status: "pending", dueDate: "28-4-1222" },
    { task: "task 2", status: "completed", dueDate: "30-4-1222" },
    { task: "task 3", status: "pending", dueDate: "1-5-1222" },
    { task: "task 4", status: "pending", dueDate: "1-3-3342" },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOdFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleTodos.slice(indexOdFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="rounded overflow-x-auto text-sm">
      <table className="table flex ">
        {/* head */}
        <thead>
          <tr className="bg-base-200 skeleton">
            <th>TASK</th>
            <th>DUE DATE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.task}</td>
              <td>{item.dueDate}</td>
              <td>{item.status}</td>
              <td>
                <Actions />
              </td>
            </tr>
          ))}
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
