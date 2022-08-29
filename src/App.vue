<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
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
