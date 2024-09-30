import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/home">Accueil</Link>
            <Link href="/about">À propos</Link>
            <Link href="/articles">Articles</Link>
        </nav>
    );
}
