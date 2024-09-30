"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Articles() {
    const [articles, setArticles] = useState([]);

    // Récupérer les articles via l'API
    useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch('/api/articles');
            const data = await res.json();
            setArticles(data);
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <h1>Liste des articles</h1>
            <Link href="/articles/create">Créer un nouvel article</Link>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <Link href={`/articles/${article.id}`}>{article.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
