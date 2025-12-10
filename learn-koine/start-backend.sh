#!/bin/bash

echo "Starting Learn Greek Backend..."
export PATH="$HOME/.dotnet:$PATH"
cd backend/LearnGreekAPI
dotnet run --urls "http://localhost:5000"
