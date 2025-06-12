import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { CartContext } from '../context/CartContext';
import '../assets/css/header.css';
import right from '../assets/img/right.webp';
import menuIcon from '../assets/img/menu.png';
import cartIcon from '../assets/img/car.svg';

const Header = ({ openLoginModal, openRegisterModal }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, getTotal } = useContext(CartContext);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handlePay = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de pagar.');
      return;
    }
    if (!authService.getCurrentUser()) {
      openLoginModal();
      return;
    }
    navigate(`/payment?total=${getTotal()}`);
    clearCart();
  };

  return (
    <header className="header">
      <div className="menu container">
        <a href="/" className="logo">
          <span>Mamma Mia</span>
        </a>
        <input type="checkbox" id="menu" />
        <label htmlFor="menu">
          <img src={menuIcon} className="menu-icono" alt="menup" />
        </label>
        <nav className="navbar">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/menu">Producto</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="auth-actions">
          <ul>
            <li className="submenu">
              <img src={cartIcon} id="img-carrito" alt="carrito" />
              {authService.getCurrentUser() ? (
                <button onClick={handleLogout} className="btn-2 logout-btn">
                  Cerrar sesión
                </button>
              ) : (
                <button onClick={openLoginModal} className="btn-2 login-btn">
                  Iniciar sesión
                </button>
              )}
              <div id="carrito">
                <table id="lista-carrito">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <img src={`/img/${item.imagen}`} alt={item.nombre} width="100" />
                        </td>
                        <td>{item.nombre}</td>
                        <td>${item.precio}</td>
                        <td>
                          <a
                            href="#"
                            className="borrar"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(item.id);
                            }}
                          >
                            X
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p id="total-carrito">Total: ${getTotal()}</p>
                <a
                  href="#"
                  id="vaciar-carrito"
                  className="btn-2"
                  onClick={(e) => {
                    e.preventDefault();
                    clearCart();
                  }}
                >
                  Vaciar carrito
                </a>
                <a
                  href="#"
                  id="pagar-carrito"
                  className="btn-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePay();
                  }}
                >
                  Pagar
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-content container">
        <div className="header-img">
          <img src={right} alt="oferta" />
        </div>
        <div className="header-txt">
          <h1>Oferta limitada</h1>
          <p>2 x 1 todos los viernes</p>
          <a href="/offers" className="btn-1">Ver oferta</a>
        </div>
      </div>
    </header>
  );
};

export default Header;