import * as firebase from "firebase/app"

import { AuthStore } from "./auth/stores/AuthStore"
import { CharacterListStore } from "./character/stores/CharacterListStore"

export class RootStore {
  authStore = new AuthStore(this.firebaseApp)
  characterListStore = new CharacterListStore(this.firebaseApp)

  constructor(public firebaseApp: firebase.app.App) {}
}
