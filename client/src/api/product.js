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

// return {products, totalProducts}
export async function getProducts(skip, limit, sortOrder) {
  const params = new URLSearchParams();

  params.append("skip", skip !== undefined ? skip : 0);
  params.append("limit", limit !== undefined ? limit : 10);
  params.append("sortOrder", sortOrder !== undefined ? sortOrder : "asc");

  const response = await fetch(`${PRODUCT_API}?${params.toString()}`);
  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API getProducts");
    }
  }
}
