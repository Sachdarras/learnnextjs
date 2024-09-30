export default function Home() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <h1>Bienvenue sur la page d'accueil</h1>
            <p>La date d'aujourd'hui est : {currentDate}</p>
            <p>Cette application utilise Next.js et SCSS pour le style.</p>
        </div>
    );
}
