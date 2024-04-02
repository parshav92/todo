import React from "react";
import TodoContainer from "./components/todo";
import ThemeSwitcher from "./components/common/ThemeSwitcher";
import { Footer } from "./components/common/footer";

function App() {
  return (
    <>
      <TodoContainer />
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Footer />
    </>
  );
}

export default App;
