export const endpoints = {
  auth: {
    createAccount: "/createAccount",
    deleteAccount: "/deleteAccount",
    getToken: "/getToken",
    clearToken: "/clearToken",
    verifyToken: "/verityToken",
  },

  characters: "/characters",
  character: (id: string) => `/characters/${id}`,
}
