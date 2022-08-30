<template>
  <div class="container">
    <player
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
    </player>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { DefaultUi, Hls, Player, Video } from '@vime/vue-next';
import { ipc } from '../assets/frontend/ipc';
import { IPC_EVENTS } from '../electron/shared/constants';

export default defineComponent({
  components: { Player, DefaultUi, Hls, Video },
  setup() {
    const state = reactive({
      videoUrl: ''
    });

    const player = ref<any>(null);

    ipc.on(IPC_EVENTS.PLAY_VIDEO, (videoUrl: string) => {
      state.videoUrl = '';
      nextTick(() => {
        state.videoUrl = videoUrl;
      });
    });

    function isHls(): boolean {
      return state.videoUrl.endsWith('.m3u8');
    }

    function playVideo(): void {
      if (!isHls()) {
        player.value.play();
      }
    }

    return {
      ...toRefs(state),
      isHls,
      player,
      playVideo
    };
  }
});
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