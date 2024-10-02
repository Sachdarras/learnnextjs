import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma'; // Assure-toi que le chemin est correct
import jwt from 'jsonwebtoken'; // Importe jsonwebtoken ici
import { setCookie } from 'cookie'; // On utilisera cette bibliothèque pour les cookies

export async function POST(req) {
    const { email, password } = await req.json();
    
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ error: 'Identifiants invalides' }), { status: 401 });
    }

    // Générer un token JWT ici
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Assure-toi de définir JWT_SECRET dans ton fichier .env

    const response = new Response(JSON.stringify({ message: 'Connexion réussie' }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Stocke le token dans un cookie
    response.headers.set('Set-Cookie', setCookie('token', token, { httpOnly: true }));

    return response;
}
