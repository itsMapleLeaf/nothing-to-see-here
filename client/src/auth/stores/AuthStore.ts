import firebase from "firebase"
import { computed, observable } from "mobx"

export class AuthStore {
  @observable authCheckFinished = false
  @observable user: firebase.User | null = null

  listenForAuthStateChanges() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user
      this.authCheckFinished = true
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
