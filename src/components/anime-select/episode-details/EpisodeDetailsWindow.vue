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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

const _DEFAULT_EPISODE_DETAILS = {
  headers: {
    Referer: ''
  },
  sources: []
};
const animeDetails = ref<AnimeDetails>({
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
});
const episodeDetails = ref<AnimeEpisodeDetails>(Object.assign({}, _DEFAULT_EPISODE_DETAILS));
const currentEpisode = ref('');

onMounted(() => {
  ipc.on(IPC_EVENTS.GET_ANIME_DETAILS, async (animeId: string): Promise<void> => {
    try {
      episodeDetails.value = Object.assign({}, _DEFAULT_EPISODE_DETAILS);
      currentEpisode.value = '';
      const response = await axios.get(`${API_URL}/anime/gogoanime/info/${animeId}`);
      animeDetails.value = response.data;
    } catch (e) {
      alert(e);
    }
  });
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
    episodeDetails.value = Object.assign({}, _DEFAULT_EPISODE_DETAILS);
    const response = await axios.get(`${API_URL}/anime/gogoanime/watch/${episodeId}`);
    episodeDetails.value = response.data;
    currentEpisode.value = episodeId;
    const hlsSources = episodeDetails.value.sources.filter((episode) => {
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
</script>
