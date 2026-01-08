const PRODUCT_API = "/api/products";

export async function createProduct(product) {
  const response = await fetch(PRODUCT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API getProduct");
    }
  }
}
