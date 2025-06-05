import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchLocations = async () => {
  try {
    const response = await axios.get(`${API_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const fetchCityData = async (city) => {
  const cityEndpoint = city.toLowerCase().replace(/\s+/g, '');
  try {
    const response = await axios.get(`${API_URL}/${cityEndpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${city}:`, error);
    throw error;
  }
}; 