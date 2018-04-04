export const endpoints = {
  login: "/login",
  logout: "/logout",
  register: "/register",
  unregister: "/unregister",
  checkToken: "/check-token",
  user: (username: string) => `/user/${username}`,
}
