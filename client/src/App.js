import React from "react";
import TodoForm from "./components/todoForm";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TodoTable from "./components/todoTable";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center bg-opacity-15 backdrop-blur-md mx-4">
      <div
        className="bg-opacity-50 rounded-lg p-4 w-full max-w-lg"
        style={{ boxShadow: "0 0 16px 0 rgba(31, 38, 135, 0.3)" }}
      >
        <TodoForm />
        <TodoTable />
      </div>
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Footer />
    </div>
  );
}

export default App;
