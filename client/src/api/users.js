const API_USERS = "/api/users";

export async function createUser(newUser) {
  const response = await fetch(API_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API createUser");
    }
  }
}

export async function editUser(user, id) {
  const response = await fetch(`${API_USERS}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API editUser");
    }
  }
}

export async function editPassword(password, id) {
  const response = await fetch(`${API_USERS}/${id}/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(password),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API editPassword");
    }
  }
}
