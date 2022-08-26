<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Player, DefaultUi, Hls } from '@vime/vue-next';
import { defineComponent, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { Player, DefaultUi, Hls },
  setup() {
    const router = useRouter();

    router.afterEach((to, from) => {
      nextTick(() => {
        //@ts-ignore
        document.title = to.name || 'Ani-Player';
      });
    });
  }
});
</script>