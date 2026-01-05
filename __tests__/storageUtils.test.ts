import { saveTodos,loadTodos } from "@/utils/storageUtils";

const sampleTodos = [
  { id: 1, title: 'Test 1', completed: false },
  { id: 2, title: 'Test 2', completed: true },
];

describe('storageUtils', () => {

    it('saved todos to localstorage', () => {
    saveTodos(sampleTodos);
    
    const stored = localStorage.getItem('todos');
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored!);
    expect(parsed).toEqual(sampleTodos);        
    });

    it('loads todos from storage', () => {
        localStorage.setItem('todos',JSON.stringify(sampleTodos));
        const loaded = loadTodos();
        expect(loaded).toEqual(sampleTodos);
    });

});
