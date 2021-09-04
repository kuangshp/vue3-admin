import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { key } from './store';
import installElementPlus from './plugins/element';
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus';
import 'normalize.css/normalize.css';
import '@/assets/styles/index.scss';

const app = createApp(App);
installElementPlus(app);
import initSvgIcon from '@/icons/index';

app.use(store, key).use(router).use(initSvgIcon).mount('#app');

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
