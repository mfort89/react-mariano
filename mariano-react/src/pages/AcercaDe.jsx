import React from "react";


const AcercaDe = () => {
  return (
    <>
      {/* ¡ELIMINA EL HEADER DE AQUÍ! */}
      {/* <Header /> */}

      <main className="container mx-auto px-4 py-8 text-center min-h-[50vh]">
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '30px' }}>
          Acerca de Nuestra Tienda
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 20px auto' }}>
          Somos una tienda online dedicada a ofrecer los mejores productos electrónicos del mercado. Nuestra misión es brindar tecnología de vanguardia a precios competitivos, garantizando una experiencia de compra excepcional para todos nuestros clientes.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 20px auto' }}>
          Desde nuestro inicio, nos hemos comprometido con la calidad, la innovación y el servicio al cliente. Trabajamos constantemente para expandir nuestro catálogo y asegurar que encuentres exactamente lo que buscas, siempre con la confianza de que estás adquiriendo productos duraderos y de alto rendimiento.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 20px auto' }}>
          ¡Gracias por elegirnos como tu destino tecnológico!
        </p>
      </main>

      {/* ¡ELIMINA EL FOOTER DE AQUÍ! */}
      {/* <Footer /> */}
    </>
  );
};

export default AcercaDe;