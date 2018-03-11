import firebase from "firebase/app"
import { action, computed, observable } from "mobx"

export class AuthStore {
  @observable authCheckFinished = false
  @observable user: firebase.User | null = null

  constructor() {
    firebase.auth().onAuthStateChanged(this.handleAuthStateChanged)
  }

  @action
  private handleAuthStateChanged = (user: firebase.User | null) => {
    this.user = user
    this.authCheckFinished = true
  }

  @computed
  get isSignedIn() {
    return this.user != null
  }

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  signOut() {
    return firebase.auth().signOut()
  }
}
