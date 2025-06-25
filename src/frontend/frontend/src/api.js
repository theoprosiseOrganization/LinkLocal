const URL = import.meta.env.VITE_API_DB_URL || 'http://localhost:3000';

export async function createUser(data) {
const res = await fetch(`${URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    const response = await res.json();
    if (!res.ok) {
      throw new Error(response.error || 'Failed to create user');
    }
    return response;
}