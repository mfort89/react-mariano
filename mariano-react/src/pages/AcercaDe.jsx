import React from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';

const AcercaDe = () => {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h1>Acerca De</h1>
        <p>
          Bienvenido a Emi-Commercio, tu tienda online confiable para productos de calidad.
          Aquí puedes encontrar información sobre nuestra misión, visión y valores.
        </p>
        {/* Agrega aquí más contenido estático o dinámico según necesites */}
      </main>
      <Footer />
    </>
  );
};

export default AcercaDe;
