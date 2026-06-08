import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { nombre, empresa, telefono, mensaje } = await req.json();

  if (!nombre?.trim() || !telefono?.trim() || !mensaje?.trim()) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
  }

  try {
    await prisma.contactMessage.create({
      data: { nombre, empresa: empresa ?? null, telefono, mensaje },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
