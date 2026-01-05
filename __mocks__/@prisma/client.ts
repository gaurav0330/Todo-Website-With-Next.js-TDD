// __mocks__/@prisma/client.ts

let todos: any[] = [];

export const PrismaClient = jest.fn(() => ({
  todo: {
    findMany: jest.fn(() => Promise.resolve(todos)),

    findUnique: jest.fn(({ where }) => {
      const todo = todos.find(t => t.id === where.id);
      return Promise.resolve(todo ?? null);
    }),

    create: jest.fn(({ data }) => {
      const todo = {
        id: todos.length + 1,
        title: data.title,
        completed: data.completed ?? false,
        createdAt: new Date(),
      };
      todos.push(todo);
      return Promise.resolve(todo);
    }),

    update: jest.fn(({ where, data }) => {
      const todo = todos.find(t => t.id === where.id);
      if (!todo) return null;
      Object.assign(todo, data);
      return Promise.resolve(todo);
    }),

    delete: jest.fn(({ where }) => {
      todos = todos.filter(t => t.id !== where.id);
      return Promise.resolve({});
    }),

    deleteMany: jest.fn(() => {
      todos = [];
      return Promise.resolve({ count: 0 });
    }),
  },
}));
