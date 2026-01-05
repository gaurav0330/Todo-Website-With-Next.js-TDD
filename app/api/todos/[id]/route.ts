import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  const todoId = Number(id);
  

  const currentTodo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!currentTodo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }

  // Toggle the completed state
  const todo = await prisma.todo.update({
    where: { id: todoId },
    data: {
      completed: !currentTodo.completed, 
    },
  });

  return NextResponse.json({ todo });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  const todoId = Number(id);

  await prisma.todo.delete({
    where: { id: todoId },
  });

  return NextResponse.json({ success: true }); 
}