import { app, firestore, Unsubscribe } from "firebase/app"
import { action, observable } from "mobx"

import { CharacterModel } from "../models/CharacterModel"

export class CharacterListStore {
  @observable characters = [] as CharacterModel[]

  constructor(firebaseApp: app.App) {
    let unsubscribe: undefined | Unsubscribe

    firebaseApp.auth().onAuthStateChanged(user => {
      if (unsubscribe) {
        unsubscribe()
      }

      if (!user) {
        this.setCharacters([])
        return
      }

      unsubscribe = firebaseApp
        .firestore()
        .doc("users/" + user.uid)
        .onSnapshot(async userSnapshot => {
          const userData = userSnapshot.data()
          const characterRefs = userData.characters as firestore.DocumentReference[]
          const characterSnaps = await Promise.all(characterRefs.map(char => char.get()))
          const characters = characterSnaps.map(snap => new CharacterModel(snap))
          this.setCharacters(characters)
        })
    })
  }

  @action
  setCharacters = (characters: CharacterModel[]) => {
    this.characters = characters
  }

  getCharacter = (id: string) => {
    return this.characters.find(char => char.id === id)
  }
}
