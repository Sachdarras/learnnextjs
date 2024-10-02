import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
    const { email, password } = await request.json();

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return NextResponse.json({ error: 'Cet e-mail est déjà utilisé.' }, { status: 400 });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json({ user }, { status: 201 });
}
