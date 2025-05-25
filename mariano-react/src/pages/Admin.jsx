import React, { useState, useEffect } from "react";
import FormularioProducto from "../components/FormularioProductos.jsx";

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", price: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Cargar productos
        fetch("/data/data.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTimeout(() => {
                    setProductos(data); // data.json es directamente el array de productos
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error al cargar productos:", error);
                setError(true); // Establece el estado de error
                setLoading(false);
            });

        // Cargar usuarios
        fetch("/data/users.json") // Ruta correcta para users.json en public/data/
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Asume que users.json también es un array directo, ajusta si es un objeto con una clave
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error al cargar usuarios:", error);
                // Si quieres manejar errores de usuarios por separado
            });

    }, []);

    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch('https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            if (!respuesta.ok) {
                throw new Error('Error al agregar producto');
            }
            const data = await respuesta.json();
            alert('Producto agregado correctamente');
            // Opcional: Actualizar la lista de productos localmente si no recargas de mockapi
            // setProductos(prevProductos => [...prevProductos, data]);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container">
            {loading ? (
                <p>Cargando...</p>
            ) : error ? ( // Muestra mensaje de error si hay
                <p>Error al cargar los datos. Por favor, inténtalo de nuevo.</p>
            ) : (
                <>
                    <nav>
                        <ul className="nav">
                            <li className="navItem">
                                <button className="navButton">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </li>
                            <li className="navItem">
                                <a href="/admin">Admin</a>
                            </li>
                        </ul>
                    </nav>
                    <h1 className="title">Panel Administrativo</h1>

                    <ul className="list">
                        {productos.map((product) => (
                            <li key={product.id} className="listItem">
                                <img
                                    src={product.imagen}
                                    alt={product.nombre}
                                    className="listItemImage"
                                />
                                <span>{product.nombre}</span>
                                <span>${product.precio}</span>
                                <div>
                                    <button className="editButton">Editar</button>
                                    <button className="deleteButton">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <button onClick={() => setOpen(true)}>Agregar producto nuevo</button>
            {open && (<FormularioProducto onAgregar={agregarProducto} />)}
            {/* Si necesitas mostrar los usuarios en algún lugar, puedes mapearlos aquí también */}
        </div>
    );
};

export default Admin;