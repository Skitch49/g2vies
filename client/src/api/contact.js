const API_CONTACT = "/api/contact";

export async function createMessageContact(object) {
  const response = await fetch(`${API_CONTACT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
    credentials: "include",
  });

  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API createMessageContact");
    }
  }
}
