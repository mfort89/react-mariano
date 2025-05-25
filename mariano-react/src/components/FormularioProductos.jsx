
import React, { useState } from 'react';

function FormularioProducto({ onAgregar }) {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
    });
    const [errores, setErrores] = useState({});

    // ... (resto de tu código handleChange, validarFormulario, handleSubmit) ...

    return (
        <form onSubmit={handleSubmit}>
            {/* ... tu JSX del formulario ... */}
        </form>
    );
}

export default FormularioProducto;