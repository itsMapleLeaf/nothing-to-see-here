export const routePaths = {
  home: "/",
  characterList: "/characters",
  viewCharacter: (id: string) => `/character/${id}`,
  editCharacter: (id: string) => `/character/${id}/edit`,
  chat: "/chat",
}
