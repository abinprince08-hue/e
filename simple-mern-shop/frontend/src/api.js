const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// This function sends requests from React to our Express backend.
export async function api(path, options = {}) {
  const token = localStorage.getItem('shopToken');

  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_URL + path, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
}
