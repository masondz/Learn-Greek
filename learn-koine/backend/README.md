# LearnGreekAPI Backend

This is the .NET 8 Web API backend for the Learn Greek application. It provides JWT-based authentication for user login and registration.

## Features

- JWT-based authentication
- In-memory user storage (no database required for now)
- CORS enabled for frontend integration
- Register and Login endpoints

## Prerequisites

- .NET 8 SDK installed (or use the installed version in `~/.dotnet`)

## Running the Backend

1. Navigate to the backend directory:
```bash
cd backend/LearnGreekAPI
```

2. Run the API:
```bash
export PATH="$HOME/.dotnet:$PATH"
dotnet run
```

The API will start on `http://localhost:5000`

## API Endpoints

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "username": "string"
}
```

### POST /api/auth/login
Login an existing user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "username": "string"
}
```

## Configuration

JWT settings can be configured in `appsettings.json`:
```json
{
  "Jwt": {
    "Key": "your-secret-key-at-least-32-characters",
    "Issuer": "LearnGreekAPI",
    "Audience": "LearnGreekApp"
  }
}
```

## Notes

- Currently uses in-memory storage for users (data is lost when the server restarts)
- Password hashing uses SHA256 (consider using BCrypt or similar for production)
- JWT tokens expire after 24 hours
