import React from "react";

const DeleteAll = ({ ondeleteAll }) => {
  return (
    <button
      className="btn btn-primary btn-sm my-auto mb-2 "
      onClick={ondeleteAll}
    >
      DELETE ALL
    </button>
  );
};
export default DeleteAll;
