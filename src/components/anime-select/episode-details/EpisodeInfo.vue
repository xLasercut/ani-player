<template>
  <div class="row">
    <div class="col" v-for="(source, index) in episodeDetails.sources" cols="auto">
      <button :title="source.url" @click="playVideo(source.url)">
        Source {{ index + 1 }} - {{ videoFormat(source.url) }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { AnimeEpisodeDetails } from '../../../assets/interfaces';
import { ipc } from '../../../assets/frontend/ipc';
import { IPC_EVENTS } from '../../../electron/shared/constants';

export default defineComponent({
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
  background: var(--color-aurora-yellow);
  color: var(--color-black-4);
  font-weight: bold;
  font-size: 11pt;
}

button:hover {
  background: var(--color-aurora-green);
}
</style>
