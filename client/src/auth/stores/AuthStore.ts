import { User } from "firebase/app"
import { action, observable } from "mobx"

import { firebaseApp } from "../../firebase"

export class AuthStore {
  @observable authenticating = true
  @observable.ref user: User | null = null

  constructor() {
    firebaseApp.auth().onAuthStateChanged(this.handleAuthStateChanged)
  }

  @action
  handleAuthStateChanged = (user: User | null) => {
    this.user = user
    this.authenticating = false
  }

  @action
  signIn = () => {
    if (this.user) {
      alert("Error: already signed in")
      return
    }

    const email = prompt("Email?")
    const password = prompt("Password?")
    if (email && password) {
      this.authenticating = true
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
    }
  }

  @action
  signOut = () => {
    this.authenticating = true
    firebaseApp.auth().signOut()
  }
}

export const authStore = new AuthStore()
