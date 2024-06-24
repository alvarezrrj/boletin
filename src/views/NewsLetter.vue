<script setup lang="ts">
import markdownit from 'markdown-it'
import markdownitAttrs from 'markdown-it-attrs'
import { ref } from 'vue'
import NewsLetterHeader from '@/components/NewsLetterHeader.vue'
import NewsLetterBody from '@/components/NewsLetterBody.vue'
import NewsLetterFooter from '@/components/NewsLetterFooter.vue'
import NewsLetterTOC from '@/components/NewsLetterTOC.vue'
import NewsLetterCentreCards from '@/components/NewsLetterCentreCards.vue'
import FirePad from '@/components/FirePadComponent.vue'
import ImageUploader from '@/components/ImageUploader.vue'

const md = markdownit({
  linkify: true,
  breaks: true
}).use(markdownitAttrs)
const html = ref('')
const tableWrapperRef = ref<HTMLTableElement>()
const headerImgUrl = ref('https://sukhada.dhamma.org/fotos/2024/03/cabezal.jpg')
const now = new Date()
const month = new Intl.DateTimeFormat('es-AR', { month: 'long' }).format(now)
const year = now.getFullYear()
const headerDate = ref(`${month} ${year}`)

async function parse(raw: string) {
  try {
    html.value = md.render(raw)
  } catch (e) {
    console.error('Error rendering markdown', e)
    // TODO
    // alert
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="input">
      <input type="text" v-model="headerImgUrl" placeholder="Imagen de encabezado" />
      <input type="text" v-model="headerDate" placeholder="Fecha" />
      <ImageUploader />
      <FirePad :onChange="parse" :html="tableWrapperRef" />
    </div>
    <div class="newsletter_wrapper" ref="tableWrapperRef">
      <table id="u_body">
        <caption>
          <a name="top" id="top"></a>
        </caption>

        <tbody>
          <tr>
            <td class="container">
              <table>
                <thead>
                  <NewsLetterHeader :img-url="headerImgUrl" :date="headerDate" />
                </thead>

                <tbody>
                  <NewsLetterTOC :html="html" />

                  <tr>
                    <td>
                      <hr />
                    </td>
                  </tr>

                  <NewsLetterCentreCards />

                  <NewsLetterBody :html="html" />

                  <tr>
                    <td>
                      <br /><br />
                      <a href="#top">Volver al tope de la página</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>

        <tbody>
          <NewsLetterFooter />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  max-height: 100%;
}

.input {
  width: 50%;
  overflow: scroll;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  gap: 1rem;
}

textarea {
  max-width: 100%;
}

/* body {
  background-color: #f6f6f6;
} */

.newsletter_wrapper {
  width: 50%;
  overflow: scroll;
}

.container {
  width: unset;
  padding: 0;
}

td,
th {
  padding: 0;
  border: none;
}

thead td {
  --pico-font-weight: 400;
}
</style>

<style src="../assets/newsletter.css"></style>
