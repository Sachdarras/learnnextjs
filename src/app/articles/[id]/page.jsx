// src/app/articles/[id]/page.jsx
export default function Article({ params }) {
    const { id } = params;

    return (
        <div>
            <h1>Article {id}</h1>
            <p>Ceci est le contenu de l'article avec l'ID : {id}</p>
        </div>
    );
}
