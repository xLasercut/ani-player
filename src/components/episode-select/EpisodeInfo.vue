<template>
  <row>
    <button v-for="(source, index) in episodeDetails.sources" @click="playVideo(source.url)">
      Server {{ index + 1 }} - {{ videoFormat(source.url) }}
    </button>
  </row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { AnimeEpisodeDetails } from '../../assets/interfaces';
import Row from '../grid/Row.vue';
import { ipc } from '../../assets/frontend/ipc';
import { IPC_EVENTS } from '../../electron/shared/constants';

export default defineComponent({
  components: { Row },
  props: {
    episodeDetails: {
      type: Object as PropType<AnimeEpisodeDetails>,
      required: true
    }
  },
  setup() {
    function playVideo(videoUrl: string): void {
      ipc.send(IPC_EVENTS.PLAY_VIDEO, videoUrl);
    }

    function videoFormat(url: string): string {
      const urlSplit = url.split('.');
      return urlSplit[urlSplit.length - 1];
    }

    return {
      playVideo,
      videoFormat
    };
  }
});
</script>

<style scoped>
button {
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background: var(--color-black-4);
  color: var(--color-white-1);
  border: none;
  border-radius: 3px;
  font-size: 12pt;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: var(--color-frost-2);
}

button:active {
  position: relative;
  top: 1px;
}
</style>