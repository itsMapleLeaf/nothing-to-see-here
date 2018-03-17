import { User } from "firebase/app"
import { action, observable } from "mobx"

import { firebaseApp } from "../../firebase"

type AuthResult = { success: true } | { success: false; error: string }

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
  setAuthenticating = (authenticating: boolean) => {
    this.authenticating = authenticating
  }

  @action
  signIn = async (email: string, password: string): Promise<AuthResult> => {
    this.setAuthenticating(true)

    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password)
      return { success: true }
    } catch (error) {
      this.setAuthenticating(false)
      return { success: false, error: error.message || String(error) }
    }
  }

  @action
  signOut = () => {
    this.authenticating = true
    firebaseApp.auth().signOut()
  }
}

export const authStore = new AuthStore()
