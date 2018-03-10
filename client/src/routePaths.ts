export const routePaths = {
  home: "/",
  login: "/login",
  characterList: "/characters",
  viewCharacter: (id: string) => `/character/${id}`,
  editCharacter: (id: string) => `/character/${id}/edit`,
  chat: "/chat",
}
