// src/context/CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Inicializa el carrito desde localStorage si existe
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null); // Usar null para indicar ausencia de error

    // Estado para la autenticación y el rol del usuario
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Inicializa el estado de autenticación desde localStorage
        const savedAuth = localStorage.getItem('isAuthenticated');
        return savedAuth === 'true'; // Convertir string a boolean
    });
    const [userRole, setUserRole] = useState(() => {
        // Inicializa el rol del usuario desde localStorage
        return localStorage.getItem('userRole') || null; // 'null' si no hay rol guardado
    });

    // Efecto para cargar productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/data/data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Simula un tiempo de carga para ver el spinner
                setTimeout(() => {
                    setProductos(data);
                    setCargando(false);
                }, 1000); // Reducido a 1 segundo para pruebas
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message); // Guarda el mensaje de error
                setCargando(false);
            }
        };
        fetchProducts();
    }, []);

    // Efecto para persistir el carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Efecto para persistir la autenticación y el rol en localStorage
    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
        localStorage.setItem('userRole', userRole || ''); // Guardar rol o string vacío si es null
    }, [isAuthenticated, userRole]);


    const handleAddToCart = (product, quantity = 1) => { // Asegúrate de que quantity sea un número
        setCart(prevCart => {
            const productInCart = prevCart.find((item) => item.id === product.id);
            if (productInCart) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: item.cantidad + quantity } // Suma la nueva cantidad
                        : item
                );
            } else {
                return [...prevCart, { ...product, cantidad: quantity }]; // Añade con la cantidad especificada
            }
        });
    };

    const handleDeleteFromCart = (productToDelete) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productToDelete.id) {
                    if (item.cantidad > 1) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    } else {
                        // Si la cantidad es 1, se elimina completamente del carrito
                        return null;
                    }
                }
                return item;
            }).filter(item => item !== null); // Filtra los elementos marcados para eliminación
        });
    };

    const handleRemoveAllFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };


    // Funciones para la autenticación
    const handleLogin = (email, password) => {
        // En un caso real, aquí harías una petición a tu backend
        // Para este proyecto de frontend, usaremos un archivo JSON local.
        // Asegúrate de que 'public/data/users.json' exista y tenga estos datos
        // Ejemplo de data/users.json:
        /*
        [
            { "email": "user@example.com", "password": "password123", "role": "user" },
            { "email": "admin@example.com", "password": "admin123", "role": "admin" }
        ]
        */
        return fetch('/data/users.json')
            .then(response => response.json())
            .then(users => {
                const foundUser = users.find(
                    (user) => user.email === email && user.password === password
                );

                if (foundUser) {
                    setIsAuthenticated(true);
                    setUserRole(foundUser.role);
                    return true; // Login exitoso
                } else {
                    setIsAuthenticated(false);
                    setUserRole(null);
                    return false; // Login fallido
                }
            })
            .catch(err => {
                console.error("Error during login fetch:", err);
                setIsAuthenticated(false);
                setUserRole(null);
                return false; // Error en la petición
            });
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        // localStorage se limpia automáticamente por el useEffect
    };

    // Función para agregar un nuevo producto (solo al estado del frontend)
    const handleAddProduct = (newProduct) => {
        setProductos(prevProducts => [...prevProducts, { ...newProduct, id: Date.now().toString() }]); // Asigna un ID simple
        alert('Producto agregado (solo en el frontend).'); // Notificación para el usuario
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                productos,
                cargando,
                error,
                handleAddToCart,
                handleDeleteFromCart,
                handleRemoveAllFromCart, // Añadido para eliminar completamente
                isAuthenticated,
                userRole, // Exponer el rol del usuario
                handleLogin,
                handleLogout,
                handleAddProduct // Exponer función para añadir producto
            }}
        >
            {children}
        </CartContext.Provider>
    );
};