import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';

// Mock fetch API
global.fetch = jest.fn();

function mockFetch(response: any) {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => response,
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Todo App - Frontend Integration', () => {
  it('displays heading and loads todos from API', async () => {
    mockFetch({ todos: [] });
    
    render(<Home />);
    
    expect(screen.getByRole('heading', { name: /my todos/i })).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });
    
    expect(fetch).toHaveBeenCalledWith('/api/todos');
  });

  it('has input field and add button', async () => {
    mockFetch({ todos: [] });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /new todo/i })).toBeInTheDocument();
    });
    
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('adds a new todo via API and clears input', async () => {
    const user = userEvent.setup();
    
    // Mock initial load
    mockFetch({ todos: [] });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    const input = screen.getByRole('textbox', { name: /new todo/i });
    const addButton = screen.getByRole('button', { name: /add/i });

    // Mock the POST request
    mockFetch({ todo: { id: 1, title: 'Buy groceries', completed: false } });

    await user.type(input, 'Buy groceries');
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });
    
    expect(input).toHaveValue('');
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
    
    // Verify API was called
    expect(fetch).toHaveBeenCalledWith('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Buy groceries' }),
    });
  });

  it('toggles todo completion via API', async () => {
    const user = userEvent.setup();
    
    const initialTodo = { id: 1, title: 'Learn testing', completed: false };
    
    // Mock initial load with one todo
    mockFetch({ todos: [initialTodo] });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Learn testing')).toBeInTheDocument();
    });
    
    const todoItem = screen.getByText('Learn testing').closest('li')!;
    const checkbox = within(todoItem).getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    // Mock PATCH request
    mockFetch({ todo: { ...initialTodo, completed: true } });

    await user.click(checkbox);
    
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
    
    expect(fetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'PATCH',
    });
  });

  it('deletes a todo via API', async () => {
    const user = userEvent.setup();
    
    const todo = { id: 1, title: 'Temporary task', completed: false };
    
    // Mock initial load
    mockFetch({ todos: [todo] });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('Temporary task')).toBeInTheDocument();
    });
    
    const todoItem = screen.getByText('Temporary task').closest('li')!;
    const deleteButton = within(todoItem).getByRole('button', { name: /delete/i });

    // Mock DELETE request
    mockFetch({ success: true });

    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('Temporary task')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    
    expect(fetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'DELETE',
    });
  });

  it('handles empty input gracefully', async () => {
    const user = userEvent.setup();
    
    mockFetch({ todos: [] });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    
    const addButton = screen.getByRole('button', { name: /add/i });

    await user.click(addButton);

    // Should not call API with empty title
    expect(fetch).toHaveBeenCalledTimes(1); // Only the initial GET
  });

  it('displays multiple todos', async () => {
    const todos = [
      { id: 1, title: 'First task', completed: false },
      { id: 2, title: 'Second task', completed: true },
      { id: 3, title: 'Third task', completed: false },
    ];
    
    mockFetch({ todos });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('First task')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Second task')).toBeInTheDocument();
    expect(screen.getByText('Third task')).toBeInTheDocument();
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    expect(checkboxes[1]).toBeChecked(); // Second task is completed
  });
});