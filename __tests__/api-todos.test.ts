import { GET, POST } from '@/app/api/todos/route';
import { PATCH, DELETE } from '@/app/api/todos/[id]/route';
import { clearDb } from '../test-utils/db';

beforeEach(async () => {
  await clearDb();
});

describe('GET /api/todos', () => {
  it('returns empty array initially', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ todos: [] });
  });
});

describe('POST /api/todos', () => {
  it('creates a todo', async () => {
    const request = {
      json: async () => ({ title: 'Learn TDD' }),
    } as any;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.todo.title).toBe('Learn TDD');
    expect(data.todo.completed).toBe(false);
  });

  it('requires a title', async () => {
    const request = {
      json: async () => ({ title: '' }),
    } as any;

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});

describe('PATCH /api/todos/:id', () => {
  it('toggles todo completed state', async () => {
    // First create a todo
    const createReq = {
      json: async () => ({ title: 'Test Todo' }),
    } as any;
    const createRes = await POST(createReq);
    const { todo } = await createRes.json();

    // Now toggle it
    const response = await PATCH(
      {} as any,
      { params: Promise.resolve({ id: String(todo.id) }) } as any
    );

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.todo.completed).toBe(true);
  });

  it('toggles back to incomplete', async () => {
    // Create and toggle once
    const createReq = {
      json: async () => ({ title: 'Test Todo' }),
    } as any;
    const createRes = await POST(createReq);
    const { todo } = await createRes.json();

    await PATCH(
      {} as any,
      { params: Promise.resolve({ id: String(todo.id) }) } as any
    );

    // Toggle again
    const response = await PATCH(
      {} as any,
      { params: Promise.resolve({ id: String(todo.id) }) } as any
    );

    const data = await response.json();
    expect(data.todo.completed).toBe(false);
  });

  it('returns 404 for non-existent todo', async () => {
    const response = await PATCH(
      {} as any,
      { params: Promise.resolve({ id: '999' }) } as any
    );

    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/todos/:id', () => {
  it('deletes a todo', async () => {
    // First create a todo
    const createReq = {
      json: async () => ({ title: 'Delete Me' }),
    } as any;
    const createRes = await POST(createReq);
    const { todo } = await createRes.json();

    // Delete it
    const response = await DELETE(
      {} as any,
      { params: Promise.resolve({ id: String(todo.id) }) } as any
    );

    expect(response.status).toBe(200);

    // Verify it's gone
    const getRes = await GET();
    const { todos } = await getRes.json();
    expect(todos).toHaveLength(0);
  });
});