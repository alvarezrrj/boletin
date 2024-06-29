<script setup lang="ts">
import { fire } from '@/firebase/app'
import { emailRefKey, type emailRefProvider } from '@/keys/html'
import { inject } from 'vue'
import { build } from '@/utils/build'
import { firepadResetKey, type FirepadResetProvider } from '@/keys/firepad'
import { navigate } from '@/utils/navigate'

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
</script>

<template>
  <nav>
    <ul>
      <li>Logo</li>
    </ul>

    <ul v-if="fire.isAuthed">
      <li>
        <button>Subir imagen</button>
      </li>
      <li>
        <button :onClick="run">Generar HTML</button>
      </li>
      <li>
        <button class="secondary" :onClick="logout">Salir</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  border-bottom: 1px solid var(--pico-form-element-border-color);
  margin-bottom: var(--pico-spacing);
  padding-inline: var(--pico-spacing);
}
</style>
