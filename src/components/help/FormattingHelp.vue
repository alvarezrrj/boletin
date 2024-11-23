<template>
  <table class="striped">
    <thead>
      <tr>
        <th>Elemento</th>
        <th>Sintaxis</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><h2>Titulo de sección</h2></td>
        <td>
          <pre>
Titulo de sección
-----------------</pre
          >
        </td>
      </tr>
      <tr>
        <td><h3>Subtítulo</h3></td>
        <td>
          <pre>### Subtítulo</pre>
        </td>
      </tr>
      <tr>
        <td><h4>Subtítulo (mas chico)</h4></td>
        <td>
          <pre>#### Subtítulo (mas chico)</pre>
        </td>
      </tr>
      <tr>
        <td>Imagen</td>
        <td>
          <pre>![Breve descripción](https://os.dhamma.org/foto)</pre>
        </td>
      </tr>
      <tr>
        <td><a href="#">Enlace</a></td>
        <td>
          <pre>[Enlace](https://example.com)</pre>
        </td>
      </tr>
      <tr>
        <td><a href="mailto:email@example.com">email@example.com</a></td>
        <td>
          <pre>email@example.com</pre>
        </td>
      </tr>
      <tr>
        <td><a class="boton">Texto del botón</a></td>
        <td>
          <pre>[Texto del boton](url){.boton}</pre>
        </td>
      </tr>
      <tr>
        <td><b>negrita</b></td>
        <td>
          <pre>**negrita**</pre>
        </td>
      </tr>
      <tr>
        <td><i>cursiva</i></td>
        <td>
          <pre>*cursiva*</pre>
        </td>
      </tr>
      <tr>
        <td>
          <ul>
            <li>Lista</li>
            <li>no</li>
            <li>numerada</li>
          </ul>
        </td>
        <td>
          <pre>
- Lista
- no
- numerada</pre
          >
        </td>
      </tr>
      <tr>
        <td>
          <ol>
            <li>Lista</li>
            <li>numerada</li>
          </ol>
        </td>
        <td>
          <pre>
1. Lista
2. numerada</pre
          >
        </td>
      </tr>
      <tr>
        <td class="aligncenter">Alineado al centro</td>
        <td><pre>Alineado al centro{.aligncenter}</pre></td>
      </tr>
      <tr>
        <td class="alignright">Alineado a la derecha</td>
        <td><pre>Alineado a la derecha{.alignright}</pre></td>
      </tr>
      <tr>
        <td><span class="highlight">Resaltado</span></td>
        <td><pre>Resaltado{.resaltado}</pre></td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped>
thead th {
  padding: calc(var(--pico-spacing) / 2);
}

td {
  padding: calc(var(--pico-spacing) / 2);
}

pre {
  background: inherit;
}

.boton {
  margin-left: 0;
}

ul,
ol {
  padding-left: 0;
}

pre,
h2,
h3,
h4 {
  margin: 0;
}
</style>
