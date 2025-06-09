# Weather App - Full Stack Application

A modern full-stack weather application built with FastAPI backend and React frontend using Vite.

## 🚀 Features

- **FastAPI Backend**: REST API with mock weather data
- **React Frontend**: Modern UI with responsive design
- **Multi-Environment Support**: Development, QA, and Production configurations
- **Real-time Data**: Axios-based API communication
- **Beautiful UI**: Gradient backgrounds, animations, and responsive layout

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## 🛠️ Installation & Setup

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv weather-env
source weather-env/bin/activate  # On Windows: weather-env\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the FastAPI server:
```bash
python main.py
```

The API will be available at `http://127.0.0.1:9002`

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The React app will be available at `http://localhost:5173`

## 🌐 API Endpoints

- `GET /` - API status
- `GET /weather/newyork` - New York weather data
- `GET /weather/chicago` - Chicago weather data  
- `GET /weather/washington` - Washington weather data

### Example Response:
```json
{
  "city": "New York",
  "temperature": "25°C", 
  "condition": "Sunny"
}
```

## 📱 Frontend Usage

The React application provides:
- Three buttons for different cities (New York, Chicago, Washington)
- Click any button to fetch and display weather data
- Loading states and error handling
- Responsive design for mobile and desktop

## 🏗️ Build Scripts

- `npm run dev` - Start development server
- `npm run build:prod` - Build for production using prod environment
- `npm run preview` - Preview production build locally

## 🌍 Environment Configuration

The app supports three environments via `.env-cmdrc`:

- **Development**: `http://127.0.0.1:9002`
- **QA**: `http://127.0.0.1:9002`  
- **Production**: `https://mercbcknd.azurewebsites.net`

## 📁 Project Structure

```
weather-app/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Styles
│   │   └── main.jsx        # Entry point
│   ├── index.html          # HTML template
│   ├── package.json        # Node.js dependencies
│   ├── .env-cmdrc          # Environment config
│   └── vite.config.js      # Vite configuration
└── README.md
```

## 🚀 Deployment

### Development
```bash
# Backend
python main.py

# Frontend
npm run dev
```

### Production
```bash
# Frontend build
npm run build:prod

# Serve static files or deploy to hosting platform
npm run preview
```

## 🎨 Features

- **Modern UI Design**: Gradient backgrounds, glass morphism effects
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth transitions and hover effects

## 🔧 Customization

To modify the weather data, edit the `weather_data` dictionary in `main.py`:

```python
weather_data = {
    "newyork": {
        "city": "New York",
        "temperature": "25°C",
        "condition": "Sunny"
    }
    # Add more cities...
}
```

## 📝 License

This project is open source and available under the MIT License.