from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Weather API", description="A simple weather API with mock data")

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
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


@app.get("/weather/newyork")
def get_newyork_weather():
    return weather_data["newyork"]


@app.get("/weather/chicago")
def get_chicago_weather():
    return weather_data["chicago"]


@app.get("/weather/washington")
def get_washington_weather():
    return weather_data["washington"]
