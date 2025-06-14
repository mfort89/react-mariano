// src/context/CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const savedAuth = localStorage.getItem('isAuthenticated');
        return savedAuth === 'true';
    });
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || null;
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
                // Simula un tiempo de carga
                setTimeout(() => {
                    setProductos(data);
                    setCargando(false);
                }, 1000);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                setCargando(false);
            }
        };
        fetchProducts();
    }, []);

    // Efecto para persistir el carrito en localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Efecto para persistir la autenticación y el rol
    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
        localStorage.setItem('userRole', userRole || '');
    }, [isAuthenticated, userRole]);

    // RENOMBRAMOS a agregarCarrito y aseguramos la propiedad 'quantity'
    const agregarCarrito = (productToAdd) => { 
        setCart(prevCart => {
            const productInCart = prevCart.find((item) => item.id === productToAdd.id);
            if (productInCart) {
                return prevCart.map((item) =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + productToAdd.quantity } // Suma la cantidad existente con la nueva cantidad
                        : item
                );
            } else {
                return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity }]; // Añade con la cantidad especificada
            }
        });
    };

    // Función para decrementar cantidad de un producto o eliminarlo si llega a 0
    const restarCantidad = (productId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            // Filtra los productos con quantity <= 0 para eliminarlos del carrito
            return updatedCart.filter(item => item.quantity > 0);
        });
    };

    // Función para eliminar un producto completamente del carrito
    const eliminarProducto = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Función para vaciar completamente el carrito
    const vaciarCarrito = () => {
        setCart([]);
    };

    // Funciones para la autenticación
    const handleLogin = (email, password) => {
        return fetch('/data/users.json')
            .then(response => response.json())
            .then(users => {
                const foundUser = users.find(
                    (user) => user.email === email && user.password === password
                );

                if (foundUser) {
                    setIsAuthenticated(true);
                    setUserRole(foundUser.role);
                    return true;
                } else {
                    setIsAuthenticated(false);
                    setUserRole(null);
                    return false;
                }
            })
            .catch(err => {
                console.error("Error during login fetch:", err);
                setIsAuthenticated(false);
                setUserRole(null);
                return false;
            });
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
    };

    const handleAddProduct = (newProduct) => {
        setProductos(prevProducts => [...prevProducts, { ...newProduct, id: Date.now().toString() }]);
        alert('Producto agregado (solo en el frontend).');
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                productos,
                cargando,
                error,
                agregarCarrito,     // Renombrado y ajustada lógica
                restarCantidad,     // Nueva función para restar
                eliminarProducto,   // Nueva función para eliminar completamente
                vaciarCarrito,      // Nueva función para vaciar
                isAuthenticated,
                userRole,
                handleLogin,
                handleLogout,
                handleAddProduct
            }}
        >
            {children}
        </CartContext.Provider>
    );
};