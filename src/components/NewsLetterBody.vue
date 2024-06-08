<script setup lang="ts">
import { ref, defineProps, onUpdated, onMounted } from 'vue'

const props = defineProps({
  html: { type: String, required: true }
})
const body = ref('')

function generateSections(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  const h2s = div.querySelectorAll('h2')

  // Insert <hr>s before <h2>s
  const br = document.createElement('br')
  let i = 0
  for (const h2 of h2s) {
    const hr = document.createElement('hr')
    const backToTop = document.createElement('a')
    backToTop.innerText = 'Volver al tope de la página'
    backToTop.href = '#top'
    div.insertBefore(hr, h2)
    div.insertBefore(backToTop, hr)
    div.insertBefore(br.cloneNode(), backToTop)
    div.insertBefore(br.cloneNode(), backToTop)

    const id = 'a' + i
    h2.setAttribute('id', id)
    i++
  }

  return div.innerHTML
}

function generateBody(html: string): string {
  html = generateSections(html)

  return html
}

onUpdated(() => (body.value = generateBody(props?.html ?? '')))
onMounted(() => (body.value = generateBody(props?.html ?? '')))
</script>

<template>
  <tr>
    <td v-html="body"></td>
  </tr>
</template>
