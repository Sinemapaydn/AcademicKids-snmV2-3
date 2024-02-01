// api.js
import axios from 'axios';

const API_BASE_URL = 'https://api.edamam.com/api/food-database/parser';
const APP_ID = 'ca747d07'; // Replace with your actual app ID
const APP_KEY = '722fabaee32b8118f7b1cb2e32b137cf'; // Replace with your actual app key

export const searchFood = async (searchTerm) => {
  try {
    const url = `${API_BASE_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${searchTerm}`;
    const response = await axios.get(url);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw new Error('Error fetching data. Please try again.');
  }
};
