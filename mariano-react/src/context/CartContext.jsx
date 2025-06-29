import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { productsList as data2Products } from '../utils/data2'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const [todosProductos, setTodosProductos] = useState([]); 
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('all');

  const [users, setUsers] = useState([]);
  const [cargandoUsers, setCargandoUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [isAuthenticated, setIsAuth] = useState(() => localStorage.getItem('isAuth') === 'true');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null);


  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8; // Puedes ajustar este valor según tus preferencias

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setCargandoProductos(true);
        setErrorProductos(null);

        const mockApiUrl = 'https://68588753138a18086dfb2a51.mockapi.io/product';
        const localJsonUrl = '/data/data.json'; 

        const fetchFromMockAPI = async () => {
          const response = await fetch(mockApiUrl);
          if (!response.ok) {
            console.warn(`Advertencia: Error HTTP (${response.status}) al cargar desde MockAPI: ${mockApiUrl}`);
            return [];
          }
          const data = await response.json();
          return data.map(item => ({ ...item, id: `mock-${String(item.id || Date.now())}-${Math.random().toString(36).substring(2, 9)}` }));
        };

        const fetchFromLocalJson = async () => {
          try {
            const response = await fetch(localJsonUrl);
            if (!response.ok) {
              console.warn(`Advertencia: Error HTTP (${response.status}) al cargar desde JSON local: ${localJsonUrl}`);
              return [];
            }
            const data = await response.json();
            return data.map(item => ({ ...item, id: `local-${String(item.id || Date.now())}-${Math.random().toString(36).substring(2, 9)}` }));
          } catch (e) {
            console.warn(`Advertencia: Fallo al cargar desde JSON local (${localJsonUrl}):`, e);
            return [];
          }
        };
        
        const mappedData2Products = data2Products.map((item, index) => ({
            id: `data2-${String(item.id || index)}-${Math.random().toString(36).substring(2, 9)}`, 
            nombre: item.name,
            precio: item.price,
            imagen: item.img, 
            categoria: item.categoria,
            descripcion: item.descripcion || `Producto de gaming: ${item.name}.`
        }));

        const [mockApiData, localJsonData] = await Promise.all([
          fetchFromMockAPI(),
          fetchFromLocalJson()
        ]);
        
        const combinedProducts = [...mockApiData, ...localJsonData, ...mappedData2Products];
        
        setTodosProductos(combinedProducts); 
        console.log("CartContext: Productos cargados (total):", combinedProducts.length); 
      } catch (err) {
        console.error("CartContext: Error crítico al cargar productos (general):", err);
        setErrorProductos(err);
      } finally {
        setCargandoProductos(false);
      }
    };

    fetchAllProducts();
  }, []); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setCargandoUsers(true);
        setErrorUsers(null);

        const localUsersUrl = '/data/users.json'; 
        const mockApiUsersUrl = 'https://68588753138a18086dfb2a51.mockapi.io/users'; 

        let usersData = [];
        let fetchedFromLocal = false;

        try {
          const responseLocal = await fetch(localUsersUrl);
          if (responseLocal.ok) {
            usersData = await responseLocal.json();
            fetchedFromLocal = true;
            console.log("CartContext: Usuarios cargados desde JSON local.");
          } else {
            console.warn(`Advertencia: No se pudo cargar users.json local (${responseLocal.status}). Intentando MockAPI...`);
          }
        } catch (e) {
          console.warn(`Advertencia: Fallo al cargar desde users.json local:`, e);
        }

        if (!fetchedFromLocal) {
          console.log("CartContext: Intentando cargar usuarios desde MockAPI...");
          const responseMockApi = await fetch(mockApiUsersUrl); 
          if (!responseMockApi.ok) {
            throw new Error(`Error HTTP: ${responseMockApi.status} al cargar usuarios desde MockAPI. Por favor, verifica la URL: ${mockApiUsersUrl}`);
          }
          usersData = await responseMockApi.json();
          console.log("CartContext: Usuarios cargados desde MockAPI.");
        }
        
        setUsers(usersData);
      } catch (error) {
        console.error('CartContext: Error al cargar usuarios:', error);
        setErrorUsers(error);
        toast.error(`Error al cargar la base de datos de usuarios: ${error.message}.`);
      } finally {
        setCargandoUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const productosFiltrados = useMemo(() => {
    let productosResultantes = todosProductos; 

    if (categoriaFiltro && categoriaFiltro !== 'all') {
      productosResultantes = productosResultantes.filter(
        (producto) => producto.categoria && producto.categoria.toLowerCase() === categoriaFiltro.toLowerCase()
      );
    }

    if (terminoBusqueda && terminoBusqueda.trim() !== '') {
      const busquedaLower = terminoBusqueda.toLowerCase().trim();
      productosResultantes = productosResultantes.filter(
        (producto) =>
          (producto.nombre && producto.nombre.toLowerCase().includes(busquedaLower)) ||
          (producto.descripcion && producto.descripcion.toLowerCase().includes(busquedaLower)) ||
          (producto.categoria && producto.categoria.toLowerCase().includes(busquedaLower))
      );
    }
    console.log("CartContext: Productos filtrados (resultado final):", productosResultantes.length); 
    
    // Al cambiar los filtros o la lista de productos, volvemos a la primera página
    setPaginaActual(1);

    return productosResultantes;
  }, [todosProductos, categoriaFiltro, terminoBusqueda]); 

  // Lógica de paginación con useMemo
  const productosPaginaActual = useMemo(() => {
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    return productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  }, [productosFiltrados, paginaActual, productosPorPagina]);

  const totalPaginas = useMemo(() => {
    return Math.ceil(productosFiltrados.length / productosPorPagina);
  }, [productosFiltrados, productosPorPagina]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('isAuth', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('userRole', userRole || '');
  }, [isAuthenticated, userRole]);

  const handleAddToCart = (productToAdd) => {
    const productInCart = cart.find((item) => item.id === productToAdd.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === productToAdd.id ? { ...item, cantidad: item.cantidad + productToAdd.cantidad } : item
        )
      );
      toast.info(`Cantidad de "${productToAdd.nombre}" actualizada en el carrito.`);
    } else {
      toast.success(`"${productToAdd.nombre}" se ha agregado al carrito.`);
      setCart([...cart, { ...productToAdd }]);
    }
  };

  const handleDeleteFromCart = (productToRemove) => {
    setCart((prevCart) => {
      let isRemovedCompletely = false;
      const newCart = prevCart
        .map((item) => {
          if (item.id === productToRemove.id) {
            if (item.cantidad > 1) {
              return { ...item, cantidad: item.cantidad - 1 };
            } else {
              isRemovedCompletely = true;
              return null;
            }
          } else {
            return item;
          }
        })
        .filter(Boolean);

      if (isRemovedCompletely) {
        toast.error(`"${productToRemove.nombre}" ha sido eliminado del carrito.`);
      } else {
        if (newCart.find(item => item.id === productToRemove.id)) {
            toast.info(`Se ha reducido la cantidad de "${productToRemove.nombre}".`);
        }
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.info('Compra finalizada!');
    setIsCartOpen(false);
  };

  const loginUser = (email, password) => {
    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      setIsAuth(true);
      setUserRole(userFound.role);
      toast.success(`Bienvenido, ${userFound.email}!`);
      return true;
    } else {
      setIsAuth(false);
      setUserRole(null);
      toast.error('Credenciales incorrectas.');
      return false;
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setUserRole(null);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userRole");
    toast.info('Sesión cerrada.');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleDeleteFromCart,
        clearCart,
        isCartOpen,
        toggleCart,
        setIsCartOpen,
        productos: productosPaginaActual, // AHORA PROVEEMOS SOLO LOS PRODUCTOS DE LA PÁGINA ACTUAL
        cargandoProductos,
        errorProductos,
        terminoBusqueda,
        setTerminoBusqueda,
        categoriaFiltro,
        setCategoriaFiltro,
        isAuthenticated,
        userRole,         
        loginUser,        
        handleLogout,     
        users,            
        cargandoUsers,    
        errorUsers,
      
        paginaActual,
        setPaginaActual,
        totalPaginas,
        productosPorPagina, // También puede ser útil para calcular los rangos en el paginador
        totalProductosFiltrados: productosFiltrados.length // Para saber el total de elementos filtrados antes de paginar
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
