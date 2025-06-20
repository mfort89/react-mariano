// src/pages/AcercaDe.jsx
import React from 'react';
// Ya NO necesitamos importar './AcercaDe.css' si no contiene estilos esenciales que no sean Tailwind.
// Los estilos de Tailwind y la animación fadeIn vendrán de App.css.

const AcercaDePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-gray-800 animate-fade-in"> {/* Contenedor principal con animacion y mas padding */}
      <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-800 tracking-tight">
        Nuestra Historia en Tu Tienda Gaming
      </h1>

      <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-blue-100 transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">¿Quiénes Somos?</h2>
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-700">
          En **Tu Tienda Gaming**, no somos solo un comercio; somos una comunidad de jugadores apasionados.
          Nuestra misión es simple pero poderosa: ser tu aliado de confianza en el vasto y emocionante universo de los videojuegos.
          Desde las consolas más codiciadas de última generación hasta ese accesorio que perfecciona tu setup,
          cada producto en nuestro catálogo es seleccionado con el criterio de gamers, para gamers.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
          Nacimos de la pura pasión por el juego. Entendemos la adrenalina de una victoria bien merecida,
          la inmersión en mundos fantásticos y la camaradería que se forja en el multijugador. Por eso,
          nos comprometemos a ofrecerte no solo productos de calidad superior, sino también una experiencia de compra
          excepcional: fluida, segura y siempre emocionante.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Visión */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl shadow-lg p-8 text-center border border-purple-200 transform hover:translate-y-[-5px] transition-transform duration-300">
          <h3 className="text-3xl font-semibold mb-4 text-indigo-700">Nuestra Visión</h3>
          <p className="text-gray-700 leading-relaxed">
            Aspiramos a ser la plataforma líder en el mercado latinoamericano de gaming, no solo por nuestro catálogo,
            sino por la comunidad vibrante que construimos y la experiencia inigualable que ofrecemos a cada jugador.
          </p>
        </div>
        {/* Valores */}
        <div className="bg-gradient-to-br from-green-50 to-blue-100 rounded-2xl shadow-lg p-8 text-center border border-green-200 transform hover:translate-y-[-5px] transition-transform duration-300">
          <h3 className="text-3xl font-semibold mb-4 text-blue-700">Nuestros Valores</h3>
          <ul className="list-none p-0 space-y-3 text-gray-700 text-lg leading-relaxed">
            <li className="flex items-center justify-center"><span className="text-green-500 mr-2">&#10003;</span>Pasión Inquebrantable</li>
            <li className="flex items-center justify-center"><span className="text-green-500 mr-2">&#10003;</span>Excelencia en Cada Detalle</li>
            <li className="flex items-center justify-center"><span className="text-green-500 mr-2">&#10003;</span>Innovación Constante</li>
            <li className="flex items-center justify-center"><span className="text-green-500 mr-2">&#10003;</span>Integridad y Transparencia</li>
            <li className="flex items-center justify-center"><span className="text-green-500 mr-2">&#10003;</span>Comunidad Primero</li>
          </ul>
        </div>
        {/* Equipo */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl shadow-lg p-8 text-center border border-yellow-200 transform hover:translate-y-[-5px] transition-transform duration-300">
          <h3 className="text-3xl font-semibold mb-4 text-orange-700">Nuestro Equipo</h3>
          <p className="text-gray-700 leading-relaxed">
            Detrás de cada envío, cada recomendación y cada solución, hay un equipo de profesionales
            comprometidos y gamers con décadas de experiencia combinada. Estamos aquí para asegurarnos de que tu experiencia sea perfecta.
          </p>
        </div>
      </section>

      <section className="text-center bg-blue-700 text-white rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-6">¡Únete a la Aventura!</h2>
        <p className="text-xl leading-relaxed mb-8">
          Te invitamos a explorar nuestra galería de productos y a formar parte de nuestra creciente familia de gamers.
          Con **Tu Tienda Gaming**, estás a un clic de tu próxima gran aventura.
        </p>
        <a 
          href="/productos" 
          className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg shadow-md hover:bg-gray-100 
                     transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Explorar Productos
        </a>
      </section>
    </div>
  );
};

export default AcercaDePage;
