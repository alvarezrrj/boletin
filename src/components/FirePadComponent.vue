<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { fromMonaco, type IFirepad } from '@hackerrank/firepad'
import firebase from 'firebase'
import * as monaco from 'monaco-editor'
import { build } from '../utils/build'

const props = defineProps<{
  onChange: (raw: string) => void
  html?: HTMLTableElement
}>()
const monacoWrapperRef = ref()
const formRef = ref<HTMLFormElement>()
const dialogRef = ref<HTMLDialogElement>()
const userColor = ref('gray')
const userColors = ['#817', '#ed0', '#0bc', '#c66', '#4d8', '#36b', '#e94', '#2cb', '#639']
let monacoEditor: monaco.editor.IStandaloneCodeEditor
let firepad: IFirepad
let auth: firebase.auth.UserCredential
let fireApp: firebase.app.App

function initializeFirebase() {
  fireApp = firebase.initializeApp({
    // OK to be shown publicly
    apiKey: 'AIzaSyAyX5rW5aNUHRuc7GNlxF3oOTeZk1YRof0',
    databaseURL: 'https://editor-de-boletines-41cae-default-rtdb.firebaseio.com/'
  })
}

async function setUserColor() {
  const loggedInUsers = await fetchLoggedInUserCount()
  userColor.value = userColors[loggedInUsers - 1]
}

async function fetchLoggedInUserCount(): Promise<number> {
  return new Promise((resolve, _reject) => {
    fireApp
      .database()
      .ref('/boletin')
      .child('users')
      .once('value', (snapshot) => {
        resolve(snapshot.numChildren())
      })
  })
}

/**
 * Initialize monaco and firepad with optional default text
 */
function initializePad(defaultText?: string) {
  monacoEditor = monaco.editor.create(monacoWrapperRef.value, {
    language: 'markdown',
    minimap: { enabled: false },
    wordWrap: 'on',
    smoothScrolling: true
  })

  monacoEditor.onDidChangeModelContent(() => props.onChange(monacoEditor.getValue()))

  firepad = fromMonaco(fireApp.database().ref('/boletin'), monacoEditor, {
    userName: auth.user?.email?.split('@')[0],
    userColor: userColor.value,
    userId: auth.user?.uid,
    defaultText
  })
}

/**
 * Clear history and save current state as firepad's initial state
 */
async function resetHistory() {
  const loggedInUsers = await fetchLoggedInUserCount()
  if (loggedInUsers === 1) {
    const data = firepad.getText()

    monacoEditor.dispose()
    firepad.dispose()

    await Promise.all([
      fireApp.database().ref('/boletin').child('history').remove().catch(console.log),
      fireApp.database().ref('/boletin').child('checkpoint').remove().catch(console.log)
    ])

    initializePad(data)
  }
}

async function save() {
  build(props.html!.innerHTML)
  resetHistory()
}

async function login(): Promise<void> {
  dialogRef.value?.showModal()
  const formElement = formRef.value

  if (!formElement) return

  return new Promise((resolve, reject) => {
    formElement.onsubmit = async (e) => {
      e.preventDefault()
      try {
        auth = await fireApp
          .auth()
          .signInWithEmailAndPassword(formElement.email.value, formElement.password.value)

        formElement.reset()
        dialogRef.value?.close()
        resolve()
      } catch (e) {
        reject('Invalid credentials')
      }
    }
  })
}

onMounted(async () => {
  try {
    await login()
    await setUserColor()
  } catch (e) {
    alert(e)
  }
  initializePad()
})
onUnmounted(() => {
  firepad.dispose()
})

initializeFirebase()
</script>

<template>
  <button :onClick="save">Guardar</button>
  <dialog ref="dialogRef">
    <form ref="formRef">
      <input type="text" name="email" />
      <input type="password" name="password" />
      <input type="submit" value="login" />
    </form>
  </dialog>
  <div id="monaco" ref="monacoWrapperRef"></div>
</template>

<style scoped>
dialog::backdrop {
  filter: blur(5px);
}
</style>
