<template>
  <row>
    <div>
      <div class="title">{{ animeDetails.title }}</div>
      <div>{{ animeDetails.otherName }}</div>
      <div class="released">Released: {{animeDetails.releaseDate}}</div>
      <img :src="animeDetails.image" />
      <div class="description">{{ animeDetails.description }}</div>
      <div><span class="genre" v-for="genre in animeDetails.genres">{{genre}}</span></div>
    </div>
  </row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Row from '../grid/Row.vue';
import { AnimeDetails } from '../../assets/interfaces';

export default defineComponent({
  components: { Row },
  props: {
    animeDetails: {
      type: Object as PropType<AnimeDetails>,
      required: true
    }
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
  margin-bottom: 5px;
}

.genre {
  padding: 5px;
  margin-right: 3px;
  font-size: 11pt;
  background: var(--color-black-4);
  border-radius: 3px;
}
</style>