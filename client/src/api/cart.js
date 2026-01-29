const API_CART = "/api/cart";

export async function getCart() {
  const response = await fetch(API_CART, {
    credentials: "include",
  });

  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API getCart");
    }
  }
}

export async function addCart(productId, quantity = 1) {
  const response = await fetch(`${API_CART}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId, quantity }),
  });

  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API setCart");
    }
  }
}

export async function editCart(productId, quantity) {
  const response = await fetch(`${API_CART}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
    body: JSON.stringify({ productId, quantity }),
  });

  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API editCart");
    }
  }
}

export async function removeFromCart(productId) {
  const response = await fetch(`${API_CART}/remove/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API removeFromCart");
    }
  }
}

export async function clearCart() {
  const response = await fetch(`${API_CART}/clear`, {
    method: "DELETE",
    credentials: "include",
  });
  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API clearCart");
    }
  }
}
