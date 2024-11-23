<script setup lang="ts">
import type { Image } from '@/utils/wpUploader'
import { onBeforeUnmount, ref } from 'vue'

const { image } = defineProps<{
  image: Image
}>()

const dialogRef = ref<HTMLDialogElement>()
const loading = ref(true)
const copied = ref(false)
let copyTimeout: NodeJS.Timeout

function imgClickHandler() {
  const dialog = dialogRef.value
  dialog?.showModal()
}
function imgLoadHandler() {
  loading.value = false
}
async function copyUrlToClipboard() {
  try {
    await navigator.clipboard.writeText(image.email)
    copied.value = true
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy')
  }
}

onBeforeUnmount(() => copyTimeout && clearTimeout(copyTimeout))
</script>

<template>
  <article>
    <img
      alt="image"
      class="thumbnail"
      @click="imgClickHandler"
      loading="lazy"
      :src="image.thumbnail"
      width="150"
      :aria-busy="loading"
    />
    <p @click="copyUrlToClipboard">{{ image.email.slice(44) }}</p>
    <ins v-if="copied">Enlace copiado</ins>
  </article>

  <dialog ref="dialogRef">
    <form method="dialog">
      <button type="submit" class="outline secondary">❌</button>
    </form>
    <img
      loading="lazy"
      :src="image.email"
      alt="image"
      aria-busy="true"
      @load="imgLoadHandler"
    />
    <p :aria-busy="loading"></p>
  </dialog>
</template>

<style lang="css" scoped>
article {
  display: flex;
  flex-direction: column;
  max-width: calc(150px + var(--pico-spacing));

  p {
    margin-top: calc(var(--pico-spacing) / 2);
    margin-bottom: 0;
    cursor: pointer;
  }
}

img.thumbnail {
  cursor: pointer;
}

dialog {
  flex-direction: column;
  max-height: 100dvh;

  form {
    align-self: flex-end;
    margin: var(--pico-spacing);
  }

  img {
    max-height: 85%;
  }
}
</style>
