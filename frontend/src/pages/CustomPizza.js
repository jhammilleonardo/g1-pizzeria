import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { CartContext } from '../context/CartContext';
import '../assets/css/customPizza.css';

const CustomPizza = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [size, setSize] = useState('pequeño');
  const [ingredients, setIngredients] = useState([]);
  const [total, setTotal] = useState(80);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  const sizes = [
    { value: 'pequeño', price: 80, label: 'Pequeño - $80' },
    { value: 'mediano', price: 100, label: 'Mediano - $100' },
    { value: 'grande', price: 120, label: 'Grande - $120' },
  ];

  const availableIngredients = [
    { value: 'Pepperoni', price: 10 },
    { value: 'Queso extra', price: 8 },
    { value: 'Champiñones', price: 7 },
    { value: 'Jamón', price: 9 },
    { value: 'Piña', price: 6 },
  ];

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    calculateTotal(e.target.value, ingredients);
  };

  const handleIngredientChange = (e) => {
    const ingredient = e.target.value;
    const updatedIngredients = e.target.checked
      ? [...ingredients, ingredient]
      : ingredients.filter(ing => ing !== ingredient);
    setIngredients(updatedIngredients);
    calculateTotal(size, updatedIngredients);
  };

  const calculateTotal = (selectedSize, selectedIngredients) => {
    const sizePrice = sizes.find(s => s.value === selectedSize).price;
    const ingredientsPrice = selectedIngredients.reduce((sum, ing) => {
      const ingredient = availableIngredients.find(i => i.value === ing);
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);
    setTotal(sizePrice + ingredientsPrice);
  };

  const handleAddToCart = () => {
    const pizza = {
      imagen: 'pizza-personalizada.webp',
      nombre: `Pizza personalizada (${size})${ingredients.length > 0 ? ' con ' + ingredients.join(', ') : ''}`,
      precio: total,
      id: `custom-${Date.now()}`,
    };
    addToCart(pizza);
    setModalOpen(false);
    setSize('pequeño');
    setIngredients([]);
    setTotal(80);
  };

  return (
    <section className="custom-pizza container" id="custom-pizza-section">
      <h2>Personaliza tu pizza</h2>
      <div className="custom-content">
        <div className="custom-item">
          <div className="custom-image">
            <img src="/img/pizza-personalizada.webp" alt="pizza-personalizada" />
          </div>
          <div className="custom-details">
            <h3>Crea tu propia pizza</h3>
            <p>Elige tus ingredientes favoritos y disfruta de una pizza única hecha a tu gusto. ¡Personaliza el tamaño y los sabores como prefieras!</p>
            <p className="precio">Desde $80</p>
            <button className="open-custom-modal btn-2" onClick={() => setModalOpen(true)}>
              Personalizar
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div id="custom-modal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-custom-modal" onClick={() => setModalOpen(false)}>×</span>
            <h3>Personaliza tu pizza</h3>
            <img src="/img/pizza-personalizada.webp" alt="pizza-personalizada" />
            <p>Selecciona el tamaño:</p>
            <select id="custom-size" value={size} onChange={handleSizeChange}>
              {sizes.map(s => (
                <option key={s.value} value={s.value} data-price={s.price}>{s.label}</option>
              ))}
            </select>
            <p>Elige tus ingredientes (cada uno suma al precio):</p>
            <div id="ingredients">
              {availableIngredients.map(ing => (
                <label key={ing.value}>
                  <input
                    type="checkbox"
                    value={ing.value}
                    data-price={ing.price}
                    checked={ingredients.includes(ing.value)}
                    onChange={handleIngredientChange}
                  />
                  {ing.value} (+${ing.price})
                  <br />
                </label>
              ))}
            </div>
            <p>Total: <span id="custom-total">${total}</span></p>
            <button id="add-custom-to-cart" className="btn-2" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomPizza;