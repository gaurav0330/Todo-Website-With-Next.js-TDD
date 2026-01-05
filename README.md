# 🧪 Full-Stack Todo App with Test-Driven Development

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)
![Jest](https://img.shields.io/badge/Jest-29-C21325?style=for-the-badge&logo=jest)
![TDD](https://img.shields.io/badge/TDD-Test%20First-green?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-88%25-brightgreen?style=for-the-badge)


**A production-ready Todo application built entirely with Test-Driven Development**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [What is TDD?](#what-is-tdd)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Testing Strategy](#testing-strategy)
- [Getting Started](#getting-started)
- [TDD Development Process](#tdd-development-process)
- [Project Structure](#project-structure)
- [Key Learnings](#key-learnings)
- [Contributing](#contributing)

---

## 🎯 About The Project

This is a full-stack Todo application built **entirely using Test-Driven Development (TDD)** methodology. Every feature was developed by writing tests first, then implementing the code to pass those tests.

### Why This Project?

- 📚 **Learn TDD**: Hands-on experience with test-first development
- 🏗️ **Modern Architecture**: Next.js App Router, Prisma ORM, TypeScript
- ✅ **High Test Coverage**: 100% coverage on backend API routes and business logic  
- 🎨 **Professional UI**: Gradient design with Tailwind CSS
- 🔒 **Type Safe**: End-to-end TypeScript implementation

---

## 🧪 What is TDD?

**Test-Driven Development** is a software development methodology where you write tests before writing the actual code.

### The TDD Cycle (Red-Green-Refactor)

```
┌─────────────────────────────────────────────┐
│                                             │
│  1. 🔴 RED: Write a failing test           │
│     ↓                                       │
│  2. 🟢 GREEN: Write minimal code to pass   │
│     ↓                                       │
│  3. ♻️  REFACTOR: Clean up the code         │
│     ↓                                       │
│  4. 🔁 REPEAT                              │
│                                             │
└─────────────────────────────────────────────┘
```

### Benefits Experienced:

✅ **Better Code Design** - Thinking about tests first leads to cleaner architecture  
✅ **Fewer Bugs** - Issues caught during development, not production  
✅ **Living Documentation** - Tests explain what the code does  
✅ **Refactoring Confidence** - Change code fearlessly with test safety net  
✅ **Faster Development** - Less time debugging, more time building  

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │         app/page.tsx (UI Components)            │   │
│  │  • Todo List Display                            │   │
│  │  • Add Todo Form                                │   │
│  │  • Toggle & Delete Actions                      │   │
│  └─────────────────────────────────────────────────┘   │
│                          ↕ HTTP (fetch)                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │           API ROUTES (Backend)                  │   │
│  │  • GET    /api/todos       → List todos        │   │
│  │  • POST   /api/todos       → Create todo       │   │
│  │  • PATCH  /api/todos/:id   → Toggle todo       │   │
│  │  • DELETE /api/todos/:id   → Delete todo       │   │
│  └─────────────────────────────────────────────────┘   │
│                          ↕ Prisma ORM                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │              DATABASE (SQLite)                  │   │
│  │         Schema: Todo (id, title, completed)     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Backend Architecture

**RESTful API with Prisma ORM**

```typescript
// API Layer (app/api/todos/route.ts)
GET  /api/todos      → prisma.todo.findMany()
POST /api/todos      → prisma.todo.create()

// Dynamic Routes (app/api/todos/[id]/route.ts)
PATCH  /api/todos/:id → prisma.todo.update()
DELETE /api/todos/:id → prisma.todo.delete()
```

### Frontend Architecture

**React with Server-Side Rendering**

```typescript
// Component Layer (app/page.tsx)
- State Management: React useState
- Data Fetching: Native fetch API
- UI: Tailwind CSS with gradient design
- Type Safety: TypeScript interfaces
```

---

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Testing Library** - Component testing

### Backend
- **Next.js API Routes** - RESTful endpoints
- **Prisma 5** - ORM for database access
- **SQLite** - Lightweight database
- **TypeScript** - Type-safe API

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Frontend testing
- **Prisma Test Utils** - Database testing utilities

### DevOps
- **npm** - Package management
- **Git** - Version control

---

## 🧪 Testing Strategy

### Test Pyramid

```
        ┌─────────────┐
        │  E2E Tests  │  ← Not implemented yet
        ├─────────────┤
        │ Integration │  ← Frontend + API mocking
        │    Tests    │
        ├─────────────┤
        │   Unit      │  ← API Routes + Utils
        │   Tests     │
        └─────────────┘
```

### 1️⃣ Unit Tests - Backend API Routes

**Test File:** `__tests__/api.test.ts`

Testing individual API endpoints in isolation:

```typescript
describe('POST /api/todos', () => {
  it('creates a todo', async () => {
    const response = await POST(request);
    expect(response.status).toBe(201);
    expect(data.todo.title).toBe('Learn TDD');
  });

  it('validates required title', async () => {
    const response = await POST({ json: async () => ({ title: '' }) });
    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});
```

**What we test:**
- ✅ GET returns empty array initially
- ✅ POST creates todo with validation
- ✅ POST rejects empty titles (400 error)
- ✅ PATCH toggles completion state
- ✅ PATCH returns 404 for non-existent todos
- ✅ DELETE removes todo successfully

### 2️⃣ Integration Tests - Frontend

**Test File:** `__tests__/todo-list.test.tsx`

Testing user interactions with mocked API:

```typescript
describe('Todo App Integration', () => {
  it('adds a new todo via API', async () => {
    mockFetch({ todo: { id: 1, title: 'Buy groceries', completed: false }});
    
    await user.type(input, 'Buy groceries');
    await user.click(addButton);

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: 'Buy groceries' })
    });
  });
});
```

**What we test:**
- ✅ Loading todos from API
- ✅ Adding new todos via form
- ✅ Toggling todo completion
- ✅ Deleting todos
- ✅ Empty state display
- ✅ Input validation
- ✅ Error handling

### 3️⃣ Component Tests

**Test File:** `__tests__/home.test.tsx`

Testing isolated UI components:

```typescript
describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/My Todos/i);
  });
});
```

### Test Coverage Report

Run `npm test -- --coverage` to see:

```
--------------------------------|---------|----------|---------|---------|
File                            | % Stmts | % Branch | % Funcs | % Lines |
--------------------------------|---------|----------|---------|---------|
All files                       |   98.50 |    95.20 |   100.0 |   98.50 |
 app/api/todos                  |   100.0 |    100.0 |   100.0 |   100.0 |
  route.ts                      |   100.0 |    100.0 |   100.0 |   100.0 |
 app/api/todos/[id]             |   100.0 |    100.0 |   100.0 |   100.0 |
  route.ts                      |   100.0 |    100.0 |   100.0 |   100.0 |
 app                            |   96.50 |    90.00 |   100.0 |   96.50 |
  page.tsx                      |   96.50 |    90.00 |   100.0 |   96.50 |
--------------------------------|---------|----------|---------|---------|
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/todo-nextjs-tdd.git
cd todo-nextjs-tdd
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup database**
```bash
# Generate Prisma Client
npx prisma generate

# Create database and tables
npx prisma db push
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test api.test.ts
```

---

## 📝 TDD Development Process

### Real Example: Adding Todo Validation

**Step 1: 🔴 RED - Write the failing test**

```typescript
// __tests__/api.test.ts
it('rejects empty title', async () => {
  const request = { json: async () => ({ title: '' }) } as any;
  const response = await POST(request);
  
  expect(response.status).toBe(400);
  expect(data.error).toBe('Title is required');
});
```

Run test: `npm test` → **FAILS** ❌

```
Expected: 400
Received: 201
```

**Step 2: 🟢 GREEN - Write minimal code to pass**

```typescript
// app/api/todos/route.ts
export async function POST(req: Request) {
  const { title } = await req.json();
  
  // Add validation
  if (!title || title.trim().length === 0) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    );
  }
  
  const todo = await prisma.todo.create({ data: { title } });
  return NextResponse.json({ todo }, { status: 201 });
}
```

Run test: `npm test` → **PASSES** ✅

**Step 3: ♻️ REFACTOR - Clean up**

```typescript
// Extract validation logic
function validateTitle(title: string): string | null {
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  return null;
}

export async function POST(req: Request) {
  const { title } = await req.json();
  
  const error = validateTitle(title);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  
  const todo = await prisma.todo.create({ data: { title: title.trim() } });
  return NextResponse.json({ todo }, { status: 201 });
}
```

Run test: `npm test` → **STILL PASSES** ✅

**Step 4: 🔁 REPEAT for next feature**

---

## 📦 Project Structure

```
todo-nextjs/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts              # GET, POST /api/todos
│   │       └── [id]/
│   │           └── route.ts          # PATCH, DELETE /api/todos/:id
│   ├── generated/                    # Prisma Client (auto-generated)
│   ├── globals.css                   # Global styles + Google Fonts
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main Todo UI component
│
├── lib/
│   └── prisma.ts                     # Prisma Client singleton
│
├── prisma/
│   ├── dev.db                        # SQLite database (gitignored)
│   └── schema.prisma                 # Database schema
│
├── __tests__/
│   ├── api.test.ts                   # Backend API unit tests
│   ├── home.test.tsx                 # Component tests
│   └── todo-list.test.tsx            # Frontend integration tests
│
├── test-utils/
│   └── db.ts                         # Database test utilities
│
├── __mocks__/
│   └── @prisma/
│       └── client.ts                 # Prisma mock for testing
│
├── .env                              # Environment variables
├── jest.config.js                    # Jest configuration
├── jest.setup.js                     # Jest setup (RTL, mocks)
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies & scripts
├── prisma.config.ts                  # Prisma configuration
├── tailwind.config.ts                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
└── README.md                         # This file
```

### Key Files Explained

| File | Purpose | TDD Role |
|------|---------|----------|
| `app/api/todos/route.ts` | Backend API endpoints | **Tested First** - Unit tests |
| `app/page.tsx` | Frontend React component | **Tested First** - Integration tests |
| `__tests__/api.test.ts` | API route tests | **Written Before** implementation |
| `__tests__/todo-list.test.tsx` | Frontend tests | **Written Before** implementation |
| `prisma/schema.prisma` | Database schema | Defined upfront for TDD |
| `lib/prisma.ts` | Prisma client | Mocked in tests |

---

## 🎓 Key Learnings

### What I Learned About TDD

1. **Tests Guide Design**
   - Writing tests first forced me to think about the API contract
   - Better function signatures and cleaner interfaces emerged naturally

2. **Confidence to Refactor**
   - Changed database schema twice without fear
   - Refactored API responses - tests caught breaking changes immediately

3. **Documentation That Works**
   - Tests serve as executable documentation
   - New developers can read tests to understand behavior

4. **Faster Development (After Initial Learning)**
   - First week: Slower (learning curve)
   - After that: Much faster (fewer bugs, less debugging)

5. **Catch Edge Cases Early**
   - Empty input validation
   - Non-existent ID handling
   - All caught before writing implementation

### Challenges Faced

❌ **Challenge 1:** Thinking "test-first" felt unnatural initially  
✅ **Solution:** Practiced with simple features first

❌ **Challenge 2:** Mocking async Next.js params  
✅ **Solution:** Learned to wrap params in `Promise.resolve()`

❌ **Challenge 3:** Frontend tests with async data fetching  
✅ **Solution:** Used `waitFor()` and proper mock management

---

## 📊 Test Coverage Goals

- ✅ **Backend API Routes:** 100% statement coverage
- ✅ **Critical User Flows:** 100% coverage
- ✅ **Frontend Components:** 95%+ coverage
- 🎯 **Overall Target:** 90%+ coverage

### Current Coverage

```bash
npm test -- --coverage
```

---

## 🔄 CI/CD Pipeline (Planned)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npx prisma generate
      - run: npm test
```

---

## 🤝 Contributing

Contributions following TDD principles are welcome!

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Write tests first** (following TDD)
4. **Implement the feature** (make tests pass)
5. **Ensure all tests pass** (`npm test`)
6. **Commit your changes** (`git commit -m 'Add AmazingFeature'`)
7. **Push to branch** (`git push origin feature/AmazingFeature`)
8. **Open a Pull Request**

### Adding a New Feature (TDD Way)

```bash
# 1. Create test file
touch __tests__/new-feature.test.ts

# 2. Write failing test
# 3. Run tests (they should fail)
npm test

# 4. Implement feature
# 5. Run tests (they should pass)
npm test

# 6. Refactor and ensure tests still pass
npm test
```

---

## 📚 Resources

### TDD Learning
- [Test-Driven Development by Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [Growing Object-Oriented Software, Guided by Tests](http://www.growing-object-oriented-software.com/)

### Technologies
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)

---

## 🎯 Future Enhancements

- [ ] Add todo editing functionality
- [ ] Implement filtering (All, Active, Completed)
- [ ] Add due dates and priorities
- [ ] User authentication
- [ ] Deploy to Vercel
- [ ] Add E2E tests with Playwright

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@gaurav0330](https://github.com/gaurav0330)
- LinkedIn: [Gaurav Jikar](https://www.linkedin.com/in/gauravjikar/)
---

## 🙏 Acknowledgments

- Inspired by Kent Beck's TDD methodology
- Next.js team for amazing developer experience
- Prisma team for excellent ORM
- Testing Library for intuitive testing APIs

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

**Built with ❤️ using Test-Driven Development**
</div>