const API_AUTH = "/api/auth";

export async function login(credentials) {
  const response = await fetch(API_AUTH, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API login");
    }
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_AUTH}/current`, {
    credentials: "include",
  });
  const body = await response.json();
  return body;
}

export async function logout() {
  await fetch(`${API_AUTH}`, {
    method: "DELETE",
  });
}
