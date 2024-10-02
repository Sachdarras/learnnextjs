// src/app/layout.jsx

"use client"; // <-- Ajoute cette ligne en haut

import './styles/globals.scss';
import Navbar from './components/Navbar';
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <Navbar />
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
