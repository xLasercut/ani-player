<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Player, DefaultUi, Hls } from '@vime/vue-next';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  components: { Player, DefaultUi, Hls }
});
</script>
