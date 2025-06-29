import React from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import ProductList from '../components/ProductList';
import loading from '../assets/loading.gif';

const GaleriaDeProductos = ({ cart, productos, cargando, agregarCarrito, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Galería de productos</h1>
        {cargando ? (
          <img src={loading} alt="Cargando..." />
        ) : (
          <ProductList agregarCarrito={agregarCarrito} productos={productos} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
