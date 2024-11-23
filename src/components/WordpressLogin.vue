<script setup lang="ts">
defineProps<{
  loginUrl: string
}>()
</script>

<template>
  <article class="login">
    <p>
      Necesitamos acceso a la galeria de WordPress. Apretá el botón para obtener
      acceso.
    </p>
    <footer>
      <a :href="loginUrl">
        <button>Vamos</button>
      </a>
    </footer>
  </article>
</template>

<style lang="css" scoped>
article {
  max-width: 60ch;
}
article p {
  font-size: 1em;
}
article footer {
  display: flex;
  flex-direction: row-reverse;
}
</style>
