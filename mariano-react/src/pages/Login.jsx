
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import "../styles/login.css"; 


const Login = () => {
    const { handleLogin, isAuthenticated } = useContext(CartContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
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

        setErrors({});

        const loginSuccessful = handleLogin(email, password);

        if (!loginSuccessful) {
            setErrors({ general: 'Credenciales inválidas. Por favor, verifica tu email y contraseña.' });
        }
    };

    return (
        // El 'main' ahora es el único elemento raíz que envuelve el formulario
        <main className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Iniciar Sesión</h2>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? 'input-error' : ''}
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
                        className={errors.password ? 'input-error' : ''}
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
    );
};

export default Login;