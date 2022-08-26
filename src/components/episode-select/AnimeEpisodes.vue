<template>
  <row>
    <div class="episodes">Episodes:</div>
  </row>
  <row>
    <button v-for="episode in sortedEpisode()" @click="click(episode)">{{ episode.number }}</button>
  </row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Row from '../grid/Row.vue';
import { AnimeDetails, AnimeEpisode } from '../../assets/interfaces';

export default defineComponent({
  components: { Row },
  props: {
    animeDetails: {
      type: Object as PropType<AnimeDetails>,
      required: true
    }
  },
  setup(props, context) {
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
      context.emit('episode:select', episode.id);
    }

    return {
      sortedEpisode,
      click
    };
  }
});
</script>

<style scoped>
.episodes {
  font-weight: bold;
  font-size: 11pt;
}

button {
  background: var(--color-black-4);
  margin-right: 5px;
  margin-bottom: 5px;
  width: 60px;
  color: var(--color-white-1);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px;
  font-size: 11pt;
  font-weight: bold;
}

button:hover {
  background: var(--color-frost-2);
}

button:active {
  position: relative;
  top: 1px;
}
</style>