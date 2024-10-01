// src/app/articles/new/page.jsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            const newArticle = await res.json();
            router.push(`/articles/${newArticle.id}`); // Rediriger vers la page de l'article nouvellement créé
        } else {
            setError('Erreur lors de la création de l\'article.');
        }
    };

    return (
        <div>
            <h1>Créer un nouvel article</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Créer l'article</button>
            </form>
        </div>
    );
}
