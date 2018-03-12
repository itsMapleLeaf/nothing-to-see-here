import * as firebase from "firebase/app"

export async function fetchCharacterDetailsById(id: string) {
  const characterDoc = await firebase
    .firestore()
    .collection("characters")
    .doc(id)
    .get()

  if (!characterDoc.exists) {
    throw Error(`Could not find character by id "${id}"`)
  }

  return { id: characterDoc.id, ...characterDoc.data() } as any
}
