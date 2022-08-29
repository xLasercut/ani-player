import { createApp } from 'vue';
import App from './App.vue';
import { router } from './plugins/router';
import '@vime/core/themes/default.css';
import './style.css';

createApp(App).use(router).mount('#app');
