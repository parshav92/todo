import React from "react";
import TodoForm from "./components/todoForm";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TodoTable from "./components/todoTable";
import Pagination from "./components/common/pagination";
import Alerts from "./components/common/alerts";

function App() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-opacity-15 backdrop-blur-md ">
        <div className=" bg-opacity-15 shadow-lg backdrop-blur-md rounded-lg p-8 min-w-1/2 min-h-1/2">
          {/* <Alerts /> */}
          <TodoForm />
          <TodoTable />
          <Pagination />
        </div>
      </div>
      <div className="fixed top-4 right-4">
        {/* <p className="text-center text-sm text-gray-500">
          Made with ❤️ by{" "}
          <a href="  " className="text-blue-500 hover:underline">
            {" "}
            <strong>Codecademy</strong>
          </a>
        </p> */}
        <ThemeSwitcher />
      </div>
    </>
  );
}

export default App;
