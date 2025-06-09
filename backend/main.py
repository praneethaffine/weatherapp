from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI(title="Weather API", description="A simple weather API with mock data")

# Get environment-specific origins
origins = [
    "http://localhost:3000",  # Local development
    "http://localhost:5173",  # Vite default
    "https://mersfntnd.azurewebsites.net",  # Your Azure frontend
]

# Add any additional origins from environment variables
if "ALLOWED_ORIGINS" in os.environ:
    additional_origins = os.environ["ALLOWED_ORIGINS"].split(",")
    origins.extend(additional_origins)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Mock weather data
weather_data = {
    "newyork": {"city": "New York", "temperature": "25°C", "condition": "Sunny"},
    "chicago": {"city": "Chicago", "temperature": "-18°C", "condition": "snowy"},
    "washington": {
        "city": "Washington",
        "temperature": "12°C",
        "condition": "Cloudy",
    },
}

@app.get("/")
def read_root():
    return {"message": "Weather API is running!"}

@app.get("/weather/{city}")
def get_weather(city: str):
    """Generic endpoint for getting weather by city"""
    if city.lower() in weather_data:
        return weather_data[city.lower()]
    else:
        return {"error": f"Weather data for {city} not found"}, 404

@app.get("/weather/newyork")
def get_newyork_weather():
    return weather_data["newyork"]

@app.get("/weather/chicago")
def get_chicago_weather():
    return weather_data["chicago"]

@app.get("/weather/washington")
def get_washington_weather():
    return weather_data["washington"]
