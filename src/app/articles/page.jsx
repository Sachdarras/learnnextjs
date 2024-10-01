"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [message, setMessage] = useState('');

    // Récupérer les articles via l'API
  // Récupérer les articles via l'API
useEffect(() => {
    const fetchArticles = async () => {
        const res = await fetch('/api/articles');
        const data = await res.json();
        
        console.log('Données des articles récupérées :', data); // Ajout de console pour débogage
        setArticles(data);
    };

    fetchArticles();
}, []);

    // Fonction pour supprimer un article
    const handleDelete = async (id) => {
        const res = await fetch(`/api/articles/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setMessage('Article supprimé avec succès !');
            setArticles(articles.filter(article => article.id !== id)); // Mise à jour de la liste
        } else {
            setMessage('Erreur lors de la suppression de l\'article.');
        }
    };

    return (
        <div>
            <h1>Liste des articles</h1>
            <Link href="/articles/create">Créer un nouvel article</Link>
            {message && <p>{message}</p>}
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <Link href={`/articles/${article.id}`}>{article.title}</Link>
                        <button onClick={() => handleDelete(article.id)}>Supprimer</button>
                        {/* Lien pour éditer l'article */}
                        <Link href={`/articles/${article.id}/edit`}>
                            <button>Modifier</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
