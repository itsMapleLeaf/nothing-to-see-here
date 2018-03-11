import firebase from "firebase/app"

import { AuthStore } from "./auth/stores/AuthStore"
import { CharacterListStore } from "./character/stores/CharacterListStore"

export function createStores(app: firebase.app.App) {
  return {
    authStore: new AuthStore(app),
    characterListStore: new CharacterListStore(app),
  }
}

// TODO: add custom type-safe injection function
