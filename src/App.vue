<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

router.afterEach((to, from) => {
  nextTick(() => {
    //@ts-ignore
    document.title = to.name || 'Ani-Player';
  });
});
</script>