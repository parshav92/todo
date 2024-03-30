import React from "react";
import Actions from "./actions";

const TodoTable = () => {
  return (
    <div className="rounded overflow-x-auto">
      <table className="table flex">
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
          {/* row 1 */}
          <tr>
            <th>task 1</th>
            <td>pending</td>
            <td>28-4-1222</td>
            <Actions />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TodoTable;
