import firebase from "firebase"
import { computed, observable } from "mobx"

export class AuthStore {
  @observable user: firebase.User | null = null

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user
    })
  }

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  signOut() {
    return firebase.auth().signOut()
  }

  @computed
  get isSignedIn() {
    return this.user != null
  }
}
