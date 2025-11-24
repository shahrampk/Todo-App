import React, { useEffect, useState } from "react";
import { useTodo } from "../context/TodoContect";

const TaskCompleted = () => {
  const { ToDos } = useTodo();
  const [completedTaskNum, setCompletedTaskNum] = useState(0);
  useEffect(() => {
    const completedCount = ToDos.reduce((count, todo) => {
      return todo.isCompleted ? count + 1 : count;
    }, 0);
    setCompletedTaskNum(completedCount);
  }, [ToDos]);

  return (
    <>
      <p className="text-lg ml-2 font-medium">
        <span>{completedTaskNum}</span> of <span>{ToDos.length}</span> todos completed
      </p>
    </>
  );
};

export default TaskCompleted;
