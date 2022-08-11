import { createRouter, createWebHashHistory } from 'vue-router';
import MainPlayer from '../../views/MainPlayer.vue';
import AnimeSelect from '../../views/AnimeSelect.vue';
import EpisodeSelect from '../../views/EpisodeSelect.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/main-player',
      component: MainPlayer
    },
    {
      path: '/anime-select',
      component: AnimeSelect
    },
    {
      path: '/episode-select',
      component: EpisodeSelect
    }
  ]
});

export { router };
