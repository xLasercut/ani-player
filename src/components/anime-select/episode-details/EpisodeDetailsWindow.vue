<template>
  <div class="anime-details-container">
    <anime-info :anime-details="animeDetails"></anime-info>
    <anime-episodes
      :anime-details="animeDetails"
      :current-episode="currentEpisode"
      @episode:select="getEpisodeDetails($event)"
    ></anime-episodes>
    <episode-info :episode-details="episodeDetails"></episode-info>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import {
  AnimeDetails,
  AnimeEpisodeDetails,
  AnimeEpisodeDetailsSource
} from '../../../assets/interfaces';
import { ipc } from '../../../assets/frontend/ipc';
import { IPC_EVENTS } from '../../../electron/shared/constants';
import axios from 'axios';
import AnimeInfo from './AnimeInfo.vue';
import AnimeEpisodes from './AnimeEpisodes.vue';
import EpisodeInfo from './EpisodeInfo.vue';
import { API_URL } from '../../../assets/constants';

interface State {
  animeDetails: AnimeDetails;
  episodeDetails: AnimeEpisodeDetails;
  currentEpisode: string;
}

export default defineComponent({
  components: { EpisodeInfo, AnimeEpisodes, AnimeInfo },
  setup() {
    const _DEFAULT_EPISODE_DETAILS = {
      headers: {
        Referer: ''
      },
      sources: []
    };
    const state = reactive<State>({
      animeDetails: {
        id: '',
        title: '',
        url: '',
        genres: [],
        totalEpisodes: 0,
        image: '',
        releaseDate: '',
        description: '',
        subOrDub: '',
        type: '',
        status: '',
        otherName: '',
        episodes: []
      },
      episodeDetails: Object.assign({}, _DEFAULT_EPISODE_DETAILS),
      currentEpisode: ''
    });

    ipc.on(IPC_EVENTS.GET_ANIME_DETAILS, async (animeId: string): Promise<void> => {
      try {
        state.episodeDetails = Object.assign({}, _DEFAULT_EPISODE_DETAILS);
        state.currentEpisode = '';
        const response = await axios.get(`${API_URL}/anime/gogoanime/info/${animeId}`);
        state.animeDetails = response.data;
      } catch (e) {
        alert(e);
      }
    });

    function getVideoUrl(hlsSources: AnimeEpisodeDetailsSource[]): string {
      if (hlsSources.length === 0) {
        return '';
      }

      const highestQuality = hlsSources.filter((hlsSource) => {
        return hlsSource.quality === 'default';
      });

      if (highestQuality.length > 0) {
        return highestQuality[0].url;
      }

      return hlsSources[0].url;
    }

    async function getEpisodeDetails(episodeId: string): Promise<void> {
      try {
        state.episodeDetails = Object.assign({}, _DEFAULT_EPISODE_DETAILS);
        const response = await axios.get(`${API_URL}/anime/gogoanime/watch/${episodeId}`);
        state.episodeDetails = response.data;
        state.currentEpisode = episodeId;
        const hlsSources = state.episodeDetails.sources.filter((episode) => {
          return episode.isM3U8;
        });
        const videoUrl = getVideoUrl(hlsSources);

        if (videoUrl) {
          ipc.send(IPC_EVENTS.PLAY_VIDEO, videoUrl);
        }
      } catch (e) {
        alert(e);
      }
    }

    return { ...toRefs(state), getEpisodeDetails };
  }
});
</script>
