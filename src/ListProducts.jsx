import { Link } from "react-router-dom";
export default function ListProducts({ListProduits}) {


    return (
        <div>
            <h1>Products Page</h1>
            {
                ListProduits && ListProduits.map((p)=>(
                    <div key={p.id} style={{border:"1px solid black", margin:"10px", padding:"10px", borderRadius:"10px"}}>
                        <p>{p.nom}</p>
                        <p>{p.category}</p>
                        <p>{p.prix}</p>
                        <p>
                            <button type="button">
                                <Link to={`/product-details/${p.id}`}>Voir details</Link>
                                
                            </button>
                        </p>
                    </div>
                ))
            }
        </div>
    );
}
// npm install -D json-server