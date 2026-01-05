import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ todos });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title } = body;

  // Validation
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return NextResponse.json(
      { error: 'Title is required and must be a non-empty string' },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.create({
    data: {
      title: title.trim(),
    },
  });

  return NextResponse.json({ todo }, { status: 201 });
}