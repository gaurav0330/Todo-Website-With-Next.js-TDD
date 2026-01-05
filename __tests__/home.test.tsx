// __tests__/home.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({ todos: [] }),
  })
) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Home Page', () => {
  it('renders the main heading', async () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/My Todos/i);
    
    // Wait for fetch to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos');
    });
  });

  it('renders the subtitle', async () => {
    render(<Home />);
    
    expect(screen.getByText(/stay organized and productive/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  it('renders add todo form', async () => {
    render(<Home />);
    
    expect(screen.getByRole('textbox', { name: /new todo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});