import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const LIMITS = { nombre: 100, empresa: 150, email: 254, telefono: 30, mensaje: 2000 };

export async function POST(req: NextRequest) {
  const { nombre, empresa, email, telefono, mensaje } = await req.json();

  if (!nombre?.trim() || !telefono?.trim() || !mensaje?.trim()) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
  }

  if (
    nombre.trim().length > LIMITS.nombre ||
    telefono.trim().length > LIMITS.telefono ||
    mensaje.trim().length > LIMITS.mensaje ||
    (empresa && empresa.trim().length > LIMITS.empresa) ||
    (email && email.trim().length > LIMITS.email)
  ) {
    return NextResponse.json({ error: 'Uno o más campos exceden el largo máximo permitido' }, { status: 400 });
  }

  if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Formato de email inválido' }, { status: 400 });
  }

  try {
    await prisma.contactMessage.create({
      data: {
        nombre: nombre.trim(),
        empresa: empresa?.trim() ?? null,
        email: email?.trim() ?? null,
        telefono: telefono.trim(),
        mensaje: mensaje.trim(),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
