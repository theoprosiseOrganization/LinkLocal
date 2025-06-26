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
  const res = await fetch(`${URL}/events`, {
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
