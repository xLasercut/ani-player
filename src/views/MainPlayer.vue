<template>
  <div class="container">
    <Player
      class="main-player"
      :autopause="false"
      :volume="100"
      :autoplay="isHls()"
      ref="player"
      @vmPlaybackReady="playVideo()"
    >
      <default-ui></default-ui>
      <Video v-if="!isHls()">
        <source :data-src="videoUrl" />
      </Video>
      <hls v-if="isHls()">
        <source :data-src="videoUrl" />
      </hls>
    </Player>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { DefaultUi, Hls, Video, Player } from '@vime/vue-next';
import { ipc } from '../assets/frontend/ipc';
import { IPC_EVENTS } from '../electron/shared/constants';

const videoUrl = ref('');

const player = ref<any>(null);

onMounted(() => {
  ipc.on(IPC_EVENTS.PLAY_VIDEO, (_videoUrl: string) => {
    videoUrl.value = '';
    nextTick(() => {
      videoUrl.value = _videoUrl;
    });
  });
});

function isHls(): boolean {
  return videoUrl.value.endsWith('.m3u8');
}

function playVideo(): void {
  if (!isHls()) {
    player.value.play();
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  background: black;
  width: 100vw;
}

.main-player {
  --vm-player-border-radius: 0;
}
</style>