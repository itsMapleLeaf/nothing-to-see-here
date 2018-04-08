export const endpoints = {
  // auth/user routes
  login: "/login",
  logout: "/logout",
  register: "/register",
  unregister: "/unregister",
  checkToken: "/check-token",
  user: (username: string) => `/user/${username}`,

  // character routes
  characters: '/characters',
  character: (id: string) => `/characters/${id}`,
}
