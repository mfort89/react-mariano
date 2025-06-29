import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuth') === 'true');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null);
  const [users, setUsers] = useState([]);
  const [cargandoUsers, setCargandoUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setCargandoUsers(true);
        const res = await fetch('/data/users.json');
        if (!res.ok) {
          throw new Error(`Error HTTP al cargar usuarios desde local: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error al cargar usuarios desde users.json:', err);
        setErrorUsers(err);
        toast.error('Error al cargar la base de datos de usuarios local.');
      } finally {
        setCargandoUsers(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem('isAuth', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('userRole', userRole || '');
    if (isAuthenticated) {
      if (navigate && window.location.pathname === '/login') {
         navigate(userRole === 'admin' ? '/admin' : '/');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const loginUser = (email, password) => {
    setErrors({});
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUserRole(foundUser.role);
      toast.success(`Bienvenido, ${foundUser.email}!`);
      return true;
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setErrors({ email: 'Credenciales inválidas. Verifica tu correo y contraseña.' });
      toast.error('Credenciales incorrectas.');
      return false;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userRole');
    toast.info('Sesión cerrada.');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        loginUser,
        handleLogout,
        email,
        setEmail,
        password,
        setPassword,
        errors,
        cargandoUsers,
        errorUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);