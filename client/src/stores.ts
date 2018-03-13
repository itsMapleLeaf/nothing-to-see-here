import * as firebase from "firebase/app"

import { AppViewStore } from "./app/stores/AppViewStore"
import { AuthStore } from "./auth/stores/AuthStore"
import { CharacterListStore } from "./character/stores/CharacterListStore"

export class RootStore {
  authStore = new AuthStore(this.firebaseApp)
  characterListStore = new CharacterListStore(this.firebaseApp)
  appViewStore = new AppViewStore()

  constructor(public firebaseApp: firebase.app.App) {}
}
