const URL = import.meta.env.VITE_API_DB_URL || "http://localhost:3000";
const ROUTES_API_ENDPOINT =
  "https://routes.googleapis.com/directions/v2:computeRoutes";
const routes_fields = [
  "routes.viewport",
  "routes.legs",
  "routes.polylineDetails",
];
const ROUTES_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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

export async function getEventById(eventId) {
  const res = await fetch(`${URL}/events/${eventId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch event");
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

export async function getUserFriends(userId) {
  const res = await fetch(`${URL}/users/${userId}/friends`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch user friends");
  }
  return response;
}

export async function addUserFriend(userId, friendId) {
  const res = await fetch(`${URL}/users/${userId}/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ friendId }),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to add user friend");
  }
  return response;
}

export async function followUser(followerId, followingId) {
  const res = await fetch(`${URL}/users/${followerId}/following`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followingId }),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to follow user");
  }
  return response;
}

export async function getUserFollowing(userId) {
  const res = await fetch(`${URL}/users/${userId}/following`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch user following");
  }
  return response;
}

export async function getUserFollowers(userId) {
  const res = await fetch(`${URL}/users/${userId}/followers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch user followers");
  }
  return response;
}

// Can only be called after an event is created
export async function uploadEventImages(eventId, files) {
  const formData = new FormData();
  formData.append("eventId", eventId);
  for (const file of files) {
    formData.append("images", file);
  }
  const res = await fetch(`${URL}/upload/event-images`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Image upload failed");
  return (await res.json()).urls;
}

export async function uploadProfileImage(userId, file) {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("profileImage", file);

  const res = await fetch(`${URL}/upload/user-profile`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Profile image upload failed");
  return (await res.json()).url;
}

export async function getAllTags() {
  const res = await fetch(`${URL}/users/preferences/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch tags");
  }
  return response;
}

export async function addUserTag(userId, tag) {
  const res = await fetch(`${URL}/users/${userId}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tag }),
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to add user tag");
  }
  return response;
}
export async function likeEvent(eventId, userId) {
  const res = await fetch(`${URL}/events/${eventId}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });
  const response = await res.json();
  if (!res.ok) throw new Error(response.error || "Failed to like event");
  return response;
}

export async function unlikeEvent(eventId, userId) {
  const res = await fetch(`${URL}/events/${eventId}/likes/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) throw new Error(response.error || "Failed to unlike event");
  return response;
}

export async function getEventLikes(eventId) {
  const res = await fetch(`${URL}/events/${eventId}/likes`, {
    method: "GET",
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) throw new Error(response.error || "Failed to fetch event likes");
  return response;
}

export async function getSuggestedUsers(userId) {
  const res = await fetch(`${URL}/users/${userId}/suggested`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch suggested users");
  }
  return response;
}

export async function eventsWithinPolygon(coords) {
  const geojson = {
    type: "Polygon",
    coordinates: [coords.map((coord) => [coord.lng, coord.lat])],
  };
  const res = await fetch(`${URL}/events/within-polygon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ polygon: geojson }),
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch events within polygon");
  }
  return response;
}

export async function getOptimalRoute(start, events, transportType) {
  const res = await fetch(`${URL}/events/optimal-route`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ start, events, transportType }),
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to get optimal route");
  }
  return response;
}

export async function meUrl(path){
  const me = await getSessionUserId();
  return `${URL}/users/${me}${path}`;
}

export async function createPlan( {title, eventIds, routeData, durations}){
  const url = await meUrl("/plans");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, eventIds, routeData, durations }),
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to create plan");
  }
  return response;
}

export async function inviteUsers(planId, recipientIds) {
  if (!Array.isArray(recipientIds) || recipientIds.length === 0) {
    throw new Error("recipientIds must be a non-empty array");
  }
  const url = await meUrl(`/plans/${planId}/invite`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipientIds }),
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to invite users");
  }
  return response;
}

export async function getPlanById(planId) {
  const url = await meUrl(`/plans/${planId}`);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch plan");
  }
  return response;
}

export async function getMyInvitations() {
  const url = await meUrl(`/invitations`);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.error || "Failed to fetch invitations");
  }
  return response;
}