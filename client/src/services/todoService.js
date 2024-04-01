import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const http = axios.create({
  baseURL: "http://localhost:8080",
});

export const getTodos = async () => {
  try {
    const response = await http.get("/todos");
    return response.data.todos;
  } catch (error) {
    console.log("error fetching todos", error);
    toast.error(error.response.data.error, { autoClose: 1000 });
    throw error;
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await http.post("/todos", todo);
    return response.data;
  } catch (error) {
    console.log("Error creating todo", error);
    toast.error(error.response.data.error, { autoClose: 1000 });
    throw error;
  }
};

export const patchTodo = async (id, todo) => {
  try {
    const response = await http.patch(`/todos/${id}`, todo);
    return response.data;
  } catch (error) {
    console.log("Error updating todo", error);
    toast.error(error.response.data.error, { autoClose: 1000 });
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await http.delete(`/todos/${id}`);
  } catch (error) {
    console.log("Error deleting todo", error);
    throw error;
  }
};

export const deleteAllTodos = async () => {
  try {
    await http.delete("/todos");
  } catch (error) {
    console.error("Error deleting all todos:", error);
    throw error;
  }
};
