import { AuthStore } from "./auth/stores/AuthStore"
import firebase from "firebase/app"

export function createStores(app: firebase.app.App) {
  return {
    authStore: new AuthStore(app),
  }
}
