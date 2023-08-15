<template>
  <div class="col" @click="click()">
    <img :src="anime.image" :alt="`${anime.title} poster`" />
    <div class="title">
      {{ anime.title }}
    </div>
    <div class="status">{{ anime.releaseDate }} ({{ anime.subOrDub }})</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Anime } from '../../../assets/interfaces';
import { ipc } from '../../../assets/frontend/ipc';
import { IPC_EVENTS } from '../../../electron/shared/constants';

const props = defineProps({
  anime: {
    type: Object as PropType<Anime>,
    required: true
  }
});

function click(): void {
  ipc.send(IPC_EVENTS.GET_ANIME_DETAILS, props.anime.id);
}
</script>

<style scoped>
.col {
  width: 200px;
  border: 2px solid;
  border-color: var(--color-black-2);
  background: var(--color-black-2);
  border-radius: 3px;
}

.col:hover {
  background: var(--color-aurora-yellow);
  border-color: var(--color-aurora-yellow);
  color: var(--color-black-4);
  cursor: pointer;
}

.col:active {
  position: relative;
  top: 1px;
}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 3px 3px 0 0;
}

.title {
  text-align: center;
  font-size: 12pt;
  word-break: break-word;
  padding-left: 5px;
  padding-right: 5px;
}

.status {
  font-size: 10pt;
  font-style: italic;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
}
</style>