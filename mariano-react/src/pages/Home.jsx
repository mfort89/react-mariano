
import React, { useContext } from "react";
import Header from "../components/estaticos/Header.jsx";
import Footer from "../components/estaticos/Footer.jsx";
import ProductList from '../components/ProductList.jsx'; // Importación corregida a default export
import loading from '../assets/loading.gif';
import { CartContext } from '../context/CartContext';

const Home = () => {
  // Obtén 'productos', 'cargando', 'error' Y 'agregarCarrito' del CartContext
  const { productos, cargando, error, agregarCarrito } = useContext(CartContext);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#2c3e50', marginBottom: '20px' }}>
          ¡Bienvenidos a nuestra Tienda de Electrónica!
        </h1>

        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#555', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 40px auto' }}>
          Descubre lo último en tecnología con nuestra exclusiva selección de productos electrónicos. Desde gadgets innovadores hasta los esenciales de tu hogar, tenemos todo lo que necesitas para estar conectado y simplificar tu vida. ¡Explora nuestra galería!
        </p>

        <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#3498db', marginBottom: '30px' }}>
          Nuestros Productos Destacados
        </h2>

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
          // ¡Pasa las props 'productos' y 'agregarCarrito' a ProductList!
          <ProductList productos={productos} agregarCarrito={agregarCarrito} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;