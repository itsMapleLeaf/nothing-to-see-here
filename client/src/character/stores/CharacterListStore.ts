import { app } from "firebase/app"
import { action, observable } from "mobx"

export class CharacterListStore {
  @observable characters = [] as any[]

  constructor(app: app.App) {
    app
      .firestore()
      .collection("characters")
      .onSnapshot(snapshot => {
        const characters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        this.setCharacters(characters)
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
