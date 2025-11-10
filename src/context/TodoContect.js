import { createContext, useContext } from "react";
export const TodoContext = createContext({
  ToDos: [
    {
      id: 1233,
      task: "todo",
      isCompleted: false,
    },
  ],
  createTodo(todo) {},
  editTodo(todo, id) {},
  deleteTodo(id) {},
  toggleCompleted(id) {},
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
