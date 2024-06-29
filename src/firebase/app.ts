import { shallowReactive } from 'vue'
import firebase from 'firebase'

type Fire = {
  app: firebase.app.App
  auth: firebase.auth.UserCredential | null
  isAuthed: boolean
  login(email: string, password: string): void
  loggedInUsers: Promise<number>
  dbRef: firebase.database.Reference
  clearHistory(): Promise<void | [any, any]>
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
    this.auth = await this.app.auth().signInWithEmailAndPassword(email, password)
  },

  get loggedInUsers(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.app
        .database()
        .ref('/boletin')
        .child('users')
        .once('value', (snapshot) => {
          resolve(snapshot.numChildren())
        })
        .catch(reject)
    })
  },

  get dbRef(): firebase.database.Reference {
    return this.app.database().ref('/boletin')
  },

  clearHistory(): Promise<void | [any, any]> {
    return Promise.all([
      this.dbRef.child('history').remove(),
      this.dbRef.child('checkpoint').remove()
    ]).catch(console.log)
  }
})
