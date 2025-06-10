// src/components/TodoList.tsx

import React, { useEffect, useState } from 'react';

import { Todo } from '../types/todo-type';

interface TodoListProps {
  onSelectTodo: (id: number) => void;
}
interface FetchTodosParams {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
/**
 * fetchTodos function fetches todos from the API and updates the state.
 * @param setTodos - React setState Function to set the todos state.
 * @param setFilteredTodos - React setState Function to set the filtered todos state.
 * @param setLoading - react setState Function to set the loading state.
 * @param setError - react setState Function to set the error state.
 *
 * @returns {Promise<void>} - A promise that resolves when the todos are fetched and state is updated.  You should call this in useEffect.
 * setup useEffect to call this function when the component mounts
 * wraps the fetch API call in a try-catch block to handle errors gracefully and update the loading and error states accordingly.
 * The function uses async/await syntax to handle asynchronous operations, making the code cleaner and easier to read.
 * fetch from the URL https://jsonplaceholder.typicode.com/todos
 */

export const fetchTodos = async ({
  setTodos,
  setFilteredTodos,
  setLoading,
  setError,
}: FetchTodosParams): Promise<void> => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  setLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Todo[] = await response.json();
    setTodos(data);
    setFilteredTodos(data);
  } catch (e) {
    setError((e as Error).message);
  } finally {
    setLoading(false);
  }
};
/**
 * TodoList component fetches todos from the API and displays them in a list.
 * It also provides filter buttons to filter the todos based on their completion status.
 * @param onSelectTodo - A function that is called when a todo is selected. It receives the todo id as an argument.
 * @returns
 */

export const TodoList: React.FC<TodoListProps> = ({ onSelectTodo }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clicked, setClicked] = useState<boolean | null>(null);

  useEffect(() => {
    fetchTodos({
      setTodos,
      setFilteredTodos,
      setLoading,
      setError,
    });
  }, []);

  useEffect(() => {
    if (clicked != null) {
      setFilteredTodos(todos.filter((todo) => todo.completed === clicked));
    }
  }, [clicked]);

  if (loading) {
    return <div> Loading todos </div>;
  }
  if (error) {
    return <div> error loading todos </div>;
  }

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <p>
        These are the filter buttons. the tests depend on the data-testids; and use
        provided styles. Implement click event handlers to change the filter state and
        update the UI accordingly to show just those todo&apos;s. other hints: you can
        change the styling of the button with <code>className</code> property. if the
        className of a button is &quot;active&quot; it will use the{' '}
        <code> .todo-button.completed</code> CSS style in App.css
      </p>
      <div className="filter-buttons">
        <button data-testid="filter-all" onClick={() => setClicked(null)}>
          All
        </button>
        <button data-testid="filter-open" onClick={() => setClicked(false)}>
          Open
        </button>
        <button data-testid="filter-completed" onClick={() => setClicked(true)}>
          Completed
        </button>
      </div>
      <p>
        Show a list of todo&apos;s here. Make it so if you click a todo it calls the event
        handler onSelectTodo with the todo id to show the individual todo
      </p>
      {(clicked == null ? todos : filteredTodos).map((todo) => (
        <button key={todo.id} onClick={() => onSelectTodo(todo.id)}>
          <p>{todo.title}</p>
          <p>{todo.id}</p>
          <p>{todo.userId}</p>
          <p>{todo.completed}</p>
        </button>
      ))}
    </div>
  );
};
