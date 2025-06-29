import React from 'react';
import { Pagination } from 'react-bootstrap';

/**
 * Componente Paginador.
 * Proporciona una interfaz de usuario para navegar entre páginas de productos.
 * Utiliza el componente Pagination de react-bootstrap.
 *
 * @param {object} props - Las props del componente.
 * @param {number} props.paginaActual - El número de la página actual.
 * @param {number} props.totalPaginas - El número total de páginas disponibles.
 * @param {function} props.onPageChange - Función que se llama cuando se selecciona una nueva página.
 */
const Paginador = ({ paginaActual, totalPaginas, onPageChange }) => {
  // Array para almacenar los ítems de paginación que se renderizarán
  let items = [];

  // Agrega el botón "Anterior"
  items.push(
    <Pagination.Prev 
      key="prev" 
      onClick={() => onPageChange(paginaActual - 1)} 
      disabled={paginaActual === 1} // Deshabilitado si estamos en la primera página
    />
  );

  // Agrega los números de página. Se pueden añadir puntos suspensivos para muchas páginas.
  // Aquí se muestra una implementación básica que lista todas las páginas.
  for (let number = 1; number <= totalPaginas; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === paginaActual} // Marca la página actual como activa
        onClick={() => onPageChange(number)} // Cambia a la página seleccionada
      >
        {number}
      </Pagination.Item>
    );
  }

  // Agrega el botón "Siguiente"
  items.push(
    <Pagination.Next 
      key="next" 
      onClick={() => onPageChange(paginaActual + 1)} 
      disabled={paginaActual === totalPaginas} // Deshabilitado si estamos en la última página
    />
  );

  return (
    // Componente Pagination de react-bootstrap.
    // 'size="lg"' opcional para un tamaño más grande.
    <Pagination size="lg">{items}</Pagination>
  );
};

export default Paginador;
