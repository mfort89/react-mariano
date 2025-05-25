// src/pages/Login.jsx
import React, { useContext, useState } from "react"; // Asumiendo que usas useState y useContext
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx"; // Asegúrate que esta ya sea .jsx también si no lo es

// ¡CAMBIO AQUÍ! La ruta correcta para Header y Footer
import Header from "../components/estaticos/Header.jsx";
import Footer from "../components/estaticos/Footer.jsx";

const Login = () => {
  // Obtenemos la función handleLogin y el estado isAuthenticated del contexto
  const { handleLogin, isAuthenticated } = useContext(CartContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin'); // O a la página de inicio, según tu lógica post-login
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'El email es requerido';
    }
    if (!password.trim()) {
      validationErrors.password = 'La contraseña es requerida';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Limpiar errores previos

    // Llama a la función handleLogin del contexto
    const loginSuccessful = handleLogin(email, password);

    if (!loginSuccessful) {
      setErrors({ general: 'Credenciales inválidas. Por favor, verifica tu email y contraseña.' });
    }
    // La redirección ahora se maneja en el useEffect basado en 'isAuthenticated' del contexto,
    // o se puede hacer directamente aquí si prefieres un control más inmediato.
    // Si la redirección es manejada por handleLogin en el contexto,
    // no necesitas `Maps` aquí, pero para un control explícito, la mantengo.
  };

  return (
    <>
      <Header /> {/* Opcional: si quieres un Header en la página de login */}
      <main className="login-container"> {/* Clase para el contenedor principal de login */}
        <form onSubmit={handleSubmit} className="login-form"> {/* Clase para el formulario */}
          <h2 className="login-title">Iniciar Sesión</h2>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''} // Clase para error
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''} // Clase para error
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="error-message general-error">{errors.general}</p>
          )}

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </main>
      <Footer /> {/* Opcional: si quieres un Footer en la página de login */}
    </>
  );
};

export default Login;