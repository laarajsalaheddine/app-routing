
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListProducts from "./ListProducts.jsx";
import DetailsProducts from "./DetailsProducts.jsx";
function Home() {
  return (
    <div>

    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}

function Products() {
  return (
    <div>
      <h1>Products Page</h1>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <input type="text" placeholder="Enter your name" />
    </div>
  );
}



export default function App() {
  const [ListProduits, setListProduits] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await fetch("http://localhost:3001/produits")
        if (!resp.ok) throw new Error("Erreur de chargement des produits");
        const data = await resp.json();
        setListProduits(data);
      } catch (error) {
        console.error("Erreur de chargement des produits", error.message);
      }
    }
    loadData();
  }, []);

  return (
    <>

      <nav>
        <Link to="/">Home</Link> &nbsp; &nbsp; &nbsp;
        <Link to="/about">About</Link> &nbsp; &nbsp; &nbsp;
        <Link to="/products">Products</Link> &nbsp; &nbsp; &nbsp;
        <Link to="/contact">Contact</Link> &nbsp; &nbsp; &nbsp;
      </nav>

      <Routes>
        <Route path="/" element={<ListProducts ListProduits={ListProduits} />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product-details/:id" element={<DetailsProducts />} />
      </Routes>

    </>
  );
}
