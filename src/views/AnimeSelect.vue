<template>
  <row>
    <div>
      <input placeholder="Search" v-model="searchQuery" @keyup.enter="search(1)" />
      <button @click="search(1)">Search</button>
    </div>
  </row>
  <row>
    <anime-select-link v-for="anime in animes" :anime="anime"></anime-select-link>
  </row>
  <row>
    <button :disabled="previousDisabled()" @click="search(currentPage - 1)">Previous</button>
    <button :disabled="nextDisabled()" @click="search(currentPage + 1)">Next</button>
  </row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import axios from 'axios';
import AnimeSelectLink from '../components/anime-select/AnimeSelectLink.vue';
import Row from '../components/grid/Row.vue';
import { Anime, AnimeSearch } from '../assets/interfaces';

interface State {
  animes: Anime[];
  searchQuery: string;
  currentPage: number;
  hasNextPage: boolean;
}

export default defineComponent({
  components: { AnimeSelectLink, Row },
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

<style scoped>
input {
  height: 35px;
  padding-left: 5px;
  padding-right: 5px;
  background: var(--color-black-3);
  color: var(--color-white-1);
  border: 2px solid var(--color-black-4);
  border-radius: 3px;
  font-size: 12pt;
  outline: none;
  margin-left: 10px;
}

input:focus {
  outline: 2px solid var(--color-aurora-yellow);
}

button {
  background: var(--color-black-3);
  color: var(--color-white-1);
  border-radius: 3px;
  border: 2px solid var(--color-black-4);
  cursor: pointer;
  font-size: 12pt;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

button:hover {
  color: var(--color-black-4);
  background: var(--color-aurora-green);
}

button:active {
  position: relative;
  top: 1px;
}

button:disabled {
  color: var(--color-black-1);
  cursor: default;
  background: var(--color-black-3);
  top: 0;
}
</style>
