<script setup lang="ts">
import markdownit from 'markdown-it'
import markdownitAttrs from 'markdown-it-attrs'
import { inject, ref } from 'vue'
import NewsLetterHeader from '@/components/NewsLetterHeader.vue'
import NewsLetterBody from '@/components/NewsLetterBody.vue'
import NewsLetterFooter from '@/components/NewsLetterFooter.vue'
import NewsLetterTOC from '@/components/NewsLetterTOC.vue'
import NewsLetterCentreCards from '@/components/NewsLetterCentreCards.vue'
import FirePad from '@/components/FirePadComponent.vue'
import { emailRefKey, type emailRefProvider } from '@/keys/html'
import FireInput from '@/components/FireInput.vue'

const md = markdownit({
  linkify: true,
  breaks: true
}).use(markdownitAttrs)
const html = ref('')
const emailRef = inject(emailRefKey) as emailRefProvider
const headerImgUrl = ref('-')
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
      <!-- Cabezal -->
      <details>
        <summary>Cabezal</summary>
        <FireInput
          :input-handler="(val) => (headerImgUrl = val)"
          :content="headerImgUrl"
          db-key="header-img"
          placeholder="cabezal"
          aria-label="enlace a imagen de encabezado"
        />
        <FireInput
          :input-handler="(val) => (headerDate = val)"
          :content="headerDate"
          db-key="date"
          placeholder="fecha"
          aria-label="fecha"
        />
      </details>
      <!-- End cabezal -->
      <FirePad :onChange="parse" />
    </div>
    <!-- Parsed newsletter -->
    <div class="newsletter_wrapper" ref="emailRef">
      <table id="u_body">
        <caption>
          <a name="top" id="top"></a>
        </caption>

        <tbody>
          <tr>
            <td class="container">
              <table>
                <thead>
                  <NewsLetterHeader
                    :img-url="headerImgUrl"
                    :date="headerDate"
                  />
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
/* body {
  background-color: #f6f6f6;
} */
.wrapper {
  display: flex;
  max-height: 100%;
}

.input {
  width: 50%;
  overflow: scroll;
  display: grid;
  grid-template-rows: auto 1fr;
  margin-top: 20px;
}

details {
  border: 1px solid var(--pico-accordion-open-summary-color);
  padding: 0.5rem;
  border-radius: var(--pico-border-radius);
}

textarea {
  max-width: 100%;
}

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
