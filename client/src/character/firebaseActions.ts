import { User } from "firebase/app"

import { firebaseApp } from "../firebase"
import { CharacterModel } from "./models/CharacterModel"

const store = firebaseApp.firestore()
const charactersCollection = store.collection("characters")

export async function getCharacterById(id: string) {
  const doc = await charactersCollection.doc(id).get()
  return new CharacterModel(doc)
}

export async function getCharactersOwnedByUser(userId: string) {
  const result = await charactersCollection.where("owner", "==", userId).get()
  return result.docs.map(doc => new CharacterModel(doc))
}

export function createCharacter(owner: User, values: { name: string; tagline: string }) {
  return charactersCollection.doc().set({
    name: values.name,
    tagline: values.tagline,
    owner: owner.uid,
  })
}

export function updateCharacter(id: string, values: Partial<CharacterModel>) {
  return charactersCollection.doc(id).update(values)
}
