<template>
  {{ animeDetails }}
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { ipc } from '../assets/frontend/ipc';
import { IPC_EVENTS } from '../assets/shared/constants';
import axios from 'axios';

export default defineComponent({
  setup() {
    const state = reactive({
      animeDetails: {}
    });

    ipc.on(IPC_EVENTS.GET_ANIME_DETAILS, async (animeId: string): Promise<void> => {
      const response = await axios.get(`https://gogoanime.herokuapp.com/anime-details/${animeId}`);
      state.animeDetails = response.data;
    });

    return { ...toRefs(state) };
  }
});
</script>