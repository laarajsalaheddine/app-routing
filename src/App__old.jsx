
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

// 1. Composant ListeProduits
function ListeProduits({ produits }) {
  return (
    <div>
      <h1>Liste des produits</h1>

      {produits.map((produit) => (
        <div key={produit.id}>
          <h3>{produit.nom}</h3>
          <p>Catégorie : {produit.categorie}</p>
          <p>Prix : {produit.prix} DH</p>

          <Link to={`/produits/${produit.id}`}>
            <button>Voir détails</button>
          </Link>

          <hr />
        </div>
      ))}
    </div>
  );
}

// 2. Composant DetailsProduit
function DetailsProduit({ produits }) {
  const { id } = useParams();

  const produit = produits.find((p) => p.id === id);

  if (!produit) {
    return <p>Produit introuvable</p>;
  }

  const imgStyle = {
    width: "200px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "10px",
  };
  if (!produit) {
    return <p>Produit introuvable ou en cours de chargement...</p>;
  }

  return (
    <div>
      <h1>{produit.nom}</h1>

      {produit.image && (
        <img style={imgStyle} src={produit.image} alt={produit.nom} />
      )}

      <p>Catégorie : {produit.categorie}</p>
      <p>Prix : {produit.prix} DH</p>
      <p>Stock : {produit.stock}</p>
      <p>Description : {produit.description}</p>

      <Link to="/produits">Retour à la liste</Link>
    </div>
  );
}

// 3. Composant principal App
export default function App() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/produits")
      .then((response) => response.json())
      .then((data) => setProduits(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/produits"
          element={<ListeProduits produits={produits} />}
        />

        <Route
          path="/produits/:id"
          element={<DetailsProduit produits={produits} />}
        />

        <Route
          path="/"
          element={<ListeProduits produits={produits} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
