import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");

  // Create axios instance with better configuration
  const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  // Add debug logging
  useEffect(() => {
    console.log("🔧 Environment Debug:", {
      API_URL,
      NODE_ENV: import.meta.env.NODE_ENV,
      MODE: import.meta.env.MODE,
    });
  }, []);

  // Check if API is running on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        console.log("🔍 Checking API status at:", API_URL);
        const response = await apiClient.get("/");
        console.log("✅ API Response:", response.data);

        if (response.data.message === "Weather API is running!") {
          setApiStatus("connected");
        }
      } catch (err) {
        console.error("❌ API connection failed:", {
          message: err.message,
          code: err.code,
          status: err.response?.status,
          statusText: err.response?.statusText,
          url: err.config?.url,
        });
        setApiStatus("disconnected");
      }
    };

    if (API_URL) {
      checkApiStatus();
    } else {
      setApiStatus("disconnected");
      setError("API URL not configured. Check your environment variables.");
    }
  }, [API_URL]);

  const fetchWeather = async (cityKey, cityName) => {
    setLoading(true);
    setError(null);
    setSelectedCity(cityName);

    try {
      console.log(
        `🌤️ Fetching weather for ${cityName} at: ${API_URL}/weather/${cityKey}`
      );
      const response = await apiClient.get(`/weather/${cityKey}`);
      console.log("✅ Weather data received:", response.data);

      setWeatherData(response.data);
      setApiStatus("connected");
    } catch (err) {
      console.error("❌ Weather fetch failed:", {
        message: err.message,
        code: err.code,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
      });

      if (err.response?.status === 404) {
        setError(`Weather data for ${cityName} not found.`);
      } else if (err.response?.status === 401) {
        setError(
          "Authentication required. Please refresh the page and log in."
        );
      } else if (err.response?.status === 403) {
        setError("Access forbidden. Please check your permissions.");
      } else if (err.code === "ERR_NETWORK" || err.code === "ECONNABORTED") {
        setError(
          "Cannot connect to weather API. Please check your internet connection and try again."
        );
        setApiStatus("disconnected");
      } else if (err.code === "TIMEOUT") {
        setError("Request timed out. Please try again.");
      } else {
        setError(`Failed to fetch weather data: ${err.message}`);
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const cities = [
    { name: "New York", key: "newyork" },
    { name: "Chicago", key: "chicago" },
    { name: "Washington", key: "washington" },
  ];

  const getWeatherEmoji = (condition) => {
    if (!condition) return "🌤️";

    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("sunny")) return "☀️";
    if (lowerCondition.includes("cloudy")) return "☁️";
    if (lowerCondition.includes("snowy") || lowerCondition.includes("snow"))
      return "❄️";
    if (lowerCondition.includes("rainy") || lowerCondition.includes("rain"))
      return "🌧️";
    return "🌤️";
  };

  const getApiStatusColor = () => {
    switch (apiStatus) {
      case "connected":
        return "#4CAF50";
      case "disconnected":
        return "#f44336";
      case "checking":
        return "#ff9800";
      default:
        return "#gray";
    }
  };

  const getApiStatusText = () => {
    switch (apiStatus) {
      case "connected":
        return "✅ API Connected";
      case "disconnected":
        return "❌ API Disconnected";
      case "checking":
        return "🔄 Checking API...";
      default:
        return "Unknown";
    }
  };

  const retryConnection = async () => {
    setApiStatus("checking");
    setError(null);

    try {
      const response = await apiClient.get("/");
      if (response.data.message === "Weather API is running!") {
        setApiStatus("connected");
        setError(null);
      }
    } catch (err) {
      setApiStatus("disconnected");
      setError(
        "Still unable to connect to API. Please check the backend service."
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>🌤️ Weather App</h1>
        <p className="subtitle">
          Get current weather information for major US cities
        </p>

        <div className="api-status" style={{ color: getApiStatusColor() }}>
          {getApiStatusText()}
          {apiStatus === "disconnected" && (
            <button
              style={{ marginLeft: "10px", fontSize: "12px" }}
              onClick={retryConnection}
            >
              🔄 Retry
            </button>
          )}
        </div>

        <div className="button-group">
          {cities.map((city) => (
            <button
              key={city.key}
              className={`weather-btn ${
                selectedCity === city.name ? "active" : ""
              }`}
              onClick={() => fetchWeather(city.key, city.name)}
              disabled={loading || apiStatus === "disconnected"}
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
            {apiStatus === "disconnected" && (
              <div className="error-help">
                <p>💡 Troubleshooting steps:</p>
                <ul style={{ textAlign: "left", fontSize: "14px" }}>
                  <li>
                    Check if backend is running at: <code>{API_URL}</code>
                  </li>
                  <li>Verify CORS settings allow your domain</li>
                  <li>Check Azure AD authentication settings</li>
                  <li>Look at browser console for detailed errors</li>
                </ul>
              </div>
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
          <p>API URL: {API_URL || "Not configured"}</p>
          <p>
            Endpoints: /weather/newyork, /weather/chicago, /weather/washington
          </p>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Check browser console for detailed debug information
          </p>
        </footer>
      </div>
    </div>
  );
}

export default WeatherComponent;
