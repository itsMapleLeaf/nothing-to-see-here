import * as firebase from "firebase/app"

import { CharacterModel } from "./models/CharacterModel"

export async function fetchCharacterDetailsById(id: string) {
  const characterDoc = await firebase
    .firestore()
    .collection("characters")
    .doc(id)
    .get()

  if (!characterDoc.exists) {
    throw Error(`Could not find character by id "${id}"`)
  }

  return new CharacterModel(characterDoc)
}
