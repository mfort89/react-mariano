import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Página no encontrada</p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Volver al inicio
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
