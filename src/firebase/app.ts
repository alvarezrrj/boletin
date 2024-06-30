import { shallowReactive } from 'vue'
import firebase from 'firebase'
import { DB_ROOT } from '@/config/sd'

type Fire = {
  app: firebase.app.App
  auth: firebase.auth.UserCredential | null
  isAuthed: boolean
  login(email: string, password: string): void
  loggedInUsers: Promise<number>
  dbRef: firebase.database.Reference
  clearHistory(): Promise<void>
  logout(): void
}

const fireApp = firebase.initializeApp({
  // OK to be shown publicly
  apiKey: 'AIzaSyAyX5rW5aNUHRuc7GNlxF3oOTeZk1YRof0',
  databaseURL: 'https://editor-de-boletines-41cae-default-rtdb.firebaseio.com/'
})

/**
 * Firebase application and authentication state
 */
export const fire = shallowReactive<Fire>({
  app: fireApp,

  auth: null,

  get isAuthed(): boolean {
    return !!this.auth
  },

  async login(email: string, password: string) {
    this.auth = await this.app
      .auth()
      .signInWithEmailAndPassword(email, password)
  },

  logout() {
    this.app.auth().signOut()
    this.auth = null
  },

  get loggedInUsers(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.app
        .database()
        .ref(DB_ROOT)
        .child('users')
        .once('value', (snapshot) => {
          resolve(snapshot.numChildren())
        })
        .catch(reject)
    })
  },

  get dbRef(): firebase.database.Reference {
    return this.app.database().ref(DB_ROOT)
  },

  async clearHistory(): Promise<void> {
    const HISTORY_ERROR =
      'Whoops, hubo un error al resetear el historial de edición, pero esto no deberia afectar la generación del HTML.'
    await Promise.all([
      this.dbRef.child('history').set(null),
      this.dbRef
        .child('checkpoint')
        .once(
          'value',
          (snapshot) =>
            snapshot.exists() && this.dbRef.child('checkpoint').set(null)
        )
    ]).catch((e) => {
      console.error('Error clearing firepad history', e)
      alert(HISTORY_ERROR)
    })
  }
})
