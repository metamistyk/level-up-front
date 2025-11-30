const API_URL = "http://localhost:8080/api/cart";

export async function getCartByUserId(userId) {
  const response = await fetch(`${API_URL}/user/${userId}`);
  return response.json();
}

export async function addToCart(userId, productId, quantity) {
  return fetch(
    `${API_URL}/add?userId=${userId}&productId=${productId}&quantity=${quantity}`,
    { method: "POST" }
  );
}

export async function updateCartItem(cartItemId, quantity) {
  return fetch(`${API_URL}/item/${cartItemId}?quantity=${quantity}`, {
    method: "PUT",
  });
}

export async function removeCartItem(cartItemId) {
  return fetch(`${API_URL}/item/${cartItemId}`, {
    method: "DELETE",
  });
}

export async function clearCart(userId) {
  return fetch(`${API_URL}/clear/${userId}`, {
    method: "DELETE",
  });
}
