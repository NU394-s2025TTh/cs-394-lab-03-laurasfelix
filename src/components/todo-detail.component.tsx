// src/components/TodoDetail.tsx

import React, { useEffect, useState } from 'react';

import { Todo } from '../types/todo-type';

interface TodoDetailProps {
  todoId: number;
}
/**
 * TodoDetail component fetches and displays the details of a specific todo item based on the provided todoId.
 * It uses the useEffect hook to fetch the todo details from the API when the component mounts or when the todoId changes.
 * @param todoId - The ID of the todo item to fetch and display.
 */
export const TodoDetail: React.FC<TodoDetailProps> = ({ todoId }) => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const [todo, setTodo] = useState<Todo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchById = async () => {
      setLoading(true);
      const response = await fetch(`${url}/${todoId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTodo(data);
    };

    fetchById().catch((e) => setError((e as Error).message));
    setLoading(false);
  }, [todoId]);
  return (
    <div className="todo-detail">
      {loading && <p> loading todo </p>}
      {error != null && <p> error loading todo </p>}
      <h2>Todo Details</h2>
      {todo && (
        <>
          <p>{todo.title}</p>
          <p>{todo.id}</p>
          <p>{todo.userId}</p>
          <p>{todo.completed ? 'Completed' : 'Open'}</p>
        </>
      )}
    </div>
  );
};
