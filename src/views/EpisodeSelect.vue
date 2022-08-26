<template>
  <anime-info :anime-details="animeDetails"></anime-info>
  <AnimeEpisodes
    :anime-details="animeDetails"
    @episode:select="getEpisodeDetails($event)"
    :current-episode="currentEpisode"
  ></AnimeEpisodes>
  <episode-info :episode-details="episodeDetails"></episode-info>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { ipc } from '../assets/frontend/ipc';
import { IPC_EVENTS } from '../electron/shared/constants';
import axios from 'axios';
import { AnimeDetails, AnimeEpisodeDetails } from '../assets/interfaces';
import Row from '../components/grid/Row.vue';
import AnimeInfo from '../components/episode-select/AnimeInfo.vue';
import AnimeEpisodes from '../components/episode-select/AnimeEpisodes.vue';
import EpisodeInfo from '../components/episode-select/EpisodeInfo.vue';

interface State {
  animeDetails: AnimeDetails;
  episodeDetails: AnimeEpisodeDetails;
  currentEpisode: string;
}

export default defineComponent({
  components: { EpisodeInfo, AnimeEpisodes, AnimeInfo, Row },
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
      state.episodeDetails = Object.assign({}, _DEFAULT_EPISODE_DETAILS);
      state.currentEpisode = '';
      const response = await axios.get(
        `https://consumet-api.herokuapp.com/anime/gogoanime/info/${animeId}`
      );
      state.animeDetails = response.data;
    });

    async function getEpisodeDetails(episodeId: string): Promise<void> {
      state.episodeDetails = Object.assign({}, _DEFAULT_EPISODE_DETAILS);
      const response = await axios.get(
        `https://consumet-api.herokuapp.com/anime/gogoanime/watch/${episodeId}`
      );
      state.episodeDetails = response.data;
      state.currentEpisode = episodeId;
    }

    return { ...toRefs(state), getEpisodeDetails };
  }
});
</script>