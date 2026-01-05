import { Todo } from "./todoUtils";

const STORAGE_KEY = 'todos';

export function saveTodos(todos : Todo[]):void { 
    if(typeof window !== 'undefined'){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(todos));
    }
}

export function loadTodos(): Todo[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    
    if (Array.isArray(parsed)) {
      return parsed as Todo[];
    }
    return [];
  } catch (error) {
    console.error('Failed to parse todos from localStorage', error);
    return [];
  }
}