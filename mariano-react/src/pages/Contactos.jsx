// src/pages/Contactos.jsx - CÓDIGO LIMPIO Y CORREGIDO
import React from "react";
// ¡Ya no necesitas importar Header y Footer aquí!
// import Header from "../components/estaticos/Header.jsx";
// import Footer from "../components/estaticos/Footer.jsx";

const Contactos = () => {
  return (
    <>
      {/* ¡ELIMINA EL HEADER DE AQUÍ! */}
      {/* <Header /> */}

      <main className="container mx-auto px-4 py-8 text-center min-h-[50vh]">
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '30px' }}>
          ¡Contáctanos!
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 20px auto' }}>
          Estamos aquí para ayudarte. Si tienes preguntas, comentarios o necesitas soporte técnico, no dudes en ponerte en contacto con nosotros.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <p style={{ fontSize: '1.1rem', color: '#333', fontWeight: 'bold' }}>Email: <a href="mailto:info@tutiendaelectronica.com" style={{ color: '#007bff', textDecoration: 'none' }}>info@tutiendaelectronica.com</a></p>
          <p style={{ fontSize: '1.1rem', color: '#333', fontWeight: 'bold' }}>Teléfono: <a href="tel:+123456789" style={{ color: '#007bff', textDecoration: 'none' }}>+1 (234) 567-890</a></p>
          <p style={{ fontSize: '1.1rem', color: '#333', fontWeight: 'bold' }}>Dirección: Calle Falsa 123, Ciudad de Ejemplo, País</p>
        </div>
        {/* Aquí podrías agregar un formulario de contacto si lo deseas */}
        {/* Un formulario de contacto sería la forma ideal de que los usuarios interactúen aquí */}
        {/*
        <form style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '40px auto 0' }}>
            <input type="text" placeholder="Tu Nombre" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="email" placeholder="Tu Email" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <textarea placeholder="Tu Mensaje" rows="5" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}></textarea>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>Enviar Mensaje</button>
        </form>
        */}
      </main>

      {/* ¡ELIMINA EL FOOTER DE AQUÍ! */}
      {/* <Footer /> */}
    </>
  );
};

export default Contactos;