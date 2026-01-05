// test-utils/db.ts
import prisma from '@/lib/prisma';

export async function clearDb() {
  await prisma.todo.deleteMany({});
}

export async function seedTodo(title: string, completed = false) {
  return await prisma.todo.create({
    data: { title, completed },
  });
}