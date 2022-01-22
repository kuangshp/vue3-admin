import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
import installIcons from './icons';
import './utils/request';
// 导入全局样式
import './assets/style/index.scss';

const app = createApp(App);
installElementPlus(app);
installIcons(app);

app.use(store).use(router).mount('#app');
