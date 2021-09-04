import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { key } from './store';
import installElementPlus from './plugins/element';
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';
import 'normalize.css/normalize.css';
import '@/assets/styles/index.scss';

const app = createApp(App);
// installElementPlus(app);
import initSvgIcon from '@/icons/index';

// 获取store里存储的size
const size = store.state.app.size;
app.use(store, key).use(router).use(initSvgIcon).use(installElementPlus, { size }).mount('#app');

// vue实例上挂载属性类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
  }
}
