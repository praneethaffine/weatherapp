from fastapi import APIRouter

router = APIRouter()

# Mock weather data
weather_data = {
    "newyork": {"city": "New York", "temperature": "25°C", "condition": "Sunny"},
    "chicago": {"city": "Chicago", "temperature": "-18°C", "condition": "Snowy"},
    "washington": {"city": "Washington", "temperature": "12°C", "condition": "Cloudy"},
}


@router.get("/")
def read_root():
    return {"message": "Weather API is running!"}


@router.get("/weather/newyork")
def get_newyork_weather():
    return weather_data["newyork"]


@router.get("/weather/chicago")
def get_chicago_weather():
    return weather_data["chicago"]


@router.get("/weather/washington")
def get_washington_weather():
    return weather_data["washington"]
