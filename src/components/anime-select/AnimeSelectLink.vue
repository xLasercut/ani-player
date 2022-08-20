<template>
  <div class="container" @click="click()">
    <img :src="anime.animeImg" />
    <div class="title">{{ anime.animeTitle }}</div>
    <div class="status">{{ anime.status }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Anime } from '../../assets/interfaces';
import { ipc } from '../../assets/frontend/ipc';
import { IPC_EVENTS } from '../../assets/shared/constants';

export default defineComponent({
  props: {
    anime: {
      type: Object as PropType<Anime>,
      required: true
    }
  },
  setup(props) {
    function click(): void {
      ipc.send(IPC_EVENTS.GET_ANIME_DETAILS, props.anime.animeId);
    }

    return { click };
  }
});
</script>

<style scoped>
img {
  width: 200px;
  height: 250px;
  object-fit: cover;
  margin: 0;
  padding: 0;
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

.container {
  width: 200px;
  margin: 10px;
  border: 2px solid;
  border-color: var(--color-black-4);
  background: var(--color-black-4);
  border-radius: 3px;
}

.container:hover {
  background: var(--color-aurora-yellow);
  border-color: var(--color-aurora-yellow);
  color: var(--color-black-4);
  cursor: pointer;
}
</style>