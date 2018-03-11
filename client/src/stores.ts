import { AuthStore } from "./auth/stores/AuthStore"

export function createStores() {
  return {
    authStore: new AuthStore(),
  }
}
