export const routePaths = {
  home: "/",
  characterList: "/characters/list",
  browseCharacters: "/characters/browse",
  newCharacter: "/characters/new",
  editCharacter: (id: string) => `/characters/edit/${id}`,
  viewCharacter: (id: string) => `/characters/view/${id}`,
}
