import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [apiStatus, setApiStatus] = useState('checking')

  // Check if API is running on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/`)
        if (response.data.message === "Weather API is running!") {
          setApiStatus('connected')
        }
      } catch (err) {
        setApiStatus('disconnected')
        console.error('API connection failed:', err)
      }
    }
    
    checkApiStatus()
  }, [])

  const fetchWeather = async (cityKey, cityName) => {
    setLoading(true)
    setError(null)
    setSelectedCity(cityName)
    
    try {
      const response = await axios.get(`${API_URL}/weather/${cityKey}`)
      setWeatherData(response.data)
      setApiStatus('connected')
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`Weather data for ${cityName} not found.`)
      } else if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to weather API. Please ensure the backend is running on port 9002.')
        setApiStatus('disconnected')
      } else {
        setError('Failed to fetch weather data. Please try again.')
      }
      console.error('Error fetching weather:', err)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const cities = [
    { name: 'New York', key: 'newyork' },
    { name: 'Chicago', key: 'chicago' },
    { name: 'Washington', key: 'washington' }
  ]

  const getWeatherEmoji = (condition) => {
    if (!condition) return '🌤️'
    
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('sunny')) return '☀️'
    if (lowerCondition.includes('cloudy')) return '☁️'
    if (lowerCondition.includes('snowy') || lowerCondition.includes('snow')) return '❄️'
    if (lowerCondition.includes('rainy') || lowerCondition.includes('rain')) return '🌧️'
    return '🌤️'
  }

  const getApiStatusColor = () => {
    switch (apiStatus) {
      case 'connected': return '#4CAF50'
      case 'disconnected': return '#f44336'
      case 'checking': return '#ff9800'
      default: return '#gray'
    }
  }

  const getApiStatusText = () => {
    switch (apiStatus) {
      case 'connected': return '✅ API Connected'
      case 'disconnected': return '❌ API Disconnected'
      case 'checking': return '🔄 Checking API...'
      default: return 'Unknown'
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>🌤️ Weather App</h1>
        <p className="subtitle">Get current weather information for major US cities</p>
        
        <div className="api-status" style={{ color: getApiStatusColor() }}>
          {getApiStatusText()}
        </div>
        
        <div className="button-group">
          {cities.map((city) => (
            <button
              key={city.key}
              className={`weather-btn ${selectedCity === city.name ? 'active' : ''}`}
              onClick={() => fetchWeather(city.key, city.name)}
              disabled={loading || apiStatus === 'disconnected'}
            >
              {loading && selectedCity === city.name ? (
                <>
                  <span className="spinner-small"></span>
                  {city.name}
                </>
              ) : (
                city.name
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data for {selectedCity}...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>❌ {error}</p>
            {apiStatus === 'disconnected' && (
              <p className="error-help">
                💡 Make sure to run: <code>python main.py</code> in your backend directory
              </p>
            )}
          </div>
        )}

        {weatherData && !loading && (
          <div className="weather-card">
            <h2>
              {getWeatherEmoji(weatherData.condition)} {weatherData.city}
            </h2>
            <div className="weather-info">
              <div className="temperature">
                <span className="temp-value">{weatherData.temperature}</span>
              </div>
              <div className="condition">
                <span className="condition-text">{weatherData.condition}</span>
              </div>
            </div>
            <div className="weather-meta">
              <small>Last updated: {new Date().toLocaleTimeString()}</small>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>API URL: {API_URL}</p>
          <p>Endpoints: /weather/newyork, /weather/chicago, /weather/washington</p>
        </footer>
      </div>
    </div>
  )
}

export default App