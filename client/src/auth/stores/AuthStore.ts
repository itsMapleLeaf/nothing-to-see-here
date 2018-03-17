import { User } from "firebase/app"
import { action, observable } from "mobx"

import { firebaseApp } from "../../firebase"

type Result = { success: true } | { success: false; error: string }

type RegisterOptions = { displayName: string; email: string; password: string }

const auth = firebaseApp.auth()

export class AuthStore {
  @observable authenticating = true
  @observable.ref user: User | null = null

  constructor() {
    auth.onAuthStateChanged(this.handleAuthStateChanged)
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
  signIn = async (email: string, password: string): Promise<Result> => {
    this.setAuthenticating(true)

    try {
      await auth.signInWithEmailAndPassword(email, password)
      return { success: true }
    } catch (error) {
      this.setAuthenticating(false)
      return { success: false, error: error.message || String(error) }
    }
  }

  @action
  signOut = () => {
    this.authenticating = true
    auth.signOut()
  }

  @action
  register = async (options: RegisterOptions): Promise<Result> => {
    try {
      await auth.createUserWithEmailAndPassword(options.email, options.password)
      await firebaseApp
        .auth()
        .currentUser!.updateProfile({ displayName: options.displayName, photoURL: null })

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message || String(error) }
    }
  }
}

export const authStore = new AuthStore()
