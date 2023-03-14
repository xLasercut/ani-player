<template>
  <div class="main-container">
    <anime-details-window></anime-details-window>
    <episode-details-window></episode-details-window>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AnimeDetailsWindow from '../components/anime-select/anime-details/AnimeDetailsWindow.vue';
import EpisodeDetailsWindow from '../components/anime-select/episode-details/EpisodeDetailsWindow.vue';

export default defineComponent({
  components: { EpisodeDetailsWindow, AnimeDetailsWindow }
});
</script>