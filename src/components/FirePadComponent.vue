<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { fromMonaco, type IFirepad } from '@hackerrank/firepad'
import { fire } from '../firebase/app'

import * as monaco from 'monaco-editor'
import { build } from '../utils/build'
import { navigate } from '@/utils/navigate'

const props = defineProps<{
  onChange: (raw: string) => void
  html?: HTMLTableElement
}>()
const monacoWrapperRef = ref()
const userColor = ref('gray')
const userColors = ['#817', '#ed0', '#0bc', '#c66', '#4d8', '#36b', '#e94', '#2cb', '#639']
let monacoEditor: monaco.editor.IStandaloneCodeEditor
let firepad: IFirepad

async function setUserColor() {
  const loggedInUsers = await fire.loggedInUsers
  userColor.value = userColors[loggedInUsers - 1]
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
    // TODO
    // Dark theme
  })

  monacoEditor.onDidChangeModelContent(() => props.onChange(monacoEditor.getValue()))
  firepad = fromMonaco(fire.dbRef, monacoEditor, {
    userName: fire.auth!.user?.email?.split('@')[0],
    userColor: userColor.value,
    userId: fire.auth!.user?.uid,
    defaultText
  })
}

/**
 * Clear history and save current state as firepad's initial state
 */
async function reset() {
  const loggedInUsers = await fire.loggedInUsers
  if (loggedInUsers === 1) {
    const data = monacoEditor.getValue()

    monacoEditor.dispose()
    firepad.dispose()

    await fire.clearHistory()

    initializePad(data)
  }
}

async function save() {
  build(props.html!.innerHTML)
  reset()
}

onMounted(async () => {
  if (!fire.isAuthed) return navigate('/login')

  try {
    await setUserColor()
    initializePad()
  } catch (e) {
    console.error('Error initializing pad', e)
  }
})
onUnmounted(() => {
  firepad.dispose()
  monacoEditor.dispose()
})
</script>

<template>
  <button :onClick="save">Generar HTML</button>

  <div id="monaco" ref="monacoWrapperRef"></div>
</template>
