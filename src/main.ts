import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@vime/core/themes/default.css';
import { router } from './plugins/router';
import { store } from './plugins/store';

const app = createApp(App);
app.use(router).use(store).mount('#app');
