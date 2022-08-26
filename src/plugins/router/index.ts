import { createRouter, createWebHashHistory } from 'vue-router';
import MainPlayer from '../../views/MainPlayer.vue';
import AnimeSelect from '../../views/AnimeSelect.vue';
import EpisodeSelect from '../../views/EpisodeSelect.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/main-player',
      component: MainPlayer,
      name: 'Main Player'
    },
    {
      path: '/anime-select',
      component: AnimeSelect,
      name: 'Anime Select'
    },
    {
      path: '/episode-select',
      component: EpisodeSelect,
      name: 'Episode Select'
    }
  ]
});

export { router };
