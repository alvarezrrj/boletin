<script lang="ts" setup>
import { viewTransition } from '@/utils/viewTransition'
import { ref } from 'vue'
import FormattingHelp from './FormattingHelp.vue'
import ImagesHelp from './ImagesHelp.vue'
import UsageHelp from './UsageHelp.vue'

const modalRef = ref<HTMLDialogElement>()
function showModal() {
  viewTransition(() => modalRef.value?.showModal())
}
function closeModal() {
  viewTransition(() => modalRef.value?.close())
}

defineExpose({ showModal })
</script>

<template>
  <dialog ref="modalRef">
    <article>
      <header>
        <h1>Ayuda</h1>
        <button class="outline secondary" @click="closeModal">❌</button>
      </header>
      <main>
        <details>
          <summary>¿Cómo armar el boletín?</summary>
          <UsageHelp />
        </details>
        <hr />
        <details>
          <summary>¿Cómo formatear el texto?</summary>
          <FormattingHelp />
        </details>
        <hr />
        <details>
          <summary>¿Cómo agregar una imagen?</summary>
          <ImagesHelp />
        </details>
      </main>
    </article>
  </dialog>
</template>

<style lang="css" scoped>
dialog {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      margin: 0;
    }
  }
}

hr {
  color: var(--pico-muted-border-color);
  background-color: var(--pico-muted-border-color);
}
</style>
