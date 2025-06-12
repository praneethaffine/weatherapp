from fastapi import FastAPI, Security
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from auth import azure_scheme

app = FastAPI(
    title="Weather API",
    description="A simple weather API with mock data",
    swagger_ui_oauth2_redirect_url="/oauth2-redirect",
    swagger_ui_init_oauth={
        "usePkceWithAuthorizationCodeGrant": True,
        "clientId": "09fa78bd-d85d-465b-93f4-aa281e28b206",  # frontend id
        "scopes": "api://13a6fa3d-0f9b-4598-b2b5-756be226505e/user_impersonation",
    },
)

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes from the router
app.include_router(router, dependencies=[Security(azure_scheme)])
