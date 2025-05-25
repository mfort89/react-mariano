// src/components/DetallesProductos.js
import React, { useContext } from 'react'; // Asegúrate de importar useContext
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Importa el contexto del carrito
import './styleProductos.css'; // Podemos reutilizar los estilos de producto si aplicable o crear uno nuevo

const DetallesProductos = () => {
    // Extrae el ID del producto de la URL
    const { id } = useParams();

    // Obtén la lista de productos del CartContext
    const { productos, handleAddToCart, cargando, error } = useContext(CartContext);

    // Si aún se están cargando los productos, muestra un mensaje de carga
    if (cargando) {
        return <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555', marginTop: '50px' }}>Cargando detalles del producto...</p>;
    }

    // Si hay un error, muestra un mensaje de error
    if (error) {
        return <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'red', marginTop: '50px' }}>Error al cargar el producto: {error}</p>;
    }

    // Busca el producto por ID (asegúrate de que los IDs coincidan en tipo, '==' vs '===')
    const product = productos.find(p => p.id === parseInt(id)); // Usar parseInt(id) si tus IDs son números y vienen como string de la URL

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-[50vh]">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
                <p className="text-lg text-gray-700">Lo sentimos, el producto que buscas no existe.</p>
                <button
                    onClick={() => window.history.back()} // Botón para volver atrás
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                >
                    Volver
                </button>
            </div>
        );
    }

    // Aquí puedes renderizar los detalles completos del producto
    return (
        <div className="product-detail-container">
            <div className="product-detail-card">
                <div className="detail-image-container">
                    <img src={product.imagen} alt={product.nombre} className="detail-imagen" />
                </div>
                <div className="detail-info">
                    <h1 className="detail-nombre">{product.nombre}</h1>
                    <p className="detail-precio">${product.precio.toFixed(2)}</p>
                    <p className="detail-descripcion">{product.descripcion}</p> {/* Asegúrate de que tus productos tienen una propiedad 'descripcion' */}
                    <p className="detail-stock">Stock disponible: {product.stock}</p>
                    {/* Botón para añadir al carrito, similar al de Productos.js si lo quieres aquí */}
                    <button
                        onClick={() => handleAddToCart(product)}
                        className="detail-add-to-cart-button"
                        disabled={product.stock === 0}
                    >
                        {product.stock === 0 ? 'Sin Stock' : 'Añadir al Carrito'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetallesProductos;