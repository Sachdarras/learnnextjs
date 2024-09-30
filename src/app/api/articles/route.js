// src/app/api/articles/route.js

let articles = [
    { id: 1, title: 'Article 1', content: 'Contenu de l\'article 1' },
    { id: 2, title: 'Article 2', content: 'Contenu de l\'article 2' },
];

export async function GET(req) {
    return new Response(JSON.stringify(articles), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req) {
    const { title, content } = await req.json();
    const newArticle = { id: articles.length + 1, title, content };
    articles.push(newArticle);

    return new Response(JSON.stringify(newArticle), {
        headers: { 'Content-Type': 'application/json' },
    });
}
