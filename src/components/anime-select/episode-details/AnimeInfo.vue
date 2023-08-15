<template>
  <div class="row title">
    {{ animeDetails.title }}
  </div>
  <div class="row released">
    {{ animeDetails.otherName }}
  </div>
  <div class="row released">
    {{ animeDetails.releaseDate ? `Released: ${animeDetails.releaseDate}` : '' }}
  </div>
  <div class="row">
    <img :src="animeDetails.image" />
  </div>
  <div class="row description">
    {{ animeDetails.description }}
  </div>
  <div class="row">
    <div class="col chip" v-for="genre in animeDetails.genres">
      {{ genre }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { AnimeDetails } from '../../../assets/interfaces';

defineProps({
  animeDetails: {
    type: Object as PropType<AnimeDetails>,
    required: true
  }
});
</script>

<style scoped>
.title {
  font-size: 12pt;
  font-weight: bold;
}

.released {
  font-style: italic;
  font-size: 10pt;
}

.description {
  font-size: 11pt;
}

.chip {
  padding: 5px;
  font-size: 11pt;
  background: var(--color-frost-2);
  border-radius: 3px;
  color: var(--color-black-4);
}

img {
  width: 300px;
}
</style>