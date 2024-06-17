<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { fromMonaco, type IFirepad } from '@hackerrank/firepad'
import firebase from 'firebase'
// import { }
import * as monaco from 'monaco-editor'

const props = defineProps<{
  onChange: (raw: string) => void
}>()
const monacoWrapperRef = ref()
const formRef = ref<HTMLFormElement>()
const dialogRef = ref<HTMLDialogElement>()
const userColors = ['#817', '#ed0', '#09c', '#4d8', '#639', '#639']

const fireApp = firebase.initializeApp({
  apiKey: 'AIzaSyAyX5rW5aNUHRuc7GNlxF3oOTeZk1YRof0',
  databaseURL: 'https://editor-de-boletines-41cae-default-rtdb.firebaseio.com/'
})
let monacoEditor: monaco.editor.IStandaloneCodeEditor
let firepad: IFirepad
let auth: firebase.auth.UserCredential

function initialize() {
  monacoEditor = monaco.editor.create(monacoWrapperRef.value, {
    language: 'markdown',
    minimap: { enabled: false },
    wordWrap: 'on'
  })

  monacoEditor.onDidChangeModelContent(() => props.onChange(monacoEditor.getValue()))

  firepad = fromMonaco(fireApp.database().ref('/boletin'), monacoEditor, {
    // TODO
    // Set name and color dynamically
    userName: auth.user?.email?.split('@')[0],
    userColor: userColors[Math.floor(Math.random() * userColors.length)],
    userId: auth.user?.uid
  })
}

onMounted(async () => {
  const formElement = formRef.value
  if (formElement)
    formElement.onsubmit = async (e) => {
      e.preventDefault()
      try {
        auth = await fireApp
          .auth()
          .signInWithEmailAndPassword(formElement.email.value, formElement.password.value)

        initialize()

        formElement.reset()
        dialogRef.value?.close()
      } catch (e) {
        console.log('Invalid credentials')
        console.log('AUTH', auth)
      }
    }
})
onUnmounted(() => {
  firepad.dispose()
})
</script>

<template>
  <dialog open ref="dialogRef">
    <form ref="formRef">
      <input type="text" name="email" />
      <input type="password" name="password" />
      <input type="submit" value="login" />
    </form>
  </dialog>
  <div id="monaco" ref="monacoWrapperRef"></div>
</template>
