<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot name="main"></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<style scoped>
main {
  margin: 0 auto;
  overflow: hidden;
  padding-inline: var(--pico-spacing);
}
</style>
