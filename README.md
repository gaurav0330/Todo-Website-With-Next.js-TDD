# 🧪 TDD Todo App - Test-Driven Development in Action

A full-stack Todo application built following **Test-Driven Development (TDD)** principles using Next.js 15, Prisma, and Jest.

## 🎯 What is TDD?

Test-Driven Development is a software development approach where:
1. ✍️ **Write tests first** - Define what you want your code to do
2. ❌ **Watch them fail** - Confirm tests fail because the feature doesn't exist yet
3. ✅ **Write minimal code** - Implement just enough to make tests pass
4. ♻️ **Refactor** - Clean up code while keeping tests green

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** SQLite with Prisma ORM
- **Testing:** Jest + React Testing Library
- **Language:** TypeScript
- **Styling:** Tailwind CSS

## 📦 Project Structure

```
todo-nextjs/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.ts      # PATCH, DELETE endpoints
│   └── page.tsx                  # Main Todo UI
├── lib/
│   └── prisma.ts                 # Prisma client instance
├── prisma/
│   └── schema.prisma             # Database schema
├── __tests__/
│   ├── api.test.ts               # API route tests
│   ├── todo-list.test.tsx        # Frontend integration tests
│   └── home.test.tsx             # Component tests
└── test-utils/
    └── db.ts                     # Test database utilities
```

## 🧪 Testing Strategy

### 1️⃣ **Unit Tests** - API Routes
Tests for individual API endpoints ensuring correct behavior:
- ✅ GET /api/todos - Returns empty array initially
- ✅ POST /api/todos - Creates new todo with validation
- ✅ PATCH /api/todos/:id - Toggles todo completion
- ✅ DELETE /api/todos/:id - Removes todo

### 2️⃣ **Integration Tests** - Frontend
Tests simulating real user interactions:
- ✅ Adding todos via form submission
- ✅ Toggling todo completion state
- ✅ Deleting todos
- ✅ API communication with mocked fetch

### 3️⃣ **Component Tests**
Isolated component testing for UI elements

## 🏃 Running the Project

### Install Dependencies
```bash
npm install
```

### Setup Database
```bash
npx prisma generate
npx prisma db push
```

### Run Development Server
```bash
npm run dev
```

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 📝 TDD Development Process (Example)

### Feature: Add Todo with Validation

**Step 1: Write the test first**
```typescript
it('requires a title', async () => {
  const request = {
    json: async () => ({ title: '' }),
  } as any;

  const response = await POST(request);
  const data = await response.json();

  expect(response.status).toBe(400);
  expect(data.error).toBeDefined();
});
```

**Step 2: Run test - it fails ❌**
```
Expected: 400
Received: 201
```

**Step 3: Write minimal code to pass**
```typescript
export async function POST(req: Request) {
  const { title } = await req.json();
  
  if (!title || title.trim().length === 0) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    );
  }
  
  // ... rest of the code
}
```

**Step 4: Test passes ✅**

**Step 5: Refactor if needed ♻️**

## 🎓 Key Learnings

1. **Tests as Documentation** - Tests serve as living documentation for how the application should behave
2. **Confidence in Refactoring** - With comprehensive tests, you can refactor fearlessly
3. **Better Design** - TDD encourages better code design and modularity
4. **Catch Bugs Early** - Issues are caught before they reach production
5. **API Contract Testing** - Ensures frontend and backend stay in sync

## 📊 Test Coverage Goals

- **API Routes:** 100% coverage
- **Frontend Components:** 80%+ coverage
- **Critical User Flows:** 100% coverage

## 🔄 Continuous Integration

Tests run automatically on every commit to ensure:
- ✅ No breaking changes
- ✅ All features work as expected
- ✅ Code meets quality standards

## 🤝 Contributing

This project demonstrates TDD principles. When adding new features:
1. Write tests first
2. Implement the feature
3. Ensure all tests pass
4. Refactor if needed

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [TDD by Example - Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)

## 🎯 Next Steps

- [ ] Add todo editing functionality
- [ ] Add todo filtering (All, Active, Completed)
- [ ] Add due dates and priorities
- [ ] Deploy to production

---

**Built with ❤️ using TDD principles**

*This project showcases how Test-Driven Development leads to robust, maintainable code.*