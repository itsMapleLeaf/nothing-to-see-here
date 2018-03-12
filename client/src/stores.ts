import * as firebase from "firebase/app"

import { AuthStore } from "./auth/stores/AuthStore"
import { CharacterListStore } from "./character/stores/CharacterListStore"

export class RootStore {
  authStore = new AuthStore(this.app)
  characterListStore = new CharacterListStore(this.app)

  constructor(private app: firebase.app.App) {}
}
