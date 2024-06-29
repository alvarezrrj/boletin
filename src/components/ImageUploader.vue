<script setup lang="ts"></script>

<template>
  <label>
    <span>Arrastrá una imagen y soltala en el recuadro</span>
    <input type="file" accept="image/*" />
  </label>
</template>

<style scoped>
label {
  --spacing: 0.5rem;

  /* padding: var(--spacing); */
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  position: relative;
  /* min-height: 50px; */

  span {
    /* padding-block-end: 0.5rem; */
    font-size: 0.75em;
  }

  input {
    padding: var(--spacing);
    min-height: 50px;
    border: 1px dotted gray;
    border-radius: 0.375rem;
    place-content: center;
    /* position: absolute; */
    /* top: var(--spacing);
    bottom: var(--spacing);
    right: var(--spacing);
    left: var(--spacing); */
  }
}
</style>
