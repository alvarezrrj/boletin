<script setup lang="ts">
import { fire } from '@/firebase/app'
import { onMounted, onUnmounted, onUpdated } from 'vue'

const props = defineProps<{
  inputHandler: (value: string) => void
  content: string
  dbKey: string
  placeholder: string
}>()

function debounce(cb: CallableFunction) {
  let timeoutId: number
  return function (args: any) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(cb, 1750, args)
  }
}

onMounted(() => {
  // Attach listener
  fire.dbRef.child(props.dbKey).on(
    'value',
    debounce((snapshot: any) => {
      if (snapshot && 'val' in snapshot) props.inputHandler(snapshot.val?.())
    })
  )
})
onUpdated(() => {
  // Update DB on change
  props.content !== '-' && fire.dbRef.child(props.dbKey).set(props.content)
})
onUnmounted(() => {
  // Detach listener
  fire.dbRef.child(props.dbKey).off('value')
})
</script>
<template>
  <input
    type="text"
    :onInput="(e) => inputHandler((e.target as HTMLInputElement).value)"
    :value="content"
    :placeholder="placeholder"
  />
</template>
