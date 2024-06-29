import LoginComponent from '@/views/LoginComponent.vue'
import { fire } from '@/firebase/app'
import type { Component } from 'vue'

export function protectedView(component: Component): Component {
  if (fire.isAuthed) return component
  return LoginComponent
}
