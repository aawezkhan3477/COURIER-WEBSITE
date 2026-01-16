
export const getToken = () => localStorage.getItem("token");
export const isAdmin = () => localStorage.getItem("role") === "admin";
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
