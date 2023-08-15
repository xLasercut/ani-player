<template>
  <div class="row episodes">
    {{ animeDetails.episodes.length > 0 ? 'Episodes:' : '' }}
  </div>
  <div class="row">
    <div class="col" v-for="episode in sortedEpisode()">
      <button :class="classes(episode)" @click="click(episode)">
        {{ episode.number }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { AnimeDetails, AnimeEpisode } from '../../../assets/interfaces';

const emit = defineEmits(['episode:select']);
const props = defineProps({
  animeDetails: {
    type: Object as PropType<AnimeDetails>,
    required: true
  },
  currentEpisode: {
    type: String,
    required: true
  }
});

function sortedEpisode(): AnimeEpisode[] {
  return props.animeDetails.episodes.sort((a, b) => {
    if (a.number === b.number) {
      return 0;
    }

    if (a.number > b.number) {
      return 1;
    }
    return -1;
  });
}

function click(episode: AnimeEpisode): void {
  emit('episode:select', episode.id);
}

function classes(episode: AnimeEpisode): string {
  if (episode.id === props.currentEpisode) {
    return 'current-episode';
  }
  return '';
}
</script>

<style scoped>
.episodes {
  font-weight: bold;
  font-size: 11pt;
}

button {
  width: 60px;
  padding: 5px;
}

.current-episode {
  background: var(--color-black-2);
}
</style>