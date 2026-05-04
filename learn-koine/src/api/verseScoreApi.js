const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5092/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const verseScoreApi = {
  async getAllScores() {
    const response = await fetch(`${API_BASE_URL}/VerseScores`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch scores');
    }
    
    return response.json();
  },

  async getScore(verseReference) {
    try {
      const response = await fetch(`${API_BASE_URL}/VerseScores/${verseReference}`, {
        headers: getAuthHeaders(),
      });
      
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch score');
      }
      
      return response.json();
    } catch (error) {
      // Only log non-404 errors
      if (error.message !== 'Failed to fetch') {
        console.error('Error fetching score:', error);
      }
      return null;
    }
  },

  async saveScore(verseReference, score) {
    const response = await fetch(`${API_BASE_URL}/VerseScores`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        verseReference,
        score,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save score');
    }
    
    return response.json();
  },

  async deleteScore(verseReference) {
    const response = await fetch(`${API_BASE_URL}/VerseScores/${verseReference}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (response.status === 404) {
      return true;
    }
    
    if (!response.ok) {
      throw new Error('Failed to delete score');
    }
    
    return true;
  },
};
