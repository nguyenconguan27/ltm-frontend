export function isLoggedIn() {
  return !!localStorage.getItem("ltm");
}

export const getAccessTokenFromLS = () =>
  localStorage.getItem("accessToken") || "";
export const getRefreshTokenFromLS = () =>
  localStorage.getItem("refreshToken") || "";

export const getUserIdFromLS = () => localStorage.getItem("userId");

export const saveAccesTokenToLS = (access_token) => {
  localStorage.setItem("accessToken", access_token);
};
export const saveRefreshTokenToLS = (refresh_token) => {
  localStorage.setItem("refreshToken", refresh_token);
};

export const saveUserIdToLS = (userId) => {
  localStorage.setItem("userId", userId);
};

export const clearLS = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("refreshToken");
};
