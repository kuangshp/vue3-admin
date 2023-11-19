import 'virtual:svg-icons-register';
import './assets/css/main.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './utils/httpRequest';

// store 数据持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import mUi from './components';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app = createApp(App);
// 全部的字体图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
console.log(import.meta.env.VITE_BASE_API, '当前环境');
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router).use(ElementPlus).use(mUi);

app.mount('#app');
