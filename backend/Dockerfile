# Use the official Python base image
FROM python:3.11-slim as build

# Set the working directory in the container
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY req.txt .
RUN pip install --no-cache-dir -r req.txt

# Copy the FastAPI application code to the container
COPY . .

# Use a smaller base image for the final stage
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy installed dependencies from the build stage
COPY --from=build /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=build /usr/local/bin /usr/local/bin

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Copy the FastAPI application code to the container
COPY --from=build /app /app

# Expose port 80 for the FastAPI application
EXPOSE 8000

# Start the FastAPI application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]