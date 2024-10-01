import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Créer un nouvel article
export async function POST(req) {
    const { title, content } = await req.json();
    const newArticle = await prisma.article.create({
        data: {
            title,
            content,
        },
    });
    return new Response(JSON.stringify(newArticle), {
        headers: { 'Content-Type': 'application/json' },
    });
}

// Récupérer tous les articles ou un article par ID
export async function GET(req, { params }) {
    if (params && params.id) {
        // Récupérer un article par ID
        const { id } = params;
        const article = await prisma.article.findUnique({
            where: { id: Number(id) },
        });

        if (article) {
            return new Response(JSON.stringify(article), {
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Article non trouvé' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else {
        // Récupérer tous les articles
        const articles = await prisma.article.findMany();
        return new Response(JSON.stringify(articles), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// Mettre à jour un article
export async function PUT(req, { params }) {
    const { id } = params;
    const { title, content } = await req.json();
    const updatedArticle = await prisma.article.update({
        where: { id: Number(id) },
        data: { title, content },
    });

    return new Response(JSON.stringify(updatedArticle), {
        headers: { 'Content-Type': 'application/json' },
    });
}

// Supprimer un article
export async function DELETE(req, { params }) {
    const { id } = params;
    await prisma.article.delete({
        where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Article supprimé' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
