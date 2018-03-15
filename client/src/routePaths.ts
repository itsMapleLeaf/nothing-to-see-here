export const routePaths = {
  // app routes
  home: "/",

  // character routes
  characterList: "/characters/list",
  createCharacter: "/characters/create",
  viewCharacter: (id: string) => `/characters/view/${id}`,
  editCharacter: (id: string) => `/characters/edit/${id}`,

  // chat routes
  chat: "/chat",
}
