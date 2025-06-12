import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pizzas';

const getPizzas = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    throw error;
  }
};

export default { getPizzas };