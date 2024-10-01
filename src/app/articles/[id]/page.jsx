// src/app/articles/[id]/page.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Article({ params }) {
    const { id } = params; // Récupération de l'ID à partir des paramètres
    const [article, setArticle] = useState(null); // Stocker les données de l'article
    const [error, setError] = useState(null);

    // Fonction pour récupérer l'article via l'API
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/articles/${id}`);
                if (!res.ok) {
                    throw new Error('Erreur lors de la récupération de l\'article');
                }
                const data = await res.json();
                setArticle(data); // Mise à jour de l'état avec les données de l'article
            } catch (err) {
                setError(err.message);
            }
        };

        fetchArticle();
    }, [id]);

    // Affichage de l'article ou d'un message d'erreur
    if (error) {
        return <p>{error}</p>;
    }

    if (!article) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Article {id}</h1>
            {article ? (
                <>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <Link href={`/articles/${id}/edit`}>Modifier l'article</Link>
                </>
            ) : (
                <p>Erreur lors de la récupération de l'article.</p>
            )}
        </div>
    );
}
