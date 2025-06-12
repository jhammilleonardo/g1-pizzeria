import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { CartContext } from '../context/CartContext';
import '../assets/css/offers.css';

const Offers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  const offers = [
    { id: 1, title: 'Oferta Especial', products: [
      { id: 'oferta-1-1', nombre: 'Pepperoni (Mediana)', imagen: 'pepperoni.webp', precio: 85 },
      { id: 'oferta-1-2', nombre: 'Hawaiana (Pequeña)', imagen: 'hawaiana.webp', precio: 65 },
    ]},
    { id: 2, title: 'Combo Familiar', products: [
      { id: 'oferta-2-1', nombre: 'Pepperoni (Grande)', imagen: 'pepperoni.webp', precio: 110 },
      { id: 'oferta-2-2', nombre: 'Mozzarella (Grande)', imagen: 'mozzarella.webp', precio: 100 },
    ]},
    { id: 3, title: 'Descuento del Día', products: [
      { id: 'oferta-3-1', nombre: 'Hawaiana (Mediana)', imagen: 'hawaiana.webp', precio: 80 },
    ]},
  ];

  const openOfferModal = (offerId) => {
    setSelectedOffer(offers.find(offer => offer.id === offerId));
    setModalOpen(true);
  };

  const closeOfferModal = () => {
    setModalOpen(false);
    setSelectedOffer(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    closeOfferModal();
  };

  return (
    <div className="oferta container">
      {offers.map(offer => (
        <div key={offer.id} className="oferta-1">
          <div className="oferta-img">
            <img src={`/img/${offer.products[0].imagen}`} alt={`pizza-oferta-${offer.id}`} />
          </div>
          <div className="oferta-text">
            <h3>{offer.title}</h3>
            <button
              className="open-oferta-modal btn-2"
              data-oferta={offer.id}
              onClick={() => openOfferModal(offer.id)}
            >
              Ver oferta
            </button>
          </div>
        </div>
      ))}

      {modalOpen && selectedOffer && (
        <div id="oferta-modal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-oferta-modal" onClick={closeOfferModal}>×</span>
            <h3 id="oferta-title">{selectedOffer.title}</h3>
            <div id="oferta-products">
              {selectedOffer.products.map(product => (
                <div key={product.id} className="oferta-product">
                  <img src={`/img/${product.imagen}`} alt={product.nombre} />
                  <h4>{product.nombre}</h4>
                  <p>{product.precio} bs</p>
                  <button
                    className="add-oferta-btn"
                    data-id={product.id}
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;