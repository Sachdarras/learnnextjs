// src/app/articles/[id]/edit/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditArticle({ params }) {
    const { id } = params;
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    // Récupérer l'article à éditer
    useEffect(() => {
        const fetchArticle = async () => {
            const res = await fetch(`/api/articles/${id}`);
            if (!res.ok) {
                setError('Erreur lors de la récupération de l\'article.');
                return;
            }
            const data = await res.json();
            setArticle(data);
            setTitle(data.title);
            setContent(data.content);
        };

        fetchArticle();
    }, [id]);

    // Fonction pour mettre à jour l'article
    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            router.push(`/articles/${id}`); // Redirection vers la page de l'article
        } else {
            setError('Erreur lors de la mise à jour de l\'article.');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!article) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Modifier l'article {id}</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Titre :</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contenu :</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Mettre à jour l'article</button>
            </form>
        </div>
    );
}
