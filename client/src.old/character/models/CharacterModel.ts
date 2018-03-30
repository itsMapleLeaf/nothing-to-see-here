import { firestore } from "firebase/app"

export class CharacterModel {
  id = ""
  name = ""
  tagline = ""
  owner = ""

  constructor(doc: firestore.DocumentSnapshot) {
    const data = doc.data()
    this.id = doc.id
    this.name = data.name || "<unknown>"
    this.tagline = data.tagline || ""
    this.owner = data.owner || ""
  }
}
