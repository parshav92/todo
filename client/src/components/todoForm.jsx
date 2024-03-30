import React from "react";

const TodoForm = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center align-middle text-2xl font-bold">Todo List</h1>
      <form>
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <input
            type="text"
            placeholder="Type here"
            className="input input-md input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            className="input input-bordered input-md w-full max-w-xs"
          />
          <button className="btn btn-circle btn-secondary btn-s">+</button>
        </div>
        <textarea
          className="textarea w-full textarea-bordered textarea-md  "
          placeholder="Description"
        ></textarea>
      </form>
    </div>
  );
};

export default TodoForm;
