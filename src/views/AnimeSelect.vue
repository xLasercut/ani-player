<template>
  <div class="main-container">
    <anime-details-window></anime-details-window>
    <episode-details-window></episode-details-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import axios from 'axios';
import { Anime, AnimeSearch } from '../assets/interfaces';
import AnimeDetailsWindow from '../components/anime-select/anime-details/AnimeDetailsWindow.vue';
import EpisodeDetailsWindow from '../components/anime-select/episode-details/EpisodeDetailsWindow.vue';

interface State {
  animes: Anime[];
  searchQuery: string;
  currentPage: number;
  hasNextPage: boolean;
}

export default defineComponent({
  components: { EpisodeDetailsWindow, AnimeDetailsWindow },
  setup() {
    const state = reactive<State>({
      currentPage: 1,
      animes: [],
      searchQuery: '',
      hasNextPage: false
    });

    async function search(page: number): Promise<void> {
      const response = await axios.get(
        `https://consumet-api.herokuapp.com/anime/gogoanime/${state.searchQuery}?page=${page}`
      );
      const searchResults: AnimeSearch = response.data;
      state.animes = searchResults.results;
      state.currentPage = Number(searchResults.currentPage);
      state.hasNextPage = searchResults.hasNextPage;
    }

    function previousDisabled(): boolean {
      return state.currentPage <= 1;
    }

    function nextDisabled(): boolean {
      return !state.hasNextPage;
    }

    return {
      search,
      previousDisabled,
      nextDisabled,
      ...toRefs(state)
    };
  }
});
</script>