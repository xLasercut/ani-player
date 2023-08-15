<template>
  <div class="anime-details-container">
    <div class="row">
      <div class="col">
        <input v-model.trim="searchQuery" @keyup.enter="search(1)" />
      </div>
      <div class="col">
        <button @click="search(1)">Search</button>
      </div>
    </div>
    <div class="row">
      <anime-select-link v-for="anime in animes" :anime="anime"></anime-select-link>
    </div>
    <div class="row">
      <div class="col">
        <button @click="search(currentPage - 1)" :disabled="previousDisabled()">Previous</button>
      </div>
      <div class="col">
        <button @click="search(currentPage + 1)" :disabled="nextDisabled()">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { Anime, AnimeSearch } from '../../../assets/interfaces';
import AnimeSelectLink from './AnimeSelectLink.vue';
import { API_URL } from '../../../assets/constants';

const currentPage = ref(1);
const animes = ref<Anime[]>([]);
const searchQuery = ref('');
const hasNextPage = ref(false);

async function search(page: number): Promise<void> {
  try {
    const response = await axios.get(
      `${API_URL}/anime/gogoanime/${searchQuery.value}?page=${page}`
    );
    const searchResults: AnimeSearch = response.data;
    animes.value = searchResults.results;
    currentPage.value = Number(searchResults.currentPage);
    hasNextPage.value = searchResults.hasNextPage;
  } catch (e) {
    alert(e);
  }
}

function previousDisabled(): boolean {
  return currentPage.value <= 1;
}

function nextDisabled(): boolean {
  return !hasNextPage.value;
}
</script>