import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
import i18n from '@/i18n';
// 导入全局样式
import './assets/styles/index.scss';
// 导入 svgIcon
import installIcons from '@/icons';

const app = createApp(App);

installElementPlus(app);
installIcons(app);

app.use(store).use(router).use(i18n).mount('#app');
