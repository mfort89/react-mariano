import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuth } = useContext(CartContext);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuth') === 'true';
    if (isAuthenticated) {
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
      // Asumiendo que tienes un archivo local 'data/users.json' con usuarios
      const res = await fetch('/data/users.json');
      if (!res.ok) throw new Error('Error al cargar usuarios');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        if (foundUser.role === 'admin') {
          setIsAuth(true);
          localStorage.setItem('isAuth', 'true');
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
    <AuthContext.Provider value={{ email, setEmail, password, setPassword, handleSubmit, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
