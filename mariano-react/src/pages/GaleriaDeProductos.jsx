// src/pages/GaleriaDeProductos.jsx
import React, { useContext } from "react";
// Importaciones de Header y Footer
import Header from "../components/estaticos/Header.jsx"; // <-- ¡Ruta corregida y .jsx!
import Footer from "../components/estaticos/Footer.jsx"; // <-- ¡Ruta corregida y .jsx!

// Importación de ProductList
import ProductList from "../components/ProductList.jsx"; // <-- ¡Asegúrate de la extensión .jsx!

// Importación de CartContext (ya deberías tenerlo bien, pero lo incluyo por si acaso)
import { CartContext } from "../context/CartContext.jsx";


// ... (resto de tu código de GaleriaDeProductos.jsx)!

const GaleriaDeProductos = () => {
  // Obtén todo lo necesario del contexto
  const { productos, cargando, error } = useContext(CartContext);

  return (
    <>
      {/* Header y Footer se renderizan aquí y obtienen su info del contexto */}
      <Header />
      <main className="container mx-auto px-4 py-8"> {/* Contenedor principal de la galería */}
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#333', marginBottom: '30px' }}>
          Nuestra Galería de Productos
        </h1>

        {/* Manejo de estados: Cargando, Error, Productos */}
        {cargando ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src={loading} alt='Cargando productos...' style={{ maxWidth: '100px' }} />
            <p style={{ color: '#555', fontSize: '1.2rem' }}>Cargando productos...</p>
          </div>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2rem', marginTop: '50px' }}>
            Error al cargar los productos: {error}
          </p>
        ) : (
          // ProductList ya no necesita props, las obtiene del contexto
          <ProductList />
        )}
      </main>
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;