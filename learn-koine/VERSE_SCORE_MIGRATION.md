# Verse Score Database Migration

This document describes the migration of verse scores from browser localStorage to the database.

## Overview

Previously, verse scores were stored in the browser's localStorage with the verse reference as the key (e.g., "40001001") and the score as the value. This has been migrated to a PostgreSQL database with proper user association.

## Database Schema

### VerseScore Table

| Column | Type | Description |
|--------|------|-------------|
| Id | Guid | Primary key |
| UserId | Guid | Foreign key to Users table |
| VerseReference | string | Verse reference code (e.g., "40001001") |
| Score | int | User's high score for this verse |
| CreatedAt | DateTime | When the score was first created |
| UpdatedAt | DateTime | When the score was last updated |

**Indexes:**
- Unique index on (UserId, VerseReference) - ensures one score per verse per user

**Relationships:**
- Many-to-one relationship with User (cascade delete)

## API Endpoints

All endpoints require JWT authentication via the Authorization header.

### GET /api/VerseScores
Get all verse scores for the authenticated user.

**Response:** Array of VerseScoreResponse objects

### GET /api/VerseScores/{verseReference}
Get the score for a specific verse.

**Parameters:**
- `verseReference` (string) - The verse reference code

**Response:** 
- 200 OK with VerseScoreResponse object
- 404 Not Found if no score exists

### POST /api/VerseScores
Create or update a verse score. Only updates if the new score is higher than the existing score.

**Request Body:**
```json
{
  "verseReference": "40001001",
  "score": 150
}
```

**Response:** 
- 201 Created with VerseScoreResponse object (new score)
- 200 OK with VerseScoreResponse object (existing score)

### DELETE /api/VerseScores/{verseReference}
Delete a verse score.

**Parameters:**
- `verseReference` (string) - The verse reference code

**Response:**
- 204 No Content
- 404 Not Found if no score exists

## Frontend Changes

### New API Module
Created `/src/api/verseScoreApi.js` with methods:
- `getAllScores()` - Fetch all user scores
- `getScore(verseReference)` - Fetch specific verse score
- `saveScore(verseReference, score)` - Create/update score
- `deleteScore(verseReference)` - Delete score

### Updated Functions in utils.js

All scoring functions are now async:

- `getOrSetHighScore(reference)` - Returns 0 if no score exists
- `setNewHighScore(reference, newScore)` - Only saves if new score is higher
- `removeHighscore(reference)` - Deletes score from database
- `scoringFunction(scoreObject, choice, reference)` - Calculates and saves scores

### Component Updates

Components that use scoring functions have been updated to handle async operations:
- Word.jsx
- PickVerse.jsx
- ArticleGrid.jsx
- VerbGrid.jsx
- PronounGrid.jsx
- ConjuctionGrid.jsx
- PrepositionGrid.jsx

## Running the Migration

1. **Apply the migration:**
   ```bash
   cd backend/LearnGreekAPI
   dotnet ef database update
   ```

2. **Verify the migration:**
   ```bash
   dotnet ef migrations list
   ```
   You should see "AddVerseScores" in the list.

3. **Start the backend:**
   ```bash
   dotnet run
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

## Environment Variables

Make sure your frontend has the API URL configured:
- Default: `http://localhost:5193/api`
- Can be overridden with `VITE_API_BASE_URL` environment variable

## Data Migration Note

**Important:** Existing localStorage scores will NOT be automatically migrated to the database. Users will start fresh with new scores in the database. If you need to preserve existing scores, you would need to:

1. Export localStorage data before deploying
2. Create a migration script to import the data
3. Associate scores with users (would require knowing which user had which scores)

Since localStorage doesn't have user association, automatic migration is not straightforward.

## Testing

Test the following scenarios:
1. ✅ Create a new score
2. ✅ Update a score (should only update if higher)
3. ✅ Delete a score
4. ✅ Navigate between verses (should save/delete scores appropriately)
5. ✅ Logout and login (scores should persist per user)
6. ✅ Multiple users (each should have their own scores)

## Security Notes

- All endpoints require authentication
- Users can only access their own scores
- The UserId is extracted from the JWT token (cannot be spoofed)
- Foreign key cascade ensures scores are deleted when users are deleted
