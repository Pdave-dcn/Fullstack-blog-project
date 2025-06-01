export const isTokenValid = (token: string) => {
  const [, payload] = token.split(".");
  const decoded = JSON.parse(atob(payload));
  return decoded.exp * 1000 > Date.now();
};
