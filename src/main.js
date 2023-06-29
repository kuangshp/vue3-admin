import 'virtual:svg-icons-register';
import './assets/css/main.scss';
// import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
// 注册element-plus
import installElementPlus from './plugins/element';
// store 数据持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// 自定义图标
import installIcons from './icons';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app = createApp(App);
// 全部的字体图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router);
app.use(installElementPlus);
app.use(installIcons);

app.mount('#app');
