import { User } from "firebase/app"

import { randomInt } from "../common/helpers/random"
import { firebaseApp } from "../firebase"
import { CharacterModel } from "./models/CharacterModel"

const store = firebaseApp.firestore()
const charactersCollection = store.collection("characters")

// lowercases the given name and appends a random 4-digit number
// useful for creating a pleasing-looking ID name
function createRandomId(name: string) {
  const nameId = name
    .toLowerCase()
    .replace(/[^a-z]/gi, "-")
    .replace(/-+/g, "-")

  return `${nameId}-${randomInt(1000, 10000)}`
}

export async function getCharacterById(id: string) {
  const doc = await charactersCollection.doc(id).get()
  return new CharacterModel(doc)
}

export async function getCharactersOwnedByUser(userId: string) {
  const result = await charactersCollection.where("owner", "==", userId).get()
  return result.docs.map(doc => new CharacterModel(doc))
}

export function createCharacter(owner: User, values: { name: string; tagline: string }) {
  return charactersCollection.doc(createRandomId(name)).set({
    name: values.name,
    tagline: values.tagline,
    owner: owner.uid,
  })
}

export function updateCharacter(id: string, values: Partial<CharacterModel>) {
  return charactersCollection.doc(id).update(values)
}

export function deleteCharacter(id: string) {
  return charactersCollection.doc(id).delete()
}
