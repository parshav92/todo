import React from "react";

const TodoForm = ({ todo, onChange, onSubmit, successMessage, errors }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center align-middle text-2xl font-bold">Todo List</h1>
      <form onSubmit={onSubmit}>
        {successMessage && (
          <div role="alert" className="alert alert-success p-2 mt-1 text-xs">
            <span>{successMessage}</span>
          </div>
        )}
        {(errors.title || errors.dueDate) && (
          <div role="alert" className="alert alert-error p-2 mt-1 text-xs">
            <span>Error! Please enter a task and date</span>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={onChange}
            placeholder="Type here"
            className="input input-md input-bordered w-full max-w-xs"
          />
          <input
            type="date"
            name="dueDate"
            value={todo.dueDate}
            onChange={onChange}
            className="input input-bordered input-md w-full max-w-xs text-slate-400"
          />
          <button type="submit" className="btn btn-circle btn-secondary btn-s">
            +
          </button>
        </div>
        <textarea
          name="description"
          value={todo.description}
          onChange={onChange}
          className="textarea w-full textarea-bordered textarea-sm"
          placeholder="Description"
        ></textarea>
      </form>
    </div>
  );
};

export default TodoForm;
