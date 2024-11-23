<script setup lang="ts">
import { fire } from '@/firebase/app'
import { emailRefKey, type emailRefProvider } from '@/keys/html'
import { inject, useTemplateRef } from 'vue'
import { build } from '@/utils/build'
import { firepadResetKey, type FirepadResetProvider } from '@/keys/firepad'
import { navigate } from '@/utils/navigate'
import HelpComponent from './help/HelpComponent.vue'

const helpComponent = useTemplateRef<typeof HelpComponent>('help-ref')
const emailRef = inject(emailRefKey) as emailRefProvider
const { firepadReset } = inject(firepadResetKey) as FirepadResetProvider

function run() {
  if (emailRef.value?.innerHTML) {
    build(emailRef.value.innerHTML)
  }
  firepadReset.value()
}

function logout() {
  fire.logout()
  navigate('/login')
}

function showHelp() {
  helpComponent.value?.showModal()
}
</script>

<template>
  <nav>
    <ul>
      <li>Logo</li>
    </ul>

    <ul v-if="fire.isAuthed">
      <li>
        <button class="outline secondary" @click="showHelp">❔</button>
      </li>
      <li>
        <a href="#/fotos">
          <button>Fotos</button>
        </a>
      </li>
      <li>
        <button :onClick="run">Generar HTML</button>
      </li>
      <li>
        <button class="secondary" :onClick="logout">Salir</button>
      </li>
    </ul>
  </nav>
  <HelpComponent ref="help-ref" />
</template>

<style scoped>
nav {
  border-bottom: 1px solid var(--pico-form-element-border-color);
  margin-bottom: var(--pico-spacing);
  padding-inline: var(--pico-spacing);
}
</style>
