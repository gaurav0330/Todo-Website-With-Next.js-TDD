import { deleteTodo, toggleTodo } from "@/utils/todoUtils";

const sampleData = [
  { id: 1, title: "First", completed: false },
  { id: 2, title: "second", completed: true },
];

describe("todoUtils", () => {
  it("toggles completed Status correctly", () => {
    const result = toggleTodo(sampleData, 1);
    
    expect(result).toEqual([
      { id: 1, title: "First", completed: true },
      { id: 2, title: "second", completed: true },
    ]);

    expect(sampleData[0].completed).toBe(false);
  });

it('delete doto by id', () => {
    const result = deleteTodo(sampleData,1);
    expect(result).toEqual([
  { id: 2, title: "second", completed: true },
    ]);
});


});
