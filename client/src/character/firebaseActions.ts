import { User } from "firebase/app"

import { firebaseApp } from "../firebase"
import { CharacterModel } from "./models/CharacterModel"

export async function getCharacterById(id: string) {
  const doc = await firebaseApp
    .firestore()
    .collection("characters")
    .doc(id)
    .get()

  return new CharacterModel(doc)
}

export async function getCharactersOwnedByUser(userId: string) {
  const result = await firebaseApp
    .firestore()
    .collection("characters")
    .where("owner", "==", userId)
    .get()

  return result.docs.map(doc => new CharacterModel(doc))
}

export function createCharacter(owner: User, values: { name: string; tagline: string }) {
  return firebaseApp
    .firestore()
    .collection("characters")
    .doc()
    .set({
      name: values.name,
      tagline: values.tagline,
      owner: owner.uid,
    })
}

export function updateCharacter(id: string, values: Partial<CharacterModel>) {
  return firebaseApp
    .firestore()
    .collection("characters")
    .doc(id)
    .update(values)
}
