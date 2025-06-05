from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/locations")
async def get_locations():
    return ["New York", "Washington", "Chicago"]

@app.get("/newyork")
async def get_new_york():
    return {
        "info": "Welcome to New York!",
        "population": "8.4 million",
        "famous_landmark": "Statue of Liberty",
        "weather": "Variable, with hot summers and cold winters"
    }

@app.get("/washington")
async def get_washington():
    return {
        "info": "Welcome to Washington!",
        "population": "0.7 million",
        "famous_landmark": "White House",
        "weather": "Humid subtropical climate with hot summers"
    }

@app.get("/chicago")
async def get_chicago():
    return {
        "info": "Welcome to Chicago!",
        "population": "2.7 million",
        "famous_landmark": "Willis Tower",
        "weather": "Humid continental climate with cold winters"
    } 