import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';

// 导入全局样式
import './assets/styles/index.scss';

const app = createApp(App);
installElementPlus(app);
app.use(store).use(router).mount('#app');
