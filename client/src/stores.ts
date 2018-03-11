import * as firebase from "firebase/app"

import { AuthStore } from "./auth/stores/AuthStore"
import { CharacterListStore } from "./character/stores/CharacterListStore"

export type Stores = {
  authStore: AuthStore
  characterListStore: CharacterListStore
}

export function createStores(app: firebase.app.App): Stores {
  return {
    authStore: new AuthStore(app),
    characterListStore: new CharacterListStore(app),
  }
}
