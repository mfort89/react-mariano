import React, { useContext } from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import ProductList from '../components/ProductList';
import loading from '../assets/loading.gif';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const { cargando } = useContext(CartContext);

  return (
    <>
      <Header />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Bienvenidos a mi Tienda</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptate illum molestias, voluptates dolorem rerum. Alias tempore ut
          nisi eum, harum natus velit veritatis ea iste illum facere, ipsam
          modi!
        </p>
        {cargando ? (
          <img src={loading} alt="Cargando..." />
        ) : (
          <ProductList />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
