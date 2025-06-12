import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import authService from '../services/authService';
import '../assets/css/menu.css';
import pizza1 from '../assets/img/pepperoni.webp';
import pizza2 from '../assets/img/hawaiana.webp';

const Menu = ({ openLoginModal }) => {
  const { addToCart } = useContext(CartContext);

  // Ofertas
  const offers = [
    { id: 1, nombre: 'Oferta Especial', precio: 100, imagen: {pizza1} },
    { id: 2, nombre: 'Combo Familiar', precio: 250, imagen: {pizza2} },
    { id: 3, nombre: 'Descuento del Día', precio: 75, imagen: 'Mozzarella.webp' },
  ];

  // Sección de personalización
  const handleCustomize = () => {
    const user = authService.getCurrentUser();
    if (!user) {
      openLoginModal();
      return;
    }
    alert('Personaliza tu pizza seleccionando ingredientes y tamaño en la próxima pantalla.');
  };

  // Pizzas estándar
  const pizzas = [
    { id: 4, nombre: 'Pepperoni', precio: 100, imagen: 'pepperoni.webp' },
    { id: 5, nombre: 'Hawaiana', precio: 100, imagen: 'hawaiana.webp' },
    { id: 6, nombre: 'Hawaiana Premium', precio: 75, imagen: 'hawaiana.webp' },
    { id: 7, nombre: 'Mozzarella', precio: 100, imagen: 'Mozzarella.webp' },
    { id: 8, nombre: 'Champiñones', precio: 100, imagen: 'champiñones.webp' },
    { id: 9, nombre: 'Fugazzeta', precio: 110, imagen: 'fugazzeta.webp' },
    { id: 10, nombre: 'Napolitana', precio: 100, imagen: 'napolitana.webp' },
    { id: 11, nombre: 'Pestoy Pollo', precio: 130, imagen: 'pestoypollo.webp' },
    { id: 12, nombre: 'Rucula', precio: 110, imagen: 'rucula.webp' },
    { id: 13, nombre: 'Rossini', precio: 120, imagen: 'rossini.webp' },
    { id: 14, nombre: 'Strogonoff', precio: 130, imagen: 'strogonoff.webp' },
  ];

  const handleAddToCart = (item) => {
    const user = authService.getCurrentUser();
    if (!user) {
      openLoginModal();
      return;
    }
    addToCart(item);
    alert(`${item.nombre} ha sido añadido al carrito`);
  };

  return (
    <section className="menu" id="menu">
      {/* Ofertas */}
      <div className="heading">
        <span>Ofertas Especiales</span>
        <h3>Explora nuestras promociones</h3>
      </div>
      <div className="menu-container container">
        {offers.map((offer) => (
          <div className="menu-item" key={offer.id}>
            <img src={`/img/${offer.imagen}`} alt={offer.nombre} />
            <h2>{offer.nombre}</h2>
            <p>Precio:{offer.precio} bs</p>
            <button
              className="btn"
              onClick={() => handleAddToCart(offer)}
            >
              Ver oferta
            </button>
          </div>
        ))}
      </div>

      {/* Personaliza tu Pizza */}
      <div className="heading">
        <span>Personaliza tu Pizza</span>
        <h3>Crea tu propia pizza</h3>
      </div>
      <div className="menu-container container">
        <div className="menu-item customize">
          <img src={`/img/napolitana.webp`} alt="Personaliza tu Pizza" />
          <h2>Crea tu Propia Pizza</h2>
          <p>
            Elige tus ingredientes favoritos y disfruta de una pizza única hecha a tu gusto. 
            Personaliza el tamaño y los sabores como prefieras! Desde 80 bs
          </p>
          <button
            className="btn"
            onClick={handleCustomize}
          >
            Personalizar
          </button>
        </div>
      </div>

      {/* Pizzas Estándar */}
      <div className="heading">
        <span>Productos - Menú</span>
        <h3>Elige tu favorita</h3>
      </div>
      <div className="menu-container container">
        {pizzas.map((pizza) => (
          <div className="menu-item" key={pizza.id}>
            <img src={`/img/${pizza.imagen}`} alt={pizza.nombre} />
            <h2>{pizza.nombre}</h2>
            <p>Precio: {pizza.precio} bs</p>
            <button
              className="btn"
              onClick={() => handleAddToCart(pizza)}
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;