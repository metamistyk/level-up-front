export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": options.headers?.["Content-Type"] || "application/json",
  };

  return fetch(url, {
    ...options,
    headers
  });
};
