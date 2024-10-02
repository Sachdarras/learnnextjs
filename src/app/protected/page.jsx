// src/app/protected/page.jsx

"use client"; // Rappelle-toi que c'est un Client Component

import { useSession, signIn, signOut } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>Vous devez être connecté pour accéder à cette page.</h1>
        <button onClick={() => signIn()}>Se connecter</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Bienvenue {session.user.name}</h1>
      <p>Vous êtes connecté en tant que {session.user.email}</p>
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
}
