<script setup lang="ts">
import { ref } from 'vue'
import { fire } from '@/firebase/app'
import { navigate } from '@/utils/navigate'

if (fire.isAuthed) navigate('/')

const formRef = ref<HTMLFormElement>()

async function login(e: Event): Promise<void> {
  e.preventDefault()
  const formElement = formRef.value
  if (!formElement) return

  try {
    await fire.login(formElement.email.value, formElement.password.value)

    formElement.reset()

    navigate('/')
  } catch (e: any) {
    if ('code' in e && e.code.includes('auth')) alert('Credenciales inválidas')
    else alert('Error al iniciar sesión')
    console.error(e)
  }
}
</script>

<template>
  <article class="">
    <form ref="formRef" :onSubmit="login">
      <input type="text" name="email" aria-label="Email" />
      <input type="password" name="password" aria-label="password" />
      <input type="submit" value="login" />
    </form>
  </article>
</template>
