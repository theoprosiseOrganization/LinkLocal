const URL = import.meta.env.VITE_API_DB_URL || "http://localhost:3000";

export async function createUser(data) {
  const res = await fetch(`${URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to create user");
  }
  return response;
}

export async function loginUser(data) {
  const res = await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to login");
  }
  return response;
}

export async function logoutUser() {
  const res = await fetch(`${URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to logout");
  }
  return response;
}

export async function createEvent(data) {
  const res = await fetch(`${URL}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to create event");
  }
  return response;
}

export async function getAllEvents() {
  const res = await fetch(`${URL}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch events");
  }
  return response;
}

export async function getUserEvents(userId) {
  const res = await fetch(`${URL}/users/${userId}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch user events");
  }
  return response;
}

export async function getUserById(userId) {
  const res = await fetch(`${URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch user");
  }
  return response;
}

/**
 * This function retrieves the user ID of the currently authenticated user.
 * It sends a POST request to the `/auth/me` endpoint, which is expected to return the user ID of the authenticated user.
 * If the user is not authenticated, it throws an error.
 *
 * @returns {Promise<string>} Returns the user ID of the currently authenticated user.
 * @throws {Error} Throws an error if the user is not authenticated.
 */
export async function getSessionUserId() {
  const res = await fetch(`${URL}/auth/me`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Not authenticated");
  }
  const data = await res.json();
  return data.userId;
}

export async function updateUserProfile(userId, data) {
  const res = await fetch(`${URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to update user profile");
  }
  return response;
}

export async function searchForUsers(query) {
  const res = await fetch(`${URL}/users/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to search for users");
  }
  return response;
}