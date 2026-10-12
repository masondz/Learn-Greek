# LearnGreekAPI Backend

This is the .NET 8 Web API backend for the Learn Greek application. It provides JWT-based authentication for user login and registration.

## Features

- JWT-based authentication
- PostgreSQL storage through Entity Framework Core
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

Keep database credentials and JWT signing keys out of tracked files. For local development, initialize .NET user-secrets once from `backend/LearnGreekAPI`:

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=YOUR_DATABASE;Username=YOUR_USERNAME;Password=YOUR_PASSWORD"
dotnet user-secrets set "Jwt:Key" "REPLACE_WITH_A_RANDOM_SECRET_AT_LEAST_32_BYTES_LONG"
```

ASP.NET Core loads these values automatically in Development. In a production environment, provide them as environment variables instead:

```text
ConnectionStrings__DefaultConnection
Jwt__Key
```

The repository ignores `appsettings.json` for local overrides. Do not commit real credentials in it. The API exits at startup when the database connection string or a sufficiently long JWT key is missing.

## Notes

- User and verse-score data are stored in PostgreSQL
- Password hashing uses SHA256 (consider using BCrypt or similar for production)
- JWT tokens expire after 24 hours
