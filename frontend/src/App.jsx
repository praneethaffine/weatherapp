import { useState } from 'react';
import { fetchLocations, fetchCityData } from './services/api';
import './App.css';

const LocationCard = ({ city, onClick }) => {
  const cityEndpoint = city.toLowerCase().replace(/\s+/g, '');
  const imageUrl = {
    'New York': 'https://images.unsplash.com/photo-1549921296-3a532d44c3ea',
    'Washington': 'https://images.unsplash.com/photo-1597687213463-dbb691f1f7a1',
    'Chicago': 'https://images.unsplash.com/photo-1583347215771-c4fd4a3be287'
  }[city];

  return (
    <button
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={`${city} skyline`}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
        {city}
      </div>
    </button>
  );
};

function App() {
  const [cities, setCities] = useState([]);
  const [cityResponse, setCityResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFetchLocations = async () => {
    try {
      const data = await fetchLocations();
      setCities(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleFetchCityData = async (city) => {
    try {
      const data = await fetchCityData(city);
      setCityResponse(data);
      setShowModal(false);
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">City Explorer</h1>
      <button className="fetch-button" onClick={handleFetchLocations}>
        <span className="location-symbol">📍</span>Locations
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="city-buttons">
              {cities.map((city) => (
                <LocationCard key={city} city={city} onClick={() => handleFetchCityData(city)} />
              ))}
            </div>
          </div>
        </div>
      )}
      {cityResponse && <pre className="response">{JSON.stringify(cityResponse, null, 2)}</pre>}
    </div>
  );
}

export default App;
