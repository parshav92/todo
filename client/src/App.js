import React from "react";
import TodoForm from "./components/todoForm";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TodoTable from "./components/todoTable";
import Pagination from "./components/common/pagination";
import Alerts from "./components/common/alerts";

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
        {/* <p className="text-center text-sm text-gray-500">
          Made with ❤️ by{" "}
          <a href="  " className="text-blue-500 hover:underline">
            {" "}
            <strong>Codecademy</strong>
          </a>
        </p> */}
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default App;
