# Learn Koine Greek

Koine (koy-nay) was the dominant language of the first century in the mediterranian, and is the language of the New Testament. Practice-Koine is built to help
students become better translators by practicing parsing verses and identifying parts of speech.

## Tech Stack

- **Frontend**: React with Vite, React Router, Redux Toolkit
- **Backend**: .NET 8 Web API with JWT authentication
- **Hosting**: Netlify (frontend)

## Getting Started

### Prerequisites

- Node.js and npm
- .NET 8 SDK (installed automatically during setup)

### Running the Application

#### 1. Install Frontend Dependencies

```bash
npm install
```

#### 2. Start the Backend API

Open a terminal and run:

```bash
cd backend/LearnGreekAPI
export PATH="$HOME/.dotnet:$PATH"
dotnet run
```

The backend will run on `http://localhost:5000`

#### 3. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Authentication

The application now includes user authentication:
- The home page ("/") is public and accessible to everyone
- All other routes (vocabulary, parsing, verbs, about) require login
- Users can register or login from the login page
- User data is stored in-memory (resets when backend restarts)

### API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with username and password

## Project Structure

```
learn-koine/
├── backend/
│   └── LearnGreekAPI/     # .NET Web API backend
│       ├── Controllers/    # API controllers
│       ├── Models/        # Data models
│       ├── Services/      # Business logic
│       └── Program.cs     # App configuration
├── src/
│   ├── AuthContext.jsx    # Authentication context
│   ├── Login.jsx          # Login/Register page
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   └── ...                # Other React components
└── ...
```

## Attribution for base Greek Text:
Witness SR
Produced by the Center for New Testament Restoration (CNTR) 11/30/22
Copyright © 2022 by Alan Bunning released under Creative Commons Attribution 4.0 International License (CC BY-SA 4.0)`;

## Attribution for lexicon:
Taken from this GitHub repository
https://github.com/eliranwong/OpenGNT/tree/master/Lexicons
