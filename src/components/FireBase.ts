import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getDatabase, ref, set, get, child, Database, onValue } from 'firebase/database'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User
} from 'firebase/auth'
import type { Ref } from 'vue'

export class FireBase {
  private app: FirebaseApp
  private database: Database
  private auth: Auth
  private user!: User | null

  // Firebase configuration
  private firebaseConfig = {
    apiKey: 'AIzaSyAyX5rW5aNUHRuc7GNlxF3oOTeZk1YRof0',
    authDomain: 'editor-de-boletines-41cae.firebaseapp.com',
    projectId: 'editor-de-boletines-41cae',
    storageBucket: 'editor-de-boletines-41cae.appspot.com',
    messagingSenderId: '390157135291',
    appId: '1:390157135291:web:8df3b41865c9df5a36e89e'
  }

  get isAuthed() {
    return this.auth.currentUser
  }

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(this.firebaseConfig)
    // Initialize Realtime Database and get a reference to the service
    this.database = getDatabase(this.app)
    this.auth = getAuth()

    // Observe auth state
    onAuthStateChanged(this.auth, (user) => {
      this.user = user
    })
  }

  signIn(email: string, pass: string) {
    return (
      signInWithEmailAndPassword(this.auth, email, pass)
        // return signInWithEmailAndPassword(this.auth, 'oldstudent@dhamma.org', '1234')
        .then((userCredential) => {
          this.user = userCredential.user
          console.log('Signed in')
          return true
        })
        .catch(this.processSignInError)
    )
  }

  processSignInError(e: any) {
    if (e.message.includes('user-not-found')) {
      alert('Usuario no encontrado')
    }
    if (e.message.includes('wrong-password')) {
      alert('Contraseña incorrecta')
    } else {
      alert('Algo salió mal')
    }
  }

  signOut() {
    signOut(this.auth)
      .then(() => (this.user = null))
      .catch((e) => console.error('Error al cerrar sesión', e))
  }

  write(data: string) {
    if (!this.user) return
    return set(ref(this.database, 'users/' + this.user?.uid), {
      template: data
    })
  }

  read() {
    if (!this.user) return
    const dbRef = ref(this.database)
    return get(child(dbRef, `users/${this.user.uid}/template`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        }
      })
      .catch(({ data }) => {
        if (data.exists()) console.log('Plantilla cargada')
        else console.log('❗ No encontramos la plantilla')
      })
  }

  listen(vueRef: Ref<string>) {
    if (!this.user) return

    const dbRef = ref(this.database, `users/${this.user.uid}/template`)

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataRef = vueRef
      const data = snapshot.val()
      dataRef.value = data
    })
  }
}
