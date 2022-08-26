import { createApp } from 'vue';
import App from './App.vue';
import '@vime/core/themes/default.css';
import { router } from './plugins/router';
import './style.css';

const app = createApp(App);
app.use(router).mount('#app');
