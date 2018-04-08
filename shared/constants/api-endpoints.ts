export const endpoints = {
  // auth/user routes
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/register",
  unregister: "/auth/unregister",
  authUser: "/auth/user",
  user: (username: string) => `/user/${username}`,

  // character routes
  characters: "/characters",
  character: (id: string) => `/characters/${id}`,
}
