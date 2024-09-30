"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Utiliser le bon hook pour router dans app/

export default function CreateArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newArticle = { title, content };

        // Envoie une requête POST à l'API
        const res = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArticle),
        });

        if (res.ok) {
            setMessage('Article créé avec succès !');
            setTimeout(() => {
                router.push('/articles');
            }, 2000);
        } else {
            setMessage('Erreur lors de la création de l\'article.');
        }
    };

    return (
        <div>
            <h1>Créer un nouvel article</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Contenu :</label>
                    <textarea
                        id="content"
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
