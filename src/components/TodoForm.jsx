import { useState } from "react";
import { useTodo } from "../context/TodoContect";

function TodoForm() {
  const { createTodo } = useTodo();
  const [task, setTask] = useState("");
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        if (task)
          createTodo({
            id: Date.now(),
            task: task,
            isCompleted: false,
          });
        setTask("");
      }}
    >
      <input
        type="text"
        placeholder="Write Todo..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-3"
      />
      <button
        type="submit"
        className="rounded-r-lg px-5 py-1 bg-green-600 text-white shrink-0 cursor-pointer hover:bg-green-700 transition-colors duration-200"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
