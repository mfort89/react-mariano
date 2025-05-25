import React, { useContext } from "react";


// Importación de ProductList
import ProductList from "../components/ProductList.jsx";

// Importación de CartContext
import { CartContext } from "../context/CartContext.jsx";


import loading from '../assets/loading.gif'; 


const GaleriaDeProductos = () => {

  const { productos, cargando, error, agregarCarrito } = useContext(CartContext); // Asegúrate de obtener agregarCarrito si lo necesitas

  return (
    <>
      {/* ¡ELIMINA EL HEADER DE AQUÍ! */}
      {/* <Header /> */}

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
          // Asegúrate de pasar las props 'productos' y 'agregarCarrito' a ProductList
          // tal como lo hiciste en Home.jsx
          <ProductList productos={productos} agregarCarrito={agregarCarrito} />
        )}
      </main>

      {/* ¡ELIMINA EL FOOTER DE AQUÍ! */}
      {/* <Footer /> */}
    </>
  );
};

export default GaleriaDeProductos;