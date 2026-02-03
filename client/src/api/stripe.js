const STRIPE_API = "/api/stripe";

export async function createCheckoutSession(cart, user) {
  const response = await fetch(`${STRIPE_API}/create-checkout-session`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart, user }),
  });

  const body = await response.json();
  console.log(body);

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
