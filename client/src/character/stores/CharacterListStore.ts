import { app, firestore, Unsubscribe } from "firebase/app"
import { action, observable } from "mobx"

export class CharacterListStore {
  @observable characters = [] as any[]

  constructor(app: app.App) {
    let unsubscribe: undefined | Unsubscribe

    app.auth().onAuthStateChanged(user => {
      if (unsubscribe) {
        unsubscribe()
      }

      if (!user) {
        this.setCharacters([])
        return
      }

      unsubscribe = app
        .firestore()
        .doc("users/" + user.uid)
        .onSnapshot(async userSnapshot => {
          const userData = userSnapshot.data()
          const characterRefs = userData.characters as Array<firestore.DocumentReference>
          const characterSnaps = await Promise.all(characterRefs.map(char => char.get()))
          const characters = characterSnaps.map(snap => ({ id: snap.id, ...snap.data() }))
          this.setCharacters(characters)
        })
    })
  }

  @action
  setCharacters = (characters: any[]) => {
    this.characters = characters
  }

  getCharacter = (id: string) => {
    return this.characters.find(char => char.id === id)
  }
}
