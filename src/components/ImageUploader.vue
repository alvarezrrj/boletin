<script setup lang="ts">
import { extractSizes, uploadRequest, type Image } from '@/utils/wpUploader'
import { ref } from 'vue'

const props = defineProps<{
  wpBasicAuth: string
  baseUrl: string
  onUpload: (image: Image) => void
}>()

const loading = ref(false)

async function upload(e: Event) {
  loading.value = true
  e.preventDefault()

  const fileInputElement: HTMLInputElement = (e.target as HTMLFormElement)?.file
  const altInputElement: HTMLInputElement = (e.target as HTMLFormElement)?.alt
  if (!fileInputElement || !altInputElement) return

  const file = (fileInputElement.files as FileList)[0]
  const fileName = file.name
  const body = await file.arrayBuffer()

  try {
    const response = await uploadRequest(
      props.baseUrl,
      altInputElement.value,
      fileName,
      props.wpBasicAuth,
      body
    )
    const wpResponse = await response.json()
    const image = extractSizes(wpResponse)

    if (!image)
      return alert('Error al subir la imagen. Por favor, intente nuevamente.')

    props.onUpload(image)
  } catch (error) {
    alert(
      'Error de conexión. Puede que no estés conectado a internet o que haya' +
        ' un problema con WordPress.'
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form v-on:submit="upload" enctype="multipart/form-data">
    <label>
      <span>Arrastrá una imagen y soltala en el recuadro</span>
      <input type="file" accept="image/*" name="file" />
    </label>
    <label>
      Descripción
      <small>
        Una muy breve descripción de la imagen. Si la imagen contiene texto,
        escribelo acá.
      </small>
      <input type="text" name="alt" required />
    </label>
    <button type="submit" value="Enviar" :disabled="loading">
      <span :aria-busy="loading"></span><span v-if="!loading">Subir</span>
    </button>
  </form>
</template>

<style scoped>
label {
  --spacing: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  position: relative;

  input[type='file'] {
    padding: var(--spacing);
    min-height: 150px;
    border: 1px dashed gray;
    border-radius: 0.375rem;
    place-content: center;
  }
}

form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
