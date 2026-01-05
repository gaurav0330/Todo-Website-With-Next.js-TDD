export interface Todo{
    id : number,
    title : string,
    completed : boolean
}

export function toggleTodo(todos: Todo[], id: number): Todo[] {
  return todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function deleteTodo(todos : Todo[],id:number):Todo[]{
    return todos.filter(todo => todo.id != id);
}
