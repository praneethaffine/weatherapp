import axios from 'axios'

// Get API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:9002'

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API response received:`, response.data)
    return response
  },
  (error) => {
    console.error('API Error:', error)
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please check if the backend is running')
    }
    if (error.response) {
      // Server responded with error status
      throw new Error(`Server error: ${error.response.status} ${error.response.statusText}`)
    } else if (error.request) {
      // Network error
      throw new Error('Network error - please check if the backend is running')
    } else {
      // Other error
      throw new Error('Failed to fetch weather data')
    }
  }
)

// Weather API service functions
export const weatherService = {
  // Get weather data for a specific city
  async getWeatherByCity(city) {
    try {
      const response = await apiClient.get(`/weather/${city}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get weather for New York
  async getNewYorkWeather() {
    return this.getWeatherByCity('newyork')
  },

  // Get weather for Chicago
  async getChicagoWeather() {
    return this.getWeatherByCity('chicago')
  },

  // Get weather for Washington
  async getWashingtonWeather() {
    return this.getWeatherByCity('washington')
  },

  // Get weather for all cities
  async getAllWeatherData() {
    try {
      const [newYork, chicago, washington] = await Promise.all([
        this.getNewYorkWeather(),
        this.getChicagoWeather(),
        this.getWashingtonWeather()
      ])
      
      return {
        newyork: newYork,
        chicago: chicago,
        washington: washington
      }
    } catch (error) {
      throw error
    }
  },

  // Health check endpoint
  async checkApiHealth() {
    try {
      const response = await apiClient.get('/')
      return response.data
    } catch (error) {
      throw new Error('Backend API is not accessible')
    }
  }
}

// Export API base URL for reference
export const getApiBaseUrl = () => API_BASE_URL

export default weatherService