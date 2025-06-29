import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuth] = useState(() => {
    return localStorage.getItem('isAuth') === 'true';
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch('https://682e2f0e746f8ca4a47c2dbd.mockapi.io/product')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 2000);
      })
      .catch(error => {
        console.log('Error', error);
        setCargando(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('isAuth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const productosFiltrados = productos.filter((producto) =>
    producto?.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, cantidad: product.cantidad } : item
        )
      );
    } else {
      toast.success(`El producto ${product.nombre} se ha agregado al carrito`);
      setCart([...cart, { ...product, cantidad: product.cantidad }]);
    }
  };

  const handleDeleteFromCart = (product) => {
    setCart((prevCart) => {
      let isRemoved = false;
      const newCart = prevCart
        .map((item) => {
          if (item.id === product.id) {
            if (item.cantidad > 1) {
              return { ...item, cantidad: item.cantidad - 1 };
            } else {
              isRemoved = true;
              return null;
            }
          } else {
            return item;
          }
        })
        .filter(Boolean);

      if (isRemoved) {
        toast.error(`El producto ${product.nombre} se ha eliminado completamente del carrito`);
      } else {
        toast.info(`Se ha reducido la cantidad de ${product.nombre}`);
      }

      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.info('Compra finalizada!');
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
        isAuthenticated,
        setIsAuth,
        productosFiltrados,
        busqueda,
        setBusqueda,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
