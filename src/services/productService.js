const API_URL = "http://localhost:8080/api/products";

export async function getAllProducts() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function getDestacados() {
  const response = await fetch(`${API_URL}/destacados`);
  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function deleteProduct(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
