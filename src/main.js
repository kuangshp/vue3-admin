import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
import installIcons from './icons';
import './utils/request';

const app = createApp(App);
installElementPlus(app);
installIcons(app);

app.use(store).use(router).mount('#app');
