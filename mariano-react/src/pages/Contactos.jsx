import React from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';

const Contactos = ({ cart, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Contactos</h1>
        <p>
          Aquí podés colocar la información de contacto, formulario, o lo que necesites para que los usuarios se comuniquen con vos.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Contactos;
