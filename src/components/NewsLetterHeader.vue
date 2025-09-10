<script setup lang="ts">
defineProps<{
  imgUrl: string
  date: string
}>()
</script>

<template>
  <tr>
    <td>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td class="pb-20" width="50%">VIPASSANA ARGENTINA</td>
            <td class="alignright pb-20">
              <span class="p-0">
                <a href="http://www.sukhada.dhamma.org/">DS</a> |
                <a href="https://viriya.dhamma.org/">DV</a>
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <img
                :src="imgUrl"
                alt="Vipassana Argentina, tal y como la enseña S.N. Goenka en la tradición de Sayagi U Ba Kin"
              />
            </td>
          </tr>
          <tr>
            <td class="pb-20" width="50%">BOLETIN INFORMATIVO</td>
            <td class="alignright pb-20" v-text="date"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</template>
