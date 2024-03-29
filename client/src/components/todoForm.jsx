import React from "react";

const TodoForm = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center align-middle text-2xl font-bold">Todo List</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs"
        />
        <input type="date" className="input w-full max-w-xs" />

        <textarea className="textarea " placeholder="Description"></textarea>
        <button className="btn btn-circle btn-secondary">+</button>
      </form>
    </div>
  );
};

export default TodoForm;
