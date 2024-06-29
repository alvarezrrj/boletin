<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const props = defineProps<{ html: string }>()
const toc = ref('')

function generateTOC(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  const menu = document.createElement('ol')

  const headers = div.querySelectorAll<HTMLHeadingElement>('h2')

  let i = 0
  for (const header of Array.from(headers)) {
    if (!header.textContent) continue

    const href = 'a' + i
    const text = header.innerHTML
    menu.appendChild(createTOCElement(href, text))
    header.setAttribute('id', href)
    i++
  }

  return menu.outerHTML
}

function createTOCElement(href: string, text: string): HTMLLIElement {
  let a = document.createElement('a')
  let strong = document.createElement('strong')
  let li = document.createElement('li')
  li.appendChild(strong)
  strong.appendChild(a)
  a.href = `#${href}`
  a.innerHTML = text
  a.className = 'toc'
  return li
}

onUpdated(() => (toc.value = generateTOC(props.html)))
</script>

<template>
  <tr>
    <td><h2>Tabla de contenidos</h2></td>
  </tr>
  <tr>
    <td v-html="toc"></td>
  </tr>
</template>
