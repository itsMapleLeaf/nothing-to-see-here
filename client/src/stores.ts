import * as firebase from "firebase/app"

import { AuthStore } from "./auth/stores/AuthStore"
import { CharacterListStore } from "./character/stores/CharacterListStore"

export class RootStore {
  authStore = new AuthStore(this.firebase)
  characterListStore = new CharacterListStore(this.firebase)

  constructor(public firebase: firebase.app.App) {}
}
