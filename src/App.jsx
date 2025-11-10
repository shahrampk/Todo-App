import { useState,useEffect } from "react";
import InputBox from "./components/TodoForm";
import { TodoContextProvider } from "./context/TodoContect";
import TodoItem from "./components/TodoItem";

function App() {
  const [ToDos, setToDos] = useState(
    JSON.parse(localStorage.getItem("toDos")) || []
  );
  const createTodo = (todo) => {
    setToDos((prev) => [...prev, todo]);
    console.log("hi");
  };
  const deleteTodo = (id) => {
    setToDos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };
  function editTodo(updatedTodo, id) {
    setToDos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
    );
  }
  function toggleCompleted(id) {
    setToDos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
          : prevTodo
      )
    );
  }

  // Load from localStorage
  useEffect(() => {
    const ToDos = JSON.parse(localStorage.getItem("ToDos"));
    if (ToDos && ToDos.length > 0) setToDos(ToDos);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("ToDos", JSON.stringify(ToDos));
  }, [ToDos]);

  return (
    <TodoContextProvider
      value={{ ToDos, createTodo, editTodo, deleteTodo, toggleCompleted }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <InputBox />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {ToDos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
