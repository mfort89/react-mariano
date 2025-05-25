import React from "react";
// Importaciones de Header y Footer
import Header from "../components/estaticos/Header.jsx"; // <-- ¡Ruta corregida y .jsx!
import Footer from "../components/estaticos/Footer.jsx"; // <-- ¡Ruta corregida y .jsx!

const Contactos = () => {
  // Ya no se necesitan props como cart o borrarProducto,
  // el Header y cualquier otra parte que los necesite los obtiene del contexto.
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 text-center min-h-[50vh]"> {/* Contenedor para el contenido principal */}
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
      </main>
      <Footer />
    </>
  );
};

export default Contactos;