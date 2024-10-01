// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const articles = [
        {
            title: 'Article 1',
            content: 'Contenu de l\'article 1',
        },
        {
            title: 'Article 2',
            content: 'Contenu de l\'article 2',
        },
    ];

    for (const article of articles) {
        await prisma.article.create({
            data: article,
        });
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
