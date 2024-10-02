// src/app/login/page.jsx
"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res.error) {
            alert('Erreur lors de la connexion.');
        } else {
            alert('Connexion réussie !');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Connexion</h1>
            <label>
                Email:
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Mot de passe:
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </label>
            <button type="submit">Se connecter</button>
        </form>
    );
}
