'use client';

import { useEffect, useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from backend
  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data.todos));
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!inputValue.trim()) return;

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: inputValue.trim() }),
    });

    const data = await res.json();
    setTodos(prev => [...prev, data.todo]);
    setInputValue('');
  };

  // Toggle todo
  const toggleTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
      });

      if (!res.ok) {
        console.error('Failed to toggle todo');
        return;
      }

      const data = await res.json();

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? data.todo : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        console.error('Failed to delete todo');
        return;
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const activeTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            My Todos
          </h1>
          <p className="text-gray-600 text-lg">
            Stay organized and productive
          </p>
        </div>

        {/* Stats Card */}
        {todos.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold text-indigo-600">{activeTodos}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <div className="border-l border-gray-200"></div>
              <div>
                <p className="text-2xl font-bold text-green-600">{completedTodos}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="border-l border-gray-200"></div>
              <div>
                <p className="text-2xl font-bold text-gray-700">{todos.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Add Todo Form */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Add New Task
            </label>
            <div className="flex gap-3">
              <input
                aria-label="new todo"
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTodo()}
                className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-800 placeholder:text-gray-400"
              />
              <button
                aria-label="add todo"
                onClick={addTodo}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
              >
                Add
              </button>
            </div>
          </div>

          {/* Todo List */}
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">No todos yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first task to get started!</p>
            </div>
          ) : (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Your Tasks ({todos.length})
              </h2>
              <ul className="space-y-3">
                {todos.map(todo => (
                  <li
                    key={todo.id}
                    className="group flex items-center justify-between bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-indigo-200 rounded-xl px-4 py-4 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded-md border-2 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer transition-all"
                      />
                      <span
                        onClick={() => toggleTodo(todo.id)}
                        className={`cursor-pointer text-base transition-all ${
                          todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-800 font-medium'
                        }`}
                      >
                        {todo.title}
                      </span>
                    </div>

                    <button
                      aria-label="delete"
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all font-medium text-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Built with Next.js & TDD principles
          </p>
        </div>
      </div>
    </main>
  );
}