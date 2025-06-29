import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const { setIsAuth } = useContext(CartContext);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth') === 'true';
    const storedRole = localStorage.getItem('userRole');

    if (storedAuth) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setIsAuth(true);
      navigate('/admin');
    }
  }, [navigate, setIsAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('/data/users.json');
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        setIsAuthenticated(true);
        setUserRole(foundUser.role);
        setIsAuth(true);

        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userRole', foundUser.role);

        if (foundUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        errors,
        isAuthenticated,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
