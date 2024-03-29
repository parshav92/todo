import React from "react";

const Input = ({ name, error, ...rest }) => {
  return (
    <div className="">
      <input
        {...rest}
        name={name}
        id={name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default Input;
