const API_URL = "http://localhost:8080/api/users";

export async function registerUser(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getAllUsers() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function deleteUser(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function updateUser(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}
