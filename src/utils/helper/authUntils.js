export function saveAuthData(token, user) {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuthData() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}
