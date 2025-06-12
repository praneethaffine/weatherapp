from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer

azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    app_client_id="13a6fa3d-0f9b-4598-b2b5-756be226505e",  # backend id
    tenant_id="9be81a95-7870-42f4-bb8d-a44ada88130a",
    scopes={
        "api://13a6fa3d-0f9b-4598-b2b5-756be226505e/user_impersonation": "access_as_user"
    },
    allow_guest_users=True,
)
