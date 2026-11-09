import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailsProducts() {
    const { id } = useParams();
    const [p, setP] = useState(null);

    console.log("id", id);
    useEffect(() => {
        const loadData = async () => {
            try {
                const resp = await fetch("http://localhost:3001/produits/" + id)
                if (!resp.ok) throw new Error("Erreur de chargement des produit");
                const selectProduct = await resp.json();
                console.log("selectProduct", selectProduct);
                setP(selectProduct);
            } catch (error) {
                console.error("Erreur de chargement des produits", error.message);
            }
        }
        loadData();
    }, [id]);
    return (
        <div>
            <h1>Details Products Page</h1>
            <div style={{ border: "1px solid black", margin: "10px", padding: "10px", borderRadius: "10px" }}>
                {p && (
                    <>
                        <p><img src={p.image} alt="image du produit" style={{ width: "100px", height: "100px" }} /></p>
                        <p>{p.nom}</p>
                        <p>{p.category}</p>
                        <p>{p.prix}</p>
                        <p>{p.stock}</p>
                        <p>{p.description}</p>

                    </>
                )}
            </div>
        </div>
    );
}