<template>
  <player>
    <default-ui></default-ui>
    <hls>
      <source data-src="">
    </hls>
  </player>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DefaultUi, Hls, Player } from '@vime/vue-next';

export default defineComponent({
  components: { Player, DefaultUi, Hls }
})
</script>