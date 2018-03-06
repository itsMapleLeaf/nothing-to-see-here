export const routePaths = {
  index: "/",
  characterList: "/characters",
  viewCharacter: (id: string) => `/character/${id}`,
  editCharacter: (id: string) => `/character/${id}/edit`,
}
