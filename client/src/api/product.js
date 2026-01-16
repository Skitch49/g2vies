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
  if (limit !== null && limit !== undefined) {
    params.append("limit", limit);
  }
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

export async function getProduct(productID) {
  const response = await fetch(`${PRODUCT_API}/${productID}`);
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

export async function getSimilarProducts(productID) {
  const response = await fetch(`${PRODUCT_API}/similarProduct/${productID}`);
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API getSimilarProducts");
    }
  }
}

export async function getBrandsAndCategories() {
  const response = await fetch(`${PRODUCT_API}/brandsAndCategories`);
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error API getBrandsAndCategories");
    }
  }
}

export async function updateProduct(productID, product) {
  const response = await fetch(`${PRODUCT_API}/${productID}`, {
    method: "PATCH",
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
      throw new Error("Error API updateProduct");
    }
  }
}

export async function deleteProduct(productID) {
  const response = await fetch(`${PRODUCT_API}/${productID}`, {
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
      throw new Error("Error API deleteProduct");
    }
  }
}
