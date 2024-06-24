<script setup lang="ts">
import NewsLetter from '@/views/NewsLetter.vue'
import LoginComponent from '@/views/LoginComponent.vue'
import { computed, ref, type Component } from 'vue'
import { protectedView } from '@/utils/protected'
import NotFound from '@/views/NotFound.vue'

const routes = computed<{ [key: string]: Component }>(() => ({
  '/': protectedView(NewsLetter),
  '/login': LoginComponent
}))

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  if (window.location.hash[1] !== '/') return
  currentPath.value = window.location.hash
})

const currentView = computed(() => routes.value[currentPath.value.slice(1) || '/'] || NotFound)
</script>

<template>
  <component :is="currentView" />
</template>

<style scoped></style>
