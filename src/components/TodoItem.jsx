import React, { useRef, useState } from "react";
import { useTodo } from "../context/TodoContect";

function TodoItem({ todo }) {
  const inputRef = useRef(null);
  const { editTodo, deleteTodo, toggleCompleted } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.task);

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 w-full duration-300 ${
        todo.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      } text-black `}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.isCompleted}
        onChange={() => toggleCompleted(todo.id)}
      />
      <input
        type="text"
        ref={inputRef}
        className={`border outline-none w-full bg-transparent rounded-lg
          ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} 
          ${todo.isCompleted ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        title={todo.title}
      />
      {/* Edit, Save Button */}
      <button
        className={`inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 ${
          !todo.isCompleted ? "cursor-pointer" : ""
        }`}
        onClick={() => {
          if (todo.isCompleted) return;
          inputRef.current.focus();

          if (isTodoEditable) {
            editTodo({ ...todo, task: todoMsg }, todo.id);
            setIsTodoEditable(false);
          } else {
            setIsTodoEditable(true);
          }
        }}
        disabled={todo.isCompleted}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 cursor-pointer"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
/**
 *   ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }
 * 
 * 
 * ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } 
          
 */
