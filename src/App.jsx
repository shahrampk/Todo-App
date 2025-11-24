import { useState, useEffect } from "react";
import { TodoContextProvider } from "./context/TodoContect";
import {
  SortBtns,
  TaskCompleted,
  TodoForm,
  TodoItem,
} from "./components/index";

function App() {
  const [ToDos, setToDos] = useState([]);
  const [sortedTodos, setSortedTodos] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const createTodo = (todo) => {
    setToDos((prev) => [...prev, todo]);
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
    if (ToDos && ToDos.length > 0) {
      setToDos(ToDos);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("ToDos", JSON.stringify(ToDos));
    setSortedTodos(ToDos);
  }, [ToDos]);

  useEffect(() => {
    if (sortBy && sortBy === "Completed")
      setSortedTodos(ToDos.filter((todo) => todo.isCompleted));
    else if (sortBy && sortBy === "Active")
      setSortedTodos(ToDos.filter((todo) => !todo.isCompleted));
    else setSortedTodos([...ToDos]);
  }, [ToDos, sortBy]);

  const value = {
    ToDos,
    setToDos,
    createTodo,
    editTodo,
    deleteTodo,
    toggleCompleted,
  };

  return (
    <TodoContextProvider value={value}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          {/* Todo form goes here */}
          <div className="mb-4">
            <TodoForm />
          </div>

          {/* Sort btns */}
          <div>
            <SortBtns setSortBy={setSortBy} sortBy={sortBy} />
          </div>

          <div className="flex flex-col gap-y-3 mt-7">
            {/*Completed Tasks OverView */}
            <TaskCompleted />
            {/*Loop and Add TodoItem here */}

            {sortedTodos && sortedTodos.length > 0 ? (
              sortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <p className="flex items-center flex-col mt-20 select-none opacity-70 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-14"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                No Todos are available.
              </p>
            )}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
