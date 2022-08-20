<template>
  <row>
    <div>
      <input placeholder="Search" v-model="searchQuery" @keyup.enter="search()" />
      <button @click="search()">Search</button>
    </div>
  </row>
  <row>
    <anime-select-link v-for="anime in animes" :anime="anime"></anime-select-link>
  </row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import axios from 'axios';
import AnimeSelectLink from '../components/anime-select/AnimeSelectLink.vue';
import Row from '../components/grid/Row.vue';
import { Anime } from '../assets/interfaces';

interface State {
  animes: Anime[];
  searchQuery: string;
}

export default defineComponent({
  components: { AnimeSelectLink, Row },
  setup() {
    const state = reactive<State>({
      animes: [],
      searchQuery: ''
    });

    async function search() {
      const response = await axios.get(
        `https://gogoanime.herokuapp.com/search?keyw=${state.searchQuery}`
      );
      state.animes = response.data;
    }

    return {
      search,
      ...toRefs(state)
    };
  }
});
</script>

<style scoped>
input {
  height: 35px;
  margin-right: 10px;
  padding-left: 5px;
  padding-right: 5px;
  background: var(--color-black-3);
  color: var(--color-white-1);
  border: 2px solid var(--color-black-4);
  border-radius: 3px;
  font-size: 12pt;
  outline: none;
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
}

button:hover {
  color: var(--color-black-4);
  background: var(--color-aurora-green);
}

button:active {
  position: relative;
  top: 1px;
}
</style>
