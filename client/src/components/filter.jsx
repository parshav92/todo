import React from "react";

const Filter = ({ onFilter }) => {
  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-secondary btn-sm m-1 mb-2 my-auto"
      >
        FILTER
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
      >
        <li>
          <button onClick={onFilter}>All</button>
        </li>
        <li>
          <button onClick={onFilter}>Pending</button>
        </li>
        <li>
          <button onClick={onFilter}>Completed</button>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
