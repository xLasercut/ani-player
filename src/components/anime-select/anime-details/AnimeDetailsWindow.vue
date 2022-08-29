<template>
  <div class="anime-details-container">
    <div class="row">
      <div class="col">
        <input
          variant="outlined"
          label="Search"
          hide-details
          v-model.trim="searchQuery"
          @keyup.enter="search(1)"
          density="compact"
        />
      </div>
      <div class="col">
        <button variant="flat" color="success">Search</button>
      </div>
    </div>
    <div class="row">
      <anime-select-link v-for="anime in animes" :anime="anime"></anime-select-link>
    </div>
    <div class="row">
      <div class="col">
        <button
          color="success"
          variant="flat"
          @click="search(currentPage - 1)"
          :disabled="previousDisabled()"
        >
          Previous
        </button>
      </div>
      <div class="col">
        <button
          color="success"
          variant="flat"
          @click="search(currentPage + 1)"
          :disabled="nextDisabled()"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import axios from 'axios';
import { Anime, AnimeSearch } from '../../../assets/interfaces';
import AnimeSelectLink from './AnimeSelectLink.vue';

interface State {
  animes: Anime[];
  searchQuery: string;
  currentPage: number;
  hasNextPage: boolean;
}

export default defineComponent({
  components: { AnimeSelectLink },
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
      ...toRefs(state),
      search,
      previousDisabled,
      nextDisabled
    };
  }
});
</script>
